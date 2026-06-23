"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SectionTitle from "./SectionTitle";

type Field = "name" | "email" | "message";
type FormState = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

// Site key pública do Turnstile (segura no client). Se ausente, o widget não
// é renderizado e o backend não exige Turnstile.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
    },
  ) => string;
  reset: (id?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const socials = [
  {
    icon: "fa-regular fa-envelope",
    label: "E-mail",
    href: "mailto:contato@matheussantos.tech",
  },
  {
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matheussantosspbr/",
  },
  {
    icon: "fa-brands fa-github",
    label: "GitHub",
    href: "https://github.com/matheussantosspbr",
  },
];

function validate(field: Field, value: string): string {
  if (!value.trim()) return "Campo obrigatório.";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Informe um e-mail válido.";
  return "";
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  // honeypot: preenchido apenas por bots (campo escondido)
  const [honeypot, setHoneypot] = useState("");
  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState("");
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (
      !TURNSTILE_SITE_KEY ||
      !window.turnstile ||
      !widgetEl.current ||
      widgetId.current
    ) {
      return;
    }
    widgetId.current = window.turnstile.render(widgetEl.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: setTurnstileToken,
      "error-callback": () => setTurnstileToken(""),
      "expired-callback": () => setTurnstileToken(""),
      theme: "dark",
    });
  }, []);

  // injeta o script do Turnstile e renderiza o widget (só se houver site key)
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const id = "cf-turnstile-script";
    if (document.getElementById(id)) {
      renderTurnstile();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.head.appendChild(script);
  }, [renderTurnstile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as Field;
    setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      message: validate("message", form.message),
    };
    setErrors(next);

    const firstInvalid = (["name", "email", "message"] as Field[]).find(
      (f) => next[f],
    );
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    // Turnstile configurado mas ainda não resolvido
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setFeedback("Confirme que você não é um robô antes de enviar.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    const resetTurnstile = () => {
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setTurnstileToken("");
    };

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot, turnstileToken }),
      });

      if (res.ok) {
        setStatus("success");
        setFeedback("Mensagem enviada! Em breve eu retorno.");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        resetTurnstile();
        return;
      }

      if (res.status === 429) {
        setStatus("error");
        setFeedback("Muitas tentativas. Aguarde um minuto e tente novamente.");
        resetTurnstile();
        return;
      }

      setStatus("error");
      setFeedback(
        "Não foi possível enviar agora. Tente novamente em instantes.",
      );
      resetTurnstile();
    } catch {
      setStatus("error");
      setFeedback("Erro de conexão. Verifique sua internet e tente novamente.");
      resetTurnstile();
    }
  };

  const fieldClasses = (field: Field) =>
    `w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 transition focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
      errors[field] ? "border-red-500" : "border-white/15 focus:border-primary"
    }`;

  return (
    <section
      id="contato"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20"
    >
      <SectionTitle
        eyebrow="Vamos conversar"
        title="Contato"
        subtitle="Tem um projeto em mente ou quer trocar uma ideia? Me mande uma mensagem."
      />

      <div className="grid gap-10 md:grid-cols-[1fr_18rem]">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Nome <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={fieldClasses("name")}
              placeholder="Seu nome"
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-sm text-red-400"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              E-mail <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={fieldClasses("email")}
              placeholder="voce@email.com"
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1.5 text-sm text-red-400"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Mensagem <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${fieldClasses("message")} resize-y`}
              placeholder="Escreva sua mensagem..."
            />
            {errors.message && (
              <p
                id="message-error"
                role="alert"
                className="mt-1.5 text-sm text-red-400"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot: escondido de humanos; bots tendem a preencher. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {/* Widget do Turnstile (renderizado só quando há site key) */}
          {TURNSTILE_SITE_KEY && <div ref={widgetEl} />}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-gray-900 transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <i
              className={
                status === "sending"
                  ? "fa-solid fa-spinner animate-spin"
                  : "fa-regular fa-paper-plane"
              }
              aria-hidden="true"
            ></i>
            {status === "sending" ? "Enviando..." : "Enviar mensagem"}
          </button>

          <p
            aria-live="polite"
            className={`min-h-5 text-sm ${
              status === "error" ? "text-red-400" : "text-primary"
            }`}
          >
            {feedback}
          </p>
        </form>

        {/* Links diretos */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-400">Ou me encontre em:</p>
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-200 transition hover:border-primary/50 hover:text-primary"
            >
              <i
                className={`${social.icon} w-5 text-center text-lg text-primary`}
                aria-hidden="true"
              ></i>
              <span className="text-sm font-medium">{social.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
