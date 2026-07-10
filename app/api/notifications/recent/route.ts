import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await prisma.serviceRequest.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
  });

  const notifications = requests.map((r) => ({
    id: r.id,
    clientName: r.user.name,
    serviceType: r.serviceType,
    location: r.location,
    createdAt: r.createdAt.toISOString(),
  }));

  return NextResponse.json(notifications);
}
