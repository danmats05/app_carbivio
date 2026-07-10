import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stockItems = await prisma.stockItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(stockItems);
  } catch (error) {
    console.error("Error fetching stock items:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock items" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newStockItem = await prisma.stockItem.create({
      data: {
        name: body.name,
        category: body.category,
        quantity: body.quantity,
        unit: body.unit,
        unitPrice: body.unitPrice,
        totalValue: body.quantity * body.unitPrice,
        supplier: body.supplier,
        receivedDate: new Date(body.receivedDate),
        location: body.location,
        status: "AVAILABLE",
      },
    });

    return NextResponse.json(newStockItem, { status: 201 });
  } catch (error) {
    console.error("Error creating stock item:", error);
    return NextResponse.json(
      { error: "Failed to create stock item" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedStockItem = await prisma.stockItem.update({
      where: { id },
      data: {
        ...updateData,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json(updatedStockItem);
  } catch (error) {
    console.error("Error updating stock item:", error);
    return NextResponse.json(
      { error: "Failed to update stock item" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Stock item ID is required" },
        { status: 400 },
      );
    }

    await prisma.stockItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Stock item deleted successfully" });
  } catch (error) {
    console.error("Error deleting stock item:", error);
    return NextResponse.json(
      { error: "Failed to delete stock item" },
      { status: 500 },
    );
  }
}
