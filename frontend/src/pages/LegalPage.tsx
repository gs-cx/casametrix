import PageMeta from "../components/PageMeta";

export default function LegalPage() {
  return (
    <>
      <PageMeta
        title="Mentions légales"
        description="Mentions légales de la plateforme Casametrix : éditeur, hébergeur, propriété intellectuelle, responsabilité, données personnelles et contact."
        path="/legal"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Mentions légales
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Mentions légales de Casametrix
          </h1>

          {/* Bandeau important */}
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <strong>Important :</strong> le contenu de cette page est fourni à
            titre de modèle pour une plateforme SaaS B2B. Il doit être vérifié,
            adapté et validé par votre conseil (avocat, juriste, expert-comptable)
            avant publication définitive.
          </p>

          {/* 1. Éditeur */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              1. Éditeur du site
            </h2>
            <p>
              Le site <span className="font-medium">casametrix.com</span> et la
              plateforme Casametrix sont édités par :
            </p>
            <p className="mt-1">
              <span className="font-medium">Dénomination sociale :</span>{" "}
              [Raison sociale de la société éditrice]
              <br />
              <span className="font-medium">Forme sociale :</span> [SARL / SAS /
              autre]
              <br />
              <span className="font-medium">Capital social :</span>{" "}
              [montant du capital] €
              <br />
              <span className="font-medium">Siège social :</span>{" "}
              [Adresse complète]
              <br />
              <span className="font-medium">RCS :</span> [Ville] [Numéro RCS]
              <br />
              <span className="font-medium">Numéro SIREN :</span> [SIREN]
              <br />
              <span className="font-medium">Numéro de TVA intracommunautaire :</span>{" "}
              [TVA intracommunautaire le cas échéant]
            </p>
          </section>

          {/* 2. Responsable de la publication */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              2. Responsable de la publication
            </h2>
            <p>
              Le responsable de la publication est{" "}
              <span className="font-medium">[Nom, prénom]</span>, en qualité de{" "}
              <span className="font-medium">
                [Fonction : gérant, président…]
              </span>
              .
            </p>
            <p>
              Contact :{" "}
              <span className="font-medium">[adresse email de contact]</span>.
            </p>
          </section>

          {/* 3. Hébergeur */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              3. Hébergeur
            </h2>
            <p>
              Le site casametrix.com et l’API api.casametrix.com sont hébergés
              par :
            </p>
            <p className="mt-1">
              <span className="font-medium">Hébergeur :</span> Hostinger
              <br />
              <span className="font-medium">Site :</span> www.hostinger.com
              <br />
              <span className="font-medium">Adresse :</span> [adresse légale de
              l’hébergeur à compléter]
            </p>
          </section>

          {/* 4. Accès au site */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              4. Accès au site et au service
            </h2>
            <p>
              L’accès au site{" "}
              <span className="font-medium">casametrix.com</span> est ouvert à
              tout internaute. L’accès à la plateforme applicative Casametrix
              est réservé aux utilisateurs disposant d’un compte client ou d’un
              accès de démonstration.
            </p>
            <p>
              L’éditeur s’efforce d’assurer une disponibilité raisonnable et la
              sécurité du site et de la plateforme, sans garantie de
              disponibilité continue.
            </p>
          </section>

          {/* 5. Propriété intellectuelle */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              5. Propriété intellectuelle
            </h2>
            <p>
              L’ensemble des éléments composant le site et la plateforme
              Casametrix (textes, graphiques, logos, icônes, interfaces,
              contenus, structure, base de données, code, etc.) est protégé par
              le droit de la propriété intellectuelle et est la propriété
              exclusive de l’éditeur, ou fait l’objet d’une licence
              d’utilisation.
            </p>
            <p>
              Toute reproduction, représentation, modification, adaptation,
              traduction, exploitation ou diffusion, totale ou partielle, de ces
              éléments, sans l’autorisation écrite et préalable de l’éditeur,
              est strictement interdite.
            </p>
          </section>

          {/* 6. Données personnelles & cookies */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              6. Données personnelles & cookies
            </h2>
            <p>
              Les traitements de données à caractère personnel réalisés dans le
              cadre de l’utilisation du site et de la plateforme Casametrix sont
              décrits dans la{" "}
              <a
                href="/privacy"
                className="text-sky-700 hover:text-sky-800 font-medium"
              >
                Politique de confidentialité
              </a>
              .
            </p>
            <p>
              L’utilisation de cookies et autres traceurs est détaillée dans la{" "}
              <a
                href="/cookies"
                className="text-sky-700 hover:text-sky-800 font-medium"
              >
                Politique de cookies
              </a>
              .
            </p>
          </section>

          {/* 7. Liens hypertextes */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              7. Liens hypertextes
            </h2>
            <p>
              Le site peut contenir des liens vers d’autres sites ou ressources
              externes. L’éditeur ne peut être tenu responsable du contenu, du
              fonctionnement ou de tout dommage résultant de l’utilisation de ces
              sites tiers.
            </p>
          </section>

          {/* 8. Responsabilité */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              8. Responsabilité
            </h2>
            <p>
              Les informations fournies sur le site et la plateforme Casametrix
              le sont à titre indicatif et ne sauraient se substituer à une
              analyse professionnelle ou à un conseil personnalisé.
            </p>
            <p>
              L’éditeur ne saurait être tenu responsable des dommages directs ou
              indirects résultant de l’utilisation du site, de la plateforme ou
              des données, y compris pertes financières, pertes d’exploitation,
              perte de chance ou inexactitude de données.
            </p>
          </section>

          {/* 9. Droit applicable */}
          <section className="mt-8 space-y-2 text-sm text-slate-700 mb-6">
            <h2 className="text-base font-semibold text-slate-900">
              9. Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En
              cas de litige, et à défaut d’accord amiable, les tribunaux
              compétents du ressort de la Cour d’appel de [Ville] seront seuls
              compétents.
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
                  href="/cookies"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Politique de cookies
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
              <li>
                •{" "}
                <a
                  href="/dpa"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Accord de traitement des données (DPA)
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
