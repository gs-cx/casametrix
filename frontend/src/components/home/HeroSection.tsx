import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 lg:flex-row lg:items-center lg:px-8 lg:pb-20 lg:pt-16">
        {/* Colonne texte */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
            Plateforme d’intelligence d’adresse
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            L’information immobilière simplifiée
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Casametrix unifie DVF, DPE, cadastre, GPS et scoring pour
            constituer un golden index d’adresses. Une API sécurisée et une
            interface web permettent à vos équipes immobilières, à vos
            investisseurs et à vos asset managers de travailler sur une donnée
            fiable, enrichie et actionnable.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/search"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Tester la recherche d’adresse
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Voir les tarifs
            </Link>
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            Données DVF et DPE issues des sources publiques, consolidées dans
            un golden index multi-adresses pensé pour l’usage professionnel.
          </p>
        </div>

        {/* Colonne droite – encarts explicatifs */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Golden index Casametrix
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Chaque adresse cliquée dans le moteur de recherche est enregistrée
              dans une table PostgreSQL{" "}
              <code className="rounded bg-slate-900 px-1 py-px text-[11px] text-slate-50">
                public.addresses
              </code>
              . Ce &quot;golden index&quot; permet d&apos;identifier les zones
              d&apos;intérêt, de prioriser les analyses et de construire des
              scores sur mesure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              API &amp; sécurité
            </p>
            <p className="mt-2 text-sm text-slate-700">
              L’API Casametrix est sécurisée par JWT et pensée pour une
              intégration simple dans vos outils internes, applications métiers
              ou plateformes d’investissement. Le multi-tenant via PostgreSQL
              RLS est prévu pour isoler les données par organisation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
