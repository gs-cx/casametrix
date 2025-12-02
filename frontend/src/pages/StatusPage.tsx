import PageMeta from "../components/PageMeta";

export default function StatusPage() {
  return (
    <>
      <PageMeta
        title="Statut du service"
        description="Suivez la disponibilité de la plateforme Casametrix, l’état des principaux services et un historique synthétique des incidents récents."
        path="/status"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Statut du service
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Disponibilité de Casametrix
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Cette page présente l’état actuel de la plateforme Casametrix ainsi
            qu’un aperçu des derniers événements marquants. À terme, elle pourra
            être alimentée automatiquement par votre outil de monitoring
            (UptimeRobot, BetterUptime, Statuspage, etc.).
          </p>

          {/* Statut global */}
          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Statut actuel du service
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Tous les services Casametrix fonctionnent normalement.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
              En fonctionnement normal
            </span>
          </div>

          {/* Détail des composants */}
          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Composants de la plateforme
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Vue synthétique des principaux services techniques utilisés par
              Casametrix.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  API &amp; backend
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  api.casametrix.com
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  FastAPI + PostgreSQL, derrière Nginx avec TLS et durcissement
                  réseau.
                </p>
                <p className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Opérationnel
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Interface web
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  casametrix.com
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Frontend React statique déployé derrière Nginx, avec cache
                  navigateur agressif sur les assets.
                </p>
                <p className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Opérationnel
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Automatisation &amp; n8n
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  n8n.casametrix.com
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Scénarios d’ingestion de données (DVF, DPE, etc.), orchestrés
                  par n8n sur le même VPS.
                </p>
                <p className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Opérationnel
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Base de données
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  PostgreSQL 16 (casamx)
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Instance unique avec Row Level Security (RLS) et backups
                  réguliers.
                </p>
                <p className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Opérationnel
                </p>
              </div>
            </div>
          </div>

          {/* Historique exemple */}
          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Historique récent (exemple)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Exemple de format pour documenter les maintenances planifiées et
              incidents. Cette section pourra être alimentée automatiquement.
            </p>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-[3px] h-2 w-2 rounded-full bg-amber-400" />
                <div>
                  <p className="font-medium text-slate-800">
                    10/11/2025 – Maintenance planifiée PostgreSQL
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Mise à jour mineure de PostgreSQL 16 et vérification des
                    politiques RLS. Fenêtre de maintenance de 30 minutes, sans
                    impact majeur utilisateur.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[3px] h-2 w-2 rounded-full bg-sky-400" />
                <div>
                  <p className="font-medium text-slate-800">
                    25/10/2025 – Mise à jour de l’API de recherche d’adresse
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Amélioration de la recherche par adresse et ajout de la
                    journalisation search_usage pour les quotas gratuits.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Note de bas de page */}
          <p className="mt-8 text-[11px] text-slate-500 max-w-3xl">
            Pour un usage en production, cette page peut être connectée à un
            service de supervision externe afin d’afficher en temps réel la
            disponibilité des services Casametrix.
          </p>
        </section>
      </main>
    </>
  );
}
