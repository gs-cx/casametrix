// /home/admincmx/projects/casametrix-ui/src/components/PageMeta.tsx

import { Helmet } from "react-helmet-async";

export type PageMetaProps = {
  title: string;
  description?: string;
  /**
   * Chemin de la page (ex : "/search").
   * Sert à construire les balises og:url / canonical.
   */
  path?: string;
  /**
   * Si true, ajoute <meta name="robots" content="noindex,nofollow" />
   * Utile pour masquer les pages privées du référencement.
   */
  noindex?: boolean;
};

const SITE_URL = "https://casametrix.com";

export default function PageMeta({
  title,
  description,
  path,
  noindex,
}: PageMetaProps) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const fullTitle = title
    ? `${title} – Casametrix`
    : "Casametrix – Analyse immobilière simplifiée";

  const metaDescription =
    description ||
    "Casametrix est une plateforme d’analyse immobilière qui unifie DVF, DPE, cadastre et données de contexte pour aider les équipes investissement, patrimoine, travaux et ESG.";

  return (
    <Helmet>
      {/* Titre de la page */}
      <title>{fullTitle}</title>

      {/* Description */}
      <meta name="description" content={metaDescription} />

      {/* Canonical / URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Casametrix" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {/* Noindex / Nofollow pour les pages privées */}
      {noindex && (
        <meta name="robots" content="noindex,nofollow" />
      )}
    </Helmet>
  );
}
