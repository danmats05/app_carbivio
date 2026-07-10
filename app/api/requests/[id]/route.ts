import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { updateRequestStatus, deleteRequest, assignDriverToRequest } from "@/services/requests";
import { notificationEmitter, DriverAssignmentNotification } from "@/lib/notifications";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as any;
    const { status, driverId } = body;
    const resolvedParams = await context.params;

    // Driver assignment
    if (driverId !== undefined) {
      const updated = await assignDriverToRequest(resolvedParams.id, driverId, session.id as string);

      // Notify the driver in real-time via SSE
      if (driverId) {
        const fullRequest = await prisma.serviceRequest.findUnique({
          where: { id: resolvedParams.id },
          include: { user: { select: { name: true, email: true } } },
        });

        if (fullRequest) {
          // Parse lat/lng from location string if not stored (e.g. "14.757, -17.464")
          let lat = fullRequest.latitude;
          let lng = fullRequest.longitude;
          if ((lat === null || lng === null) && fullRequest.location) {
            const match = fullRequest.location.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
            if (match) {
              lat = parseFloat(match[1]);
              lng = parseFloat(match[2]);
              await prisma.serviceRequest.update({
                where: { id: resolvedParams.id },
                data: { latitude: lat, longitude: lng },
              });
            }
          }

          const notification: DriverAssignmentNotification = {
            requestId: fullRequest.id,
            driverId,
            clientName: fullRequest.user.name,
            clientEmail: fullRequest.user.email,
            serviceType: fullRequest.serviceType,
            description: fullRequest.description,
            location: fullRequest.location,
            latitude: lat,
            longitude: lng,
            createdAt: fullRequest.createdAt.toISOString(),
          };
          notificationEmitter.emit(`driver_assignment_${driverId}`, notification);
        }
      }

      return NextResponse.json({ message: "Driver assigned", request: updated });
    }

    if (!status) {
      return NextResponse.json({ error: "Status or driverId is required" }, { status: 400 });
    }

    const updated = await updateRequestStatus(resolvedParams.id, status as any, session.id as string);
    return NextResponse.json({ message: "Status updated", request: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await context.params;
    await deleteRequest(resolvedParams.id, session.id as string);
    return NextResponse.json({ message: "Request deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
