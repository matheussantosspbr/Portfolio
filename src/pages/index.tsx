import Head from "next/head";
import { Inter } from "next/font/google";
import Divider from "./components/Divider";
import CardProjects from "./components/CardProjects";
import Button from "./components/Button";
import Tecnologias from "./sections/Tecnologias";
import Ferramentas from "./sections/Ferramentas";
import MeEnvieUmaMensagem from "./sections/MeEnvieUmaMensagem";
import { Idade } from "@/config/main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let idade = Idade();

  return (
    <>
      <Head>
        <title>Início</title>
      </Head>
      <main className="h-full w-full flex items-center justify-center flex-col">
        <section className="h-108 flex items-center justify-center flex-col w-full bg-galaxy bg-no-repeat bg-size-25 pl-8 pr-8">
          <h1 className="text-3xl text-white font-bold">Matheus Santos</h1>
          <h2 className="text-2xl text-white font-semibold">Dev. FullStack</h2>
        </section>
        <Divider type="PRIMARY" />
        <section className="mt-8 w-full flex items-center flex-col justify-center">
          <h2 className="text-2xl text-white font-semibold mb-8">Portfólio</h2>
          <div className="h-auto w-full p-6 pt-16  text-gray-900 bg-cyan-500 flex flex-col items-center justify-center shadow-lg-inner shadow-gray-900 pl-8 pr-8">
            <div className="flex flex-wrap items-center justify-center">
              <CardProjects
                linguagens="react,tailwindcss"
                url="conversorDeMoeda.avif"
                title="Conversor de Moeda"
                link="https://precohoje.info/"
              />
            </div>
            <Button
              title="Ver Mais"
              type="SECONDARY"
              width="w-32"
              url="/portfolio"
              add="text-base"
            />
          </div>
        </section>
        <Divider type="SECONDARY" />
        <section className="flex mt-8 items-center justify-center mb-8 pl-8 pr-8 lg:flex-col lg:text-justify">
          <figure>
            <img
              src="/fotoMinha.avif"
              alt="foto_Minha"
              className="w-52 rounded-full border-4 border-cyan-500"
            />
          </figure>
          <div className=" ml-4 lg:flex lg:flex-col lg:items-center lg:justify-center lg:ml-0">
            <h2 className="text-2xl text-white font-semibold mb-4 lg:text-center lg:mt-4">
              Matheus Santos
            </h2>
            <p className="text-white text-base mb-2 xl:text-sm lg:text-base">
              Olá, Meu nome é Matheus Santos, tenho {idade} anos e Moro na
              cidade de Mauá, no sudeste de São Paulo.
              <br />
              Ja fiz curso de{" "}
              <span className="bg-cyan-500 text-gray-900">
                Auxiliar de Escritório
              </span>{" "}
              pela Senac, Já fiz curso de{" "}
              <span className="bg-cyan-500 text-gray-900"> Inglês</span> pela
              Tibtis, entre outros cursos.
              <br />
              Amo a área de tecnologia, e por isso, de diversos tipos de
              serviços dentro dessa área, optei em começar minha{" "}
              <span className="bg-cyan-500 text-gray-900">
                Graduação de Análise e Desenvolvimento de Sistemas
              </span>{" "}
              em fevereiro de 2022.
            </p>
            <Button
              title="Ver Mais"
              type="PRIMARY"
              width="w-32"
              url="/sobre"
              add="xl:h-8 xl:text-sm xl:w-28 text-base"
            />
          </div>
        </section>
        <Divider type="PRIMARY" />
        <Tecnologias />
        <Divider type="SECONDARY" />
        <Ferramentas />
        <Divider type="PRIMARY" />
        <MeEnvieUmaMensagem />
      </main>
    </>
  );
}
