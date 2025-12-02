import React from "react";
import { Link } from "react-router-dom";

export const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr,1fr]">
          {/* Bloc description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-semibold">
                Cx
              </div>
              <span className="text-sm font-semibold text-slate-900">
                Casametrix
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Plateforme d’analyse immobilière par adresse : DVF, DPE, cadastre,
              GPS et indicateurs ESG, réunis dans une même base pour vos équipes
              investissement, patrimoine et travaux.
            </p>
          </div>

          {/* Liens produit */}
          <div className="text-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
              Produit
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Recherche d’adresse
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Cas d’usage & retours
                </Link>
              </li>
              <li>
                <Link
                  to="/integrations"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Intégrations & API
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens légaux & support */}
          <div className="text-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
              Légal & support
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-slate-600 hover:text-slate-900"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/status"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Statut de la plateforme
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500">
            © {year} Casametrix. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-400">
            Données immobilières consolidées pour les équipes investissement,
            patrimoine, travaux et ESG.
          </p>
        </div>
      </div>
    </footer>
  );
};
