"use client";

import { useEffect, useId, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

interface Contribution {
  repo: string;
  description: string;
  url: string;
}

const contributions: Contribution[] = [
  {
    repo: "DavidHDev/react-bits",
    description:
      "Corrigi um bug em um componente de efeito de digitação (typewriter), permitindo que o array de textos aceite uma ou mais strings (antes exigia obrigatoriamente duas), e resolvi o comportamento incorreto onde, com o loop desativado, o último texto era deletado em vez de permanecer visível na tela.",
    url: "https://github.com/DavidHDev/react-bits/pull/705",
  },
];

const MAX_PREVIEW = 100;

function truncate(text: string, limit: number) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}…`;
}

export default function OpenSource() {
  const [selected, setSelected] = useState<Contribution | null>(null);

  return (
    <section
      id="opensource"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle
        eyebrow="Comunidade"
        title="Open Source"
        subtitle="Contribuições para projetos da comunidade."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {contributions.map((item) => {
          const isTruncated = item.description.length > MAX_PREVIEW;
          return (
            <button
              key={item.repo}
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`Ver detalhes da contribuição em ${item.repo}`}
              className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-primary/50 focus-visible:-translate-y-1 focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:translate-y-0"
            >
              <div className="flex items-center gap-3">
                <i
                  className="fa-brands fa-github text-2xl text-gray-300 transition group-hover:text-primary"
                  aria-hidden="true"
                ></i>
                <span className="font-mono text-sm font-semibold text-white">
                  {item.repo}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {truncate(item.description, MAX_PREVIEW)}
              </p>
              {isTruncated && (
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary transition group-hover:gap-2">
                  Ver mais
                  <i
                    className="fa-solid fa-arrow-right text-xs"
                    aria-hidden="true"
                  ></i>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <ContributionModal
        contribution={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

// ── Modal de detalhes ────────────────────────────────────────────────
interface ContributionModalProps {
  contribution: Contribution | null;
  onClose: () => void;
}

function ContributionModal({ contribution, onClose }: ContributionModalProps) {
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = contribution !== null;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // trava a rolagem do fundo enquanto o modal está aberto
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!contribution) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 -z-10 cursor-default bg-black/60 backdrop-blur-sm transition-opacity duration-200"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-setup-gray-900 p-6 shadow-2xl duration-200 motion-safe:animate-[modalIn_200ms_ease-out]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <i className="fa-solid fa-xmark text-lg" aria-hidden="true"></i>
        </button>

        <div className="flex items-center gap-3 pr-10">
          <i
            className="fa-brands fa-github text-2xl text-primary"
            aria-hidden="true"
          ></i>
          <h3
            id={titleId}
            className="font-mono text-base font-semibold text-white"
          >
            {contribution.repo}
          </h3>
        </div>

        <p
          id={descId}
          className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-line text-sm leading-relaxed text-gray-300"
        >
          {contribution.description}
        </p>

        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-setup-gray-900 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-setup-gray-900"
        >
          Ver contribuição
          <i
            className="fa-solid fa-arrow-up-right-from-square text-xs"
            aria-hidden="true"
          ></i>
        </a>
      </div>
    </div>
  );
}
