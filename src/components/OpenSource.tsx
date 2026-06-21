import Link from "next/link";
import SectionTitle from "./SectionTitle";

// ── Contribuições open source — edite à vontade ──────────────────────
interface Contribution {
  repo: string;
  description: string;
  url: string;
}

const contributions: Contribution[] = [
  {
    repo: "owner/repositorio",
    description:
      "O que você contribuiu: correção de bug, feature, documentação, etc. Seja específico sobre o impacto.",
    url: "https://github.com/matheussantosspbr",
  },
  {
    repo: "owner/outro-projeto",
    description:
      "Outra contribuição relevante. Mencione a PR aceita e o que ela melhorou no projeto.",
    url: "https://github.com/matheussantosspbr",
  },
];

export default function OpenSource() {
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
        {contributions.map((item) => (
          <Link
            key={item.repo}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/50"
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
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
