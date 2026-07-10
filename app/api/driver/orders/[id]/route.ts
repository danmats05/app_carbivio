import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { updateRequestStatusByDriver } from "@/services/requests";
import { notificationEmitter, DriverStatusNotification } from "@/lib/notifications";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || session.role !== "DRIVER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await req.json();
  const { status } = body as { status: string };

  if (!["IN_PROGRESS", "COMPLETED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await prisma.serviceRequest.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });

  if (!order || order.driverId !== (session.id as string)) {
    return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  }

  const updated = await updateRequestStatusByDriver(id, status as "IN_PROGRESS" | "COMPLETED");

  const notification: DriverStatusNotification = {
    requestId: id,
    driverName: (session as any).name ?? "Chauffeur",
    clientName: order.user.name,
    serviceType: order.serviceType,
    newStatus: status as "IN_PROGRESS" | "COMPLETED",
    updatedAt: new Date().toISOString(),
  };
  notificationEmitter.emit("driver_status_update", notification);

  return NextResponse.json({ message: "Status updated", request: updated });
}
