interface DividerProps {
  type?: "PRIMARY" | "SECONDARY";
}

export default function Divider({ type = "PRIMARY" }: DividerProps) {
  const from = type === "PRIMARY" ? "from-primary" : "from-setup-gray-900";
  const to = type === "PRIMARY" ? "to-setup-gray-900" : "to-primary";
  return (
    <div
      className={`
        bg-linear-to-l
        ${from}
        ${to}
        h-px
        w-full
        `}
    ></div>
  );
}
