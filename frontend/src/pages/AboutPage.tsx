import PageMeta from "../components/PageMeta";

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="À propos"
        description="Découvrez la mission de Casametrix : rendre la donnée immobilière exploitable et unifier DVF, DPE, cadastre, GPS et scoring dans une plateforme d’intelligence d’adresse simple et performante."
        path="/about"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            À propos
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Casametrix, l’intelligence d’adresse pour les décideurs
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Casametrix est une plateforme SaaS B2B dont la mission est de rendre
            la donnée immobilière lisible, exploitable et actionnable. Nous
            unifions DVF, DPE, cadastre, coordonnées GPS, contexte local et
            scores pour permettre aux professionnels de prendre des décisions
            rapides et argumentées, à l’échelle de l’adresse.
          </p>

          {/* Cartes principales */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Notre mission
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Simplifier l’accès aux données immobilières, fiabiliser les
                analyses foncières et accélérer la qualification des adresses
                pour les promoteurs, foncières, réseaux de travaux, opérateurs
                publics et startups PropTech.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                L’objectif : réduire le temps passé à chercher, consolider et
                nettoyer la donnée, pour le consacrer à la décision et à
                l’exécution.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Notre vision
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Nous pensons que l’unité de base d’un projet immobilier est
                l’adresse. En la rendant intelligible — historique de
                transactions, performance énergétique, contexte urbain,
                réglementation, tension locative — nous donnons aux décideurs un
                socle fiable pour arbitrer plus vite et mieux.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Casametrix se positionne comme une brique d’infrastructure
                discrète, mais centrale : API, interface web et exports pour
                alimenter vos propres outils.
              </p>
            </article>
          </div>

          {/* Bloc “comment on travaille” */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Pour qui ?
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Promoteurs &amp; foncières, réseaux de travaux, bureaux
                d’études, collectivités et équipes data qui veulent un socle
                homogène pour la donnée immobilière.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Comment ?
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Base PostgreSQL sécurisée (RLS multi-tenant), API documentée,
                interface web légère et intégrations no-code pour brancher
                Casametrix à vos outils existants.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Ce que nous visons
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Un produit sobre, prévisible et robuste. Pas une “surcouche”
                marketing, mais une brique métier fiable pour les équipes qui
                manipulent la donnée au quotidien.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
