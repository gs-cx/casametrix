import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
            Plateforme d’intelligence d’adresse
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            Qualifiez une adresse, décidez en quelques secondes.
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Casametrix unifie cadastre, DVF, DPE, contexte local et coordonnées
            GPS pour vous aider à cibler les meilleures adresses, prioriser les
            travaux et documenter vos décisions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/app" // TODO: adapte le lien réel de ton app / recherche
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Essayer la recherche d’adresse
            </a>

            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 transition"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Sans carte bancaire, accès limité pour découvrir la plateforme.
          </p>
        </div>
      </div>
    </section>
  );
};
