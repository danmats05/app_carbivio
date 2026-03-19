import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createRequest } from "@/services/requests";

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
