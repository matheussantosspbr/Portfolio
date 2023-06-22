import Head from "next/head";
import Certificados from "./components/Certificado";

export default function Certificado() {
  return (
    <>
      <Head>
        <title>Certificados</title>
      </Head>
      <main className="h-alto w-full flex items-center justify-center flex-col">
        <section className="h-alto  flex items-center justify-center flex-col w-full pb-10">
          <h1 className="text-3xl text-white font-bold pb-14 pt-10">
            Certificados
          </h1>
          <div className="w-[70%]">
            <Certificados
              title="Lógica de Programação Essencial"
              horas="4 Horas"
              url="0"
            />
            <Certificados
              title="Aprenda o que são Estrutura de Dados e Algoritmos"
              horas="2 Horas"
              url="1"
            />
            <Certificados
              title="Introdução a Criação de Site com HTML5 e CSS3"
              horas="6 Horas"
              url="2"
            />
            <Certificados
              title="Introdução ao JavaScript"
              horas="3 Horas"
              url="3"
            />
            <Certificados title="JavaScript" horas="40 Horas" url="4" />
            <Certificados title="Introdução ao PHP" horas="4 Horas" url="5" />
            <Certificados
              title="IDE Instalação e Configuração (Visual Studio Code)"
              horas="1 Horas"
              url="6"
            />
            <Certificados title="Projeto PicPro" horas="30 Horas" url="7" />
          </div>
        </section>
      </main>
    </>
  );
}
