// src/pages/BlogPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";

const BlogPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Blog - Casametrix" description="Articles pour comprendre comment utiliser Casametrix dans vos décisions immobilières : recherche d’adresse, golden index, exploitation DVF/DPE/ESG." path="/blog" />

      <main className="min-h-screen bg-slate-50 pb-16">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Blog Casametrix
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Cas d’usage, exemples concrets, retours terrain.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
              Le blog Casametrix illustre comment transformer une simple adresse
              en décision immobilière utile : acquisition, arbitrage, travaux,
              ESG, valorisation.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl px-4 grid gap-6 md:grid-cols-3">
          {/* Article 1 */}
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Cas d’usage
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Comment unifier les adresses utilisées par vos équipes ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Quand chaque équipe a son propre fichier Excel, l’adresse devient
              un casse-tête : doublons, incohérences, oublis. Casametrix aide à
              structurer un index unique et partagé.
            </p>
            <div className="mt-4">
              <Link
                to="/demo"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Lire le scénario dans la démo
              </Link>
            </div>
          </article>

          {/* Article 2 */}
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              DVF & DPE
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              De la transaction brute à la compréhension du patrimoine.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              La donnée DVF brute est puissante mais difficile à exploiter au
              quotidien. Casametrix projette ces informations sur des adresses
              claires, utilisables par vos équipes métiers.
            </p>
            <div className="mt-4">
              <Link
                to="/search"
                className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Tester une adresse
              </Link>
            </div>
          </article>

          {/* Article 3 */}
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              ESG & risques
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              Préparer vos décisions ESG adresse par adresse.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Comprendre l’exposition d’une adresse aux risques physiques,
              réglementaires et de marché devient clé. Casametrix prépare cette
              vision à partir de votre golden index.
            </p>
            <div className="mt-4">
              <Link
                to="/roadmap"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Voir la roadmap ESG
              </Link>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
