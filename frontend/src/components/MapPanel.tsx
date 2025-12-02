import React, { useEffect, useRef } from "react";
import L, { LatLngExpression, Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

type MapPanelProps = {
  selectedAddress?: {
    lat?: number;
    lng?: number;
    label?: string;
  } | null;
  gpsPosition?: { lat: number; lng: number } | null;
};

/**
 * Petit wrapper Leaflet "vanilla" pour afficher :
 * - un marqueur sur l’adresse enregistrée (selectedAddress)
 * - un marqueur sur la position GPS (gpsPosition)
 */
const MapPanel: React.FC<MapPanelProps> = ({ selectedAddress, gpsPosition }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const addressMarkerRef = useRef<LeafletMarker | null>(null);
  const gpsMarkerRef = useRef<LeafletMarker | null>(null);

  // Icône par défaut pour éviter le bug des images manquantes
  useEffect(() => {
    const defaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // @ts-expect-error – surcharge globale acceptable ici
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  // Initialisation de la carte
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const initialCenter: LatLngExpression = [46.6, 2.4]; // centre France
    const map = L.map(containerRef.current).setView(initialCenter, 5.5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Mise à jour des marqueurs lorsqu’on reçoit une adresse ou une position GPS
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // --- Marqueur adresse BAN enregistrée ---
    if (
      selectedAddress &&
      typeof selectedAddress.lat === "number" &&
      typeof selectedAddress.lng === "number"
    ) {
      const pos: LatLngExpression = [selectedAddress.lat, selectedAddress.lng];

      if (!addressMarkerRef.current) {
        addressMarkerRef.current = L.marker(pos).addTo(map);
      } else {
        addressMarkerRef.current.setLatLng(pos);
      }

      addressMarkerRef.current.bindPopup(
        selectedAddress.label || "Adresse enregistrée dans le golden index",
      );
    } else if (addressMarkerRef.current) {
      map.removeLayer(addressMarkerRef.current);
      addressMarkerRef.current = null;
    }

    // --- Marqueur position GPS ---
    if (gpsPosition && typeof gpsPosition.lat === "number" && typeof gpsPosition.lng === "number") {
      const pos: LatLngExpression = [gpsPosition.lat, gpsPosition.lng];

      if (!gpsMarkerRef.current) {
        gpsMarkerRef.current = L.marker(pos).addTo(map);
      } else {
        gpsMarkerRef.current.setLatLng(pos);
      }

      gpsMarkerRef.current.bindPopup("Votre position");
    } else if (gpsMarkerRef.current) {
      map.removeLayer(gpsMarkerRef.current);
      gpsMarkerRef.current = null;
    }

    // --- Ajustement du zoom / vue ---
    const points: LatLngExpression[] = [];
    if (addressMarkerRef.current) {
      points.push(addressMarkerRef.current.getLatLng());
    }
    if (gpsMarkerRef.current) {
      points.push(gpsMarkerRef.current.getLatLng());
    }

    if (points.length === 1) {
      map.setView(points[0], 15);
    } else if (points.length === 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [selectedAddress, gpsPosition]);

  return (
    <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-200">
      <div className="h-[320px] w-full" ref={containerRef} />
    </div>
  );
};

export default MapPanel;
