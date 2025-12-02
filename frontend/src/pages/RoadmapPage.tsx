import PageMeta from "../components/PageMeta";

export default function RoadmapPage() {
  return (
    <>
      <PageMeta
        title="Feuille de route"
        description="Feuille de route Casametrix : socle de golden data immobilière, API, interface web, intégrations et fonctionnalités avancées pour les décideurs."
        path="/roadmap"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Feuille de route
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Roadmap Casametrix
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Casametrix se construit comme une brique d’infrastructure pour la
            donnée immobilière. La feuille de route est orientée vers un socle
            robuste (données, API, sécurité), puis des fonctionnalités
            d’analyse, de prospection et d’automatisation pour les équipes
            métier et data.
          </p>

          {/* Bloc 1 : trois grands axes */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Socle de données
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Unifier DVF, DPE, cadastre, géoloc et contexte local dans une
                base unique, structurée par adresse, avec RLS multi-tenant.
              </p>
            </article>
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                API & interface
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Offrir une API stable, documentée, et une interface web épurée
                pour interroger la plateforme sans friction.
              </p>
            </article>
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Cas d’usage métier
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Construire des parcours pour la prospection, le pilotage des
                travaux, la gestion de parc et l’ESG, adaptés aux décideurs.
              </p>
            </article>
          </div>

          {/* Bloc 2 : Roadmap structurée par phases */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Phases de la feuille de route
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Vue synthétique des grandes étapes de construction de la
              plateforme Casametrix. Les dates sont indicatives et peuvent
              évoluer en fonction des retours terrain.
            </p>

            <div className="mt-6 space-y-5">
              {/* Phase 1 */}
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                      Phase 1 — Socle & sécurité
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Infrastructure, base de données, premières données
                      immobilières.
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    En place
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• VPS sécurisé (SSH, UFW, Fail2ban, HTTPS).</li>
                  <li>• PostgreSQL 16 avec RLS et schéma multi-tenant.</li>
                  <li>• Ingestion DVF / DPE pilotée par n8n.</li>
                  <li>• Backend FastAPI + endpoints d’authentification.</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                      Phase 2 — Interface & recherche d’adresse
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Première version exploitable par les utilisateurs finaux.
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-sky-50 border border-sky-100 px-2.5 py-1 text-[11px] font-medium text-sky-700">
                    En cours
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• Home, Tarifs, Blog, FAQ et pages légales unifiées.</li>
                  <li>• Recherche d’adresse simple, quotas anonymes, logs d’usage.</li>
                  <li>• Pages de connexion / inscription prêtes à lier à l’API.</li>
                  <li>• Documentation API & pages statut / sécurité.</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Phase 3 — Fiches adresses & scoring
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Approfondir la valeur apportée à chaque adresse.
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                    À venir
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• Fiche détaillée par adresse (DVF, DPE, contexte local).</li>
                  <li>• Premiers scores de tension locative / risque DPE.</li>
                  <li>• Exports CSV/Excel pour les équipes foncières.</li>
                  <li>• API enrichie pour interrogation par lots.</li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Phase 4 — Automatisation & intégrations
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Faire de Casametrix une brique standard dans vos flux.
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                    À venir
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• Connecteurs et exemples pour CRM / outils internes.</li>
                  <li>• Templates n8n / ETL pour ingestion régulière.</li>
                  <li>• Webhooks ou mécanismes de notifications ciblées.</li>
                  <li>• Tableaux de bord d’usage pour les admins.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bloc 3 : note de cadrage */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Cette feuille de route a vocation à évoluer en fonction des retours
            clients et des priorités marché. L’objectif reste constant : fournir
            une plateforme sobre, fiable et utile au quotidien pour les
            décideurs de l’immobilier.
          </p>
        </section>
      </main>
    </>
  );
}
