import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/blog", label: "Blog" },
  { to: "/pricing", label: "Tarifs" },
  { to: "/faq", label: "FAQ" },
];

// Icône X (Twitter)
function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M5 4h3l4 5.2L16.5 4H19l-5.3 6.7L19 20h-3l-4.3-5.6L7.5 20H5l5.4-6.9L5 4z"
        fill="#000000"
      />
    </svg>
  );
}

// Icône LinkedIn
function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#0A66C2" />
      <circle cx="8" cy="9" r="1.4" fill="white" />
      <rect x="7" y="11" width="2" height="7" fill="white" />
      <path
        d="M12 11h2v1c.4-.7 1-1.2 2-1.2 1.4 0 2.4.9 2.4 2.8V18h-2v-3c0-.9-.3-1.5-1.1-1.5-.8 0-1.3.6-1.3 1.5v3h-2v-6z"
        fill="white"
      />
    </svg>
  );
}

// Icône YouTube
function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="10" rx="3" fill="#FF0000" />
      <polygon points="11,10 11,14 15,12" fill="white" />
    </svg>
  );
}

export default function TopNav() {
  const socialBtnBase =
    "inline-flex items-center justify-center rounded-full p-2 hover:bg-slate-100 transition-colors";

  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* Logo + nom */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
            Cx
          </div>
          <span className="font-semibold text-slate-900">Casametrix</span>
        </div>

        {/* Navigation principale */}
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Réseaux + Connexion */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="tracking-[0.18em] uppercase">Réseaux</span>

            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className={socialBtnBase}
              aria-label="X"
            >
              <XIcon />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className={socialBtnBase}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className={socialBtnBase}
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </a>
          </div>

          <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
            Connexion
          </button>
        </div>
      </div>
    </header>
  );
}
