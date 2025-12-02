// src/pages/LoginPage.tsx
import React from "react";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Connexion - Casametrix" description="Connectez-vous à votre compte Casametrix pour accéder à votre golden index d’adresses, à la recherche avancée et aux futures fonctionnalités DVF/DPE/ESG." path="/login" />

      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pb-16 pt-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Connexion à Casametrix
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Accédez à votre espace, à vos adresses enregistrées et à vos outils
            d’analyse immobilière.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Mot de passe
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="font-semibold text-sky-700 hover:text-sky-800"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
