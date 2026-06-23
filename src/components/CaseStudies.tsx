import Link from "next/link";
import SectionTitle from "./SectionTitle";

// ── Estudos de caso (1 a 3) — problema → decisões → resultado ─────────
interface CaseStudy {
  title: string;
  context: string;
  problem: string;
  decisions: string;
  result: string;
  tags?: string[];
  url?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Projeto em Destaque 1",
    context: "Contexto rápido: o que era e para quem.",
    problem:
      "Descreva o problema central que precisava ser resolvido e por que ele era difícil.",
    decisions:
      "Conte as principais decisões técnicas: arquitetura, ferramentas escolhidas e o porquê de cada escolha.",
    result:
      "Mostre o impacto com números quando possível (ex: -40% no tempo de carregamento, +30% de conversão).",
    tags: ["Next.js", "PostgreSQL", "Docker"],
    url: "https://github.com/matheussantosspbr",
  },
  {
    title: "Projeto em Destaque 2",
    context: "Contexto rápido do segundo case.",
    problem: "Qual dor do usuário ou do negócio este projeto atacou.",
    decisions: "Decisões de stack, trade-offs e como você validou as escolhas.",
    result: "Resultado mensurável e aprendizados que você levou adiante.",
    tags: ["React", "Node.js"],
  },
];

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {label}
      </span>
      <p className="mt-1 text-sm leading-relaxed text-gray-300">{text}</p>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="casos"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle
        eyebrow="Aprofundando"
        title="Estudos de caso"
        subtitle="Um olhar mais detalhado sobre projetos relevantes: o problema, as decisões e o impacto."
      />

      <div className="flex flex-col gap-8">
        {caseStudies.map((study) => (
          <article
            key={study.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-primary/40 sm:p-8"
          >
            <h3 className="text-xl font-bold text-white">{study.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{study.context}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <Block label="Problema" text={study.problem} />
              <Block label="Decisões técnicas" text={study.decisions} />
              <Block label="Resultado" text={study.result} />
            </div>

            {(study.tags || study.url) && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                {study.tags && (
                  <ul className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                {study.url && (
                  <Link
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:brightness-110"
                  >
                    Ver detalhes
                    <i
                      className="fa-solid fa-arrow-right text-xs"
                      aria-hidden="true"
                    ></i>
                  </Link>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
