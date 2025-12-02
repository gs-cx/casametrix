import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinkBase =
  "text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-full transition";
const navLinkActive = "bg-slate-100 text-slate-900";

export const SiteHeader: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo + baseline */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                Cx
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-slate-900">
                  Casametrix
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  Analyse immobilière
                </span>
              </div>
            </Link>
          </div>

          {/* Nav centrale (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : ""}`
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : ""}`
              }
            >
              Recherche d’adresse
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : ""}`
              }
            >
              Tarifs
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : ""}`
              }
            >
              Blog & cas d’usage
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : ""}`
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/api-docs"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : ""}`
              }
            >
              API
            </NavLink>
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 hover:bg-slate-50"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-sky-700"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>

      {/* Bandeau secondaire sur les pages non-home */}
      {location.pathname !== "/" && (
        <div className="border-t border-slate-200 bg-slate-50/80">
          <div className="max-w-6xl mx-auto px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Plateforme d’analyse immobilière par adresse
          </div>
        </div>
      )}
    </header>
  );
};
