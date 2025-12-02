// src/pages/SearchPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix des icônes Leaflet avec Vite (sinon pas d’icône de marqueur)
import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

(L.Icon.Default as any).mergeOptions({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type BanFeature = {
  properties: {
    label: string;
    city?: string;
    postcode?: string;
    score?: number;
  };
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
};

type BanAutocompleteResponse = {
  features: BanFeature[];
};

type BanSuggestion = {
  id: string;
  label: string;
  city?: string;
  postal_code?: string;
  score?: number;
  lat?: number;
  lng?: number;
};

type SavedAddress = {
  id: string;
  address: string;
  postal_code?: string;
  city?: string;
  lat?: number;
  lng?: number;
  created_at?: string;
};

type GoldenAddress = {
  id: string;
  address: string;
  postal_code?: string;
  city?: string;
  lat?: number;
  lng?: number;
};

type GoldenSearchResponse = {
  results: GoldenAddress[];
};

type ToastType = "info" | "success" | "error";

type Toast = {
  id: number;
  type: ToastType;
  message: string;
};

type LatLng = { lat: number; lng: number };

// -----------------------------------------------------------------------------
// Constantes
// -----------------------------------------------------------------------------

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.casametrix.com";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken, currentUser } = useAuth();

  // BAN autocomplete
  const [banQuery, setBanQuery] = useState("");
  const [banSuggestions, setBanSuggestions] = useState<BanSuggestion[]>([]);
  const [banLoading, setBanLoading] = useState(false);
  const [banError, setBanError] = useState<string | null>(null);

  // Adresse enregistrée via /addresses/ban-log
  const [savedAddress, setSavedAddress] = useState<SavedAddress | null>(null);

  // Géoloc (sans carte)
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsPosition, setGpsPosition] = useState<LatLng | null>(null);

  // Golden index /addresses/search
  const [goldenQuery, setGoldenQuery] = useState("");
  const [goldenLoading, setGoldenLoading] = useState(false);
  const [goldenError, setGoldenError] = useState<string | null>(null);
  const [goldenQuotaReached, setGoldenQuotaReached] = useState(false);
  const [goldenResults, setGoldenResults] = useState<GoldenAddress[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  // Carte Leaflet
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mapMarkerRef = useRef<L.Marker | null>(null);

  // ---------------------------------------------------------------------------
  // Helpers toasts
  // ---------------------------------------------------------------------------

  const showToast = (message: string, type: ToastType = "info") => {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toastClasses = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-emerald-200 bg-emerald-50 text-emerald-900";
      case "error":
        return "border-red-200 bg-red-50 text-red-900";
      case "info":
      default:
        return "border-slate-200 bg-white text-slate-900";
    }
  };

  // ---------------------------------------------------------------------------
  // BAN autocomplete : /addresses/ban-autocomplete
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!banQuery || banQuery.length < 3) {
      setBanSuggestions([]);
      setBanError(null);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        setBanLoading(true);
        setBanError(null);

        const url = new URL(
          "/addresses/ban-autocomplete",
          API_BASE_URL,
        ).toString();

        const resp = await fetch(`${url}?q=${encodeURIComponent(banQuery)}`, {
          signal: controller.signal,
        });

        if (!resp.ok) {
          throw new Error("Erreur lors de la récupération des suggestions BAN.");
        }

        const json = (await resp.json()) as BanAutocompleteResponse;

        const mapped: BanSuggestion[] = (json.features || []).map(
          (feature, idx) => {
            const [lon, lat] = feature.geometry.coordinates;
            return {
              id: `${idx}-${feature.properties.label}`,
              label: feature.properties.label,
              city: feature.properties.city,
              postal_code: feature.properties.postcode,
              score: feature.properties.score,
              lat: typeof lat === "number" ? lat : undefined,
              lng: typeof lon === "number" ? lon : undefined,
            };
          },
        );

        setBanSuggestions(mapped);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error(err);
        const msg =
          "Impossible de récupérer les suggestions BAN pour le moment.";
        setBanError(msg);
        showToast(msg, "error");
      } finally {
        setBanLoading(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 250);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [banQuery]);

  const handleBanSuggestionClick = async (suggestion: BanSuggestion) => {
    try {
      setBanError(null);

      const url = new URL("/addresses/ban-log", API_BASE_URL).toString();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Si un token est présent, on l’envoie, mais ce n’est pas obligatoire
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const resp = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          label: suggestion.label,
          city: suggestion.city,
          postal_code: suggestion.postal_code,
          lat: suggestion.lat,
          lng: suggestion.lng,
        }),
      });

      if (resp.status === 401) {
        const msg =
          "Vous devez être connecté pour enregistrer une adresse dans le golden index.";
        setBanError(msg);
        showToast(msg, "error");
        return;
      }

      if (!resp.ok) {
        throw new Error("Erreur lors de l'enregistrement de l'adresse.");
      }

      const json = (await resp.json()) as SavedAddress;
      setSavedAddress(json);

      showToast("Adresse enregistrée dans le golden index.", "success");
    } catch (err) {
      console.error(err);
      const msg =
        "Impossible d’enregistrer cette adresse pour le moment.";
      setBanError(msg);
      showToast(msg, "error");
    }
  };

  // ---------------------------------------------------------------------------
  // Géolocalisation ("Me localiser")
  // ---------------------------------------------------------------------------

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      const msg =
        "La géolocalisation n’est pas supportée par ce navigateur.";
      setGpsError(msg);
      showToast(msg, "error");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = { lat: latitude, lng: longitude };
        setGpsPosition(coords);
        setGpsLoading(false);
        showToast("Position détectée.", "info");
      },
      (err) => {
        console.error(err);
        let msg = "Erreur de géolocalisation inattendue.";
        if (err.code === err.PERMISSION_DENIED) {
          msg =
            "Autorisation de géolocalisation refusée. Vous pouvez l’activer dans les paramètres du navigateur.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Position indisponible pour le moment.";
        } else if (err.code === err.TIMEOUT) {
          msg =
            "La demande de géolocalisation a expiré. Merci de réessayer.";
        }
        setGpsError(msg);
        showToast(msg, "error");
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // ---------------------------------------------------------------------------
  // Golden index : /addresses/search + gestion 429
  // ---------------------------------------------------------------------------

  const handleGoldenSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!goldenQuery.trim()) {
      const msg =
        "Veuillez saisir un texte avant de lancer la recherche.";
      setGoldenError(msg);
      showToast(msg, "info");
      return;
    }

    try {
      setGoldenLoading(true);
      setGoldenError(null);
      setGoldenQuotaReached(false);

      const url = new URL("/addresses/search", API_BASE_URL).toString();
      const headers: HeadersInit = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const resp = await fetch(`${url}?q=${encodeURIComponent(goldenQuery)}`, {
        headers,
      });

      if (resp.status === 429) {
        const body = await resp.json().catch(() => null);
        const detail =
          body && typeof body.detail === "string"
            ? body.detail
            : "Quota de recherche atteint pour aujourd’hui sur cette adresse IP.";
        setGoldenError(detail);
        setGoldenQuotaReached(true);
        setGoldenResults([]);
        showToast(detail, "error");
        return;
      }

      if (!resp.ok) {
        throw new Error("Erreur lors de la recherche dans le golden index.");
      }

      const json = (await resp.json()) as GoldenSearchResponse;
      setGoldenResults(json.results || []);
      if ((json.results || []).length === 0) {
        showToast("Aucune adresse trouvée pour cette recherche.", "info");
      } else {
        showToast(
          `${json.results.length} adresse(s) trouvée(s) dans le golden index.`,
          "success",
        );
      }
    } catch (err) {
      console.error(err);
      const msg =
        "Impossible d’interroger le golden index pour le moment. Merci de réessayer plus tard.";
      setGoldenError(msg);
      showToast(msg, "error");
    } finally {
      setGoldenLoading(false);
    }
  };

  const quotaLabel = currentUser
    ? "Compte connecté · quota illimité (actuellement plan free)"
    : "Invité · 3 recherches/jour et par IP";

  // ---------------------------------------------------------------------------
  // Carte Leaflet : centre = adresse enregistrée ou position GPS
  // ---------------------------------------------------------------------------

  // Choix du point principal (savedAddress prioritaire sur gps)
  useEffect(() => {
    if (savedAddress && typeof savedAddress.lat === "number" && typeof savedAddress.lng === "number") {
      setMapCenter({ lat: savedAddress.lat, lng: savedAddress.lng });
    } else if (gpsPosition) {
      setMapCenter(gpsPosition);
    }
  }, [savedAddress, gpsPosition]);

  // Initialisation / mise à jour de la carte
  useEffect(() => {
    if (!mapCenter || !mapContainerRef.current) {
      return;
    }

    let map = mapInstanceRef.current;

    if (!map) {
      map = L.map(mapContainerRef.current).setView(
        [mapCenter.lat, mapCenter.lng],
        15,
      );
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker([mapCenter.lat, mapCenter.lng]).addTo(map);
      mapMarkerRef.current = marker;
    } else {
      map.setView([mapCenter.lat, mapCenter.lng]);
      if (mapMarkerRef.current) {
        mapMarkerRef.current.setLatLng([mapCenter.lat, mapCenter.lng]);
      } else {
        mapMarkerRef.current = L.marker([mapCenter.lat, mapCenter.lng]).addTo(
          map,
        );
      }
    }
  }, [mapCenter]);

  // Cleanup carte à l’unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Rendu
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* TOASTS */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 rounded-2xl border px-3 py-2 text-xs shadow-lg ${toastClasses(
              toast.type,
            )}`}
          >
            <div className="flex-1">
              <p className="font-semibold">
                {toast.type === "error"
                  ? "Erreur"
                  : toast.type === "success"
                  ? "Succès"
                  : "Information"}
              </p>
              <p className="mt-1 text-[11px] leading-snug">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="ml-2 text-[11px] font-semibold text-slate-500 hover:text-slate-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
          {/* Titre & intro */}
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Recherche d’adresse
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Moteur d’adresse Casametrix
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Tapez une adresse pour obtenir des suggestions issues de la Base
              Adresse Nationale (BAN), enregistrez l’adresse cliquée dans le
              golden index Casametrix, et testez votre quota de recherche.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {/* Colonne gauche : BAN + Golden search */}
            <div className="space-y-6">
              {/* Bloc BAN & géoloc */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Auto-complétion BAN
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900">
                      Trouvez une adresse avec la Base Adresse Nationale
                    </h2>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    BAN
                    <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-600">
                      Données officielles
                    </span>
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="ban-query"
                      className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                    >
                      Adresse à rechercher
                    </label>
                    <input
                      id="ban-query"
                      type="text"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      placeholder="Ex. : 10 rue de la Paix, Paris"
                      value={banQuery}
                      onChange={(e) => setBanQuery(e.target.value)}
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                      Les suggestions proviennent de l’API{" "}
                      <a
                        href="https://api.gouv.fr/les-api/base-adresse-nationale"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        Base Adresse Nationale
                      </a>
                      .
                    </p>
                  </div>

                  {banLoading && (
                    <p className="text-xs text-slate-500">
                      Recherche de suggestions BAN…
                    </p>
                  )}

                  {banError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {banError}
                    </div>
                  )}

                  {banSuggestions.length > 0 && (
                    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50">
                      {banSuggestions.map((s) => (
                        <li
                          key={s.id}
                          className="flex cursor-pointer items-start justify-between gap-3 px-3 py-2 hover:bg-slate-100"
                          onClick={() => handleBanSuggestionClick(s)}
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {s.label}
                            </p>
                            <p className="text-xs text-slate-500">
                              {s.postal_code} {s.city}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-50">
                              BAN
                            </span>
                            {typeof s.score === "number" && (
                              <span className="text-[10px] text-slate-500">
                                Score :{" "}
                                {Math.round((s.score ?? 0) * 100) / 100}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleLocateMe}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      {gpsLoading ? "Localisation…" : "Me localiser"}
                    </button>
                    {gpsError && (
                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            "https://support.google.com/chrome/answer/142065",
                            "_blank",
                          )
                        }
                        className="text-[11px] text-sky-700 underline"
                      >
                        Comment activer la localisation ?
                      </button>
                    )}
                  </div>

                  {gpsError && (
                    <p className="mt-1 text-[11px] text-red-600">
                      {gpsError}
                    </p>
                  )}

                  {gpsPosition && (
                    <p className="mt-2 text-[11px] text-slate-600">
                      Position détectée : lat {gpsPosition.lat.toFixed(5)}, lng{" "}
                      {gpsPosition.lng.toFixed(5)}.
                    </p>
                  )}

                  {savedAddress && (
                    <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-xs text-sky-800">
                      <p className="font-semibold">
                        Adresse enregistrée dans le golden index :
                      </p>
                      <p className="mt-1">
                        {savedAddress.address}{" "}
                        {savedAddress.postal_code} {savedAddress.city}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Golden index : /addresses/search + gestion 429 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Golden index Casametrix
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900">
                      Rechercher dans les adresses cliquées
                    </h2>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
                    Statut&nbsp;: {quotaLabel}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  Cette recherche interroge la table{" "}
                  <code className="rounded bg-slate-100 px-1 py-px text-[11px]">
                    public.addresses
                  </code>{" "}
                  via l’API Casametrix. Les utilisateurs non connectés sont
                  limités à{" "}
                  <span className="font-semibold">3 recherches par jour</span>{" "}
                  et par adresse IP.
                </p>

                {goldenQuotaReached && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                    <div className="text-xs text-amber-900">
                      <p className="font-semibold">
                        Quota de recherche invité atteint
                      </p>
                      <p className="mt-1">
                        Pour continuer à utiliser le moteur d’adresse sans
                        limite, créez un compte Casametrix (gratuit pour les
                        premiers tests).
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => navigate("/register")}
                          className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
                        >
                          Créer un compte Casametrix
                        </button>
                        <Link
                          to="/login"
                          className="text-xs font-medium text-sky-700 underline"
                        >
                          J’ai déjà un compte
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <form
                  className="mt-4 flex flex-col gap-3 sm:flex-row"
                  onSubmit={handleGoldenSearch}
                >
                  <div className="flex-1">
                    <label
                      htmlFor="golden-query"
                      className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                    >
                      Rechercher dans Casametrix
                    </label>
                    <input
                      id="golden-query"
                      type="text"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      placeholder="Ex. : Lyon, Bordeaux, rue de la République…"
                      value={goldenQuery}
                      onChange={(e) => setGoldenQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={goldenLoading}
                      className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {goldenLoading ? "Recherche…" : "Rechercher"}
                    </button>
                  </div>
                </form>

                {goldenError && (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {goldenError}
                  </div>
                )}

                {goldenResults.length > 0 && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="border-b border-slate-200 px-3 py-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Résultats
                      </p>
                    </div>
                    <ul className="divide-y divide-slate-200">
                      {goldenResults.map((addr) => (
                        <li key={addr.id} className="px-3 py-2">
                          <p className="text-sm font-medium text-slate-900">
                            {addr.address}
                          </p>
                          <p className="text-xs text-slate-500">
                            {addr.postal_code} {addr.city}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>

            {/* Colonne droite : carte Leaflet */}
            <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Visualisation
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Carte des adresses
              </h2>

              {!mapCenter && (
                <p className="mt-2 text-sm text-slate-600">
                  Sélectionnez une adresse dans la liste ou utilisez la
                  géolocalisation pour afficher la carte. Une fois une adresse
                  enregistrée ou une position détectée, une carte interactive
                  (fond OpenStreetMap) apparaîtra ici.
                </p>
              )}

              <div className="mt-3 h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <div ref={mapContainerRef} className="h-full w-full" />
              </div>

              {savedAddress && (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
                  <p className="font-semibold">Adresse sélectionnée :</p>
                  <p className="mt-1">
                    {savedAddress.address} {savedAddress.postal_code}{" "}
                    {savedAddress.city}
                  </p>
                </div>
              )}

              {gpsPosition && (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
                  <p className="font-semibold">Dernière position détectée :</p>
                  <p className="mt-1">
                    lat {gpsPosition.lat.toFixed(5)}, lng{" "}
                    {gpsPosition.lng.toFixed(5)}
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchPage;
