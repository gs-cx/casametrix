import TopNav from "./TopNav";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Barre de navigation principale (logo + Blog / Tarifs / Réseaux sociaux / Connexion) */}
      <TopNav />

      {/* Contenu des pages (home, blog, tarifs, recherche, mentions, etc.) */}
      <main className="flex-1 bg-slate-50">
        {children}
      </main>

      {/* Footer unique pour tout le site */}
      <Footer />
    </div>
  );
}
