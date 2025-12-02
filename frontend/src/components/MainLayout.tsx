// /home/admincmx/projects/casametrix-ui/src/components/MainLayout.tsx

import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type MainLayoutProps = {
  children: ReactNode;
};

const navLinkBase =
  "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
const navLinkActive = "text-sm font-semibold text-slate-900";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER GLOBAL */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          {/* Logo + marque */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              Cx
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Casametrix
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Analyse immobilière
              </span>
            </div>
          </Link>

          {/* Navigation principale */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              Recherche d&apos;adresse
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              Tarifs
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              FAQ
            </NavLink>
          </nav>

          {/* Actions droite : login / essai */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="inline-flex rounded-full bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENU DES PAGES */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        {children}
      </main>

      {/* Footer simple (optionnel, peut être remplacé par un vrai footer plus tard) */}
      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-[11px] text-slate-500 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Casametrix. Tous droits réservés.</span>
          <div className="flex gap-4">
            <Link to="/legal" className="hover:text-slate-700">
              Mentions légales
            </Link>
            <Link to="/privacy" className="hover:text-slate-700">
              Confidentialité
            </Link>
            <Link to="/cgv" className="hover:text-slate-700">
              CGV
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
