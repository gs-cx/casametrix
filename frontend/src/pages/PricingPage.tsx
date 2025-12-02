// src/pages/PricingPage.tsx
import React from "react";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";

const PricingPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Tarifs - Casametrix" description="Découvrez les plans Casametrix pour vos équipes immobilières : démarrer simplement avec la recherche d’adresse, puis évoluer vers un index d’adresses golden data." path="/pricing" />

      <main className="min-h-screen bg-slate-50 pb-16">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Tarification
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Une grille simple pour démarrer, évoluer, scaler.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
              Casametrix est conçu pour démarrer par la recherche d’adresse, puis
              étendre progressivement votre usage : index d’adresses golden data,
              intégration DVF/DPE, API, scoring et ESG.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl px-4 grid gap-6 md:grid-cols-3">
          {/* Découverte */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Découverte
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Test adresse
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Idéal pour tester la recherche d’adresse et comprendre le potentiel
              du golden index Casametrix.
            </p>

            <p className="mt-4 text-3xl font-semibold text-slate-900">Gratuit</p>
            <p className="text-xs text-slate-500">
              3 recherches / jour / IP, sans carte bancaire.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Accès à la recherche d’adresse publique</li>
              <li>• Suggestions BAN en temps réel</li>
              <li>• Visualisation sur la carte</li>
            </ul>

            <div className="mt-6">
              <Link
                to="/search"
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Tester une adresse
              </Link>
            </div>
          </div>

          {/* Équipe */}
          <div className="flex flex-col rounded-2xl border border-sky-300 bg-sky-50/60 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Équipe
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Golden index
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Pour les équipes qui souhaitent structurer un index d’adresses
              commun, partagé entre investissement, patrimoine et travaux.
            </p>

            <p className="mt-4 text-3xl font-semibold text-slate-900">
              Sur devis
            </p>
            <p className="text-xs text-slate-500">
              En fonction du volume d’adresses et des besoins d’intégration.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Golden index d’adresses unifié</li>
              <li>• Historique des sélections et recherches</li>
              <li>• Multi-utilisateurs, accès sécurisés</li>
              <li>• Préparation DVF, DPE, cadastre</li>
            </ul>

            <div className="mt-6">
              <Link
                to="/support"
                className="inline-flex w-full items-center justify-center rounded-full border border-sky-300 bg-white px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50"
              >
                Discuter de votre cas d’usage
              </Link>
            </div>
          </div>

          {/* API / Data */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              API & Data
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Intégration avancée
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Pour les équipes produit, data et IT qui souhaitent connecter
              Casametrix à leurs outils internes.
            </p>

            <p className="mt-4 text-3xl font-semibold text-slate-900">
              Sur devis
            </p>
            <p className="text-xs text-slate-500">
              Selon les volumes, SLA et cas d’usage.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Accès API sécurisé par JWT</li>
              <li>• Endpoints de recherche et golden index</li>
              <li>• Intégration dans vos outils internes</li>
              <li>• Roadmap ESG, scoring, DVF/DPE.</li>
            </ul>

            <div className="mt-6">
              <Link
                to="/api-docs"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Consulter la documentation API
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PricingPage;
