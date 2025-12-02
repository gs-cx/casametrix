import React from "react";
import { Link } from "react-router-dom";

const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Bloc marque */}
          <div className="max-w-sm space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-slate-950">
                Cx
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Casametrix
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Analyse immobilière d&apos;adresse&nbsp;: DVF, DPE, cadastre et
              scoring réunis dans un golden index multi-adresses pensé pour les
              décideurs B2B.
            </p>
          </div>

          {/* Liens */}
          <div className="grid flex-1 gap-8 text-sm sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Produit
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link to="/search" className="hover:text-white">
                    Moteur d’adresse
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="hover:text-white">
                    Documentation API
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Ressources
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link to="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="hover:text-white">
                    Statut du service
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-white">
                    Sécurité
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-white">
                    Support &amp; contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Légal &amp; conformité
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link to="/legal" className="hover:text-white">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="hover:text-white">
                    Conditions générales de vente
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-white">
                    Politique cookies
                  </Link>
                </li>
                <li>
                  <Link to="/dpa" className="hover:text-white">
                    DPA &amp; sous-traitants
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {year} Casametrix. Tous droits réservés. Hébergement en Union
            européenne.
          </p>
          <p className="text-slate-600">
            Golden index d’adresse · DVF · DPE · cadastre · scoring ESG.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
