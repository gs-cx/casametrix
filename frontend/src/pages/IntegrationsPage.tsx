import PageMeta from "../components/PageMeta";

export default function IntegrationsPage() {
  return (
    <>
      <PageMeta
        title="Intégrations & workflows"
        description="Intégrations Casametrix : CRM, outils internes, n8n, ETL et APIs pour connecter la golden data immobilière à vos processus métier."
        path="/integrations"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Intégrations & workflows
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Connecter Casametrix à vos outils
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Casametrix est pensé comme une brique d’infrastructure. La plateforme
            expose une API et des flux structurés pour s’intégrer à vos CRM,
            outils internes, solutions d’ETL ou orchestrateurs no-code comme n8n.
          </p>

          {/* Bandeau intro */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-700">
            L’objectif n’est pas de remplacer vos outils existants, mais de leur
            fournir une donnée immobilière fiable, normalisée et exploitable,
            avec un minimum de friction côté équipes techniques.
          </div>

          {/* Grille : principaux types d’intégrations */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                CRM & outils commerciaux
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Enrichir les fiches clients ou opportunités avec des données
                d’adresse : DVF, DPE, contexte local, tension locative.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                BI & data platform
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Alimenter vos entrepôts de données, outils BI et modèles
                internes avec une couche immobilière structurée.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                No-code & ETL
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Construire des workflows d’ingestion et d’enrichissement via
                n8n ou vos propres pipelines ETL.
              </p>
            </article>
          </div>

          {/* Bloc API + n8n */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              API & orchestrateur n8n
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-3xl">
              Le cœur des intégrations Casametrix repose sur l’API et sur des
              workflows orchestrés. n8n peut servir de couche d’automatisation,
              mais la même logique s’applique à d’autres outils d’orchestration
              ou d’ETL.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 text-xs text-slate-600">
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  API Casametrix
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>• Authentification via token JWT.</li>
                  <li>• Endpoint de recherche d’adresse et d’enrichissement.</li>
                  <li>• Possibilité de requêtes par lot (batch) à terme.</li>
                  <li>• Documentation accessible via Swagger /docs.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Orchestration avec n8n
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>• Workflows pour ingérer DVF / DPE et autres sources.</li>
                  <li>• Enrichissement d’un parc ou d’une liste d’adresses.</li>
                  <li>• Synchronisation régulière avec vos systèmes internes.</li>
                  <li>• Journalisation et contrôle des erreurs dans les flux.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bloc exemples de schémas d’intégration */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Exemples de schémas d’intégration
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Quelques scénarios fréquents qui peuvent servir de point de départ
              pour vos échanges internes.
            </p>

            <div className="mt-5 space-y-5 text-xs text-slate-600">
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-600">
                  1. Enrichir des leads dans un CRM
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>• Création d’un lead avec une adresse (ou un couple CP / ville).</li>
                  <li>• Appel à l’API Casametrix pour récupérer les informations associées.</li>
                  <li>• Stockage de quelques indicateurs clés dans le CRM (score DPE, tension, etc.).</li>
                  <li>• Utilisation de ces indicateurs dans vos vues, filtres ou scoring interne.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-600">
                  2. Alimenter un data warehouse
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>• Export d’un parc d’adresses depuis un outil métier.</li>
                  <li>• Enrichissement via un pipeline n8n ou ETL avec Casametrix.</li>
                  <li>• Chargement dans un data warehouse (BigQuery, Snowflake, PostgreSQL, etc.).</li>
                  <li>• Exploitation dans vos outils de BI pour le reporting et les analyses ad hoc.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-600">
                  3. Automatiser une veille sur un territoire
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>• Définition d’un périmètre (communes, quartiers, codes INSEE).</li>
                  <li>• Mise en place de jobs récurrents d’actualisation (via n8n, cron, ETL).</li>
                  <li>• Agrégation des nouveaux signaux (transactions, DPE, annonces…).</li>
                  <li>• Mise à disposition des données dans un outil interne ou un tableau de bord.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bloc “approche projet” */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Une approche progressive des intégrations
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-3xl">
              Dans la plupart des cas, il est pertinent de commencer par un
              périmètre restreint : une région, un portefeuille d’adresses
              pilotes, ou un seul outil cible. L’objectif est de valider la
              qualité de la donnée et le flux d’intégration, avant d’étendre à
              l’ensemble du parc ou des équipes.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Phase 1 : cadrage du besoin et des systèmes concernés.</li>
              <li>• Phase 2 : mise en place d’un POC technique avec un flux simple.</li>
              <li>• Phase 3 : industrialisation (monitoring, quotas, alimentation régulière).</li>
              <li>• Phase 4 : extension à d’autres équipes ou cas d’usage.</li>
            </ul>
          </div>

          {/* Note de bas de page */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Si vous disposez déjà d’une stack data mature (entrepôt de données,
            outils d’ordonnancement, catalogue de données), Casametrix vient
            simplement s’ajouter comme source spécialisée. Dans les environnements
            plus légers, l’API et n8n permettent de construire des flux
            raisonnablement robustes avec un investissement limité.
          </p>
        </section>
      </main>
    </>
  );
}
