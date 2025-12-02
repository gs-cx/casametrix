import PageMeta from "../components/PageMeta";

export default function DpaPage() {
  return (
    <>
      <PageMeta
        title="Accord de traitement des données (DPA)"
        description="Modèle d’Accord de traitement des données (DPA) pour l’utilisation de Casametrix en tant que sous-traitant au sens du RGPD."
        path="/dpa"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            DPA & sous-traitance
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Accord de traitement des données (DPA)
          </h1>

          {/* Bandeau important */}
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <strong>Important :</strong> le présent DPA est un{" "}
            <span className="font-semibold">modèle indicatif</span> destiné à
            illustrer le cadre de sous-traitance de Casametrix. Il doit être
            adapté à vos traitements réels (types de données, pays, outils
            utilisés) et validé par votre conseil juridique ou votre DPO avant
            signature et utilisation.
          </p>

          {/* 1. Objet */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              1. Objet et champ d&apos;application
            </h2>
            <p>
              Le présent Accord de traitement des données (ci-après le{" "}
              <span className="font-medium">« DPA »</span>) fait partie intégrante
              du contrat ou des Conditions Générales de Vente conclues entre le
              client professionnel (ci-après le{" "}
              <span className="font-medium">« Responsable de traitement »</span>)
              et Casametrix (ci-après le{" "}
              <span className="font-medium">« Sous-traitant »</span>).
            </p>
            <p>
              Il a pour objet de définir les conditions dans lesquelles
              Casametrix traite, pour le compte du Responsable de traitement,
              les données à caractère personnel nécessaires à la fourniture de la
              Plateforme et des services associés.
            </p>
          </section>

          {/* 2. Définitions */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              2. Définitions
            </h2>
            <p>
              Les termes utilisés au présent DPA ont le sens donné par le RGPD,
              et notamment :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                <span className="font-medium">« Données à caractère personnel »</span> :
                toute information se rapportant à une personne physique
                identifiée ou identifiable.
              </li>
              <li>
                <span className="font-medium">« Traitement »</span> : toute
                opération appliquée à des données (collecte, conservation,
                consultation, modification, suppression, etc.).
              </li>
              <li>
                <span className="font-medium">« Responsable de traitement »</span> : la
                personne morale qui détermine les finalités et les moyens du
                traitement.
              </li>
              <li>
                <span className="font-medium">« Sous-traitant »</span> : la personne
                morale qui traite des données pour le compte du Responsable de
                traitement.
              </li>
            </ul>
          </section>

          {/* 3. Rôles des parties */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              3. Rôles des parties et responsabilité
            </h2>
            <p>
              Le Responsable de traitement détermine les finalités et les moyens
              des traitements réalisés via la Plateforme Casametrix
              (import d’adresses, scoring, analyses, etc.). Casametrix agit en
              tant que Sous-traitant et n’utilise les données que pour la
              fourniture des services définis au contrat.
            </p>
            <p>
              Le Responsable de traitement demeure responsable de la conformité
              globale des traitements vis-à-vis des personnes concernées (base
              légale, information, gestion des droits, etc.).
            </p>
          </section>

          {/* 4. Description des traitements */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              4. Description des traitements confiés
            </h2>
            <p>
              À titre indicatif, les traitements susceptibles d’être confiés à
              Casametrix peuvent inclure :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                hébergement et stockage de listes d’adresses ou de parc
                immobilier ;
              </li>
              <li>
                enrichissement de ces adresses avec des données immobilières,
                contextuelles ou dérivées ;
              </li>
              <li>
                mise à disposition des données via l’interface web ou l’API ;
              </li>
              <li>
                journalisation technique (logs) pour assurer la sécurité et la
                traçabilité des accès ;
              </li>
              <li>
                production de rapports et exports à la demande du Responsable de
                traitement.
              </li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Le périmètre précis, les catégories de données et les finalités
              doivent être détaillés dans la documentation contractuelle ou
              technique associée au projet.
            </p>
          </section>

          {/* 5. Instructions documentées */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              5. Instructions documentées du Responsable de traitement
            </h2>
            <p>
              Casametrix s’engage à ne traiter les données à caractère personnel
              que sur la base d’instructions documentées du Responsable de
              traitement, y compris en ce qui concerne les transferts vers un
              pays tiers, sauf disposition légale contraire.
            </p>
            <p>
              En cas d’instruction manifestement contraire au RGPD ou à la
              législation applicable, Casametrix en informera le Responsable de
              traitement sans délai.
            </p>
          </section>

          {/* 6. Confidentialité */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              6. Confidentialité
            </h2>
            <p>
              Casametrix veille à ce que les personnes autorisées à traiter les
              données (équipes produit, support, exploitation) soient soumises à
              une obligation contractuelle de{" "}
              <span className="font-medium">confidentialité</span> et reçoivent
              une formation appropriée en matière de protection des données.
            </p>
          </section>

          {/* 7. Sécurité */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              7. Mesures techniques et organisationnelles de sécurité
            </h2>
            <p>
              Casametrix met en œuvre des mesures techniques et
              organisationnelles appropriées pour garantir un niveau de sécurité
              adapté au risque, incluant notamment :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                hébergement sécurisé sur une infrastructure européenne avec
                segmentation des environnements ;
              </li>
              <li>
                contrôle d’accès strict à la base de données (PostgreSQL 16),
                RLS (<code>Row Level Security</code>) et isolation par
                organisation via <code>app.current_org</code> ;
              </li>
              <li>
                chiffrement des flux (HTTPS / TLS) entre les clients et
                l’API/plateforme ;
              </li>
              <li>
                journalisation des accès et des erreurs techniques ;
              </li>
              <li>
                sauvegardes régulières et procédures de restauration.
              </li>
            </ul>
          </section>

          {/* 8. Sous-traitants ultérieurs */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              8. Sous-traitance ultérieure
            </h2>
            <p>
              Casametrix peut faire appel à des{" "}
              <span className="font-medium">
                sous-traitants ultérieurs spécialisés
              </span>{" "}
              (hébergement, emailing transactionnel, monitoring, etc.) pour une
              partie des traitements.
            </p>
            <p>
              Casametrix s’engage à ne faire intervenir que des prestataires
              présentant des garanties suffisantes en matière de sécurité et de
              confidentialité, et à encadrer ces relations par des contrats
              conformes à l’article 28 du RGPD.
            </p>
          </section>

          {/* 9. Localisation des données */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              9. Localisation des données et transferts hors UE
            </h2>
            <p>
              En principe, les données traitées par Casametrix sont hébergées au
              sein de l’Union européenne. Si certains prestataires ou services
              impliquent des transferts hors UE, Casametrix veillera à les
              encadrer par des mécanismes de protection appropriés (clauses
              contractuelles types, décision d’adéquation, etc.).
            </p>
          </section>

          {/* 10. Droits & assistance */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              10. Droits des personnes et assistance
            </h2>
            <p>
              Casametrix assiste le Responsable de traitement, dans la mesure du
              raisonnable, pour répondre aux demandes d’exercice des droits des
              personnes concernées (accès, rectification, suppression, etc.)
              lorsque ces demandes concernent des données traitées via la
              Plateforme.
            </p>
            <p>
              Le Responsable de traitement reste l’interlocuteur principal des
              personnes concernées et conserve la maîtrise des réponses qui leur
              sont apportées.
            </p>
          </section>

          {/* 11. Réversibilité */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              11. Durée, réversibilité et suppression des données
            </h2>
            <p>
              Le présent DPA s’applique pendant toute la durée du contrat
              principal et aussi longtemps que Casametrix traite des données
              pour le compte du Responsable de traitement.
            </p>
            <p>
              À l’issue de la relation contractuelle, et sur instructions du
              Responsable de traitement, Casametrix procédera à la suppression ou
              à la restitution des données à caractère personnel, sauf obligation
              légale de conservation.
            </p>
          </section>

          {/* 12. Documentation & audits */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              12. Documentation et audits
            </h2>
            <p>
              Casametrix tient à disposition du Responsable de traitement une
              documentation décrivant les principales mesures de sécurité mises
              en œuvre et, le cas échéant, les sous-traitants ultérieurs
              impliqués.
            </p>
            <p>
              Sous réserve de modalités à définir contractuellement (fréquence,
              périmètre, confidentialité), des audits ou demandes de
              renseignements peuvent être organisés pour vérifier la conformité
              de Casametrix à ses obligations essentielles de protection des
              données.
            </p>
          </section>

          {/* 13. Violations de données */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              13. Violations de données à caractère personnel
            </h2>
            <p>
              Casametrix notifie dans les meilleurs délais le Responsable de
              traitement en cas de{" "}
              <span className="font-medium">
                violation de données à caractère personnel
              </span>{" "}
              susceptible d’engendrer un risque pour les droits et libertés des
              personnes concernées.
            </p>
            <p>
              Cette notification est accompagnée, dans la mesure du possible,
              des informations nécessaires pour permettre au Responsable de
              traitement d’évaluer l’incident et, le cas échéant, de notifier
              l’autorité de contrôle compétente et les personnes concernées.
            </p>
          </section>

          {/* 14. Articulation */}
          <section className="mt-8 mb-6 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              14. Articulation avec la politique de confidentialité
            </h2>
            <p>
              Le présent DPA complète la{" "}
              <a
                href="/privacy"
                className="text-sky-700 hover:text-sky-800 font-medium"
              >
                Politique de confidentialité
              </a>{" "}
              de Casametrix, qui décrit les traitements réalisés en tant que
              responsable de traitement (données de compte, facturation,
              sécurité, prospection B2B, etc.).
            </p>
            <p>
              En cas de contradiction entre la Politique de confidentialité et
              le DPA concernant les traitements réalisés en qualité de
              Sous-traitant, les dispositions du présent DPA prévalent.
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

