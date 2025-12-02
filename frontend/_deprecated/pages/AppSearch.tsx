import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { API_BASE, clearToken, getToken, me } from "../lib/auth";
import CasametrixByAddressUI from "../components/ByAddress";
import CasametrixAdvancedAndDetail from "../components/AdvancedAndDetail";

export default function AppSearch() {
  const [tab, setTab] = useState<"by"|"search">("by");
  const [token, setToken] = useState<string>(getToken());
  const [userEmail, setUserEmail] = useState<string>("…");

  useEffect(() => {
    const t = getToken();
    setToken(t);
    (async () => {
      try {
        const data = await me(t);
        setUserEmail(data?.email || "user");
      } catch {
        setUserEmail("user");
      }
    })();
  }, []);

  function logout() {
    clearToken();
    window.location.href = "/"; // retour à l'accueil
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center shadow-sm">
            <Building2 className="h-5 w-5" />
          </Link>
          <div className="text-slate-900 font-semibold">CasaMetrix — Espace client</div>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <div className="text-slate-600">Connecté : <span className="font-medium">{userEmail}</span></div>
            <button onClick={logout} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border hover:bg-slate-50">
              <LogOut className="h-4 w-4" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="mb-3 flex items-center gap-2">
          <button onClick={()=>setTab("by")} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='by'?'bg-slate-900 text-white':'border'}`}>By address</button>
          <button onClick={()=>setTab("search")} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='search'?'bg-slate-900 text-white':'border'}`}>Search avancé</button>
          <div className="ml-auto text-xs text-slate-500">API: <span className="font-mono">{API_BASE}</span></div>
        </div>

        {tab==="by" && <CasametrixByAddressUI baseUrl={API_BASE} token={token} />}
        {tab==="search" && <CasametrixAdvancedAndDetail baseUrl={API_BASE} token={token} />}
      </main>
    </div>
  );
}
