import { type NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/server/http/client-ip";
import { sendContactMessage } from "@/server/contact/send-contact-message";
import { withApiGuard } from "@/server/security/guard";
import { isHoneypotTriggered } from "@/server/security/honeypot";
import {
  isTurnstileEnabled,
  verifyTurnstile,
} from "@/server/security/turnstile";

export async function POST(request: NextRequest) {
  const blocked = await withApiGuard(request, { limit: 5, windowMs: 60_000 });
  if (blocked) return blocked;

  try {
    const body = await request.json();
    const { turnstileToken } = body;

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

    const result = await sendContactMessage(body);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "INTERNAL_SERVER_ERROR", status: 500 });
  }
}
