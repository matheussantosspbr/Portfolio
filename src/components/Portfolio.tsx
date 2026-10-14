import Reveal from "./animations/Reveal";
import CartProject, { type Project } from "./CartProject";
import SectionTitle from "./SectionTitle";

const projects: Project[] = [
  {
    title: "Portfólio",
    description:
      "Portfólio pessoal desenvolvido para centralizar meus projetos, experiências e formas de contato em um só lugar, com foco em performance e design responsivo.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Nginx"],
    image: "/assets/imgs/projects/portfolio.avif",
    repoUrl: "https://github.com/matheussantosspbr/Portfolio",
    liveUrl: "https://matheussantos.tech",
  },
  {
    title: "VaiperUI",
    description:
      "Biblioteca de componentes React para Tailwind CSS: Button, Input e Select acessíveis, com máscaras de input, efeito ripple e tema por uma única cor (customColor).",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Storybook",
      "Vitest",
      "Turborepo",
      "pnpm",
      "Biome",
    ],
    image: "/assets/imgs/projects/vaiperui.avif",
    repoUrl: "https://github.com/vaiperliotech/vaiperui",
    liveUrl: "https://vaiperui.vercel.app",
  },
];

export default function Portfolio() {
  return (
    <section
      id="projetos"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle
        eyebrow="Meu trabalho"
        title="Projetos"
        subtitle="Alguns dos projetos que desenvolvi. Veja o código ou a versão online."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 80}>
            <CartProject {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
