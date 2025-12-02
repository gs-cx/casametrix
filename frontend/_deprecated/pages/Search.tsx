import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type AddressResult = {
  id: string;
  address: string;
  postal_code: string;
  city: string;
  lat?: number | null;
  lng?: number | null;
  created_at?: string | null;
};

const API_BASE = "https://api.casametrix.com";

export function SearchPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gestion du quota gratuit
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      setError("Merci de saisir une adresse, une ville ou un code postal.");
      setResults([]);
      return;
    }

    // Si le quota est déjà dépassé, on ne relance pas d’appel
    if (quotaExceeded) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url =
        API_BASE +
        "/addresses/search?q=" +
        encodeURIComponent(query.trim()) +
        "&limit=15";

      const resp = await fetch(url);

      // Cas 429 = quota gratuit dépassé
      if (resp.status === 429) {
        let payload: any = null;
        try {
          payload = await resp.json();
        } catch {
          // on ignore, on se base sur le statut
        }

        const detail = payload?.detail;
        const message =
          (detail && (detail.message || detail)) ||
          "Vous avez atteint la limite de recherches gratuites pour aujourd’hui.";

        setQuotaExceeded(true);
        setError(message);
        setResults([]);
        setHasSearchedOnce(true);
        return;
      }

      // Autre erreur HTTP
      if (!resp.ok) {
        const text = await resp.text();
        console.error("Erreur API:", resp.status, text);
        throw new Error(
          `Erreur API (${resp.status}) – impossible de lancer la recherche.`
        );
      }

      const data: AddressResult[] = await resp.json();
      setResults(data);
      setHasSearchedOnce(true);
    } catch (err: any) {
      console.error("Erreur lors de la recherche d’adresses :", err);
      setError(
        err?.message ||
          "Une erreur est survenue pendant la recherche. Merci de réessayer."
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToPricing = () => {
    navigate("/pricing");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
            Recherche
          </h1>
          <p className="text-sm text-slate-500">
            Connecté en tant que{" "}
            <span className="font-medium text-slate-800">
              invité (mode découverte)
            </span>
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-slate-700"
              >
                Adresse, ville ou code postal
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  id="search"
                  type="text"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex. 12 rue Nationale Lille, 59000, Lyon 2e…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                  disabled={quotaExceeded}
                />
                <button
                  type="submit"
                  disabled={loading || quotaExceeded}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm md:text-base font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Recherche…" : "Rechercher"}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Casametrix utilise un moteur d’indexation optimisé pour les
                adresses françaises (FTS + fr_unaccent).
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {quotaExceeded && (
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <p className="font-medium mb-1">
                  Vous avez atteint votre quota gratuit pour aujourd’hui.
                </p>
                <p className="mb-3">
                  Créez un compte Casametrix et choisissez un plan pour continuer
                  à utiliser la recherche d’adresses.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleGoToLogin}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Créer un compte / Se connecter
                  </button>
                  <button
                    type="button"
                    onClick={handleGoToPricing}
                    className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                  >
                    Voir les tarifs
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 md:mt-8 space-y-4">
            {!loading &&
              hasSearchedOnce &&
              results.length === 0 &&
              !error &&
              !quotaExceeded && (
                <p className="text-sm text-slate-500">
                  Aucun résultat pour{" "}
                  <span className="font-medium">« {query.trim()} »</span>.
                  Essayez avec une autre formulation (numéro de rue, nom de la
                  ville, code postal…).
                </p>
              )}

            {results.length > 0 && (
              <>
                <p className="text-xs text-slate-500 mb-1">
                  {results.length} résultat
                  {results.length > 1 ? "s" : ""} trouvé
                  {results.length >= 15 && " (limité à 15 pour l’instant)"}
                </p>
                <ul className="space-y-3">
                  {results.map((d) => (
                    <li
                      key={d.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:border-blue-200 hover:bg-white transition-colors cursor-default"
                    >
                      <div className="text-sm font-medium text-slate-900">
                        {d.address}
                      </div>
                      <div className="text-xs text-slate-500">
                        {d.postal_code} {d.city}
                      </div>
                      {(d.lat ?? null) !== null && (d.lng ?? null) !== null && (
                        <div className="mt-1 text-[11px] text-slate-400">
                          lat: {d.lat?.toFixed(5)} · lng: {d.lng?.toFixed(5)}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default SearchPage;
