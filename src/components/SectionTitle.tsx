interface SectionTitleProps {
  /** Texto pequeno acima do título (ex: "Meu trabalho") */
  eyebrow?: string;
  /** Título principal da seção */
  title: string;
  /** Frase de apoio abaixo do título */
  subtitle?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      {eyebrow && (
        <span className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {/* linha de destaque sob o título */}
      <span
        className="mt-4 h-1 w-16 rounded-full bg-primary"
        aria-hidden="true"
      />
      {subtitle && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
