import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-52 p-4 shadow-[0_-8px_20px_-3px_var(--color-primary)] flex flex-col w-full items-center justify-center mt-8">
      <ul className="flex w-full items-center justify-center mb-2 gap-2.5 [&>li]:w-10">
        <li>
          <Link
            href="https://www.linkedin.com/in/matheussantosspbr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <span className="w-10 h-10 flex items-center justify-center text-xl text-white border-2 rounded-full hover:bg-cyan-500 hover:text-gray-900 hover:border-cyan-500">
              <i className="fa-brands fa-linkedin-in"></i>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/matheussantosspbr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <span className="w-10 h-10 flex items-center justify-center text-xl text-white border-2 rounded-full hover:bg-cyan-500 hover:text-gray-900 hover:border-cyan-500">
              <i className="fa-brands fa-github"></i>
            </span>
          </Link>
        </li>
        <li>
          <Link href="mailto:contato@matheussantos.tech" aria-label="Email">
            <span className="w-10 h-10 flex items-center justify-center text-xl text-white border-2 rounded-full hover:bg-cyan-500 hover:text-gray-900 hover:border-cyan-500">
              <i className="fa-regular fa-envelope"></i>
            </span>
          </Link>
        </li>
      </ul>
      <div className="text-center">
        <p className="text-gray-300">Feito com ♥ pelo Dev. Matheus Santos.</p>
        <p className="text-gray-500">© {new Date().getFullYear()}.</p>
      </div>
    </footer>
  );
}
