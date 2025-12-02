import PageMeta from "../components/PageMeta";

export default function CaseStudiesPage() {
  return (
    <>
      <PageMeta
        title="Études de cas"
        description="Études de cas Casametrix : exemples de prospection ciblée, pilotage des travaux, gestion de parc et intégration API pour les décideurs immobiliers."
        path="/cases"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Études de cas
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Cas d’usage et scénarios concrets
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Casametrix se positionne comme une plateforme d’intelligence
            d’adresse au service des équipes foncières, travaux, data et
            collectivités. Voici quelques exemples de scénarios typiques où la
            golden data immobilière apporte un gain concret.
          </p>

          {/* Bandeau intro “exemples” */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-700">
            Ces cas d’usage sont illustratifs. Ils peuvent être adaptés en
            fonction de vos volumes, de votre organisation et de vos objectifs
            (prospection, travaux, valorisation d’actifs, politiques publiques…).
          </div>

          {/* Grille d’études de cas */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Cas 1 : Promoteur / foncière */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                Promoteur &amp; foncière
              </p>
              <h2 className="mt-3 text-sm font-semibold text-slate-900">
                Accélérer la qualification foncière d’un portefeuille d’adresses
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Une équipe foncière reçoit régulièrement des listes d’adresses
                à analyser (opportunités, appels entrants, repérage terrain).
                L’objectif est de prioriser rapidement les adresses à plus fort
                potentiel.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Import d’une liste d’adresses dans un outil interne.</li>
                <li>• Enrichissement via l’API Casametrix (DVF, DPE, contexte).</li>
                <li>• Score interne pour classer les opportunités.</li>
                <li>• Export vers Excel / outil décisionnel.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Résultat : moins de temps passé en recherche manuelle, plus de
                temps pour instruire les dossiers prioritaires.
              </p>
            </article>

            {/* Cas 2 : Réseau de travaux */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                Réseau de travaux
              </p>
              <h2 className="mt-3 text-sm font-semibold text-slate-900">
                Cibler les bâtiments les plus pénalisés par le DPE
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Un réseau de travaux souhaite concentrer ses actions marketing
                sur les logements les plus énergivores, dans des zones où le
                marché est favorable.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Cartographie des adresses avec DPE faibles (E, F, G).</li>
                <li>• Croisement avec l’historique DVF et la tension locative.</li>
                <li>• Priorisation des secteurs et typologies de biens.</li>
                <li>• Génération de listes de contacts pour les équipes terrain.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Objectif : concentrer les efforts commerciaux sur les adresses
                où la probabilité de travaux est la plus forte.
              </p>
            </article>

            {/* Cas 3 : Collectivité / bailleur */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                Collectivité &amp; bailleur
              </p>
              <h2 className="mt-3 text-sm font-semibold text-slate-900">
                Piloter un parc et planifier les travaux
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Une collectivité ou un bailleur social doit prioriser des
                travaux sur un parc immobilier réparti sur plusieurs communes,
                en tenant compte des contraintes réglementaires et budgétaires.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Consolidation d’un parc d’adresses dans Casametrix.</li>
                <li>• Enrichissement DPE, données de contexte et DVF.</li>
                <li>• Mise en place d’indicateurs de risque et d’urgence.</li>
                <li>• Génération de plans pluriannuels de travaux.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Casametrix fournit le socle de données, les arbitrages restent
                pilotés par vos équipes et vos contraintes métiers.
              </p>
            </article>

            {/* Cas 4 : Startup / équipe data */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                Startup &amp; équipe data
              </p>
              <h2 className="mt-3 text-sm font-semibold text-slate-900">
                Intégrer una API d’intelligence d’adresse dans un produit existant
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Une équipe produit souhaite enrichir un CRM, un outil de
                transaction ou une application métier avec des données
                immobilières fiables, sans reconstruire un pipeline complet.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Utilisation de l’API Casametrix depuis le backend existant.</li>
                <li>• Autocomplétion d’adresses et fiches enrichies.</li>
                <li>• Stockage local des identifiants techniques ou scores.</li>
                <li>• Suivi des quotas et métriques d’usage.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                L’objectif est de réduire le time-to-market en s’appuyant sur un
                socle de données prêt à l’emploi.
              </p>
            </article>
          </div>

          {/* Bloc “comment démarrer” */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Comment adapter ces cas d’usage à votre contexte ?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Dans la pratique, chaque organisation a ses contraintes (SI
              existant, outils internes, gouvernance des données, équipes
              disponibles). L’idée n’est pas d’imposer un modèle unique, mais
              de fournir un socle :
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• une base d’adresses et de données immobilières consolidée ;</li>
              <li>• une API stable pour vos intégrations ;</li>
              <li>• une interface web pour les équipes non techniques ;</li>
              <li>• des workflows d’ingestion et d’export reproductibles.</li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Un échange de cadrage (technique + métier) permet généralement
              d’identifier rapidement une première verticale à adresser : parc,
              travaux, prospection, valorisation, ou reporting ESG.
            </p>
          </div>

          {/* Note de bas de page */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Si vous avez un cas d’usage spécifique (multi-pays, modèles
            propriétaires, contraintes réglementaires fortes), il peut faire
            l’objet d’un accompagnement dédié, en complément des fonctionnalités
            standard de Casametrix.
          </p>
        </section>
      </main>
    </>
  );
}
