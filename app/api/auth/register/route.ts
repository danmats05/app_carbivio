import { NextResponse } from "next/server";
import { registerController } from "@/controllers/authController";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = rateLimit(`register:${ip}`, 5, 60_000); // 5 inscriptions / minute

  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 1 minute." },
      { status: 429 },
    );
  }

  return registerController(req);
}
