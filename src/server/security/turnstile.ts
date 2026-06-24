// Verificação do Cloudflare Turnstile (CAPTCHA invisível).
// O frontend gera um token; aqui validamos esse token com a Cloudflare usando
// o TURNSTILE_SECRET_KEY (server-side). Documentação:
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteverifyResponse {
  success?: boolean;
}

/**
 * Valida o token do Turnstile com a Cloudflare. Retorna `true` apenas se a
 * Cloudflare confirmar. Falha fechada (retorna `false`) quando não há secret,
 * token ausente, ou erro de rede.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (remoteIp && remoteIp !== "unknown") form.append("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body: form });
    const data = (await res.json()) as SiteverifyResponse;
    return data.success === true;
  } catch {
    return false;
  }
}

/** `true` se o Turnstile está configurado (há secret no ambiente). */
export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}
