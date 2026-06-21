import Image from "next/image";
import SectionTitle from "./SectionTitle";

// Destaques rápidos — edite à vontade
const highlights = [
  { icon: "fa-solid fa-location-dot", label: "São Paulo, Brasil" },
  { icon: "fa-solid fa-graduation-cap", label: "Análise e Desenvolvimento de Sistemas" },
  { icon: "fa-solid fa-circle-check", label: "Disponível para projetos" },
];

export default function About() {
  return (
    <section id="sobre" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20">
      <SectionTitle eyebrow="Quem sou eu" title="Sobre mim" />

      <div className="grid items-center gap-10 md:grid-cols-[18rem_1fr]">
        {/* Foto — arquivo em public/assets/imgs/perfil.webp */}
        <div className="mx-auto">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-2 border-primary/40 shadow-[0_0_40px_-10px_var(--color-primary)]">
            <Image
              src="/assets/imgs/perfil.webp"
              alt="Foto de Matheus Santos"
              fill
              sizes="256px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-lg leading-relaxed text-gray-200">
            Olá! Sou o <span className="font-semibold text-primary">Matheus Santos</span>,
            desenvolvedor FullStack apaixonado por construir experiências digitais que unem
            código limpo e um design cuidadoso.
          </p>
          <p className="leading-relaxed text-gray-400">
            Trabalho do back-end ao front-end transformando ideias em produtos reais,
            sempre com foco em performance, acessibilidade e boa experiência do usuário.
            Estou sempre estudando e aplicando novas tecnologias para entregar o melhor
            resultado possível.
          </p>

          <ul className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <i className={`${item.icon} text-primary`} aria-hidden="true"></i>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
