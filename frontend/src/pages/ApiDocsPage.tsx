import PageMeta from "../components/PageMeta";

export default function ApiDocsPage() {
  return (
    <>
      <PageMeta
        title="Documentation API"
        description="Documentation API Casametrix : authentification JWT, endpoints principaux et bonnes pratiques pour intégrer l’intelligence d’adresse dans vos outils."
        path="/docs"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            API & développeurs
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Documentation API Casametrix
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            L’API Casametrix permet de rechercher des adresses, de récupérer des
            informations cadastrales, DVF, DPE et des indicateurs de scoring.
            Cette page présente les grands principes pour se connecter et
            consommer la plateforme depuis vos outils internes.
          </p>

          {/* Bloc info "bientôt" */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-700">
            <p>
              La documentation détaillée (Swagger / OpenAPI) sera accessible sur
              une URL dédiée. Cette page sert de guide d’orientation pour vos
              équipes techniques et produits.
            </p>
          </div>

          {/* Carte Authentification */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col">
              <h2 className="text-sm font-semibold text-slate-900">
                Authentification & JWT
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                L’accès à l’API Casametrix se fait via un token JWT signé côté
                backend. Vous récupérez ce token sur l’endpoint
                <code className="ml-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-mono text-slate-800">
                  /auth/login
                </code>
                , puis vous le transmettez dans l’en-tête{" "}
                <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-mono text-slate-800">
                  Authorization: Bearer &lt;token&gt;
                </code>
                .
              </p>

              <div className="mt-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono p-4 leading-relaxed">
                <p className="text-slate-400 mb-1">Exemple de connexion :</p>
                <pre className="whitespace-pre-wrap">
                  {`POST https://api.casametrix.com/auth/login
Content-Type: application/json

{
  "email": "vous@entreprise.fr",
  "password": "••••••••"
}

# Réponse (exemple)
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}`}
                </pre>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Les durées de vie, la rotation des secrets et les scopes
                d’accès seront documentés dans la version finale de la
                documentation API.
              </p>
            </article>

            {/* Carte Endpoints principaux */}
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col">
              <h2 className="text-sm font-semibold text-slate-900">
                Endpoints principaux
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                La première version publique de l’API se concentre sur
                l’intelligence d’adresse et la golden data immobilière. Quelques
                endpoints représentatifs&nbsp;:
              </p>

              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2">
                  <p className="text-xs font-mono text-sky-700">
                    GET /auth/me
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Retourne les informations du compte associé au token JWT
                    (organisation, email, rôle).
                  </p>
                </li>
                <li className="rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2">
                  <p className="text-xs font-mono text-sky-700">
                    GET /addresses/search
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Recherche d’adresses en texte libre avec quotas gratuits
                    pour les utilisateurs anonymes et traçage des requêtes pour
                    les comptes authentifiés.
                  </p>
                </li>
                <li className="rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2">
                  <p className="text-xs font-mono text-sky-700">
                    GET /properties/by-address
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Récupération de la fiche immobilière associée à une adresse
                    (DVF, DPE, contexte local, indicateurs de scoring).
                  </p>
                </li>
              </ul>

              <p className="mt-4 text-xs text-slate-500">
                D’autres endpoints (recherche avancée, simulations, rapports
                ESG, exports) viendront enrichir cette API au fur et à mesure.
              </p>
            </article>
          </div>

          {/* Carte Swagger / intégration */}
          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Documentation Swagger & intégrations
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              La spécification OpenAPI (Swagger) sera exposée directement par
              l’API Casametrix. Vous pourrez y tester les appels, récupérer les
              schémas de réponse et générer des clients dans vos langages
              préférés.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Visualisation interactive des endpoints et des paramètres.</li>
              <li>• Exemples de requêtes en cURL, JavaScript, Python, etc.</li>
              <li>• Téléchargement de la spécification OpenAPI (JSON / YAML).</li>
            </ul>

            <p className="mt-4 text-xs text-slate-500">
              L’URL exacte (par exemple{" "}
              <span className="font-mono text-slate-700">
                https://api.casametrix.com/docs
              </span>{" "}
              ou{" "}
              <span className="font-mono text-slate-700">
                /openapi.json
              </span>
              ) sera indiquée dans la phase de mise en production.
            </p>
          </div>

          {/* Carte bonnes pratiques */}
          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Bonnes pratiques d’utilisation
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Quelques recommandations pour intégrer proprement Casametrix dans
              vos architectures existantes&nbsp;:
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Performance & quotas
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Regroupez vos appels, mettez en cache côté serveur ce qui peut
                  l’être et évitez les boucles d’appels unitaires depuis le
                  front. Les quotas sont plus confortables quand l’API est
                  consommée depuis un backend applicatif.
                </p>
              </div>
              <div className="rounded-xl bg-slate-50/80 border border-slate-100 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Sécurité & RGPD
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Stockez les tokens JWT côté serveur ou dans un coffre
                  applicatif, journalisez les appels sensibles et évitez
                  d’exposer des identifiants bruts côté client. Les aspects
                  contractuels sont détaillés dans le DPA et la politique de
                  confidentialité.
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-500">
              Pour des intégrations avancées (ETL, n8n, Zapier, connecteurs
              CRM), les cas d’usage pourront être détaillés dans des guides
              dédiés ou des exemples de code open source.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
