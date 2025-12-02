import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t mt-20 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* COLONNE 1 */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Casametrix</h3>
          <p className="text-gray-600 text-sm">
            L’information immobilière simplifiée pour les équipes B2B : DVF, DPE, cadastre, scoring et API unifiée.
          </p>
        </div>

        {/* COLONNE 2 */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link></li>
            <li><Link to="/search" className="text-gray-600 hover:text-gray-900">Recherche d’adresse</Link></li>
            <li><Link to="/pricing" className="text-gray-600 hover:text-gray-900">Tarifs</Link></li>
            <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
          </ul>
        </div>

        {/* COLONNE 3 — LEGAL */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Légal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/legal" className="text-gray-600 hover:text-gray-900">Mentions légales</Link></li>
            <li><Link to="/cgv" className="text-gray-600 hover:text-gray-900">Conditions générales de vente (CGV)</Link></li>
            <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Politique de confidentialité</Link></li>
            <li><Link to="/cookies" className="text-gray-600 hover:text-gray-900">Cookies</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Casametrix — Tous droits réservés.
      </div>
    </footer>
  );
}
