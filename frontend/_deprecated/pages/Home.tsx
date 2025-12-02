import React from "react";
import { Link } from "react-router-dom";

type Article = {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
};

const ARTICLES: Article[] = [
  {
    tag: "Prospection ciblée",
    date: "10/09/2025",
    title: "Optimiser la prospection immobilière avec Casametrix",
    excerpt:
      "Réduisez le temps de qualification d’une adresse en unifiant cadastre, DPE, annonces et historique de transactions.",
  },
  {
    tag: "Analyse DPE",
    date: "06/09/2025",
    title: "RGE & DPE : anticiper les risques et prioriser les actions",
    excerpt:
      "Scorer votre parc, identifiez les adresses les plus pénalisantes et priorisez les travaux à engager.",
  },
  {
    tag: "API & géoloc",
    date: "01/09/2025",
    title: "API géo & coordonnées GPS : cas d’usage avancés",
    excerpt:
      "Du géocodage inverse à la complétion automatique, l’API Casametrix alimente vos outils internes et vos CRM.",
  },
  {
    tag: "Filière travaux",
    date: "28/08/2025",
    title: "Filière travaux : valoriser chaque lead qualifié",
    excerpt:
      "Reliez les signaux d’intention aux bons corps de métier pour maximiser la conversion des opportunités travaux.",
  },
];

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-sky-50/80 via-slate-50 to-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-12 pt-10 lg:flex-row lg:items-center lg:gap-16 lg:pb-16 lg:pt-14">
          {/* Col gauche : texte principal */}
          <div className="flex-1">
            <p className="mb-3 inline-flex items-center rounded-full border border-sky-100 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-600 shadow-sm backdrop-blur">
              Plateforme d’intelligence d’adresse
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Casametrix
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              La plateforme d’intelligence d’adresse pour la prospection, l’analyse foncière
              et le pilotage des travaux. Unifiez cadastre, DPE, annonces, historiques de
              transactions et coordonnées GPS pour prendre des décisions rapides et
              argumentées.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Voir les tarifs
              </Link>

              <Link
                to="/app/recherche"
                className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white px-5 py-2.5 text-sm font-medium text-sky-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Essayer la recherche d’adresse
              </Link>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-7">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Suivez-nous
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <span className="mr-1.5 text-[11px] font-semibold">X</span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 shadow-sm hover:border-sky-200"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-full border border-red-100 bg-white px-3 py-1.5 text-xs font-medium text-red-500 shadow-sm hover:bg-red-50"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Col droite : bloc "Pour qui ?" */}
          <aside className="flex-1">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6 lg:p-7">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Pour qui ?
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                <li>• Promoteurs &amp; foncières : qualification foncière accélérée.</li>
                <li>• Réseaux de travaux : ciblage précis et priorisation DPE.</li>
                <li>• Collectivités : cartographie patrimoniale &amp; risques.</li>
                <li>• Startups PropTech : accès API, flux temps réel &amp; intégrations.</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Nouveautés
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Coordonnées GPS natives, géolocalisation navigateur “Me localiser” dans
                  la Recherche, scoring tension locative par quartier.
                </p>
                <Link
                  to="/changelog"
                  className="mt-3 inline-flex items-center text-xs font-medium text-sky-700 hover:text-sky-800"
                >
                  Voir le changelog
                  <span aria-hidden="true" className="ml-1">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION ARTICLES */}
      <section className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Derniers articles
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Cas d’usage concrets pour les équipes foncières, travaux et data.
              </p>
            </div>
            <Link
              to="/blog"
              className="text-xs font-medium text-sky-700 hover:text-sky-800"
            >
              Tous les articles →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ARTICLES.map((article) => (
              <article
                key={article.title}
                className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-100 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700">
                    {article.tag}
                  </span>
                  <span className="text-[11px] text-slate-500">{article.date}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-slate-900">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                  {article.excerpt}
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-sky-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  disabled
                >
                  Lire l’article (bientôt)
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
