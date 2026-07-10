import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createRequest, getAllRequests } from "@/services/requests";
import { notificationEmitter } from "@/lib/notifications";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requests = await getAllRequests();
  return NextResponse.json(requests);
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as any;
    const { serviceType, description, location } = body;

    if (!serviceType || !description || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const request = await createRequest({
      userId: session.id as string,
      serviceType,
      description,
      location,
    });

    // Notifier le dashboard admin en temps réel
    notificationEmitter.emit("new_order", {
      id: request.id,
      clientName: (session as any).name ?? "Client",
      serviceType,
      location,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Request created successfully", request },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
