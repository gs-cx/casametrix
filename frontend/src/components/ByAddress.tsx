import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, MapPin, Building2, TrendingUp, Filter, ShieldCheck,
  User, Briefcase, CalendarDays, PercentCircle, Landmark, IdCard
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Fix Leaflet marker icons
// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ---- Données factices (résultats + propriétaire) ----
const MOCK_RESULTS = [
  {
    property_id: "1111-aaaa",
    address: "10 Rue de la République, 69001 Lyon",
    postal_code: "69001",
    city: "Lyon",
    insee_code: "69381",
    lon: 4.8357,
    lat: 45.764,
    last_sale_date: "2023-05-14",
    last_sale_price: 420000,
    area_m2: 68,
    price_per_m2: 6176.47,
    property_type: "Appartement",
    dpe_class: "C",
    dpe_date: "2022-11-20",
    score: 0.82,
  },
  {
    property_id: "2222-bbbb",
    address: "2 Rue Mercière, 69002 Lyon",
    postal_code: "69002",
    city: "Lyon",
    insee_code: "69382",
    lon: 4.8338,
    lat: 45.762,
    last_sale_date: "2024-03-08",
    last_sale_price: 520000,
    area_m2: 74,
    price_per_m2: 7027.03,
    property_type: "Appartement",
    dpe_class: "D",
    dpe_date: "2023-10-03",
    score: 0.77,
  },
  {
    property_id: "3333-cccc",
    address: "18 Quai Saint-Antoine, 69002 Lyon",
    postal_code: "69002",
    city: "Lyon",
    insee_code: "69382",
    lon: 4.8289,
    lat: 45.7649,
    last_sale_date: "2022-10-01",
    last_sale_price: 980000,
    area_m2: 140,
    price_per_m2: 7000,
    property_type: "Immeuble mixte",
    dpe_class: "B",
    dpe_date: "2022-05-18",
    score: 0.69,
  },
] as const;

type Result = (typeof MOCK_RESULTS)[number];

type OwnerInfo = {
  property_id: string;
  owner_name: string;
  owner_type: "Personne physique" | "Personne morale";
  siren?: string;
  shares_pct: number;
  acquisition_date: string;
  address_mail: string;
  coowners?: Array<{ name: string; type: string; pct: number }>;
};

// table de correspondance factice par bien
const MOCK_OWNER_BY_PROPERTY: Record<string, OwnerInfo> = {
  "1111-aaaa": {
    property_id: "1111-aaaa",
    owner_name: "SAS LYON INVEST",
    owner_type: "Personne morale",
    siren: "902 123 456",
    shares_pct: 100,
    acquisition_date: "2023-05-14",
    address_mail: "12 Av. des Finances, 69002 Lyon",
    coowners: [],
  },
  "2222-bbbb": {
    property_id: "2222-bbbb",
    owner_name: "DUPONT Alice",
    owner_type: "Personne physique",
    shares_pct: 60,
    acquisition_date: "2024-03-08",
    address_mail: "2 Rue Mercière, 69002 Lyon",
    coowners: [
      { name: "DUPONT Marc", type: "Personne physique", pct: 40 },
    ],
  },
  "3333-cccc": {
    property_id: "3333-cccc",
    owner_name: "SCI SAINT-ANTOINE",
    owner_type: "Personne morale",
    siren: "538 765 210",
    shares_pct: 100,
    acquisition_date: "2022-10-01",
    address_mail: "18 Quai Saint-Antoine, 69002 Lyon",
  },
};

const DPE_COLORS: Record<string, string> = {
  A: "#16a34a",
  B: "#22c55e",
  C: "#84cc16",
  D: "#eab308",
  E: "#f97316",
  F: "#ef4444",
  G: "#b91c1c",
  NA: "#94a3b8",
};

// ---- helpers UI ----
function formatCurrency(n?: number | null) {
  if (n == null || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}
function formatInt(n?: number | null) {
  if (n == null || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("fr-FR").format(n);
}
function median(arr: number[]) {
  if (!arr.length) return 0;
  const a = [...arr].sort((x, y) => x - y);
  const mid = Math.floor(a.length / 2);
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
}
function classNames(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

export default function CasametrixByAddressUI({
  baseUrl = "",
  token = "",
  defaultQuery = "10 rue de la République Lyon",
}: {
  baseUrl?: string;
  token?: string;
  defaultQuery?: string;
}) {
  const [query, setQuery] = useState(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>(MOCK_RESULTS as unknown as Result[]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ radius_m: 600, min_m2: 0, max_m2: 0, dpe: "" });

  // nouvel onglet interne
  const [subTab, setSubTab] = useState<"main" | "owner">("main");

  // sélection courante (pour onglet propriétaire)
  const selected: Result | undefined = results?.[0]; // on prend le 1er résultat par défaut
  const owner: OwnerInfo | undefined = selected ? MOCK_OWNER_BY_PROPERTY[selected.property_id] : undefined;

  const canCallApi = Boolean(baseUrl && token);

  async function runSearch() {
    setLoading(true);
    setError(null);
    try {
      if (canCallApi) {
        const u = new URL("/properties/by-address", baseUrl);
        u.searchParams.set("q", query);
        u.searchParams.set("limit", "50");
        if (filters.radius_m) u.searchParams.set("radius_m", String(filters.radius_m));
        const res = await fetch(u.toString(), { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? (data as Result[]) : []);
      } else {
        const f = MOCK_RESULTS.filter((r) => r.address.toLowerCase().includes(query.toLowerCase()));
        setResults((f.length ? f : MOCK_RESULTS) as unknown as Result[]);
      }
    } catch (e: any) {
      setError(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const center = useMemo(() => {
    if (!results?.length) return { lat: 46.5, lon: 2.5, zoom: 5 };
    const first = results[0];
    return { lat: first.lat ?? 46.5, lon: first.lon ?? 2.5, zoom: 13 };
  }, [results]);

  const dpeAgg = useMemo(() => {
    const map: Record<string, number> = {};
    (results || []).forEach((r) => {
      const k = r.dpe_class || "NA";
      map[k] = (map[k] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [results]);

  const priceDist = useMemo(() => {
    const buckets: Record<string, number> = {};
    (results || []).forEach((r) => {
      const v = r.price_per_m2 || 0;
      const step = 1000;
      const base = Math.floor(v / step) * step;
      const b = `${base}-${base + step}`;
      buckets[b] = (buckets[b] || 0) + 1;
    });
    return Object.entries(buckets).map(([range, count]) => ({ range, count }));
  }, [results]);

  // ---- Rendu ----
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold tracking-tight">Casametrix — Recherche par adresse</h1>
            <p className="text-xs text-slate-500">Golden Data DVF/DPE • Multi-tenant • RLS • API & UI</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4" /> RLS actif
          </div>
        </div>
      </header>

      {/* Sous-onglets */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="inline-flex rounded-xl border bg-white shadow-sm overflow-hidden">
          <button
            onClick={() => setSubTab("main")}
            className={classNames(
              "px-4 py-2 text-sm font-medium",
              subTab === "main" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
            )}
          >
            Infos principales
          </button>
          <button
            onClick={() => setSubTab("owner")}
            className={classNames(
              "px-4 py-2 text-sm font-medium border-l",
              subTab === "owner" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
            )}
          >
            Propriétaire
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4">
        {/* Onglet 1 : infos principales */}
        {subTab === "main" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <section className="flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        placeholder="Ex: 10 rue de la République, Lyon"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && runSearch()}
                      />
                    </div>
                    <button
                      onClick={runSearch}
                      className={classNames(
                        "px-5 py-3 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 active:scale-[.99]",
                        loading && "opacity-70 pointer-events-none"
                      )}
                    >
                      {loading ? "Recherche…" : "Rechercher"}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm mt-1">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                      <Filter className="h-4 w-4 text-slate-500" /> Rayon
                      <select className="bg-transparent outline-none" value={filters.radius_m} onChange={(e) => setFilters((f) => ({ ...f, radius_m: Number(e.target.value) }))}>
                        <option value={300}>300 m</option>
                        <option value={600}>600 m</option>
                        <option value={1000}>1 km</option>
                        <option value={2000}>2 km</option>
                      </select>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                      m² min
                      <input type="number" className="w-20 bg-transparent outline-none" value={filters.min_m2} onChange={(e) => setFilters((f) => ({ ...f, min_m2: Number(e.target.value) }))} />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                      m² max
                      <input type="number" className="w-20 bg-transparent outline-none" value={filters.max_m2} onChange={(e) => setFilters((f) => ({ ...f, max_m2: Number(e.target.value) }))} />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                      DPE
                      <select className="bg-transparent outline-none" value={filters.dpe} onChange={(e) => setFilters((f) => ({ ...f, dpe: e.target.value }))}>
                        <option value="">Tous</option>
                        {["A", "B", "C", "D", "E", "F", "G"].map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && <div className="text-sm text-red-600">{error}</div>}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results
                  .filter((r) => (!filters.min_m2 || (r.area_m2 || 0) >= filters.min_m2))
                  .filter((r) => (!filters.max_m2 || (r.area_m2 || 0) <= filters.max_m2))
                  .filter((r) => (!filters.dpe || (r.dpe_class || "") === filters.dpe))
                  .map((r) => (
                    <motion.div key={r.property_id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-500" /> {r.address}
                          </div>
                          <div className="text-xs text-slate-500">
                            {r.postal_code} • {r.city} • INSEE {r.insee_code || "—"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-900 font-semibold">{formatCurrency(r.last_sale_price)}</div>
                          <div className="text-xs text-slate-500">{r.last_sale_date || "—"}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <div className="text-xs text-slate-500">Prix/m²</div>
                          <div className="text-base font-semibold">{formatInt(r.price_per_m2)} €</div>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                          <div className="text-xs text-slate-500">Surface</div>
                          <div className="text-base font-semibold">{formatInt(r.area_m2)} m²</div>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                          <div className="text-xs text-slate-500">Type</div>
                          <div className="text-base font-semibold">{r.property_type || "—"}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg bg-slate-100">
                          <TrendingUp className="h-4 w-4 text-slate-500" /> Score pertinence: <span className="font-semibold">{Math.round((r.score || 0) * 100)}%</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: DPE_COLORS[r.dpe_class || "NA"] || "#e2e8f0" }}>
                          DPE <strong>{r.dpe_class || "—"}</strong>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
                  <div className="text-sm font-medium mb-2">Distribution Prix/m²</div>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceDist}>
                        <XAxis dataKey="range" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
                  <div className="text-sm font-medium mb-2">Répartition DPE</div>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={dpeAgg} dataKey="value" nameKey="name" outerRadius={64} label>
                          {dpeAgg.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={DPE_COLORS[entry.name] || "#94a3b8"} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
                  <div className="text-sm font-medium mb-1">KPI</div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>
                      Résultats: <span className="font-semibold">{results.length}</span>
                    </li>
                    <li>
                      Prix moyen/m²:{" "}
                      <span className="font-semibold">
                        {formatInt(Math.round(results.reduce((a, r) => a + (r.price_per_m2 || 0), 0) / Math.max(results.length, 1) || 0))} €
                      </span>
                    </li>
                    <li>
                      Surface médiane: <span className="font-semibold">{formatInt(median(results.map((r) => r.area_m2 || 0)))} m²</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[520px]">
              <div className="h-12 px-4 border-b flex items-center justify-between">
                <div className="text-sm font-medium">Carte des biens</div>
                <div className="text-xs text-slate-500">Fond OSM • Zoom: {center.zoom}</div>
              </div>
              <div className="h-[calc(100%-3rem)]">
                <MapContainer center={[center.lat, center.lon]} zoom={center.zoom} className="h-full w-full">
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {results.map((r) =>
                    r.lat && r.lon ? (
                      <Marker key={r.property_id} position={[r.lat, r.lon]}>
                        <Popup>
                          <div className="text-sm font-medium mb-1">{r.address}</div>
                          <div className="text-xs text-slate-600">
                            {formatCurrency(r.last_sale_price)} • {formatInt(r.price_per_m2)} €/m²
                          </div>
                          <div className="text-xs">DPE: {r.dpe_class || "—"}</div>
                        </Popup>
                      </Marker>
                    ) : null
                  )}
                </MapContainer>
              </div>
            </section>
          </div>
        )}

        {/* Onglet 2 : Propriétaire (factice) */}
        {subTab === "owner" && (
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <IdCard className="h-5 w-5 text-slate-600" />
                <h3 className="text-sm font-semibold">Propriétaire (données factices)</h3>
              </div>
              {!owner ? (
                <div className="text-sm text-slate-500">Aucun bien sélectionné.</div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl border p-3">
                    <div className="text-xs text-slate-500">Bien sélectionné</div>
                    <div className="text-sm font-medium">{selected?.address}</div>
                    <div className="text-xs text-slate-500">{selected?.postal_code} • {selected?.city}</div>
                  </div>

                  <div className="rounded-xl border p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {owner.owner_type === "Personne morale" ? <Briefcase className="h-4 w-4"/> : <User className="h-4 w-4"/>}
                      <div className="text-sm font-semibold">{owner.owner_name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-700"><Landmark className="h-4 w-4 text-slate-500"/> Type : {owner.owner_type}</div>
                      <div className="flex items-center gap-2 text-slate-700"><PercentCircle className="h-4 w-4 text-slate-500"/> Quote-part : {owner.shares_pct}%</div>
                      <div className="flex items-center gap-2 text-slate-700"><CalendarDays className="h-4 w-4 text-slate-500"/> Acquisition : {owner.acquisition_date}</div>
                      <div className="flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4 text-slate-500"/> Adresse postale : {owner.address_mail}</div>
                      {owner.siren && (
                        <div className="flex items-center gap-2 text-slate-700"><IdCard className="h-4 w-4 text-slate-500"/> SIREN : {owner.siren}</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-semibold mb-2">Co-propriétaires</div>
                    {owner.coowners?.length ? (
                      <ul className="text-sm">
                        {owner.coowners.map((c, i) => (
                          <li key={i} className="py-1 flex items-center justify-between border-t first:border-t-0">
                            <div className="flex items-center gap-2">
                              {c.type.includes("morale") ? <Briefcase className="h-4 w-4 text-slate-500"/> : <User className="h-4 w-4 text-slate-500"/>}
                              <span className="font-medium">{c.name}</span>
                              <span className="text-xs text-slate-500">({c.type})</span>
                            </div>
                            <div className="text-xs text-slate-600">{c.pct}%</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-slate-500">—</div>
                    )}
                  </div>

                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-semibold mb-1">Contact (masqué)</div>
                    <div className="text-xs text-slate-500">Email : ******@*****.** • Téléphone : ** ** ** ** **</div>
                    <div className="text-[11px] text-slate-400 mt-1">Affichage masqué pour la démo. Intégration annuaire tiers possible.</div>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-slate-600" />
                <h3 className="text-sm font-semibold">Historique & repères (factice)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 text-sm">
                  <div className="text-xs text-slate-500 mb-1">Dernières transactions</div>
                  <ul className="space-y-1">
                    <li>2018 — Mutation à titre onéreux</li>
                    <li>2020 — Travaux (déclaration)</li>
                    <li>2023 — Acquisition propriétaire actuel</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-3 text-sm">
                  <div className="text-xs text-slate-500 mb-1">Risques & conformité</div>
                  <ul className="space-y-1">
                    <li>Hypothèques : Aucune connue</li>
                    <li>PLU : Zone urbaine Uc</li>
                    <li>ESG : DPE {selected?.dpe_class ?? "—"}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-400">Toutes ces informations sont factices pour la phase de réglage UI.</div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
