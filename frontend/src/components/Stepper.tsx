import { Link, useLocation } from "react-router-dom";

const STEPS = [
  { path: "/", label: "Accueil" },
  { path: "/login", label: "Connexion" },
  { path: "/register", label: "Inscription" },
  { path: "/search", label: "Recherche" },
];

export default function Stepper() {
  const { pathname } = useLocation();
  const current = Math.max(0, STEPS.findIndex(s => s.path === pathname));

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Ligne fine */}
        <div className="relative h-[2px] bg-slate-200 rounded">
          <div
            className="absolute left-0 top-0 h-[2px] bg-blue-500 rounded transition-all"
            style={{ width: `${(current) / Math.max(1, STEPS.length - 1) * 100}%` }}
          />
        </div>

        {/* Pastilles fines */}
        <div className="mt-3 grid" style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0,1fr))` }}>
          {STEPS.map((s, i) => {
            const state = i < current ? "done" : i === current ? "active" : "todo";
            return (
              <Link key={s.path} to={s.path} className="flex flex-col items-center gap-1">
                <span className={[
                  "w-6 h-6 inline-flex items-center justify-center rounded-full text-xs border",
                  state === "done" && "bg-blue-500 border-blue-500 text-white",
                  state === "active" && "bg-white border-blue-500 text-blue-600",
                  state === "todo" && "bg-white border-slate-300 text-slate-400",
                ].filter(Boolean).join(" ")}>
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className={["text-xs", state === "active" ? "text-blue-600" : "text-slate-500"].join(" ")}>
                  {s.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
