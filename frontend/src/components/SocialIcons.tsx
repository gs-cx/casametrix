type SocialLink = {
  name: string;
  label: string;
  href: string;
};

const links: SocialLink[] = [
  {
    name: "X",
    label: "Casametrix sur X (Twitter)",
    href: "https://x.com", // à adapter avec ton vrai profil
  },
  {
    name: "in",
    label: "Casametrix sur LinkedIn",
    href: "https://www.linkedin.com", // à adapter
  },
  {
    name: "Yt",
    label: "Casametrix sur YouTube",
    href: "https://www.youtube.com", // à adapter
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium tracking-[0.15em] text-slate-400 uppercase">
        Réseaux
      </span>
      {links.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}
