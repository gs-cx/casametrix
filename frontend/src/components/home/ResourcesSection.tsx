import React from "react";

type Article = {
  title: string;
  date: string;
  category: string;
  description: string;
};

type ResourcesSectionProps = {
  /** Si non fourni, on utilise une liste d’articles par défaut */
  articles?: Article[];
};

const defaultArticles: Article[] = [
  {
    title: "Optimiser la prospection immobilière avec Casametrix",
    date: "10/09/2025",
    category: "Prospection ciblée",
    description:
      "Comment réduire de 40 % le temps de qualification d’une adresse en unifiant cadastre, DPE, annonces et historique de transactions.",
  },
  {
    title: "RGE & DPE : anticiper les risques et prioriser les actions",
    date: "06/09/2025",
    category: "Analyse DPE",
    description:
      "Scorez votre parc, identifiez les adresses les plus pénalisantes et priorisez les travaux pour limiter le reste à charge.",
  },
  {
    title: "API géo & coordonnées GPS : cas d’usage avancés",
    date: "01/09/2025",
    category: "API & géoloc",
    description:
      "Du géocodage inverse à la complétion automatique des adresses, l’API Casametrix alimente vos outils internes et vos CRM.",
  },
  {
    title: "Filière travaux : valoriser chaque lead qualifié",
    date: "28/08/2025",
    category: "Filière travaux",
    description:
      "Reliez les signaux d’intention aux bons corps de métier, au bon moment, pour maximiser la conversion des leads travaux.",
  },
];

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ articles }) => {
  const items = articles && articles.length > 0 ? articles : defaultArticles;

  return (
    <section className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Ressources & cas d’usage
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Derniers articles
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Des exemples concrets pour tirer parti des données Casametrix au
              quotidien.
            </p>
          </div>

          {/* Lien "Tous les articles" (desktop) */}
          <a
            href="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-900 sm:inline-flex"
          >
            Tous les articles
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Cartes d’articles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((article) => (
            <article
              key={article.title}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-100 hover:bg-white hover:shadow-md"
            >
              {/* Catégorie + date */}
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                  {article.category}
                </span>
                <span className="text-xs text-slate-500">{article.date}</span>
              </div>

              {/* Titre */}
              <h3 className="text-sm font-semibold leading-snug text-slate-900">
                {article.title}
              </h3>

              {/* Extrait */}
              <p className="mt-2 line-clamp-4 text-xs text-slate-600">
                {article.description}
              </p>

              <div className="mt-4 flex-1" />

              {/* Bouton lisible (plus de gros rectangle bleu) */}
              <button
                type="button"
                disabled
                className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
              >
                Lire l’article (bientôt)
              </button>
            </article>
          ))}
        </div>

        {/* Lien "Tous les articles" (mobile) */}
        <div className="mt-8 flex justify-center sm:hidden">
          <a
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            Tous les articles
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
export type { Article, ResourcesSectionProps };
