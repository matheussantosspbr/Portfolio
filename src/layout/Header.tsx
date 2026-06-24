"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#skills", label: "Skills" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#opensource", label: "Open Source" },
  { href: "#certificacoes", label: "Certificações" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-setup-gray-900/90 shadow-lg shadow-primary/20 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="#inicio" aria-label="Voltar ao início">
          <Image
            src="/assets/imgs/logo.avif"
            alt="Logo de Matheus Santos"
            width={52}
            height={52}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contato"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botão menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-white transition hover:text-primary lg:hidden"
        >
          <i
            className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            aria-hidden="true"
          ></i>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-white/10 bg-setup-gray-900 lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-gray-200 transition hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href="#contato"
                onClick={() => setOpen(false)}
                className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition hover:brightness-110"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
