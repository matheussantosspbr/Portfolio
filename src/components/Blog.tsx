import Link from "next/link";
import SectionTitle from "./SectionTitle";

interface Article {
  title: string;
  summary: string;
  date: string;
  platform: string;
  url: string;
}

const articles: Article[] = [
  {
    title: "Título do seu artigo",
    summary:
      "Um resumo curto e atraente do conteúdo do artigo, despertando a curiosidade de quem lê.",
    date: "Jan 2026",
    platform: "Dev.to",
    url: "https://dev.to",
  },
  {
    title: "Outro artigo interessante",
    summary:
      "Resumo do segundo artigo. Fale do problema abordado e do que o leitor vai aprender.",
    date: "Dez 2025",
    platform: "Medium",
    url: "https://medium.com",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle
        eyebrow="Escrita"
        title="Blog & Artigos"
        subtitle="Coisas que escrevi sobre desenvolvimento e tecnologia."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((article) => (
          <article
            key={article.title}
            className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-primary">
                {article.platform}
              </span>
              <span aria-hidden="true">•</span>
              <time>{article.date}</time>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {article.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">
              {article.summary}
            </p>
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ler o artigo "${article.title}"`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:brightness-110"
            >
              Ler artigo
              <i
                className="fa-solid fa-arrow-right text-xs"
                aria-hidden="true"
              ></i>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
