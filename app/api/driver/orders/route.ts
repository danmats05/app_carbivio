import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { getDriverRequests } from "@/services/requests";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "DRIVER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getDriverRequests(session.id as string);
  return NextResponse.json(orders);
}
