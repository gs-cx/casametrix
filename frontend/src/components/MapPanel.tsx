import React from "react";

type MapPanelProps = {
  selectedAddressLabel?: string;
  position?: { lat: number; lng: number } | null;
};

const MapPanel: React.FC<MapPanelProps> = ({ selectedAddressLabel, position }) => {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Visualisation
      </p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">
        Carte à venir
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        La prochaine version de Casametrix affichera ici une carte interactive
        (fond OpenStreetMap) permettant de visualiser l’adresse sélectionnée et
        votre position. Pour l’instant, la priorité est donnée à la qualité du
        moteur d’adresse et à la gestion des quotas invités / comptes connectés.
      </p>

      {selectedAddressLabel && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
          <p className="font-semibold">Adresse sélectionnée :</p>
          <p className="mt-1">{selectedAddressLabel}</p>
        </div>
      )}

      {position && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
          <p className="font-semibold">Votre position :</p>
          <p className="mt-1">
            lat {position.lat.toFixed(5)}, lng {position.lng.toFixed(5)}
          </p>
        </div>
      )}
    </section>
  );
};

export default MapPanel;
