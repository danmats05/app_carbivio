"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface DriverMapProps {
  clientLat: number;
  clientLng: number;
  clientAddress: string;
}

export function DriverMap({ clientLat, clientLng, clientAddress }: DriverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [driverPos, setDriverPos] = useState<{ lat: number; lng: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Import dynamique pour éviter les erreurs SSR
    import("leaflet").then((L) => {
      // Fix icônes Leaflet en Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, { zoomControl: true }).setView([clientLat, clientLng], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Force le recalcul des dimensions après rendu DOM
      setTimeout(() => map.invalidateSize(), 300);

      // Marqueur client (orange)
      const clientIcon = L.divIcon({
        html: `<div style="background:#eca226;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
        className: "",
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([clientLat, clientLng], { icon: clientIcon })
        .addTo(map)
        .bindPopup(`<b>Client</b><br>${clientAddress}`)
        .openPopup();

      // Géolocalisation du chauffeur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const dLat = pos.coords.latitude;
            const dLng = pos.coords.longitude;
            setDriverPos({ lat: dLat, lng: dLng });

            // Marqueur chauffeur (bleu)
            const driverIcon = L.divIcon({
              html: `<div style="background:#3b82f6;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
              className: "",
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });

            L.marker([dLat, dLng], { icon: driverIcon })
              .addTo(map)
              .bindPopup("<b>Votre position</b>");

            // Ajuster la vue pour voir les deux marqueurs
            const bounds = L.latLngBounds([[dLat, dLng], [clientLat, clientLng]]);
            map.fitBounds(bounds, { padding: [50, 50] });

            // Calculer l'itinéraire via OSRM
            try {
              const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${dLng},${dLat};${clientLng},${clientLat}?geometries=geojson&overview=full`;
              const res = await fetch(osrmUrl);
              const data = await res.json();

              if (data.routes?.length > 0) {
                const route = data.routes[0];
                const coords: [number, number][] = route.geometry.coordinates.map(
                  ([lng, lat]: [number, number]) => [lat, lng]
                );

                L.polyline(coords, {
                  color: "#eca226",
                  weight: 4,
                  opacity: 0.85,
                }).addTo(map);

                const distKm = (route.distance / 1000).toFixed(1);
                const durMin = Math.ceil(route.duration / 60);
                setRouteInfo({ distance: `${distKm} km`, duration: `${durMin} min` });
              }
            } catch {
              // Route non disponible, on garde juste les marqueurs
            }
          },
          () => setError("Activez la géolocalisation pour voir votre position"),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      }
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [clientLat, clientLng, clientAddress]);

  return (
    <div className="space-y-3">
      {/* Info trajet */}
      {routeInfo && (
        <div className="flex items-center gap-4 px-4 py-2.5 bg-[#eca226]/10 border border-[#eca226]/20 rounded-xl">
          <Navigation className="w-4 h-4 text-[#eca226] shrink-0" />
          <span className="text-white/80 text-sm">
            Trajet estimé :&nbsp;
            <span className="text-[#eca226] font-semibold numbers-idgrotesk">{routeInfo.distance}</span>
            &nbsp;—&nbsp;
            <span className="text-[#eca226] font-semibold numbers-idgrotesk">{routeInfo.duration}</span>
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-sm">
          <MapPin className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Légende */}
      <div className="flex items-center gap-5 text-xs text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
          Votre position
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#eca226] inline-block" />
          Client
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-1 rounded bg-[#eca226]/70 inline-block" />
          Itinéraire
        </span>
      </div>

      {/* Carte */}
      <div
        ref={mapRef}
        className="w-full rounded-xl overflow-hidden border border-white/10"
        style={{ height: "480px", minWidth: "100%" }}
      />
    </div>
  );
}
