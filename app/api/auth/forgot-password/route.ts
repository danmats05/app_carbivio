import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = rateLimit(`forgot:${ip}`, 3, 60_000); // 3 demandes / minute

  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 1 minute." },
      { status: 429 },
    );
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Répondre toujours OK pour ne pas révéler si l'email existe
    if (!user) {
      return NextResponse.json({ message: "Si cet email existe, un lien de réinitialisation a été envoyé." });
    }

    // Invalider les anciens tokens non utilisés
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Générer un nouveau token sécurisé
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const resetLink = `${appUrl}/reset-password?token=${token}`;

    await sendPasswordResetEmail(user.email, user.name, resetLink);

    return NextResponse.json({ message: "Si cet email existe, un lien de réinitialisation a été envoyé." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
