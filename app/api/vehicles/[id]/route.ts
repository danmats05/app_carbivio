import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Vérifier si le véhicule existe
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: "Véhicule non trouvé" },
        { status: 404 },
      );
    }

    // Supprimer le véhicule
    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Véhicule supprimé avec succès" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du véhicule" },
      { status: 500 },
    );
  }
}
