import PageMeta from "../components/PageMeta";

export default function CookiesPage() {
  return (
    <>
      <PageMeta
        title="Cookies & traceurs"
        description="Politique cookies de Casametrix : types de cookies utilisés, finalités, durée de conservation, base légale et moyens de gestion du consentement."
        path="/cookies"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Cookies & traceurs
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Politique de cookies
          </h1>

          {/* Bandeau important */}
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <strong>Important :</strong> le contenu de cette page est un modèle
            pour une plateforme SaaS B2B. Il doit être adapté à vos outils
            réels (solution d’analytics, CMP, tags marketing, etc.) et validé
            par votre conseil (DPO, avocat, expert RGPD) avant publication
            définitive.
          </p>

          {/* Intro */}
          <p className="mt-5 text-sm text-slate-600">
            La présente politique explique comment le site{" "}
            <span className="font-medium">casametrix.com</span> et la
            plateforme Casametrix utilisent des cookies et autres traceurs
            (ci-après les « cookies ») lors de votre navigation.
          </p>

          {/* 1. Responsable */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              1. Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement des données collectées via les
              cookies déposés sur le site et la plateforme Casametrix est :
            </p>
            <p className="mt-1">
              <span className="font-medium">[Raison sociale de la société]</span>
              <br />
              [Adresse du siège social]
              <br />
              [Email de contact RGPD / DPO]
            </p>
          </section>

          {/* 2. Qu’est-ce qu’un cookie ? */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              2. Qu&apos;est-ce qu&apos;un cookie ?
            </h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal
              (ordinateur, smartphone, tablette) lors de la consultation d’un
              site web ou de l’utilisation d’une application. Il permet, pendant
              une durée limitée, de reconnaître votre terminal et de mémoriser
              certaines informations.
            </p>
            <p>
              D’autres technologies peuvent fonctionner de manière similaire
              (local storage, pixels, tags, etc.) et sont regroupées ici, par
              simplification, sous le terme de « cookies ».
            </p>
          </section>

          {/* 3. Types de cookies */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              3. Types de cookies utilisés sur Casametrix
            </h2>
            <p>
              Selon les configurations que vous mettrez en place, Casametrix
              peut recourir aux catégories de cookies suivantes :
            </p>

            <div className="mt-3 space-y-3 text-xs text-slate-700">
              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Cookies strictement nécessaires
                </p>
                <p className="mt-2">
                  Indispensables au fonctionnement du site et de la plateforme
                  (sécurité, gestion de session, choix de langue, affichage du
                  bandeau cookies, etc.). Ils ne peuvent pas être désactivés via
                  l’interface de gestion du consentement.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Cookies de mesure d&apos;audience (analytics)
                </p>
                <p className="mt-2">
                  Permettent de mesurer la fréquentation du site, d’identifier
                  les pages les plus consultées et de mieux comprendre les
                  parcours utilisateurs. Selon l’outil et les paramètres choisis,
                  ils peuvent nécessiter votre consentement préalable.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Cookies fonctionnels et de personnalisation
                </p>
                <p className="mt-2">
                  Servent à améliorer le confort de navigation (mémorisation de
                  préférences, mode d’affichage, filtres, etc.). Ils ne sont pas
                  strictement nécessaires mais facilitent l’usage quotidien.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Cookies de marketing / prospection
                </p>
                <p className="mt-2">
                  Le cas échéant, permettent de suivre la performance de
                  campagnes marketing B2B, de mesurer les conversions ou de
                  qualifier l’intérêt pour certaines pages. Leur utilisation
                  suppose généralement votre consentement préalable.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Base légale & durée */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              4. Base légale et durée de conservation
            </h2>
            <p>
              Les cookies strictement nécessaires reposent sur l’{" "}
              <span className="font-medium">intérêt légitime</span> de
              l’éditeur (assurer la sécurité, la disponibilité et l’ergonomie
              minimale du service).
            </p>
            <p>
              Les autres catégories de cookies (analytics non strictement
              nécessaires, marketing, etc.) reposent sur votre{" "}
              <span className="font-medium">consentement</span>, recueilli
              préalablement via un bandeau ou un module de gestion des cookies.
            </p>
            <p>
              Les durées de conservation recommandées sont généralement de{" "}
              <span className="font-medium">6 à 13 mois</span> pour les cookies
              de mesure d’audience et de{" "}
              <span className="font-medium">6 mois</span> pour la conservation
              de la preuve du consentement.
            </p>
          </section>

          {/* 5. Gestion du consentement */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              5. Gestion de vos préférences cookies
            </h2>
            <p>
              Lors de votre première visite, un bandeau ou module de gestion des
              cookies vous permet de :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>accepter tous les cookies non strictement nécessaires ;</li>
              <li>refuser ces cookies ;</li>
              <li>ou personnaliser vos choix par catégorie.</li>
            </ul>
            <p className="mt-3">
              Vous pouvez à tout moment revenir sur vos choix en accédant à ce
              module via un lien dédié (par exemple « Gérer mes cookies » en bas
              de page) ou via les paramètres de votre navigateur.
            </p>
          </section>

          {/* 6. Configuration navigateur */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              6. Paramétrer votre navigateur
            </h2>
            <p>
              La plupart des navigateurs permettent de bloquer tout ou partie
              des cookies, ou d’être averti lorsqu’un site souhaite en déposer.
              Les modalités varient d’un navigateur à l’autre.
            </p>
            <p className="text-xs text-slate-600 mt-2">
              À titre indicatif (liste non exhaustive) :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5 text-slate-600">
              <li>Chrome : paramètres &gt; Confidentialité et sécurité &gt; Cookies.</li>
              <li>Firefox : options &gt; Vie privée et sécurité &gt; Cookies.</li>
              <li>Edge : paramètres &gt; Cookies et autorisations de site.</li>
              <li>Safari : préférences &gt; Confidentialité.</li>
            </ul>
            <p className="mt-2 text-xs text-slate-500">
              Le blocage total des cookies peut dégrader certaines
              fonctionnalités ou empêcher l’accès à l’espace applicatif sécurisé.
            </p>
          </section>

          {/* 7. Cookies tiers */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              7. Cookies tiers
            </h2>
            <p>
              Certains cookies peuvent être déposés par des services tiers
              intégrés au site (solution d’analytics, vidéo embarquée, outil de
              chat, etc.). Ces tiers peuvent agir en tant que responsables de
              traitement pour tout ou partie de leurs opérations.
            </p>
            <p>
              Il est recommandé de consulter leurs politiques de confidentialité
              et de cookies, en complément de la présente politique.
            </p>
          </section>

          {/* 8. Évolution */}
          <section className="mt-8 mb-6 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              8. Évolution de la présente politique
            </h2>
            <p>
              La présente politique de cookies peut être mise à jour pour
              refléter les évolutions des pratiques de Casametrix ou du cadre
              légal. En cas de modification substantielle, une information
              adaptée pourra être affichée sur le site.
            </p>
          </section>

          {/* Liens utiles */}
          <div className="mt-4 rounded-2xl bg-slate-100/80 border border-slate-200 px-4 py-3 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">
              Liens vers les autres pages légales
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                •{" "}
                <a
                  href="/privacy"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="/dpa"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Accord de traitement des données (DPA)
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="/legal"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="/cgv"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Conditions Générales de Vente (CGV)
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
