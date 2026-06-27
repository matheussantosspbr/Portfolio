import Link from "next/link";
import SectionTitle from "./SectionTitle";

interface Certification {
  name: string;
  institution: string;
  date: string;
  url?: string;
}

const certifications: Certification[] = [
  {
    name: "Análise e Desenvolvimento de Sistemas",
    institution: "UFBRA",
    date: "Cursando",
  },
];

export default function Certifications() {
  return (
    <section
      id="certificacoes"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle
        eyebrow="Formação"
        title="Certificações & Cursos"
        subtitle="Qualificações e cursos que concluí ao longo da carreira."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-primary/50"
          >
            <div className="flex items-start gap-3">
              <i
                className="fa-solid fa-certificate mt-1 text-xl text-primary"
                aria-hidden="true"
              ></i>
              <div>
                <h3 className="font-semibold text-white">{cert.name}</h3>
                <p className="text-sm text-gray-400">{cert.institution}</p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm text-gray-500">{cert.date}</span>
              {cert.url && (
                <Link
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verificar certificação ${cert.name}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:brightness-110"
                >
                  Verificar
                  <i
                    className="fa-solid fa-up-right-from-square text-xs"
                    aria-hidden="true"
                  ></i>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
