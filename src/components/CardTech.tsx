// ── Template de tecnologia / stack ───────────────────────────────────
// Copie este formato no array `techs` em src/app/page.tsx:
//
//   { name: "React",      icon: "fa-brands fa-react" }
//   { name: "Node.js",    icon: "fa-brands fa-node-js" }
//   { name: "TypeScript", icon: "fa-solid fa-code" }   // sem ícone de marca? use um fa-solid
//
// Ícones de marca disponíveis no Font Awesome (já carregado no projeto):
//   fa-react · fa-node-js · fa-js · fa-html5 · fa-css3-alt · fa-python
//   fa-php · fa-java · fa-git-alt · fa-github · fa-docker · fa-figma · fa-aws
// ─────────────────────────────────────────────────────────────────────
export interface Tech {
  name: string;
  icon: string;
}

export default function CardTech({ name, icon }: Tech) {
  return (
    <div
      title={name}
      className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/10"
    >
      <i
        className={`${icon} text-4xl text-gray-300 transition duration-300 group-hover:text-primary`}
        aria-hidden="true"
      ></i>
      <span className="text-sm font-medium text-gray-200">{name}</span>
    </div>
  );
}
