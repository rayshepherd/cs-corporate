import { parsePayload } from "@/lib/forms";
import { erpConfigured, recordLead } from "@/lib/erpnext";
import { mailConfigured, sendSubmissionEmail } from "@/lib/mail";

const MIN_FILL_MS = 3000; // forms completed faster than this are almost certainly bots

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "The form data could not be read." }, { status: 400 });
  }

  // Spam checks: answer bots with a normal success so they don't adapt
  const honeypot = typeof body._hp === "string" ? body._hp : "";
  const startedAt = typeof body._t === "number" ? body._t : 0;
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    console.warn("[contact] submission dropped as spam", { honeypot: Boolean(honeypot), startedAt });
    return Response.json({ ok: true });
  }

  const { payload, errors } = parsePayload(body);
  if (!payload) return Response.json({ errors }, { status: 422 });

  const useErp = erpConfigured();
  const useMail = mailConfigured();

  if (!useErp && !useMail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] no delivery configured; submission:", payload);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[contact] neither SMTP nor ERPNext is configured");
    return Response.json(
      { error: "The form is not available right now. Email us directly instead." },
      { status: 503 },
    );
  }

  let leadUrl: string | undefined;
  let erpOk = false;
  let mailOk = false;

  if (useErp) {
    try {
      leadUrl = await recordLead(payload);
      erpOk = true;
    } catch (e) {
      console.error("[contact] ERPNext failed:", e);
    }
  }

  if (useMail) {
    try {
      await sendSubmissionEmail(payload, leadUrl);
      mailOk = true;
    } catch (e) {
      console.error("[contact] email failed:", e);
    }
  }

  if (erpOk || mailOk) return Response.json({ ok: true });

  return Response.json(
    { error: "The form could not be sent. Try again in a few minutes, or email us directly." },
    { status: 502 },
  );
}
