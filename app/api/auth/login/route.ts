import { NextResponse } from "next/server";
import { loginController } from "@/controllers/authController";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = rateLimit(`login:${ip}`, 10, 60_000); // 10 tentatives / minute

  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 1 minute." },
      { status: 429 },
    );
  }

  return loginController(req);
}
