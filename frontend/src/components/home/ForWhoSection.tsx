import React from "react";

export const ForWhoSection: React.FC = () => {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          Pour quels acteurs ?
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Casametrix adresse les besoins des acteurs de la chaîne immobilière,
          de la prospection à l’exploitation d’un parc.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Promoteurs &amp; foncières
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Qualification foncière accélérée, ciblage d’adresses à fort
              potentiel, documentation des décisions pour les comités
              d’investissement.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Réseaux de travaux &amp; rénovation
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Ciblage DPE, priorisation des chantiers, scoring de leads travaux
              pour concentrer vos équipes sur les projets les plus porteurs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Collectivités &amp; bureaux d’études
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Cartographie patrimoniale, analyse de parc, ciblage de programmes
              d’amélioration énergétique ou de requalification urbaine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
