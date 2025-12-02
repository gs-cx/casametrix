import PageMeta from "../components/PageMeta";

export default function ChangelogPage() {
  return (
    <>
      <PageMeta
        title="Changelog"
        description="Changelog Casametrix : suivi des évolutions de la plateforme, de l’API et de l’interface web pour les équipes métier et data."
        path="/changelog"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Changelog produit
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Évolutions de Casametrix
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Cette page synthétise les principales évolutions de la plateforme
            : backend, API, ingestion de données, interface web et sécurité.
            Elle permet aux équipes foncières, data et produit de suivre les
            changements qui impactent leurs usages.
          </p>

          {/* Bloc info “bientôt automatisé” */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-700">
            À terme, ce changelog pourra être alimenté automatiquement à partir
            des releases techniques (Git, CI/CD) et des mises à jour de
            l’infrastructure.
          </div>

          {/* Timeline des versions */}
          <div className="mt-10 space-y-6">
            {/* Entrée 1 */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    Version 0.4 — Unification du front
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Novembre 2025</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  En production
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Harmonisation complète du site vitrine Casametrix avec une
                palette unique, un header simplifié et des pages secondaires
                alignées (About, Security, Status, API, Support, Roadmap,
                Changelog...).
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs text-slate-600">
                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Interface web
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• Refonte du header et du hero de la home.</li>
                    <li>• Uniformisation des typos, espacements et cartes.</li>
                    <li>• Pages Tarifs, Blog, FAQ, Légal, CGV, Privacy alignées.</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Documentation & information
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• Création des pages API Docs, Sécurité, Statut.</li>
                    <li>• Ajout d’exemples d’appels API (login, /addresses/search).</li>
                    <li>• Clarification des niveaux de support et de la roadmap.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Entrée 2 */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    Version 0.3 — Socle API & quotas
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Automne 2025</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-[11px] font-medium text-sky-700">
                  Stable
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Mise en place du socle API public pour la recherche d’adresse,
                avec authentification JWT, quotas pour les utilisateurs anonymes
                et journalisation des requêtes.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs text-slate-600">
                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    API & backend
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• Endpoints /auth/login et /auth/me.</li>
                    <li>• Endpoint /addresses/search avec quota gratuit IP.</li>
                    <li>• Table search_usage pour audit et pilotage d’usage.</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Sécurité & infra
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• RLS (Row Level Security) activé dans PostgreSQL.</li>
                    <li>• UFW + Fail2ban configurés sur le VPS.</li>
                    <li>• Nginx durci (HTTPS, headers de sécurité, HSTS).</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Entrée 3 */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Version 0.2 — Ingestion de données
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Été 2025</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700">
                  Fondations
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Mise en place des premiers workflows d’ingestion DVF / DPE via
                n8n, stockage dans PostgreSQL et structuration des premières
                tables de golden data immobilière.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs text-slate-600">
                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Workflows n8n
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• Téléchargement, décompression et nettoyage des jeux DVF.</li>
                    <li>• Insertion dans PostgreSQL avec contrôles d’unicité.</li>
                    <li>• Enrichissement avec DPE / autres sources publiques.</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Modèle de données
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• Première structuration des tables d’adresses.</li>
                    <li>• Normalisation des identifiants et des timestamps.</li>
                    <li>• Préparation du socle pour le multi-tenant.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Entrée 4 */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Version 0.1 — Prototype initial
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Début 2025</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700">
                  Prototype
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Première version de la plateforme, centrée sur les tests
                techniques : VPS, base de données, API minimale et site vitrine
                simplifié.
              </p>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Mise en place du VPS Hostinger et de Nginx.</li>
                <li>• Installation de PostgreSQL 16 et création de la base casamx.</li>
                <li>• Premier backend FastAPI /health derrière Nginx.</li>
                <li>• Structure initiale du front React + Vite + Tailwind.</li>
              </ul>
            </article>
          </div>

          {/* Note de bas de page */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Ce changelog est volontairement synthétique et orienté “décideurs”.
            Les détails plus techniques (migrations SQL, refactorings internes,
            pipeline CI/CD) peuvent être documentés séparément dans un espace
            dédié aux équipes techniques.
          </p>
        </section>
      </main>
    </>
  );
}
