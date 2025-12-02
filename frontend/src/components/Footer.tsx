const SOCIAL_LINKS = [
  { label: "X", href: "https://twitter.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Ligne principale */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between">
          {/* Bloc marque */}
          <div className="space-y-2 max-w-sm">
            <p className="font-semibold text-slate-900">Casametrix</p>
            <p className="text-sm text-slate-600">
              Plateforme d’analyse immobilière et d’intelligence d’adresse
              pour décider vite et bien, à partir de données unifiées et
              vérifiées.
            </p>
          </div>

          {/* Navigation légale / aide */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">Produit</p>
              <a
                href="/pricing"
                className="block text-slate-600 hover:text-slate-900"
              >
                Tarifs
              </a>
              <a
                href="/blog"
                className="block text-slate-600 hover:text-slate-900"
              >
                Blog
              </a>
              <a
                href="/faq"
                className="block text-slate-600 hover:text-slate-900"
              >
                FAQ & cas d’usage
              </a>
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-slate-900">Légal</p>
              <a
                href="/legal"
                className="block text-slate-600 hover:text-slate-900"
              >
                Mentions légales
              </a>
              <a
                href="/cgv"
                className="block text-slate-600 hover:text-slate-900"
              >
                CGV
              </a>
              <a
                href="/privacy"
                className="block text-slate-600 hover:text-slate-900"
              >
                Politique de confidentialité
              </a>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-900">Réseaux</p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Bas de page */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">
            © {year} Casametrix — Tous droits réservés.
          </p>
          <p className="text-[11px] text-slate-400">
            Les informations communiquées sur ce site sont fournies à titre
            indicatif et ne constituent pas un conseil juridique ou fiscal.
          </p>
        </div>
      </div>
    </footer>
  );
}
