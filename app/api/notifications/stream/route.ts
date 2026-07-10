import { notificationEmitter, OrderNotification, DriverStatusNotification } from "@/lib/notifications";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

// SSE requiert le runtime Node.js (pas Edge)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

      // Ping initial pour confirmer la connexion
      send("connected", { ok: true });

      const onOrder = (notif: OrderNotification) => {
        send("new_order", notif);
      };

      const onDriverUpdate = (notif: DriverStatusNotification) => {
        send("driver_status_update", notif);
      };

      notificationEmitter.on("new_order", onOrder);
      notificationEmitter.on("driver_status_update", onDriverUpdate);

      req.signal.addEventListener("abort", () => {
        notificationEmitter.off("new_order", onOrder);
        notificationEmitter.off("driver_status_update", onDriverUpdate);
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
