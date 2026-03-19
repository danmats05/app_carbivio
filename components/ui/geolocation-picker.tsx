"use client";

import { useState, useEffect } from "react";
import { MapPin, Loader2, Crosshair } from "lucide-react";
import { toast } from "sonner";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface GeolocationPickerProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

export function GeolocationPicker({
  onLocationSelect,
  initialLocation,
}: GeolocationPickerProps) {
  const [location, setLocation] = useState<Location | null>(
    initialLocation || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(initialLocation?.address || "");

  // Obtenir la position automatiquement
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        "La géolocalisation n'est pas supportée par votre navigateur",
      );
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Obtenir l'adresse à partir des coordonnées (reverse geocoding)
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`,
          );
          const data = await response.json();

          const formattedAddress =
            data.display_name ||
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

          const newLocation = {
            latitude,
            longitude,
            address: formattedAddress,
          };

          setLocation(newLocation);
          setAddress(formattedAddress);
          onLocationSelect(newLocation);
          toast.success("Position détectée automatiquement !");
        } catch (error) {
          // Fallback : utiliser les coordonnées si l'API échoue
          const fallbackLocation = {
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          };

          setLocation(fallbackLocation);
          setAddress(fallbackLocation.address);
          onLocationSelect(fallbackLocation);
          toast.success("Position GPS obtenue !");
        }

        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Accès à la géolocalisation refusé");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Position indisponible");
            break;
          case error.TIMEOUT:
            toast.error("Délai d'attente dépassé");
            break;
          default:
            toast.error("Erreur de géolocalisation");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    );
  };

  // Mettre à jour l'adresse manuellement
  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    if (location) {
      const updatedLocation = { ...location, address: newAddress };
      setLocation(updatedLocation);
      onLocationSelect(updatedLocation);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 text-[#eca226]" />
        <label className="block text-sm font-medium text-white font-heuvel">
          Votre localisation
        </label>
      </div>

      {/* Bouton de détection automatique */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#eca226]/10 border border-[#eca226]/30 text-[#eca226] hover:bg-[#eca226]/20 transition-all duration-200 disabled:opacity-50 font-heuvel"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Crosshair className="w-4 h-4" />
          )}
          {isLoading ? "Détection..." : "Me localiser automatiquement"}
        </button>
      </div>

      {/* Champ d'adresse */}
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Entrez votre adresse ou laissez-nous vous localiser..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all numbers-idgrotesk"
        />
      </div>

      {/* Affichage de la position si détectée */}
      {location && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#eca226]/5 border border-[#eca226]/20">
          <MapPin className="w-4 h-4 text-[#eca226]" />
          <div className="flex-1">
            <p className="text-xs text-[#eca226] font-medium font-heuvel">
              Position détectée
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-white/40 font-heuvel">
        <p>• Cliquez sur "Me localiser" pour une détection automatique</p>
        <p>• Ou entrez manuellement votre adresse complète</p>
        <p>
          • Votre position nous aidera à assigner le technicien le plus proche
        </p>
      </div>
    </div>
  );
}
