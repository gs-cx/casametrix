type FaqItem = {
  question: string;
  answer: string;
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

const faqSections: FaqSection[] = [
  {
    title: "Cas d’usage métier",
    items: [
      {
        question: "Comment Casametrix m’aide à qualifier un foncier en quelques minutes ?",
        answer:
          "En saisissant une adresse ou une parcelle, Casametrix agrège automatiquement cadastre, DPE, historiques de transactions et annonces autour du bien. Vous visualisez en un coup d’œil le potentiel, les risques (énergétiques, locatifs) et les comparables de marché pour documenter votre avis de valeur ou votre GO / NO GO.",
      },
      {
        question: "Puis-je suivre un portefeuille d’adresses ou de bâtiments ?",
        answer:
          "Oui. Vous pouvez constituer des “listes” d’adresses (patrimoine, ciblage prospection, parc social, etc.) et suivre pour chacune les indicateurs-clés : étiquette DPE, tension locative, fréquence des transactions, prix moyen au m², etc. Ces listes peuvent être exportées en CSV pour alimenter vos outils internes.",
      },
      {
        question: "Casametrix peut-il m’aider à prioriser les travaux liés au DPE ?",
        answer:
          "Casametrix agrège les données DPE disponibles et les enrichit avec des signaux complémentaires (matériaux probables, âge du bâti, historique de travaux). Vous pouvez filtrer les adresses les plus pénalisantes, simuler l’impact d’une amélioration et prioriser les chantiers qui réduisent le plus le risque réglementaire ou locatif.",
      },
    ],
  },
  {
    title: "Fonctionnalités et API",
    items: [
      {
        question: "Quelles sont les différences entre l’interface web et l’API ?",
        answer:
          "L’interface web est idéale pour les analystes, commerciaux et équipes terrain : elle permet de lancer des recherches, de visualiser les cartes et d’exporter des listes. L’API est pensée pour les intégrateurs et les équipes data : elle expose les mêmes données d’adresse de façon structurée pour alimenter vos outils (CRM, ERP, outils internes, data warehouse).",
      },
      {
        question: "Puis-je limiter l’accès aux données par organisation ou par équipe ?",
        answer:
          "Oui. Casametrix est multi-tenant : chaque organisation dispose de son propre espace logique. Des rôles (admin, analyste, lecture seule) permettent de limiter l’accès à certaines fonctionnalités ou exports, et nous pouvons activer des restrictions plus fines sur demande (par entité, par BU, etc.).",
      },
      {
        question: "Comment fonctionnent les quotas et la facturation API ?",
        answer:
          "Chaque plan prévoit un volume mensuel de requêtes API. Une requête correspond par exemple à une recherche d’adresse, un appel d’enrichissement ou une récupération détaillée de fiche bien. Au-delà du quota, soit nous bloquons les appels, soit nous appliquons de la surconsommation facturée en fin de mois selon les conditions de votre contrat.",
      },
    ],
  },
  {
    title: "Compte, sécurité & conformité",
    items: [
      {
        question: "Où sont hébergées les données Casametrix ?",
        answer:
          "Les données sont hébergées dans l’Union européenne auprès de fournisseurs cloud reconnus. Les sauvegardes sont chiffrées et répliquées sur plusieurs zones. Nous pouvons fournir, sur demande, une fiche détaillée de notre architecture et de nos engagements de disponibilité.",
      },
      {
        question: "Comment sont protégées les données à caractère personnel ?",
        answer:
          "Casametrix applique le principe de minimisation des données : seules les informations strictement nécessaires au fonctionnement du service sont collectées. Les données de compte (identité, email, facturation) sont séparées des données métiers. L’accès interne est limité aux personnes habilitées, et chaque client peut exercer ses droits RGPD via l’adresse contact@casametrix.com.",
      },
      {
        question: "Comment créer un compte et tester la plateforme ?",
        answer:
          "Vous pouvez créer un compte directement depuis la page d’inscription. Un mode découverte avec quotas limités permet de tester la recherche d’adresses et les premiers exports. Pour une démo guidée ou des besoins spécifiques (multi-site, intégration SSO, volumes importants), contactez-nous via le formulaire ou à contact@casametrix.com.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        <header className="mb-8 sm:mb-10 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-600 uppercase">
            Aide & cas d’usage
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
            FAQ Casametrix
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Retrouvez ici les réponses aux questions les plus fréquentes sur les cas
            d’usage métier, l’API, les quotas et la conformité. Cette page a vocation
            à évoluer avec vos retours.
          </p>
        </header>

        <div className="space-y-8 sm:space-y-10">
          {faqSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-4"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-slate-900 list-none">
                      <span>{item.question}</span>
                      <span className="text-slate-400 group-open:hidden" aria-hidden>
                        +
                      </span>
                      <span className="hidden text-slate-400 group-open:inline" aria-hidden>
                        −
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
