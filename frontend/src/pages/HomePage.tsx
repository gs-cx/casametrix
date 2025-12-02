import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        {/* Hero principal */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Plateforme d’intelligence d’adresse
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              Golden data immobilière pour les décideurs B2B
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-600">
              Casametrix unifie DVF, DPE, cadastre, GPS et scoring pour
              constituer un golden index d’adresses. Une API sécurisée et une
              interface web permettent aux équipes immobilières, aux
              investisseurs et aux asset managers de travailler sur une donnée
              fiable, enrichie et actionnable.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/search"
                className="inline-flex items-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Tester la recherche d’adresse
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Voir les tarifs
              </Link>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Données DVF et DPE issues des sources publiques, consolidées
              dans un golden index multi-adresses pensé pour l’usage
              professionnel.
            </p>
          </div>

          {/* Petit encart “golden index” */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Golden index Casametrix
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Chaque adresse cliquée dans le moteur de recherche est
                enregistrée dans une table PostgreSQL{" "}
                <code className="rounded bg-slate-100 px-1 py-px text-[11px]">
                  public.addresses
                </code>
                . Ce “golden index” permet d’identifier les zones d’intérêt,
                de prioriser les analyses et de construire des scores sur
                mesure.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                API & sécurité
              </p>
              <p className="mt-2 text-sm text-slate-700">
                L’API Casametrix est sécurisée par JWT et pensée pour une
                intégration simple dans vos outils internes, applications
                métiers ou plateformes d’investissement. Le multi-tenant via
                PostgreSQL RLS est prévu pour isoler les données par
                organisation.
              </p>
            </div>
          </div>
        </section>

        {/* Bandeau d’accroche secondaire */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Roadmap
              </p>
              <p className="mt-1 text-sm text-slate-700">
                À venir : PropertyRecord complet (DVF + DPE + cadastre),
                scoring ESG, requêtes immobilières naturelles via LLM et
                dashboards d’analyses territoriales.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/faq"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
              >
                En savoir plus
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Créer un compte Casametrix
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
