// src/App.tsx
import React from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          CASAMETRIX
        </p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cette page est en cours de mise à jour. Le moteur d’adresse,
          l’authentification et le golden index seront réactivés étape par
          étape après le diagnostic.
        </p>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Header global
// -----------------------------------------------------------------------------
const Header: React.FC = () => {
  const navLinkClass =
    "text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-full transition";
  const navLinkActiveClass =
    "text-sm font-semibold text-slate-900 px-3 py-2 rounded-full bg-slate-100";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            Cx
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              Casametrix
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Analyse immobilière
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Recherche d’adresse
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Tarifs
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            FAQ
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden text-xs font-medium text-slate-700 hover:text-slate-900 md:inline"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </header>
  );
};

// -----------------------------------------------------------------------------
// App
// -----------------------------------------------------------------------------
const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/pricing"
            element={<PlaceholderPage title="Tarifs Casametrix" />}
          />
          <Route
            path="/blog"
            element={<PlaceholderPage title="Blog Casametrix" />}
          />
          <Route
            path="/faq"
            element={<PlaceholderPage title="FAQ Casametrix" />}
          />
          <Route
            path="/login"
            element={<PlaceholderPage title="Connexion" />}
          />
          <Route
            path="/register"
            element={<PlaceholderPage title="Créer un compte" />}
          />

          {/* Fallback : toute autre URL renvoie vers l’accueil */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
