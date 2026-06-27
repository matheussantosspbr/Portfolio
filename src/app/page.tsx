import Link from "next/link";
import About from "@/components/About";
import Reveal from "@/components/animations/Reveal";
import BackToTop from "@/components/BackToTop";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import OpenSource from "@/components/OpenSource";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Divider from "@/components/ui/Divider";
import Layout from "@/layout/Layout";

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
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl border-b border-white/30 pb-2.5">
            Matheus SantosS
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
              href="/assets/pdfs/curriculo.pdf"
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

      <Reveal>
        <Portfolio />
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
        <OpenSource />
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
