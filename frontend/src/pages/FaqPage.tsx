// src/pages/FaqPage.tsx
import React from "react";
import PageMeta from "@/components/PageMeta";

const FaqPage: React.FC = () => {
  return (
    <>
      <PageMeta title="FAQ - Casametrix" description="Questions fréquentes sur Casametrix : données utilisées, recherche d’adresse, golden index, sécurité et intégration API." path="/faq" />

      <main className="min-h-screen bg-slate-50 pb-16">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Foire aux questions
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Tout ce que l’on vous demande le plus souvent.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
              Si vous ne trouvez pas votre réponse ici, vous pouvez nous écrire
              directement depuis la page support ou demander une démonstration.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-4xl px-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              1. Quelles données utilise Casametrix ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Casametrix s’appuie sur plusieurs briques de données :
              transactions DVF, diagnostics DPE, informations cadastrales,
              géolocalisation et, à terme, des indicateurs ESG. L’objectif est
              de ramener ces données à un langage simple : l’adresse.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              2. Faut-il un compte pour tester la recherche d’adresse ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Non. Vous pouvez tester la recherche d’adresse gratuitement, dans
              la limite de quelques requêtes par jour. La création de compte
              permet ensuite d’accéder à plus de fonctionnalités et d’historique.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              3. Qu’est-ce que le golden index d’adresses ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Le golden index est la liste des adresses réellement pertinentes
              pour vous : celles sur lesquelles vos équipes travaillent, que vous
              souhaitez suivre, analyser ou documenter. Casametrix vous aide à
              construire et maintenir cet index à jour dans le temps.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              4. Comment est gérée la sécurité des données ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              L’API est sécurisée via des jetons JWT, et chaque organisation est
              cloisonnée via des règles de sécurité en base (RLS). Les accès sont
              journalisés et limités selon les profils.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default FaqPage;
