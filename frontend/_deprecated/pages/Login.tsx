import { useState } from "react";
import { httpPostForm } from "../lib/http";

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  org_id: string;
  user_id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const login = await httpPostForm<LoginResponse>("/auth/login", {
        username: email,
        password: password,
        grant_type: "password",
      });

      console.log("=== LOGIN RESPONSE ===");
      console.log(login);

      const token = login?.access_token;

      if (!token) {
        setError("Réponse inattendue du serveur (pas de token)");
        setLoading(false);
        return;
      }

      // Sauvegarde du token en cookie (propre)
      document.cookie = `casamx_session=${token}; path=/; max-age=3600; Secure; SameSite=Lax`;

      // Redirection tableau de bord
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Connexion à Casametrix
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
