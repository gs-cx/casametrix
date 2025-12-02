import React from "react";

export const DataApiSection: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          Données et API au niveau de l’adresse
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Casametrix se concentre sur la qualité des données et leur
          exposabilité dans vos outils métier.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Données disponibles
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Transactions immobilières (DVF, France entière).</li>
              <li>
                Diagnostics de performance énergétique (DPE) et classes
                associées.
              </li>
              <li>
                Parcelles et bâti : cadastre, typologie, surfaces, occupation.
              </li>
              <li>
                Contexte local : densité, tension, environnement immédiat.
              </li>
              <li>
                Coordonnées GPS et géocodage multi-sources, normalisation
                d’adresse.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              API & intégration
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Recherche d’adresse et normalisation.</li>
              <li>
                Fiche adresse unifiée : DVF, DPE, contexte local et coordonnées.
              </li>
              <li>
                Scores prêts à l’emploi : tension, rénovation, intention
                travaux.
              </li>
              <li>
                Webhooks & intégrations no-code / CRM pour vos workflows
                existants.
              </li>
              <li>
                Journalisation et traçabilité des appels pour la conformité.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
