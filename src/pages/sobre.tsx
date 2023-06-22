import Divider from "./components/Divider";
import Button from "./components/Button";
import Tecnologias from "./sections/Tecnologias";
import Ferramentas from "./sections/Ferramentas";
import MeEnvieUmaMensagem from "./sections/MeEnvieUmaMensagem";
import { Idade } from "@/config/main";
import Head from "next/head";

export default function Sobre() {
  let idade = Idade();
  return (
    <>
      <Head>
        <title>Sobre</title>
      </Head>
      <main className="h-full w-full flex items-center justify-center flex-col">
        <section className="h-72 flex items-center justify-center flex-col w-full pl-8 pr-8">
          <h1 className="text-3xl text-white font-bold">Sobre</h1>
        </section>
        <Divider type="PRIMARY" />
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
              <br />
              Além disso estudei e pretendo estudar mais um pouco futuramente
              sobre Design Gráfico. Atualmente tenho me aprofundado em{" "}
              <span className="bg-cyan-500 text-gray-900">React</span>.
            </p>
          </div>
        </section>
        <Divider type="SECONDARY" />
        <Tecnologias />
        <Divider type="PRIMARY" />
        <Ferramentas />
        <Divider type="SECONDARY" />
        <section className="flex mt-8 items-center justify-center mb-8 flex-col pl-8 pr-8">
          <h2 className="text-2xl text-white font-semibold mb-8">Portifólio</h2>
          <Button
            type="PRIMARY"
            title="Clique aqui"
            width="w-32"
            add="text-base"
            url="/portfolio"
          />
        </section>
        <Divider type="PRIMARY" />
        <section className="flex mt-8 items-center justify-center mb-8 flex-col pl-8 pr-8">
          <h2 className="text-2xl text-white font-semibold mb-8">
            Certificados
          </h2>
          <Button
            type="PRIMARY"
            title="Clique aqui"
            width="w-32"
            add="text-base"
            url="/certificados"
          />
        </section>
        <Divider type="SECONDARY" />
        <MeEnvieUmaMensagem />
      </main>
    </>
  );
}
