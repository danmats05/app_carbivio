import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Mapper les statuts de la base de données vers le format frontend
    const mappedVehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      statut: vehicle.statut.toLowerCase().replace("_", "-"),
    }));

    return NextResponse.json(mappedVehicles);
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des véhicules" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      plaque,
      modele,
      chauffeur,
      statut,
      localisation,
      carburant,
      dernierEntretien,
      prochainEntretien,
    } = body;

    // Validation des champs requis
    if (!plaque || !modele || !chauffeur) {
      return NextResponse.json(
        { error: "Les champs plaque, modele et chauffeur sont requis" },
        { status: 400 },
      );
    }

    // Vérifier si la plaque existe déjà
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { plaque },
    });

    if (existingVehicle) {
      return NextResponse.json(
        { error: "Un véhicule avec cette plaque existe déjà" },
        { status: 409 },
      );
    }

    // Mapper le statut du frontend vers la base de données
    const mappedStatus = statut.toUpperCase().replace("-", "_");

    const vehicle = await prisma.vehicle.create({
      data: {
        plaque,
        modele,
        chauffeur,
        statut: mappedStatus as
          | "EN_ROUTE"
          | "DISPONIBLE"
          | "MAINTENANCE"
          | "HORS_SERVICE",
        localisation: localisation || "Dakar",
        carburant: carburant || 100,
        dernierEntretien: dernierEntretien ? new Date(dernierEntretien) : null,
        prochainEntretien: prochainEntretien
          ? new Date(prochainEntretien)
          : null,
      },
    });

    // Retourner le véhicule avec le statut mappé pour le frontend
    const responseVehicle = {
      ...vehicle,
      statut: vehicle.statut.toLowerCase().replace("_", "-"),
    };

    return NextResponse.json(responseVehicle, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du véhicule:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du véhicule" },
      { status: 500 },
    );
  }
}
