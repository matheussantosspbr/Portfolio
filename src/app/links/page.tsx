import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Matheus Santos — Links",
  description:
    "Todos os meus links em um só lugar: portfólio, redes sociais e contato.",
};

// ── Seus links — edite, adicione ou remova à vontade ─────────────────
interface LinkItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

const links: LinkItem[] = [
  { label: "Portfólio", href: "/", icon: "fa-solid fa-globe" },
  {
    label: "GitHub",
    href: "https://github.com/matheussantosspbr",
    icon: "fa-brands fa-github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matheussantosspbr/",
    icon: "fa-brands fa-linkedin-in",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/matheus_santos_oficial.br/",
    icon: "fa-brands fa-instagram",
    external: true,
  },
  {
    label: "Enviar e-mail",
    href: "mailto:contato@matheussantos.tech",
    icon: "fa-regular fa-envelope",
  },
  {
    label: "Baixar currículo",
    href: "/assets/curriculo.pdf",
    icon: "fa-solid fa-download",
  },
];

export default function LinksPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-setup-gray-900 px-4 py-12">
      {/* brilho de fundo sutil */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-md flex-col items-center">
        {/* Avatar */}
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-primary/50 bg-setup-gray-900 shadow-[0_0_40px_-10px_var(--color-primary)]">
          <Image
            src="/assets/imgs/logo.avif"
            alt="Foto de Matheus Santos"
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-white">Matheus Santos</h1>
        <p className="mt-1 text-sm text-gray-400">Desenvolvedor Full Stack</p>

        {/* Lista de links */}
        <nav className="mt-8 w-full">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group relative flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white transition duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <i
                    className={`${link.icon} absolute left-5 text-lg text-primary`}
                    aria-hidden="true"
                  ></i>
                  <span className="w-full text-center text-sm font-semibold">
                    {link.label}
                  </span>
                  <i
                    className="fa-solid fa-arrow-right absolute right-5 text-xs text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  ></i>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-xs text-gray-600">
          © {new Date().getFullYear()} Matheus Santos
        </p>
      </div>
    </main>
  );
}
