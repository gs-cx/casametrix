import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  lat: number;
  lng: number;
  label: string;
}

const MapView: React.FC<MapViewProps> = ({ lat, lng, label }) => {
  useEffect(() => {
    const map = L.map("cmx-map").setView([lat, lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup(label).openPopup();

    return () => {
      map.remove();
    };
  }, [lat, lng, label]);

  return (
    <div
      id="cmx-map"
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default MapView;
