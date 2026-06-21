import SectionTitle from "./SectionTitle";

// ── Skills por categoria — edite à vontade ───────────────────────────
interface Category {
  name: string;
  description: string;
  stacks: string[];
}

const categories: Category[] = [
  {
    name: "Front-end",
    description: "Construção de interfaces responsivas, acessíveis e performáticas.",
    stacks: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "jQuery",
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    name: "Back-end",
    description: "APIs, regras de negócio e integração de serviços no servidor.",
    stacks: ["Node.js", "Express", "NestJS", "PHP", "Laravel", "FastAPI"],
  },
  {
    name: "Banco de Dados & ORMs",
    description: "Persistência, cache e acesso a dados com ORMs.",
    stacks: ["MySQL", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    name: "DevOps & Infra",
    description: "Versionamento, conteinerização, deploy e infraestrutura.",
    stacks: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Docker",
      "Nginx",
      "Cloudflare",
      "Postman",
      "Axiom",
      "VPS",
      "Coolify"
    ],
  },
  {
    name: "Bots & Integrações",
    description: "Automações e bots para plataformas de comunicação.",
    stacks: ["Discord", "Discord.js", "Bots"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20">
      <SectionTitle
        eyebrow="Minha stack"
        title="Skills"
        subtitle="Tecnologias, ferramentas e práticas organizadas por área de atuação."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-primary/40"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {category.description}
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {category.stacks.map((stack) => (
                <li
                  key={stack}
                  className="rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary"
                >
                  {stack}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
