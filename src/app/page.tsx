import Link from "next/link";
import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Blog from "@/components/Blog";
import CartProject, { type Project } from "@/components/CartProject";
import CaseStudies from "@/components/CaseStudies";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Divider from "@/components/Divider";
import Experience from "@/components/Experience";
import OpenSource from "@/components/OpenSource";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import Skills from "@/components/Skills";
import Layout from "@/layout/Layout";

// ── Seus projetos — siga o template do CartProject ───────────────────
const projects: Project[] = [
  {
    title: "Projeto Exemplo 1",
    description: "Breve descrição do problema que esse projeto resolve.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/matheussantosspbr",
    liveUrl: "https://example.com",
  },
  {
    title: "Projeto Exemplo 2",
    description: "Outra descrição curta. Troque pelo seu projeto real.",
    tags: ["React", "Node.js", "MongoDB"],
    repoUrl: "https://github.com/matheussantosspbr",
  },
  {
    title: "Projeto Exemplo 3",
    description:
      "Adicione uma imagem com a prop `image` para a captura aparecer.",
    tags: ["PHP", "MySQL"],
    liveUrl: "https://example.com",
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section
        id="inicio"
        className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center overflow-hidden bg-galaxy bg-size-[50%] bg-no-repeat px-4 py-20 text-center"
      >
        <div
          className="absolute inset-0 bg-setup-gray-900/70"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center">
          <span className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Olá, eu sou
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl border-b border-white/30 pb-2.5">
            Matheus Santos
          </h1>
          <p className="mt-3 text-lg font-medium text-gray-300 sm:text-xl">
            Desenvolvedor Full Stack
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contato"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-gray-900 transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <i className="fa-regular fa-envelope" aria-hidden="true"></i>
              Entrar em contato
            </Link>
            <Link
              href="/assets/curriculo.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <i className="fa-solid fa-download" aria-hidden="true"></i>
              Baixar currículo
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      <Reveal>
        <About />
      </Reveal>

      <Divider type="SECONDARY" />

      {/* Projetos */}
      <Reveal>
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
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 80}>
                <CartProject {...project} />
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Divider />

      <Reveal>
        <Skills />
      </Reveal>

      <Divider type="SECONDARY" />

      <Reveal>
        <Experience />
      </Reveal>

      <Divider />

      <Reveal>
        <CaseStudies />
      </Reveal>

      <Divider type="SECONDARY" />

      <Reveal>
        <OpenSource />
      </Reveal>

      <Divider />

      <Reveal>
        <Blog />
      </Reveal>

      <Divider type="SECONDARY" />

      <Reveal>
        <Certifications />
      </Reveal>

      <Divider />

      <Reveal>
        <Contact />
      </Reveal>

      <BackToTop />
    </Layout>
  );
}
