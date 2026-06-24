import CartProject, { type Project } from "./CartProject";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const projects: Project[] = [
  {
    title: "Portifólio",
    description: "Breve descrição do problema que esse projeto resolve.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Nginx"],
    repoUrl: "https://github.com/matheussantosspbr/Portfolio",
    liveUrl: "http://matheussantos.tech",
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
