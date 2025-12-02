import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Building2 } from "lucide-react";
import { API_BASE, getToken, login, me, register, setToken } from "../lib/auth";

export default function AuthPage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<"login" | "signup">((params.get("tab") as any) || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  const nav = useNavigate();

  useEffect(() => {
    const t = getToken();
    if (t) nav("/app", { replace: true });
  }, [nav]);

  async function doLogin() {
    try {
      setBusy(true);
      setErr(undefined);
      const data = await login(email, password);
      const token = data?.access_token || data?.token || "";
      if (!token) throw new Error("Token absent");
      setToken(token);
      await me(token); // optionnel: validation
      nav("/app", { replace: true });
    } catch (e: any) {
      setErr(e?.message || "Erreur de connexion");
    } finally {
      setBusy(false);
    }
  }

  async function doSignup() {
    try {
      setBusy(true);
      setErr(undefined);
      // ⚠️ Renverra une erreur si /auth/register n'existe pas encore côté API
      await register(email, password);
      await doLogin();
    } catch (e: any) {
      setErr(e?.message || "Erreur d'inscription (vérifier /auth/register côté API)");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center shadow-sm">
            <Building2 className="h-5 w-5" />
          </Link>
          <div className="text-slate-900 font-semibold">CasaMetrix</div>
          <div className="ml-auto text-sm text-slate-600">
            API: <span className="font-mono">{API_BASE || "(non défini)"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        <div className="mt-8 rounded-2xl border bg-white shadow-sm">
          <div className="p-3 border-b flex">
            <button
              onClick={() => setTab("login")}
              className={`px-4 py-2 rounded-lg text-sm ${tab === "login" ? "bg-slate-900 text-white" : "border"}`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`ml-2 px-4 py-2 rounded-lg text-sm ${tab === "signup" ? "bg-slate-900 text-white" : "border"}`}
            >
              Créer un compte
            </button>
          </div>

          <div className="p-4 space-y-3">
            <label className="text-sm block">
              <div className="text-xs text-slate-500">Email</div>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="text-sm block">
              <div className="text-xs text-slate-500">Mot de passe</div>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {err && <div className="text-sm text-red-600">{err}</div>}

            {tab === "login" ? (
              <button
                disabled={busy}
                onClick={doLogin}
                className="w-full py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                {busy ? "Connexion…" : "Se connecter"}
              </button>
            ) : (
              <button
                disabled={busy}
                onClick={doSignup}
                className="w-full py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                {busy ? "Création…" : "Créer mon compte"}
              </button>
            )}

            <div className="text-xs text-slate-500">
              En créant un compte, vous acceptez nos conditions d’utilisation (démo).
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
