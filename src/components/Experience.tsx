import SectionTitle from "./SectionTitle";

// ── Sua experiência — edite/adicione itens (mais recente primeiro) ────
interface Job {
  role: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
}

const experiences: Job[] = [
  {
    role: "Desenvolvedor FullStack",
    company: "Empresa Atual",
    period: "2023 — Atual",
    description:
      "Descreva suas principais responsabilidades e conquistas neste cargo. Foque em resultados e tecnologias usadas.",
    tags: ["Next.js", "Node.js", "TypeScript"],
  },
  {
    role: "Desenvolvedor Front-end",
    company: "Empresa Anterior",
    period: "2021 — 2023",
    description:
      "Outro cargo importante da sua trajetória. Conte o que você construiu e o impacto que gerou.",
    tags: ["React", "Tailwind"],
  },
  {
    role: "Estágio em Desenvolvimento",
    company: "Primeira Experiência",
    period: "2020 — 2021",
    description:
      "Onde tudo começou. Mencione o que aprendeu e como evoluiu durante o período.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="mx-auto w-full max-w-4xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle eyebrow="Trajetória" title="Experiência profissional" />

      <ol className="relative ml-2 border-l border-white/15 pl-8">
        {experiences.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative mb-10 last:mb-0">
            {/* marcador na linha do tempo */}
            <span
              className="absolute -left-2.25 mt-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-setup-gray-900"
              aria-hidden="true"
            />
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-primary/50 hover:bg-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {job.period}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-white">{job.role}</h3>
              <p className="text-sm text-gray-400">{job.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                {job.description}
              </p>
              {job.tags && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
