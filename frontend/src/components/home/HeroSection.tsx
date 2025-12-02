import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="border-b border-slate-100 bg-slate-50/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
        {/* Colonne gauche : texte + CTA */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
            Plateforme d’intelligence d’adresse
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            L’information immobilière simplifiée
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            Casametrix unifie DVF, DPE, cadastre, GPS et scoring pour
            constituer un golden index d’adresses. Une API sécurisée et une
            interface web permettent à vos équipes immobilières, aux
            investisseurs et aux asset managers de travailler sur une donnée
            fiable, enrichie et actionnable.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/search"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Tester la recherche d’adresse
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Voir les tarifs
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Données DVF et DPE issues des sources publiques, consolidées dans un
            golden index multi-adresses pensé pour l’usage professionnel.
          </p>
        </div>

        {/* Colonne droite : encart d’explication (identique à ce que tu as déjà) */}
        <div className="flex-1 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Golden index Casametrix
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Chaque adresse cliquée dans le moteur de recherche est enregistrée
              dans une table PostgreSQL{" "}
              <code className="rounded bg-slate-100 px-1 py-px text-[11px]">
                public.addresses
              </code>
              . Ce “golden index” permet d’identifier les zones d’intérêt, de
              prioriser les analyses et de construire des scores sur mesure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
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

      {/* Bandeau roadmap (inchangé dans l’esprit) */}
      <div className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Roadmap
          </p>
          <p className="mt-2 text-sm text-slate-700">
            À venir : PropertyRecord complet (DVF + DPE + cadastre), scoring
            ESG, requêtes immobilières naturelles via LLM et dashboards
            d’analyses territoriales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
