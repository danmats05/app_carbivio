import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/services/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const drivers = await prisma.user.findMany({
    where: { role: "DRIVER" },
    select: { id: true, name: true, email: true, createdAt: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(drivers);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.role === "DRIVER") {
      return NextResponse.json({ error: "Ce chauffeur existe déjà" }, { status: 409 });
    }
    // Promouvoir un USER existant en DRIVER
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: { role: "DRIVER" },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return NextResponse.json(updated, { status: 200 });
  }

  const hashed = await hashPassword(password);
  const driver = await prisma.user.create({
    data: { name, email, password: hashed, role: "DRIVER" },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return NextResponse.json(driver, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "Chauffeur supprimé" });
}
