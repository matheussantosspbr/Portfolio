import type { Metadata } from "next";
import { Exo_2, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Matheus Santos — Links",
  description:
    "Todos os meus links em um só lugar: portfólio, redes sociais e contato.",
};

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
      <div
        className="fx-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="fx-orb pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/3 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <section className="relative w-full max-w-md">
        <span
          className="pointer-events-none absolute -left-1 -top-1 h-5 w-5 border-l-2 border-t-2 border-primary/60"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-1 -top-1 h-5 w-5 border-r-2 border-t-2 border-primary/60"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-1 -left-1 h-5 w-5 border-b-2 border-l-2 border-primary/60"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-1 -right-1 h-5 w-5 border-b-2 border-r-2 border-primary/60"
          aria-hidden="true"
        />

        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/3 px-6 py-10 backdrop-blur-sm">
          <div className="fx-rise relative h-28 w-28">
            <div
              className="fx-halo absolute inset-0 rounded-full bg-primary/30 blur-xl"
              aria-hidden="true"
            />
            <div
              className="fx-orbit absolute -inset-2 rounded-full border border-primary/15"
              aria-hidden="true"
            >
              <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_var(--color-primary)]" />
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/70 shadow-[0_0_8px_1px_var(--color-primary)]" />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-full border border-primary/40 bg-setup-gray-900 shadow-[0_0_40px_-8px_var(--color-primary)]">
              <Image
                src="/assets/imgs/logo.avif"
                alt="Foto de Matheus Santos"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1
            className={`${exo2.className} fx-rise mt-6 text-white bg-clip-text text-center text-2xl font-bold uppercase tracking-[0.18em] [text-shadow:0_0_24px_rgba(0,184,235,0.25)]`}
            style={{ animationDelay: "60ms" }}
          >
            Matheus Santos
          </h1>

          <p
            className={`${exo2.className} fx-rise mt-2 text-xs font-medium uppercase tracking-[0.3em] text-primary/80`}
            style={{ animationDelay: "120ms" }}
          >
            Full Stack Developer
          </p>

          <div
            className={`${jetbrains.className} fx-rise mt-4 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] tracking-widest text-gray-300`}
            style={{ animationDelay: "180ms" }}
          >
            <span
              className="fx-status-dot h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            DISPONÍVEL PARA PROJETOS
          </div>
          <nav className="mt-8 w-full">
            <ul className="flex flex-col gap-3">
              {links.map((link, i) => (
                <li
                  key={link.label}
                  className="fx-rise"
                  style={{ animationDelay: `${240 + i * 70}ms` }}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 text-white transition duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/8 hover:shadow-[0_0_28px_-8px_var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-primary/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-primary/40 transition-all duration-200 group-hover:h-9 group-hover:bg-primary"
                      aria-hidden="true"
                    />

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition group-hover:border-primary/60 group-hover:bg-primary/20">
                      <i
                        className={`${link.icon} text-base`}
                        aria-hidden="true"
                      ></i>
                    </span>

                    <span className="flex-1 text-sm font-semibold">
                      {link.label}
                    </span>

                    <span
                      className={`${jetbrains.className} text-[11px] text-gray-600 transition group-hover:text-primary/70`}
                      aria-hidden="true"
                    ></span>
                    <i
                      className="fa-solid fa-arrow-right text-xs text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          className={`${jetbrains.className} mt-8 text-center text-[11px] tracking-widest text-gray-600`}
        >
          © {new Date().getFullYear()} MATHEUS SANTOS · ALL SYSTEMS ONLINE
        </p>
      </section>
    </main>
  );
}
