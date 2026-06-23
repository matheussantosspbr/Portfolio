import Image from "next/image";
import Link from "next/link";

// ── Template de projeto ──────────────────────────────────────────────
// Copie este formato no array `projects` em src/app/page.tsx:
//
//   {
//     title: "Nome do Projeto",
//     description: "Uma frase curta sobre o que o projeto faz.",
//     image: "/assets/imgs/projeto-1.avif", // opcional — sem isso mostra um placeholder
//     tags: ["Next.js", "TypeScript", "Tailwind"],
//     repoUrl: "https://github.com/...",     // opcional
//     liveUrl: "https://...",                // opcional
//   }
// ─────────────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export default function CartProject({
  title,
  description,
  image,
  tags,
  repoUrl,
  liveUrl,
}: Project) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_8px_30px_-6px_var(--color-primary)]">
      {/* aspect-video reserva o espaço da imagem (evita layout shift) */}
      <div className="relative aspect-video w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`Captura do projeto ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 to-setup-gray-900">
            <span className="text-5xl font-bold text-primary/50">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-300">{description}</p>

        <ul className="mt-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-3">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver o projeto ${title} online`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                aria-hidden="true"
              ></i>
              Ver projeto
            </Link>
          )}
          {repoUrl && (
            <Link
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver o código do projeto ${title} no GitHub`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <i className="fa-brands fa-github" aria-hidden="true"></i>
              Código
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
