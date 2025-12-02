import { useLocation, useNavigate } from "react-router-dom";

const STEPS = [
  { path: "/", label: "Accueil" },
  { path: "/blog", label: "Blog" },
  { path: "/pricing", label: "Tarifs" },
  { path: "/search", label: "Recherche" },
];

export default function StepsBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="border-b border-slate-100 bg-slate-50/60">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        {STEPS.map((step) => {
          const active = isActive(step.path);

          return (
            <button
              key={step.path}
              type="button"
              onClick={() => navigate(step.path)}
              className={[
                "rounded-full border px-3.5 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-blue-600 bg-white text-blue-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600",
              ].join(" ")}
            >
              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
