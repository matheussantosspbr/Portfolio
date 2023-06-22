import Head from "next/head";
import CardProjects from "./components/CardProjects";
import CardProjectsLayout2 from "./components/CardProjectsLayout2";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfólio</title>
      </Head>
      <main className="h-alto w-full flex items-center justify-center flex-col">
        <section className="h-alto  flex items-center justify-center flex-col w-full pb-10">
          <h1 className="text-3xl text-white font-bold pb-14 pt-10">
            Portfólio
          </h1>
          <div className="h-auto w-full p-6  pt-4 text-gray-900 bg-cyan-500 flex flex-col items-center justify-center shadow-lg-inner shadow-gray-900 pl-8 pr-8">
            <div className="flex flex-wrap items-center justify-center w-full pt-10">
              <CardProjectsLayout2
                linguagens="react,tailwindcss"
                url="/projetos/site.avif"
                alt="Portfólio"
                title="Portfólio"
              />
              <CardProjects
                linguagens="html,css,js"
                url="/projetos/RegraDe3.avif"
                alt="Regra de 3"
                title="Regra de 3"
              />
              <CardProjects
                linguagens="html,css,js,php"
                url="/projetos/SistemaDeLogin.avif"
                alt="Sistema de Login"
                title="Sistema de Login"
              />
              <CardProjects
                linguagens="react,tailwindcss"
                url="/projetos/conversorDeMoeda.avif"
                alt="Conversor de Moedas"
                title="Conversor de Moedas"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
