"use client";

import { useState } from "react";

export type PeriodType = "today" | "7d" | "30d" | "90d";

export interface ChartData {
  date: string;
  livraisons: number;
  volume: number;
}

const generateDataForPeriod = (period: PeriodType): ChartData[] => {
  const today = new Date();
  let data: ChartData[] = [];
  let days = 0;
  let labels: string[] = [];

  switch (period) {
    case "today":
      days = 1;
      labels = ["Aujourd'hui"];
      break;
    case "7d":
      days = 7;
      labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
      break;
    case "30d":
      days = 30;
      labels = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (29 - i));
        return date.getDate().toString();
      });
      break;
    case "90d":
      days = 90;
      labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(today);
        date.setMonth(today.getMonth() - (11 - i));
        return date.toLocaleDateString("fr-FR", { month: "short" });
      });
      break;
    default:
      days = 7;
      labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  }

  // Générer des données réalistes selon la période
  for (let i = 0; i < days; i++) {
    const baseLivraisons = period === "today" ? 45 : 40;
    const baseVolume = period === "today" ? 65000 : 55000;

    const variation = Math.sin(i * 0.5) * 15 + Math.random() * 20 - 10;
    const livraisons = Math.max(10, Math.round(baseLivraisons + variation));
    const volume = Math.max(10000, Math.round(baseVolume + variation * 1000));

    data.push({
      date: labels[i] || `Jour ${i + 1}`,
      livraisons,
      volume,
    });
  }

  // Pour 90 jours, agréger par mois
  if (period === "90d") {
    const monthlyData: ChartData[] = [];
    for (let i = 0; i < 12; i++) {
      const startIndex = i * 7.5; // ~7-8 jours par mois
      const endIndex = Math.min(startIndex + 8, data.length);
      const monthData = data.slice(
        Math.floor(startIndex),
        Math.floor(endIndex),
      );

      if (monthData.length > 0) {
        const totalLivraisons = monthData.reduce(
          (sum, d) => sum + d.livraisons,
          0,
        );
        const totalVolume = monthData.reduce((sum, d) => sum + d.volume, 0);

        monthlyData.push({
          date: labels[i],
          livraisons: Math.round(totalLivraisons / monthData.length),
          volume: Math.round(totalVolume / monthData.length),
        });
      }
    }
    data = monthlyData;
  }

  return data;
};

export function usePeriodData(initialPeriod: PeriodType = "7d") {
  const [period, setPeriod] = useState<PeriodType>(initialPeriod);
  const [data, setData] = useState<ChartData[]>(() => {
    const initialData = generateDataForPeriod(initialPeriod);
    console.log(
      "usePeriodData - Initialisation avec:",
      initialPeriod,
      initialData,
    );
    return initialData;
  });

  const updatePeriod = (newPeriod: PeriodType) => {
    console.log("usePeriodData - updatePeriod appelé avec:", newPeriod);
    const newData = generateDataForPeriod(newPeriod);
    console.log("usePeriodData - Nouvelles données générées:", newData);
    setPeriod(newPeriod);
    setData(newData);
    console.log(`Données mises à jour pour la période: ${newPeriod}`, newData);
  };

  return {
    period,
    data,
    updatePeriod,
  };
}
