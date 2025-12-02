import PageMeta from "../components/PageMeta";

export default function DemoPage() {
  return (
    <>
      <PageMeta
        title="Demande de démo"
        description="Planifier une démonstration de Casametrix : découverte de la plateforme d’intelligence d’adresse, cas d’usage et premières intégrations possibles."
        path="/demo"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Démo & découverte
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Planifier une démo de Casametrix
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            Une session de démonstration permet de voir Casametrix appliqué à
            vos cas d’usage : qualification d’adresses, analyse d’un parc,
            préparation de travaux, intégration API dans vos outils existants.
          </p>

          {/* Bandeau intro : pour qui / format */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-700">
            Format indicatif : 30 à 45 minutes en visioconférence, avec partage
            d’écran, démonstration de la plateforme et échange questions /
            réponses. Adaptable à vos contraintes (équipes métier, data, IT…).
          </div>

          {/* Grille 2 colonnes : à quoi sert la démo + profils */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Objectifs d’une démo Casametrix
              </h2>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Valider que la plateforme répond à vos enjeux réels.</li>
                <li>
                  • Comprendre comment la donnée est structurée par adresse
                  (DVF, DPE, cadastre, contexte local).
                </li>
                <li>
                  • Identifier les premiers cas d’usage à mettre en production.
                </li>
                <li>
                  • Évaluer l’intégration avec vos outils métiers ou votre
                  stack data.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Profils généralement impliqués
              </h2>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                <li>• Responsable foncier, asset manager, directeur travaux.</li>
                <li>• Responsable data, BI, ou direction produit.</li>
                <li>• Interlocuteurs IT / intégration (API, sécurité, RGPD).</li>
                <li>
                  • Éventuellement un sponsor métier (direction générale,
                  direction innovation).
                </li>
              </ul>
            </article>
          </div>

          {/* Formulaire "placeholder" */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Demander une démo
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-3xl">
              Le formulaire ci-dessous est une base côté interface. Il pourra
              être relié ensuite à un backend (API, CRM, outil de ticketing)
              pour gérer les demandes de démonstration.
            </p>

            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700">
                  Nom / prénom
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Nom et prénom"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700">
                  Organisation
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Société / collectivité / réseau"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700">
                  Email professionnel
                </label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="vous@entreprise.fr"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700">
                  Rôle / fonction
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Ex : Responsable foncier, CTO, DAF…"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  Contexte & cas d’usage
                </label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Décrivez en quelques lignes votre contexte : type de parc, volume d’adresses, enjeux (prospection, travaux, analyse, reporting, etc.)."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  Préférences de créneaux (optionnel)
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Ex : plutôt matin / après-midi, fuseau horaire, semaines possibles…"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Envoyer la demande (placeholder)
                </button>
                <p className="text-[11px] text-slate-500 max-w-xs text-right">
                  Ce bouton n’envoie pas encore de données. L’intégration pourra
                  être faite avec un backend (API, CRM, outil de support) dans
                  une phase ultérieure.
                </p>
              </div>
            </form>
          </div>

          {/* Note de bas de page */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Si vous préférez ne pas utiliser de formulaire, vous pouvez
            également initier un échange directement par email en indiquant
            l’objet “Demande de démo Casametrix” et quelques éléments de
            contexte :
            <span className="ml-1 font-mono text-slate-800">
              contact@casametrix.com
            </span>
            .
          </p>
        </section>
      </main>
    </>
  );
}
