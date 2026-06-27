import { Resend } from "resend";

export interface ContactInput {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
}

type ContactErrorCode =
  | "NAME_IS_REQUIRED"
  | "EMAIL_IS_REQUIRED"
  | "MESSAGE_IS_REQUIRED"
  | "INTERNAL_SERVER_ERROR";

export type SendContactResult =
  | { ok: true }
  | { ok: false; error: ContactErrorCode; status: number };


export async function sendContactMessage(
  input: ContactInput,
): Promise<SendContactResult> {
  const { name, email, message, phone } = input;

  if (!name) return { ok: false, error: "NAME_IS_REQUIRED", status: 400 };
  if (!email) return { ok: false, error: "EMAIL_IS_REQUIRED", status: 400 };
  if (!message) return { ok: false, error: "MESSAGE_IS_REQUIRED", status: 400 };

  const { RESEND_EMAIL_TO, RESEND_API_KEY } = process.env;
  const resend = new Resend(RESEND_API_KEY);

  const res = await resend.emails.send({
    from: `Contact <${RESEND_EMAIL_TO}>`,
    to: RESEND_EMAIL_TO || "",
    template: {
      id: "contact",
      variables: { name, email, message, phone } as Record<string, string>,
    },
  });

  if (res.data == null) {
    return { ok: false, error: "INTERNAL_SERVER_ERROR", status: 500 };
  }

  return { ok: true };
}
