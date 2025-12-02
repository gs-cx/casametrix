import React from "react";

export const UseCasesSection: React.FC = () => {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          Cas d’usage concrets
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Casametrix s’intègre dans vos processus existants pour fiabiliser les
          décisions au niveau de l’adresse.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <article className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-slate-900">
              Prospection foncière ciblée
            </h3>
            <p className="mt-2 text-sm text-slate-600 flex-1">
              Identifiez les adresses qui cumulent potentiel de valorisation,
              pression du marché et signaux DVF favorables. Filtrez par
              typologie, surface, tension locative, DDR et profil DPE pour
              orienter vos équipes sur les meilleurs secteurs.
            </p>
          </article>

          <article className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-slate-900">
              Priorisation des travaux &amp; DPE
            </h3>
            <p className="mt-2 text-sm text-slate-600 flex-1">
              Croisez les consommations énergétiques, les classes DPE et le
              contexte local pour prioriser les travaux de rénovation. Ciblez
              les adresses les plus pénalisantes et suivez l’impact sur vos
              portefeuilles.
            </p>
          </article>

          <article className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-slate-900">
              Qualification de leads travaux
            </h3>
            <p className="mt-2 text-sm text-slate-600 flex-1">
              Relié à vos entrants (formulaires, campagnes, marketplaces),
              Casametrix enrichit les adresses et calcule un score d’intention
              travaux pour concentrer vos équipes sur les dossiers à forte
              probabilité de conversion.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
