#!/usr/bin/env node
/**
 * /home/admincmx/projects/casametrix-ui/tools/casamx-front-routes.cjs
 *
 * Audit des routes et des pages Casametrix :
 *  - Vérifie que toutes les routes attendues existent dans src/App.tsx
 *  - Vérifie que chaque page contient un <PageMeta ... path="...">
 *  - Prépare la vérification des droits d'accès (public / protected)
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const appFile = path.join(projectRoot, "src", "App.tsx");

/**
 * access:
 *  - "public"    : accessible sans authentification
 *  - "protected" : devrait être protégée (RequireAuth, useAuth, etc.)
 *
 * Pour l'instant, toutes les routes sont publiques.
 * Quand tu ajouteras /app, /dashboard, etc., on les passera en "protected".
 */
const EXPECTED_ROUTES = [
  {
    path: "/",
    component: "HomePage",
    file: "src/pages/HomePage.tsx",
    access: "public",
  },
  {
    path: "/search",
    component: "SearchPage",
    file: "src/pages/SearchPage.tsx",
    access: "public",
  },
  {
    path: "/pricing",
    component: "PricingPage",
    file: "src/pages/PricingPage.tsx",
    access: "public",
  },
  {
    path: "/blog",
    component: "BlogPage",
    file: "src/pages/BlogPage.tsx",
    access: "public",
  },
  {
    path: "/faq",
    component: "FaqPage",
    file: "src/pages/FaqPage.tsx",
    access: "public",
  },
  {
    path: "/login",
    component: "LoginPage",
    file: "src/pages/LoginPage.tsx",
    access: "public",
  },
  {
    path: "/register",
    component: "RegisterPage",
    file: "src/pages/RegisterPage.tsx",
    access: "public",
  },
];

const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const ok = (msg) => console.log(`${GREEN}[OK]${RESET} ${msg}`);
const warn = (msg) => console.log(`${YELLOW}[WARN]${RESET} ${msg}`);
const fail = (msg) => console.log(`${RED}[FAIL]${RESET} ${msg}`);

console.log(`${CYAN}=== Casametrix Front Routes Audit ===${RESET}`);
console.log(`Fichier App.tsx : ${appFile}`);
console.log("");

let errors = 0;
let warnings = 0;

// -----------------------------------------------------------------------------
// 1) Lecture de App.tsx et extraction des routes
// -----------------------------------------------------------------------------
let appSource = "";
try {
  appSource = fs.readFileSync(appFile, "utf8");
} catch (e) {
  fail(`Impossible de lire ${appFile} : ${e.message}`);
  process.exit(1);
}

// Regex très simple : <Route path="/xxx" element={<Component />} />
const routeRegex =
  /<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}\s*\/>/g;

const foundRoutes = [];

let m;
while ((m = routeRegex.exec(appSource)) !== null) {
  foundRoutes.push({
    path: m[1],
    component: m[2],
  });
}

if (foundRoutes.length === 0) {
  fail("Aucune <Route ...> trouvée dans App.tsx (regex trop stricte ?).");
  errors++;
} else {
  ok(`${foundRoutes.length} route(s) trouvée(s) dans App.tsx.`);
  foundRoutes.forEach((r) =>
    console.log(`  - path="${r.path}" → component="${r.component}"`)
  );
}

console.log("");

// -----------------------------------------------------------------------------
// 2) Vérifier que toutes les routes attendues existent
// -----------------------------------------------------------------------------
console.log(`${CYAN}--- Vérification des routes attendues ---${RESET}`);

for (const expected of EXPECTED_ROUTES) {
  const matchRoute = foundRoutes.find((r) => r.path === expected.path);
  if (!matchRoute) {
    fail(`Route manquante dans App.tsx : path="${expected.path}"`);
    errors++;
    continue;
  }

  if (matchRoute.component !== expected.component) {
    warn(
      `Route "${expected.path}" : composant attendu "${expected.component}", trouvé "${matchRoute.component}".`
    );
    warnings++;
  } else {
    ok(
      `Route "${expected.path}" correctement reliée à "${expected.component}".`
    );
  }
}

// Routes supplémentaires non prévues (information) — on ignore le fallback "*"
for (const r of foundRoutes) {
  if (r.path === "*") {
    ok('Route fallback "*" détectée (utilisée comme catch-all).');
    continue;
  }
  const inExpected = EXPECTED_ROUTES.some((e) => e.path === r.path);
  if (!inExpected) {
    warn(
      `Route non listée dans EXPECTED_ROUTES : path="${r.path}" (component="${r.component}").`
    );
    warnings++;
  }
}

console.log("");

// -----------------------------------------------------------------------------
// 3) Vérifier chaque fichier de page + PageMeta + droits d'accès
// -----------------------------------------------------------------------------
console.log(`${CYAN}--- Vérification des pages, PageMeta et droits ---${RESET}`);

for (const route of EXPECTED_ROUTES) {
  const pagePath = path.join(projectRoot, route.file);
  let src = "";

  try {
    src = fs.readFileSync(pagePath, "utf8");
  } catch (e) {
    fail(`Impossible de lire le fichier page : ${pagePath} (${e.message})`);
    errors++;
    continue;
  }

  // Vérifier que PageMeta est mentionné
  if (!src.includes("PageMeta")) {
    warn(
      `Page "${route.file}" : aucune occurrence de "PageMeta" trouvée (import ou utilisation manquants ?).`
    );
    warnings++;
  }

  // Vérifier qu'un <PageMeta ... path="..."> existe
  const pathRegex = new RegExp(
    `<PageMeta[\\s\\S]*path="${route.path.replace("/", "\\/")}"`
  );
  if (!pathRegex.test(src)) {
    warn(
      `Page "${route.file}" : aucun <PageMeta ... path="${route.path}"> trouvé.`
    );
    warnings++;
  } else {
    ok(
      `Page "${route.file}" : <PageMeta ... path="${route.path}"> détecté.`
    );
  }

  // Vérifier les droits d'accès si la route est "protected"
  if (route.access === "protected") {
    // On recherche de simples marqueurs d'un guard d'authentification
    const hasRequireAuth =
      src.includes("RequireAuth") ||
      src.includes("useAuth") ||
      src.includes("useAuthContext");

    if (!hasRequireAuth) {
      warn(
        `Route "${route.path}" marquée "protected" mais aucun guard d'authentification (RequireAuth/useAuth) détecté dans "${route.file}".`
      );
      warnings++;
    } else {
      ok(
        `Route "${route.path}" protégée : guard d'authentification détecté dans "${route.file}".`
      );
    }
  }
}

console.log("");
console.log(`${CYAN}=== Résultat audit front (routes/pages/droits) ===${RESET}`);
console.log(`Warnings : ${warnings}`);
console.log(`Erreurs  : ${errors}`);

if (errors > 0) {
  fail("Des erreurs bloquantes ont été détectées dans les routes/pages.");
  process.exit(1);
} else {
  ok("Routes, pages et configuration d'accès Casametrix OK (aucune erreur bloquante).");
  process.exit(0);
}
