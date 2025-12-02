import PageMeta from "../components/PageMeta";

export default function SecurityPage() {
  return (
    <>
      <PageMeta
        title="Sécurité & RGPD"
        description="Découvrez l’approche sécurité et RGPD de Casametrix : RLS PostgreSQL, isolation multi-tenant, chiffrement, journalisation, sauvegardes et hébergement européen conforme."
        path="/security"
      />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* En-tête */}
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
            Sécurité &amp; conformité
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Sécurité de la plateforme Casametrix
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl">
            La confiance est au cœur de Casametrix. Nous appliquons des
            standards élevés en matière de sécurité, d’isolation des données et
            de conformité réglementaire pour garantir la confidentialité,
            l’intégrité et la disponibilité de vos informations.
          </p>

          {/* Bloc 1 : principes */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Une base unique, des organisations isolées
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Casametrix s’appuie sur PostgreSQL 16 avec{" "}
                <span className="font-medium">Row Level Security (RLS)</span>.
                Chaque requête est automatiquement filtrée par{" "}
                <code className="text-[0.7rem] rounded bg-slate-100 px-1 py-0.5">
                  app.current_org
                </code>{" "}
                : les données d’une organisation ne sont jamais visibles par une
                autre.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Ce modèle multi-tenant permet de mutualiser l’infrastructure
                tout en offrant une séparation stricte des jeux de données.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Sécurité applicative &amp; API
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                L’API Casametrix est exposée via HTTPS uniquement, derrière
                Nginx, avec durcissement TLS et en-têtes de sécurité (HSTS,
                X-Frame-Options, Referrer-Policy, etc.). Les accès se font via
                des{" "}
                <span className="font-medium">
                  tokens JWT signés côté backend
                </span>
                .
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Les identifiants sont stockés sous forme de hash, les comptes
                techniques sont limités, et les appels sont journalisés pour
                permettre des audits ciblés.
              </p>
            </article>
          </div>

          {/* Bloc 2 : pratiques opérationnelles */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Sauvegardes &amp; disponibilité
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Sauvegardes régulières de la base de données, stockage séparé
                des backups et restauration testée. Objectif : limiter au
                maximum la perte de données en cas d’incident.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Durcissement du serveur
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Accès SSH par clés uniquement, pare-feu UFW restrictif, Fail2ban
                actif, services exposés au strict minimum (API, front, n8n).
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Observabilité &amp; journaux
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Journalisation des accès critiques (API, base, SSH) pour faciliter
                la détection d’anomalies et la traçabilité en cas d’investigation.
              </p>
            </article>
          </div>

          {/* Bloc 3 : RGPD & gouvernance */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Approche RGPD
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Casametrix applique les principes de{" "}
                <span className="font-medium">
                  minimisation, journalisation et transparence
                </span>
                . Les rôles des parties (responsable de traitement / sous-traitant)
                sont décrits dans la politique de confidentialité et, le cas
                échéant, dans un accord de traitement (DPA).
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Hébergement européen
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                L’infrastructure est hébergée en Europe, chez un fournisseur
                disposant de garanties de sécurité et de continuité
                d’activité. Les flux entre services internes sont chiffrés et
                limités au strict nécessaire.
              </p>
            </article>
          </div>

          {/* Note de bas de page (discrète, sans jaune/amber) */}
          <p className="mt-10 text-[11px] text-slate-500 max-w-3xl">
            Ces informations décrivent l’architecture et les bonnes pratiques
            mises en place pour Casametrix. Elles pourront être complétées dans
            un dossier sécurité plus détaillé ou dans les documents contractuels
            fournis aux clients entreprise.
          </p>
        </section>
      </main>
    </>
  );
}
