import React from "react";

export type MapPanelProps = {
  savedAddress?: {
    address: string;
    postal_code?: string;
    city?: string;
    lat?: number;
    lng?: number;
  } | null;
  gpsPosition?: {
    lat: number;
    lng: number;
  } | null;
};

/**
 * Panneau de carte (placeholder pour l’instant).
 *
 * On garde ce composant séparé pour pouvoir brancher facilement Leaflet
 * ou une autre librairie plus tard, sans impacter la page de recherche.
 */
const MapPanel: React.FC<MapPanelProps> = ({ savedAddress, gpsPosition }) => {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Visualisation
      </p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">Carte à venir</h2>
      <p className="mt-2 text-sm text-slate-600">
        La prochaine version de Casametrix affichera ici une carte interactive
        permettant de visualiser l&apos;adresse sélectionnée et votre position.
      </p>

      {savedAddress && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
          <p className="font-semibold">Adresse sélectionnée :</p>
          <p className="mt-1">
            {savedAddress.address} {savedAddress.postal_code} {savedAddress.city}
          </p>
          {typeof savedAddress.lat === "number" &&
            typeof savedAddress.lng === "number" && (
              <p className="mt-1 text-[11px] text-slate-600">
                lat {savedAddress.lat.toFixed(5)}, lng{" "}
                {savedAddress.lng.toFixed(5)}
              </p>
            )}
        </div>
      )}

      {gpsPosition && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
          <p className="font-semibold">Votre position :</p>
          <p className="mt-1">
            lat {gpsPosition.lat.toFixed(5)}, lng {gpsPosition.lng.toFixed(5)}
          </p>
        </div>
      )}
    </section>
  );
};

export default MapPanel;
