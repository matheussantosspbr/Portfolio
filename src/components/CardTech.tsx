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
