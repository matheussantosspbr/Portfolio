import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { withApiGuard } from "@/app/api/middleware/guard";
import { getClientIp } from "@/app/api/middleware/rate-limit";
import { isHoneypotTriggered } from "@/lib/api/honeypot";
import { isTurnstileEnabled, verifyTurnstile } from "@/lib/api/turnstile";

export async function POST(request: NextRequest) {
  const blocked = await withApiGuard(request, { limit: 5, windowMs: 60_000 });
  if (blocked) return blocked;

  try {
    const body = await request.json();
    const { name, email, message, phone, turnstileToken } = body;

    if (isHoneypotTriggered(body)) {
      return NextResponse.json({ status: 200 });
    }

    if (isTurnstileEnabled()) {
      const human = await verifyTurnstile(turnstileToken, getClientIp(request));
      if (!human) {
        return NextResponse.json(
          { error: "TURNSTILE_FAILED" },
          { status: 403 },
        );
      }
    }

    const { RESEND_EMAIL_TO, RESEND_API_KEY } = process.env;
    const resend = new Resend(RESEND_API_KEY);

    if (!name)
      return NextResponse.json({ error: "NAME_IS_REQUIRED" }, { status: 400 });
    if (!email)
      return NextResponse.json({ error: "EMAIL_IS_REQUIRED" }, { status: 400 });
    if (!message)
      return NextResponse.json(
        { error: "MESSAGE_IS_REQUIRED" },
        { status: 400 },
      );

    const res = await resend.emails.send({
      from: `Contact <${RESEND_EMAIL_TO}>`,
      to: RESEND_EMAIL_TO || "",
      template: {
        id: "contact",
        variables: {
          name,
          email,
          message,
          phone,
        },
      },
    });

    if (res.data == null) {
      return NextResponse.json(
        { error: "INTERNAL_SERVER_ERROR" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "INTERNAL_SERVER_ERROR", status: 500 });
  }
}
