import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Search,
  SlidersHorizontal,
  Building2,
  MapPin,
  ListFilter,
  TrendingUp,
  Gauge,
  BarChart2,
  ShieldCheck,
} from "lucide-react";

// Fix Leaflet marker icons
// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

const MOCK_PROPERTIES = [
  {
    id: "p-lyon-001",
    address: "10 Rue de la République, 69001 Lyon",
    postal_code: "69001",
    city: "Lyon",
    insee_code: "69381",
    lon: 4.8357,
    lat: 45.764,
    property_type: "Appartement",
    area_m2: 68,
    price_per_m2: 6200,
    last_sale_price: 420000,
    last_sale_date: "2023-05-14",
    dpe_class: "C",
    dpe_date: "2022-11-20",
  },
  {
    id: "p-lyon-002",
    address: "2 Rue Mercière, 69002 Lyon",
    postal_code: "69002",
    city: "Lyon",
    insee_code: "69382",
    lon: 4.8338,
    lat: 45.762,
    property_type: "Appartement",
    area_m2: 74,
    price_per_m2: 7050,
    last_sale_price: 520000,
    last_sale_date: "2024-03-08",
    dpe_class: "D",
    dpe_date: "2023-10-03",
  },
  {
    id: "p-lyon-003",
    address: "18 Quai Saint-Antoine, 69002 Lyon",
    postal_code: "69002",
    city: "Lyon",
    insee_code: "69382",
    lon: 4.8289,
    lat: 45.7649,
    property_type: "Immeuble mixte",
    area_m2: 140,
    price_per_m2: 7000,
    last_sale_price: 980000,
    last_sale_date: "2022-10-01",
    dpe_class: "B",
    dpe_date: "2022-05-18",
  },
];

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

// ====== Advanced Search ======
function AdvancedSearch({
  baseUrl = "",
  token = "",
  onOpenProperty,
}: {
  baseUrl?: string;
  token?: string;
  onOpenProperty: (id: string) => void;
}) {
  const [q, setQ] = useState("10 rue de la République Lyon");
  const [radius, setRadius] = useState(800);
  const [center] = useState({ lat: 45.764, lon: 4.8357 });
  const [types, setTypes] = useState<string[]>(["Appartement", "Maison", "Immeuble mixte"]);
  const [dpe, setDpe] = useState<string>("");
  const [minM2, setMinM2] = useState<number>(0);
  const [maxM2, setMaxM2] = useState<number>(0);
  const [minPpm2, setMinPpm2] = useState<number>(0);
  const [maxPpm2, setMaxPpm2] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(MOCK_PROPERTIES as typeof MOCK_PROPERTIES);
  const canCall = Boolean(baseUrl && token);

  async function run() {
    setLoading(true);
    try {
      if (canCall) {
        const u = new URL("/properties/search", baseUrl);
        u.searchParams.set("q", q);
        u.searchParams.set("limit", "100");
        if (radius) u.searchParams.set("radius_m", String(radius));
        u.searchParams.set("lat", String(center.lat));
        u.searchParams.set("lon", String(center.lon));
        if (minM2) u.searchParams.set("min_area_m2", String(minM2));
        if (maxM2) u.searchParams.set("max_area_m2", String(maxM2));
        if (minPpm2) u.searchParams.set("min_price_per_m2", String(minPpm2));
        if (maxPpm2) u.searchParams.set("max_price_per_m2", String(maxPpm2));
        if (dpe) u.searchParams.set("dpe", dpe);
        if (types.length) u.searchParams.set("types", types.join(","));
        const res = await fetch(u.toString(), { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        setRows(Array.isArray(data?.items) ? data.items : []);
      } else {
        let r = [...MOCK_PROPERTIES];
        r = r.filter((x) => x.address.toLowerCase().includes(q.toLowerCase()));
        if (dpe) r = r.filter((x) => (x.dpe_class || "") === dpe);
        if (minM2) r = r.filter((x) => (x.area_m2 || 0) >= minM2);
        if (maxM2) r = r.filter((x) => (x.area_m2 || 0) <= maxM2);
        if (minPpm2) r = r.filter((x) => (x.price_per_m2 || 0) >= minPpm2);
        if (maxPpm2) r = r.filter((x) => (x.price_per_m2 || 0) <= maxPpm2);
        if (types.length) r = r.filter((x) => types.includes(x.property_type || ""));
        setRows(r);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-4">
      <motion.aside initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-white shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3 text-slate-800">
          <ListFilter className="h-5 w-5" />
          <h3 className="font-semibold">Filtres</h3>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-xl border focus:ring-2 focus:ring-slate-900/10"
              placeholder="Adresse, quartier, ville…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">m² min</label>
              <input type="number" className="w-full mt-1 rounded-xl border px-3 py-2" value={minM2} onChange={(e) => setMinM2(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-xs text-slate-500">m² max</label>
              <input type="number" className="w-full mt-1 rounded-xl border px-3 py-2" value={maxM2} onChange={(e) => setMaxM2(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">€/m² min</label>
              <input type="number" className="w-full mt-1 rounded-xl border px-3 py-2" value={minPpm2} onChange={(e) => setMinPpm2(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-xs text-slate-500">€/m² max</label>
              <input type="number" className="w-full mt-1 rounded-xl border px-3 py-2" value={maxPpm2} onChange={(e) => setMaxPpm2(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500">Type de bien</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {["Appartement", "Maison", "Immeuble mixte", "Local pro"].map((t) => (
                <label key={t} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={types.includes(t)}
                    onChange={(e) => setTypes((p) => (e.target.checked ? [...p, t] : p.filter((x) => x !== t)))}
                  />{" "}
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500">Classe DPE</label>
            <select value={dpe} onChange={(e) => setDpe(e.target.value)} className="w-full mt-1 rounded-xl border px-3 py-2">
              <option value="">Toutes</option>
              {["A", "B", "C", "D", "E", "F", "G"].map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Rayon</label>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-400" />
              <input type="range" min={200} max={3000} step={100} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="flex-1" />
              <span className="text-xs w-14 text-right">{radius} m</span>
            </div>
          </div>
          <button
            onClick={run}
            className={`w-full py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {loading ? "Recherche…" : "Appliquer"}
          </button>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> RLS actif — résultats filtrés par organisation
          </div>
        </div>
      </motion.aside>

      <section className="grid grid-rows-[auto_1fr] gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="text-xs text-slate-500">Résultats</div>
            <div className="text-2xl font-semibold">{rows.length}</div>
          </div>
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="text-xs text-slate-500">Prix moyen/m²</div>
            <div className="text-2xl font-semibold">{formatInt(Math.round(rows.reduce((a, x) => a + (x.price_per_m2 || 0), 0) / Math.max(rows.length, 1))) } €</div>
          </div>
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="text-xs text-slate-500">Part DPE C-D</div>
            <div className="text-2xl font-semibold">
              {Math.round(
                (100 * rows.filter((r) => ["C", "D"].includes(r.dpe_class || "")).length) / Math.max(rows.length, 1)
              )}
              %
            </div>
          </div>
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="text-xs text-slate-500">Surface médiane</div>
            <div className="text-2xl font-semibold">{formatInt(median(rows.map((r) => r.area_m2 || 0)))} m²</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <div className="h-11 px-4 border-b flex items-center justify-between">
              <div className="text-sm font-medium flex items-center gap-2">
                <BarChart2 className="h-4 w-4" /> Résultats
              </div>
              <div className="text-xs text-slate-500">Tri local</div>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-2">Adresse</th>
                    <th className="text-left px-4 py-2">Type</th>
                    <th className="text-right px-4 py-2">m²</th>
                    <th className="text-right px-4 py-2">€/m²</th>
                    <th className="text-right px-4 py-2">Prix</th>
                    <th className="text-center px-4 py-2">DPE</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-slate-50/60">
                      <td className="px-4 py-2">
                        <div className="font-medium text-slate-800">{r.address}</div>
                        <div className="text-xs text-slate-500">
                          {r.postal_code} • {r.city}
                        </div>
                      </td>
                      <td className="px-4 py-2">{r.property_type}</td>
                      <td className="px-4 py-2 text-right">{formatInt(r.area_m2)} m²</td>
                      <td className="px-4 py-2 text-right">{formatInt(r.price_per_m2)} €</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(r.last_sale_price)}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold"
                          style={{ backgroundColor: DPE_COLORS[r.dpe_class || "NA"] || "#e2e8f0" }}
                        >
                          {r.dpe_class || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => onOpenProperty(r.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs hover:bg-slate-800"
                        >
                          Ouvrir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border bg-white shadow-sm overflow-hidden min-h-[420px]">
            <div className="h-11 px-4 border-b flex items-center justify-between">
              <div className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Carte
              </div>
              <div className="text-xs text-slate-500">Rayon {radius} m</div>
            </div>
            <MapContainer center={[center.lat, center.lon]} zoom={13} className="h-[calc(100%-44px)] w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
              <Marker position={[center.lat, center.lon]}>
                <Popup>Centre de recherche</Popup>
              </Marker>
              <Circle center={[center.lat, center.lon]} radius={radius} />
              {rows.map((r) =>
                r.lat && r.lon ? (
                  <Marker key={r.id} position={[r.lat, r.lon]}>
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
        </div>
      </section>
    </div>
  );
}

// ====== Property Detail (simplifiée pour la démo) ======
function PropertyDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const prop = useMemo(() => MOCK_PROPERTIES.find((p) => p.id === id) || MOCK_PROPERTIES[0], [id]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{prop.address}</h2>
          <div className="text-sm text-slate-500">
            {prop.postal_code} • {prop.city} • INSEE {prop.insee_code}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-100">
              <Building2 className="h-4 w-4" /> {prop.property_type}
            </span>
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-100">
              <Gauge className="h-4 w-4" /> DPE {prop.dpe_class}
            </span>
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-100">
              <TrendingUp className="h-4 w-4" /> {formatInt(prop.price_per_m2)} €/m²
            </span>
          </div>
        </div>
        <div className="text-right">
          <button onClick={onBack} className="mt-3 px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50 text-sm">
            Retour
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden min-h-[300px]">
        <MapContainer center={[prop.lat, prop.lon]} zoom={15} className="h-[300px] w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
          <Marker position={[prop.lat, prop.lon]}>
            <Popup>{prop.address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default function CasametrixAdvancedAndDetail({ baseUrl = "", token = "" }: { baseUrl?: string; token?: string }) {
  const [view, setView] = useState<"search" | "detail">("search");
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-[70vh]">
      <header className="mb-3 flex items-center gap-2">
        <button onClick={() => setView("search")} className={`px-3 py-1.5 rounded-lg ${view === "search" ? "bg-slate-900 text-white" : "border"}`}>
          Search avancé
        </button>
        <button onClick={() => setView("detail")} className={`px-3 py-1.5 rounded-lg ${view === "detail" ? "bg-slate-900 text-white" : "border"}`}>
          Fiche propriété
        </button>
      </header>

      {view === "search" && <AdvancedSearch baseUrl={baseUrl} token={token} onOpenProperty={(id) => { setCurrentId(id); setView("detail"); }} />}
      {view === "detail" && <PropertyDetail id={currentId || MOCK_PROPERTIES[0].id} onBack={() => setView("search")} />}
    </div>
  );
}

