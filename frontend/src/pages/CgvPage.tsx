import PageMeta from "../components/PageMeta";

export default function CgvPage() {
  return (
    <>
      <PageMeta
        title="Conditions Générales de Vente"
        description="Conditions Générales de Vente de la solution SaaS Casametrix : objet, abonnement, prix, facturation, durée, résiliation, responsabilités et données personnelles."
        path="/cgv"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Conditions Générales de Vente
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Conditions Générales de Vente (CGV)
          </h1>

          {/* Bandeau important */}
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <strong>Important :</strong> ces Conditions Générales de Vente sont
            fournies à titre de modèle pour un service SaaS B2B. Elles doivent
            être adaptées à votre activité, à vos pratiques de facturation et
            validées par un avocat ou conseil juridique avant d’être opposables
            à vos clients.
          </p>

          {/* 1. Objet */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              1. Objet
            </h2>
            <p>
              Les présentes Conditions Générales de Vente (ci-après « CGV »)
              définissent les conditions dans lesquelles la société{" "}
              <span className="font-medium">[Raison sociale]</span> (ci-après
              « Casametrix » ou « l’Éditeur ») fournit au client professionnel
              (ci-après « le Client ») un accès à la plateforme SaaS Casametrix
              (ci-après « la Plateforme ») et aux services associés.
            </p>
          </section>

          {/* 2. Définitions */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              2. Définitions
            </h2>
            <p className="mt-1">
              <span className="font-medium">« Plateforme » :</span> application
              en ligne et API éditées par Casametrix, permettant d’accéder aux
              fonctionnalités d’intelligence d’adresse et de données
              immobilières.
            </p>
            <p className="mt-1">
              <span className="font-medium">« Client » :</span> personne morale
              agissant dans le cadre de son activité professionnelle et ayant
              souscrit un abonnement à la Plateforme.
            </p>
            <p className="mt-1">
              <span className="font-medium">« Utilisateur » :</span> personne
              physique autorisée par le Client à utiliser la Plateforme pour son
              compte.
            </p>
            <p className="mt-1">
              <span className="font-medium">« Abonnement » :</span> formule de
              souscription (Starter, Pro, Entreprise, ou offre spécifique)
              donnant droit à un accès à la Plateforme pour une durée
              déterminée.
            </p>
          </section>

          {/* 3. Acceptation des CGV */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              3. Acceptation et modification des CGV
            </h2>
            <p>
              Toute commande ou souscription d’Abonnement implique l’acceptation
              pleine et entière des présentes CGV par le Client.
            </p>
            <p>
              Casametrix se réserve le droit de modifier les CGV à tout moment.
              La version applicable est celle en vigueur au jour de la commande
              ou du renouvellement de l’Abonnement.
            </p>
          </section>

          {/* 4. Description des services */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              4. Description des services
            </h2>
            <p>La Plateforme permet notamment :</p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                l’accès à des données immobilières consolidées (DVF, DPE,
                cadastre, contexte local, etc.) ;
              </li>
              <li>
                la recherche d’adresses et l’enrichissement d’un portefeuille
                d’adresses ;
              </li>
              <li>
                l’accès à une API pour intégrer Casametrix à des outils tiers
                (CRM, ERP, outils métiers, etc.).
              </li>
            </ul>
            <p className="mt-2">
              Le détail des offres et fonctionnalités figure sur la page{" "}
              <span className="font-medium">Tarifs</span> et pourra être
              précisé dans une proposition commerciale ou un contrat
              spécifique.
            </p>
          </section>

          {/* 5. Durée et résiliation */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              5. Durée, renouvellement et résiliation
            </h2>
            <p>
              L’Abonnement est conclu pour une durée déterminée (mensuelle ou
              annuelle) à compter de la date d’activation.
            </p>
            <p>
              Sauf mention contraire, l’Abonnement est renouvelé tacitement pour
              une nouvelle période de même durée, aux tarifs en vigueur à la
              date de renouvellement.
            </p>
            <p>
              Le Client peut résilier l’Abonnement en respectant un préavis de
              [X] jours avant l’échéance, par notification écrite adressée à
              Casametrix. Toute période entamée reste due.
            </p>
          </section>

          {/* 6. Prix et facturation */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              6. Prix, facturation et paiement
            </h2>
            <p>
              Les prix des Abonnements sont indiqués en euros hors taxes (HT).
              Les taxes applicables (notamment TVA) sont ajoutées au moment de
              la facturation.
            </p>
            <p>
              Sauf disposition contraire, les Abonnements sont facturés en début
              de période et payables à réception, par virement, carte bancaire
              ou tout autre moyen accepté par Casametrix.
            </p>
            <p>
              En cas de retard de paiement, des pénalités et une indemnité
              forfaitaire pour frais de recouvrement peuvent être appliquées
              conformément à la réglementation.
            </p>
          </section>

          {/* 7. Obligations du Client */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              7. Obligations du Client
            </h2>
            <p>Le Client s’engage notamment à :</p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>fournir des informations exactes lors de la création du compte ;</li>
              <li>
                respecter les droits de propriété intellectuelle de Casametrix et
                des tiers ;
              </li>
              <li>
                ne pas détourner l’usage de la Plateforme (scraping massif non
                autorisé, revente non autorisée des données, etc.) ;
              </li>
              <li>
                veiller à la confidentialité de ses identifiants et de ceux de
                ses Utilisateurs.
              </li>
            </ul>
          </section>

          {/* 8. Propriété intellectuelle */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              8. Propriété intellectuelle
            </h2>
            <p>
              Casametrix reste propriétaire de tous les droits de propriété
              intellectuelle relatifs à la Plateforme, à l’API, à la
              documentation et aux bases de données qu’elle met à disposition du
              Client.
            </p>
            <p>
              Le Client dispose d’un droit d’utilisation non exclusif et non
              transférable de la Plateforme, pour la durée de l’Abonnement et
              dans les limites définies par les présentes CGV.
            </p>
          </section>

          {/* 9. Données personnelles & DPA */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              9. Données personnelles et protection des données
            </h2>
            <p>
              Lorsqu’il agit en tant que{" "}
              <span className="font-medium">Responsable de traitement</span>, le
              Client demeure responsable du respect de la réglementation
              applicable (RGPD, loi Informatique et Libertés, etc.).
            </p>
            <p>
              Lorsque Casametrix traite des données à caractère personnel pour
              le compte du Client, les rôles et responsabilités des parties
              sont précisés dans :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                la{" "}
                <a
                  href="/privacy"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Politique de confidentialité
                </a>{" "}
                de Casametrix ;
              </li>
              <li>
                l’{" "}
                <a
                  href="/dpa"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Accord de traitement des données (DPA)
                </a>{" "}
                mis à disposition des clients professionnels.
              </li>
            </ul>
          </section>

          {/* 10. Responsabilité */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              10. Responsabilité
            </h2>
            <p>
              Casametrix met en œuvre des moyens raisonnables pour assurer le bon
              fonctionnement de la Plateforme. La responsabilité de Casametrix ne
              saurait être engagée en cas de dommages indirects, immatériels ou
              consécutifs subis par le Client.
            </p>
            <p>
              En toute hypothèse, la responsabilité globale de Casametrix est
              limitée au montant des sommes effectivement payées par le Client au
              titre de l’Abonnement au cours des douze (12) derniers mois.
            </p>
          </section>

          {/* 11. Force majeure */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              11. Force majeure
            </h2>
            <p>
              Aucune des parties ne pourra être tenue responsable d’un manquement
              à ses obligations résultant d’un cas de force majeure au sens du
              droit français (événement imprévisible, irrésistible et extérieur).
            </p>
          </section>

          {/* 12. Droit applicable */}
          <section className="mt-8 mb-6 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              12. Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français. Tout litige
              relatif à leur interprétation, leur exécution ou leur validité
              sera de la compétence exclusive des tribunaux du ressort de la Cour
              d’appel de [Ville].
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
                  href="/legal"
                  className="text-sky-700 hover:text-sky-800 font-medium"
                >
                  Mentions légales
                </a>
              </li>
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
