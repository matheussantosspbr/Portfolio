import Head from "next/head";
import InputLink from "./sections/Links/InputLink";

export default function Links() {
  return (
    <>
      <Head>Links</Head>
      <main className="bg-galaxy md:bg-size-25 bg-no-repeat h-auto w-full flex flex-col items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center">
          <figure className="mb-4 shadow-cyan-500 shadow-center-md rounded-full border-2 border-dashed border-cyan-500 p-2 w-32">
            <img src="/logo.avif" alt="Logo" className="w-32" />
          </figure>
          <h2 className="text-2xl text-white font-bold">Matheus Santos</h2>
          <h3 className="text xl text-white font-semibold">Dev. Full-Stack</h3>
        </div>
        <div className=" flex flex-col mb-8 mt-8">
          <InputLink title="Web Site" link="/" />
          <InputLink
            title="Instagram"
            link="https://www.instagram.com/matheussantos.pro/"
          />
          <InputLink
            title="WhatsApp"
            link="https://api.whatsapp.com/send?phone=5511953109028"
          />
          <InputLink
            title="LinkedIn"
            link="https://www.linkedin.com/in/matheussantosspbr/"
          />
          <InputLink
            title="Github"
            link="https://github.com/matheussantosspbr"
          />

          <a
            href="#"
            className="border-2 border-cyan-500 rounded-full p-4 w-60 hover:bg-cyan-500 text-white flex flex-col items-center justify-center shadow-center-md shadow-cyan-500 transition-colors
            duration-[0.2s]"
          >
            <p>Youtube</p>
            <span className="text-sm">Em Breve</span>
          </a>
        </div>
        <div>
          <p className="text-white text-center">
            Feito com ♥ pelo Dev. Matheus Santos.
          </p>
          <p className="text-white text-center">© 2022.</p>
        </div>
      </main>
    </>
  );
}
