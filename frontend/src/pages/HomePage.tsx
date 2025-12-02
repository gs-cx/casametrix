import React from "react";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="px-6 py-12 max-w-6xl mx-auto">

        {/* --- SECTION TITRE --- */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            L'information immobilière simplifiée
          </h1>

          <p className="text-lg text-gray-700 mb-4 max-w-3xl">
            Casametrix unifie DVF, DPE, cadastre, GPS et scoring pour constituer un golden index
            d’adresses. Une API sécurisée et une interface web permettent aux équipes immobilières,
            aux investisseurs et aux asset managers de travailler sur une donnée fiable, enrichie et
            actionnable.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="/search"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Tester la recherche d’adresse
            </a>

            <a
              href="/pricing"
              className="px-6 py-3 rounded-lg border border-gray-400 text-gray-800 font-medium hover:bg-gray-100"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Données DVF et DPE issues des sources publiques, consolidées dans un golden index multi-adresses pensé pour l’usage professionnel.
          </p>
        </section>

        {/* --- GOLDEN INDEX --- */}
        <section className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="p-6 bg-gray-50 border rounded-xl">
            <h2 className="text-lg font-semibold mb-4">
              Golden Index Casametrix
            </h2>
            <p className="text-gray-700">
              Chaque adresse cliquée dans le moteur de recherche est enregistrée dans une table
              PostgreSQL <code>public.addresses</code>. Ce “golden index” permet d’identifier les zones
              d’intérêt, de prioriser les analyses et de construire des scores sur mesure.
            </p>
          </div>

          <div className="p-6 bg-gray-50 border rounded-xl">
            <h2 className="text-lg font-semibold mb-4">
              API & Sécurité
            </h2>
            <p className="text-gray-700">
              L’API Casametrix est sécurisée par JWT et pensée pour une intégration simple dans vos outils
              internes, applications métiers ou plateformes d’investissement. Le multi-tenant via PostgreSQL
              RLS isole les données par organisation.
            </p>
          </div>
        </section>

        {/* --- ROADMAP --- */}
        <section className="mt-16 p-6 border bg-gray-50 rounded-xl">
          <h2 className="text-sm tracking-wide font-semibold text-gray-500">ROADMAP</h2>
          <p className="text-gray-700 mt-2">
            À venir : PropertyRecord complet (DVF + DPE + cadastre), scoring ESG, requêtes immobilières
            naturelles via LLM et dashboards d’analyses territoriales.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/about"
              className="px-6 py-2 rounded-lg border border-gray-400 text-gray-800 font-medium hover:bg-gray-100"
            >
              En savoir plus
            </a>

            <a
              href="/register"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Créer un compte Casametrix
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
