import { notificationEmitter, DriverAssignmentNotification } from "@/lib/notifications";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "DRIVER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const driverId = session.id as string;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: unknown) => {
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          // client déconnecté
        }
      };

      send("connected", { ok: true });

      const onAssignment = (notif: DriverAssignmentNotification) => {
        send("driver_assignment", notif);
      };

      notificationEmitter.on(`driver_assignment_${driverId}`, onAssignment);

      req.signal.addEventListener("abort", () => {
        notificationEmitter.off(`driver_assignment_${driverId}`, onAssignment);
        try { controller.close(); } catch { /* déjà fermé */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
