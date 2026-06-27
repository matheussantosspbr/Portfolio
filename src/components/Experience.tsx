import Reveal from "./animations/Reveal";
import SectionTitle from "./SectionTitle";

// ── Sua experiência ──────────────────────────────────────────────────
// Agrupe por empresa. Para mostrar uma PROMOÇÃO, adicione mais de um
// cargo no array `roles` (o mais recente primeiro).
// Use `highlights` para descrever em formato de lista (bullets) e/ou
// `description` para um texto corrido.
interface Role {
  title: string;
  period: string;
  /** lista de conquistas / responsabilidades (bullets) */
  highlights?: string[];
  /** texto corrido — alternativa/complemento aos bullets */
  description?: string;
  tags?: string[];
}

interface Company {
  company: string;
  location?: string;
  /** cargos na empresa, do mais recente para o mais antigo */
  roles: Role[];
}

const experiences: Company[] = [
  {
    company: "Comhub",
    location: "São Paulo, Brasil",
    roles: [
      {
        title: "Desenvolvedor FullStack",
        period: "Dez/2025 — Atual",
        highlights: [
          "Desenvolvimento de aplicações escaláveis utilizando Next.js, Node.js e TypeScript.",
          "Aplicação de princípios de Clean Architecture e SOLID, com uso de serviços como cron jobs e Worker Threads.",
          "Implementação de testes automatizados utilizando Vitest.",
          "Monitoramento e observabilidade com Axiom.",
          "Implementação de estratégias de cache com Redis para otimização de performance.",
          "Suporte técnico ao time de integrações, garantindo estabilidade e eficiência nas conexões entre sistemas.",
        ],
        tags: [
          "Node.js",
          "Next.js",
          "Prisma",
          "React",
          "Docker, Docker Compose",
          "Linux",
          "Zustand",
          "Redis",
          "Express",
          "TypeScript",
          "Axiom",
          "Vitest",
        ],
      },
    ],
  },
  {
    company: "Help! Corretora",
    location: "São Paulo, Brasil",
    roles: [
      {
        title: "Desenvolvedor Full Stack Junior",
        period: "Fev/2023 — Jul/2024",
        highlights: ["Automações com Python e uso de IA."],
        tags: ["Python"],
      },
      {
        title: "Estagiário de Desenvolvimento de Sistemas",
        period: "Nov/2022 — Fev/2023",
        highlights: [
          "Desenvolvimento com Laravel e JQuery.",
          "Deploys de projetos via FTP",
          "Consultas usando API RESTFULL",
          "Versionamento de código Git - GitHub",
          "Automação de projetos com Python",
          "Arquitetura e modelagem de banco de dados",
        ],
        tags: ["Laravel", "PHP", "MySQL", "Jquery", "Git", "Github", "Linux"],
      },
    ],
  },
  {
    company: "PicPay S.A",
    location: "São Paulo, Brasil",
    roles: [
      {
        title: "Jovem Aprendiz — Planejamento Comercial",
        period: "Ago/2021 — Nov/2022",
        highlights: [
          "Apuração e análise de indicadores de Remuneração Variável do Time Comercial.",
          "Criação de consultas SQL através da ferramenta Databricks.",
          "Validações de dados via Databricks e Excel (fórmulas e funções).",
          "Montagem de relatórios e painéis no Salesforce.",
        ],
        tags: ["SQL", "Databricks", "Excel", "Salesforce"],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="mx-auto w-full max-w-4xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle eyebrow="Trajetória" title="Experiência profissional" />

      <ol className="relative ml-2 space-y-10 border-l border-white/15 pl-8">
        {experiences.map((exp, index) => (
          <li key={exp.company} className="relative">
            {/* marcador da empresa na linha do tempo */}
            <span
              className="absolute left-[-2.6rem] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 ring-4 ring-setup-gray-900"
              aria-hidden="true"
            >
              <i className="fa-solid fa-building text-xs text-primary"></i>
            </span>

            <Reveal delay={index * 80}>
              <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-primary/50 hover:bg-white/10">
                {/* cabeçalho da empresa */}
                <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-white">
                    {exp.company}
                  </h3>
                  {exp.roles.length > 1 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                      <i
                        className="fa-solid fa-arrow-trend-up text-[0.65rem]"
                        aria-hidden="true"
                      ></i>
                      Promovido
                    </span>
                  )}
                </header>
                {exp.location && (
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-400">
                    <i
                      className="fa-solid fa-location-dot text-xs"
                      aria-hidden="true"
                    ></i>
                    {exp.location}
                  </p>
                )}

                {/* cargos (sub-linha do tempo para mostrar progressão) */}
                <ol
                  className={
                    exp.roles.length > 1
                      ? "mt-4 space-y-5 border-l border-white/10 pl-5"
                      : "mt-4"
                  }
                >
                  {exp.roles.map((role) => (
                    <li
                      key={`${role.title}-${role.period}`}
                      className="relative"
                    >
                      {exp.roles.length > 1 && (
                        <span
                          className="absolute left-[-1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-setup-gray-900"
                          aria-hidden="true"
                        />
                      )}

                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {role.period}
                      </span>
                      <h4 className="mt-0.5 font-semibold text-white">
                        {role.title}
                      </h4>

                      {role.description && (
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-300">
                          {role.description}
                        </p>
                      )}

                      {role.highlights && role.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1.5">
                          {role.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-relaxed text-gray-300"
                            >
                              <i
                                className="fa-solid fa-check mt-1 shrink-0 text-xs text-primary"
                                aria-hidden="true"
                              ></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {role.tags && role.tags.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {role.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
