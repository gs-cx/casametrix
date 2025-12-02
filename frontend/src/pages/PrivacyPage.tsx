import PageMeta from "../components/PageMeta";

export default function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Politique de confidentialité"
        description="Politique de confidentialité Casametrix : types de données collectées, finalités, bases légales, durées de conservation, sous-traitants, transferts, droits RGPD et sécurité."
        path="/privacy"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Politique de confidentialité
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Politique de confidentialité & protection des données
          </h1>

          {/* Bandeau important */}
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <strong>Important :</strong> cette politique de confidentialité est
            un modèle pour un service SaaS B2B. Elle doit être adaptée à vos
            traitements effectifs et validée par votre DPO ou votre conseil
            juridique.
          </p>

          {/* 1. Responsable du traitement */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              1. Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement des données à caractère personnel
              collectées via le site casametrix.com et la Plateforme Casametrix
              est :
            </p>
            <p className="mt-1">
              <span className="font-medium">[Raison sociale]</span>
              <br />
              [Adresse du siège social]
              <br />
              [Email de contact RGPD / DPO]
            </p>
          </section>

          {/* 2. Données collectées */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              2. Données collectées
            </h2>
            <p>Casametrix peut collecter les catégories de données suivantes :</p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                <span className="font-medium">Données d’identification :</span>{" "}
                nom, prénom, fonction, email professionnel, téléphone
                professionnel.
              </li>
              <li>
                <span className="font-medium">Données de connexion :</span>{" "}
                identifiants, mots de passe (hashés), logs de connexion, adresse
                IP.
              </li>
              <li>
                <span className="font-medium">Données de navigation :</span>{" "}
                pages consultées, horodatages, actions réalisées sur la
                Plateforme.
              </li>
              <li>
                <span className="font-medium">Données contractuelles :</span>{" "}
                Abonnement, historique de facturation.
              </li>
              <li>
                <span className="font-medium">Données métiers :</span> listes
                d’adresses ou données que le Client importe ou fait traiter via
                la Plateforme, dans le cadre de ses propres finalités.
              </li>
            </ul>
          </section>

          {/* 3. Finalités et bases légales */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              3. Finalités et bases légales
            </h2>
            <p>
              Les traitements réalisés par Casametrix poursuivent notamment les
              finalités suivantes :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                <span className="font-medium">
                  Gestion des comptes et accès à la Plateforme
                </span>{" "}
                (exécution du contrat).
              </li>
              <li>
                <span className="font-medium">
                  Facturation, comptabilité et suivi de la relation client
                </span>{" "}
                (obligation légale et exécution du contrat).
              </li>
              <li>
                <span className="font-medium">Sécurisation de la Plateforme</span>{" "}
                (intérêt légitime à prévenir la fraude et les accès non
                autorisés).
              </li>
              <li>
                <span className="font-medium">
                  Amélioration du service et statistiques
                </span>{" "}
                (intérêt légitime à améliorer le produit).
              </li>
              <li>
                <span className="font-medium">
                  Prospection B2B et communication
                </span>{" "}
                (intérêt légitime, dans le respect des règles applicables à la
                prospection électronique).
              </li>
            </ul>
          </section>

          {/* 4. Durées de conservation */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              4. Durées de conservation
            </h2>
            <p>À titre indicatif :</p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>
                Données de compte : pendant la durée de l’Abonnement, puis [X]
                ans à compter de sa résiliation.
              </li>
              <li>
                Données de facturation : pendant la durée légale applicable
                (généralement 10 ans).
              </li>
              <li>
                Logs de connexion : quelques mois, puis archivage ou
                anonymisation.
              </li>
              <li>
                Données métiers importées par le Client : pendant la durée
                contractuelle définie, puis suppression ou restitution selon les
                modalités prévues.
              </li>
            </ul>
          </section>

          {/* 5. Destinataires et sous-traitants */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              5. Destinataires et sous-traitants
            </h2>
            <p>
              Les données sont accessibles uniquement aux personnes habilitées
              au sein de Casametrix (équipe produit, support, facturation) et à
              certains prestataires techniques agissant en qualité de{" "}
              <span className="font-medium">sous-traitants</span> (hébergeurs,
              outils d’emailing, solutions d’observabilité, etc.).
            </p>
            <p>
              Casametrix veille à ce que ces prestataires présentent des
              garanties suffisantes en matière de sécurité et de confidentialité
              et soient contractualisés conformément à l’article 28 du RGPD.
            </p>
          </section>

          {/* 6. Transferts hors UE */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              6. Transferts hors Union européenne
            </h2>
            <p>
              En principe, les données sont hébergées et traitées au sein de
              l’Union européenne. Si certains prestataires se trouvent en dehors
              de l’UE, Casametrix s’engage à encadrer ces transferts par des
              mécanismes de protection appropriés (clauses contractuelles types,
              décision d’adéquation, etc.).
            </p>
          </section>

          {/* 7. Droits des personnes */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              7. Droits des personnes concernées
            </h2>
            <p>
              Conformément au RGPD, toute personne concernée dispose des droits
              suivants sur ses données :
            </p>
            <ul className="mt-2 list-disc pl-5 text-xs space-y-1.5">
              <li>Droit d’accès et de rectification ;</li>
              <li>Droit à l’effacement (droit à l’oubli) ;</li>
              <li>Droit à la limitation du traitement ;</li>
              <li>Droit d’opposition, notamment à la prospection ;</li>
              <li>Droit à la portabilité ;</li>
              <li>
                Droit de définir des directives relatives au sort des données
                après décès.
              </li>
            </ul>
            <p className="mt-2">
              Ces droits peuvent être exercés en contactant :{" "}
              <span className="font-medium">[email RGPD / DPO]</span>.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              En cas de désaccord persistant, la personne concernée peut
              introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>

          {/* 8. Cookies */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              8. Cookies et autres traceurs
            </h2>
            <p>
              L’utilisation de cookies et autres traceurs sur le site
              casametrix.com est décrite dans la{" "}
              <a
                href="/cookies"
                className="text-sky-700 hover:text-sky-800 font-medium"
              >
                Politique de cookies
              </a>
              .
            </p>
          </section>

          {/* 9. Sécurité */}
          <section className="mt-8 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              9. Mesures de sécurité
            </h2>
            <p>
              Casametrix met en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger les données (contrôle d’accès,
              chiffrement des flux, journalisation, sauvegardes, isolation des
              environnements, etc.).
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Une présentation synthétique de l’approche sécurité est disponible
              sur la page{" "}
              <span className="font-medium">Sécurité &amp; RGPD</span> de
              Casametrix.
            </p>
          </section>

          {/* 10. Évolution */}
          <section className="mt-8 mb-6 space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">
              10. Évolution de la présente politique
            </h2>
            <p>
              La présente politique de confidentialité peut être amenée à
              évoluer. Toute modification substantielle sera portée à la
              connaissance des utilisateurs par un moyen approprié (bandeau
              d’information, notification, etc.).
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
