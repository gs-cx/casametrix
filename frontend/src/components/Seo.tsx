import { useEffect } from "react";

const SITE_NAME = "Casametrix";
const DEFAULT_DESCRIPTION =
  "Casametrix est une plateforme SaaS B2B d’intelligence d’adresse et de golden data immobilière (cadastre, DVF, DPE, GPS, scoring, ESG).";

type SeoProps = {
  title: string;
  description?: string;
  path?: string; // ex: "/pricing"
};

function upsertMeta(
  key: "name" | "property",
  keyValue: string,
  content: string
) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[${key}="${keyValue}"]`
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(key, keyValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const desc = description || DEFAULT_DESCRIPTION;
    const fullTitle = `${title} | ${SITE_NAME}`;

    const origin =
      typeof window !== "undefined" && window.location
        ? window.location.origin
        : "https://casametrix.com";
    const url =
      origin +
      (path ||
        (typeof window !== "undefined" ? window.location.pathname : "/"));

    document.title = fullTitle;

    // Meta de base
    upsertMeta("name", "description", desc);

    // OpenGraph
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:url", url);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
  }, [title, description, path]);

  return null;
}
