import PageMeta from "../components/PageMeta";

export default function SupportPage() {
  return (
    <>
      <PageMeta
        title="Support & assistance"
        description="Support Casametrix : accompagnement fonctionnel, aide à l’intégration API et gestion des incidents pour les équipes foncières, data et travaux."
        path="/support"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Support &amp; assistance
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Support Casametrix pour les équipes métier &amp; data
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Casametrix se positionne comme une brique d’infrastructure pour vos
            flux immobiliers. Le support vise à aider les équipes foncières,
            data, travaux et produit à intégrer la plateforme, diagnostiquer les
            problèmes et sécuriser les usages au quotidien.
          </p>

          {/* Bloc 1 : comment nous contacter */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Point d’entrée support
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Le canal principal de contact est l’email. Selon votre plan
                (Starter, Pro, Entreprise), les engagements de réponse et le
                niveau d’accompagnement sont adaptés.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-medium">Email de contact :</span>{" "}
                <span className="font-mono text-slate-800">
                  support@casametrix.com
                </span>
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Pour les clients Entreprise, un canal dédié (espace client,
                Slack/Teams ou équivalent) peut être mis en place contractuellement.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Types de demandes prises en charge
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Questions fonctionnelles sur la plateforme Casametrix.</li>
                <li>• Assistance à l’intégration de l’API dans vos outils.</li>
                <li>• Analyse d’anomalies sur des résultats de recherche.</li>
                <li>• Aide au paramétrage des workflows d’ingestion (n8n, ETL).</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Les évolutions produit, intégrations spécifiques et développements
                sur mesure sont traités dans un cadre projet ou via un contrat
                séparé.
              </p>
            </article>
          </div>

          {/* Bloc 2 : niveaux de support */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Niveaux de support selon les plans
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Exemple de grille indicative. Les engagements finaux sont précisés
              dans les propositions commerciales et contrats.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Starter
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• Support par email uniquement.</li>
                  <li>• Réponse sous quelques jours ouvrés.</li>
                  <li>• Aide de base à la prise en main.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50/70 border border-sky-100 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-600">
                  Pro
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• Support par email prioritaire.</li>
                  <li>• Délai de réponse plus court.</li>
                  <li>• Aide à l’intégration API & flux.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Entreprise
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <li>• Canal dédié & point de contact.</li>
                  <li>• Engagements de disponibilité (SLA).</li>
                  <li>• Ateliers de cadrage & accompagnement.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bloc 3 : infos utiles pour ouvrir un ticket */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Informations à fournir
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Pour accélérer le diagnostic, il est utile de transmettre dès le
                premier message :
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Adresse email du compte concerné.</li>
                <li>• Endpoint ou écran concerné (ex. /addresses/search).</li>
                <li>• Horodatage approximatif du problème.</li>
                <li>• Description concise + captures d’écran.</li>
              </ul>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Types d’incidents courants
              </h2>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Erreurs d’appel API (401, 403, 429, 500...).</li>
                <li>• Incohérences perçues dans certaines données.</li>
                <li>• Comportement inattendu de la recherche d’adresse.</li>
                <li>• Problèmes de performance sur des volumes importants.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Les anomalies de données (DVF, DPE, etc.) peuvent nécessiter un
                travail d’investigation plus long, notamment lorsqu’elles
                proviennent des sources officielles.
              </p>
            </article>
          </div>

          {/* Note bas de page */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Cette page décrit le cadre général du support Casametrix. Pour les
            clients Entreprise, un dossier détaillé (SLA, procédures
            d’escalade, disponibilité) peut être intégré à la documentation
            contractuelle.
          </p>
        </section>
      </main>
    </>
  );
}
