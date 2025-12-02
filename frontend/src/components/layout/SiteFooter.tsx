import React from "react";
import { Link } from "react-router-dom";

const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Colonne gauche : marque */}
          <div className="space-y-1 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Casametrix</p>
            <p>© {year} Casametrix. Tous droits réservés.</p>
          </div>

          {/* Colonne droite : liens légaux */}
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
            <Link className="hover:text-slate-900" to="/legal">
              Mentions légales
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" to="/privacy">
              Politique de confidentialité
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" to="/cookies">
              Gestion des cookies
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" to="/cgv">
              Conditions générales de vente
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" to="/security">
              Sécurité
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" to="/status">
              Statut du service
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" to="/dpa">
              DPA / Traitement des données
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
