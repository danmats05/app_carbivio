"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface MapDisplayProps {
  location: Location | null;
  className?: string;
}

export function MapDisplay({ location, className = "" }: MapDisplayProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Charger la carte Leaflet (plus léger que Google Maps pour le développement)
    const loadMap = () => {
      if (typeof window !== "undefined" && !window.L) {
        // Charger Leaflet depuis CDN
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => {
          setMapLoaded(true);
          initializeMap();
        };
        script.onerror = () => {
          setMapError(true);
        };
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      if (location && typeof window !== "undefined" && window.L) {
        const mapElement = document.getElementById("map");
        if (mapElement && !mapElement._leaflet_map) {
          // Centrer sur le Sénégal (Dakar) par défaut si pas de localisation
          const defaultCenter = location
            ? [location.latitude, location.longitude]
            : [14.6928, 17.4467]; // Dakar
          const defaultZoom = location ? 15 : 11; // Zoom pays pour Sénégal

          const map = window.L.map("map").setView(defaultCenter, defaultZoom);

          window.L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution: "© OpenStreetMap contributors",
              maxZoom: 19,
            },
          ).addTo(map);

          // Marqueur pour la position du client
          const marker = window.L.marker([
            location.latitude,
            location.longitude,
          ])
            .addTo(map)
            .bindPopup(`<b>Votre position</b><br>${location.address}`);

          // Ajouter des points de repère au Sénégal
          const senegalPoints = [
            {
              name: "Dakar",
              coords: [14.6928, 17.4467],
              popup: "Dakar - Capitale",
            },
            { name: "Thiès", coords: [14.7645, 16.9256], popup: "Thiès" },
            { name: "Kaolack", coords: [14.1463, 16.0735], popup: "Kaolack" },
            {
              name: "Saint-Louis",
              coords: [16.0179, 16.4896],
              popup: "Saint-Louis",
            },
            { name: "Mbour", coords: [14.6588, 16.4591], popup: "Mbour" },
          ];

          // Ajouter les marqueurs pour les villes sénégalaises
          senegalPoints.forEach((point) => {
            const cityMarker = window.L.marker(point.coords)
              .addTo(map)
              .bindPopup(`<b>${point.name}</b><br>${point.popup}`);
          });

          // Stocker la référence pour éviter les doublons
          mapElement._leaflet_map = map;
        }
      }
    };

    if (location) {
      loadMap();
    }
  }, [location]);

  if (!location) {
    return (
      <div
        className={`rounded-2xl bg-[#231304] border border-white/5 p-8 text-center ${className}`}
      >
        <MapPin className="w-8 h-8 text-[#eca226] mx-auto mb-4" />
        <p className="text-white/40 text-sm">Votre position apparaîtra ici</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div
        className={`rounded-2xl bg-[#231304] border border-white/5 p-8 text-center ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-xs">!</span>
        </div>
        <p className="text-white/40 text-sm">
          Erreur de chargement de la carte
        </p>
        <p className="text-white/20 text-xs mt-2">
          Vérifiez votre connexion internet
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-[#231304] border border-white/5 overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <MapPin className="w-5 h-5 text-[#eca226]" />
        <div>
          <p className="text-white font-heuvel font-medium text-sm">
            Votre localisation
          </p>
          <p className="text-white/60 text-xs font-idgrotesk">
            {location.address}
          </p>
        </div>
        <button
          onClick={() => {
            if (location) {
              const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
              window.open(url, "_blank");
            }
          }}
          className="ml-auto p-2 rounded-lg bg-[#eca226]/10 hover:bg-[#eca226]/20 transition-colors"
        >
          <Navigation className="w-4 h-4 text-[#eca226]" />
        </button>
      </div>

      <div
        id="map"
        className="h-64 bg-[#1a1a1a] relative"
        style={{ minHeight: "256px" }}
      >
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full border-2 border-[#eca226]/30 border-t-[#eca226] w-6 h-6"></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        {/* Légende des villes */}
        <div className="p-3 rounded-lg bg-[#eca226]/5 border border-[#eca226]/20">
          <p className="text-white font-heuvel font-medium text-sm">
            Villes principales du Sénégal
          </p>
          <div className="space-y-1 text-xs text-white/60 font-heuvel">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="font-heuvel">Dakar - Capitale</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-heuvel">
                Thiès, Kaolack, Saint-Louis, Mbour
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
