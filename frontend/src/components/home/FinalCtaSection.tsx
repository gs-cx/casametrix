import React from "react";

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Prêt à tester Casametrix sur vos adresses ?
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Créez un compte, importez un fichier d’adresses ou appelez l’API
              pour voir immédiatement la valeur des données Casametrix dans vos
              flux métier.
            </p>
          </div>
          <div>
            <a
              href="/signup" // TODO: adapte à ton vrai chemin d'inscription
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-white text-slate-900 hover:bg-slate-100 transition"
            >
              Démarrer avec Casametrix
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
