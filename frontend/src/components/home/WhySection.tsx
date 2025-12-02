import React from "react";

export const WhySection: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          Pourquoi Casametrix ?
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          La plateforme est pensée pour les acteurs qui travaillent à l’adresse :
          prospecteurs, foncières, réseaux de travaux, collectivités, bureaux
          d’études…
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Vision unifiée de l’adresse
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Regroupez DVF, DPE, cadastre, contexte local et coordonnées GPS
              dans une seule fiche adresse.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Aide à la décision opérationnelle
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Scorez les adresses, priorisez les travaux, identifiez les zones
              de tension et les poches d’opportunités.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              API & outils métier
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Connectez Casametrix à vos CRM, outils no-code et workflows
              internes via des APIs documentées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
