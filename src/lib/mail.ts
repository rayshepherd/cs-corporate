import nodemailer from "nodemailer";
import type { Payload } from "./forms";
import { rowsToHtml, rowsToText, subjectFor, summaryRows } from "./summary";

/**
 * Sends the submission by email over SMTP.
 *
 * Environment variables:
 *   SMTP_HOST, SMTP_PORT (465 = SSL, 587 = STARTTLS), SMTP_USER, SMTP_PASS
 *   MAIL_FROM            e.g. "Website <website@yourdomain.com>"
 *   MAIL_TO              inbox for contact messages (comma-separate several)
 *   MAIL_TO_RESELLER     optional separate inbox for reseller applications
 */
export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_TO);
}

export async function sendSubmissionEmail(p: Payload, erpLeadUrl?: string): Promise<void> {
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  const to =
    p.kind === "reseller" && process.env.MAIL_TO_RESELLER ? process.env.MAIL_TO_RESELLER : process.env.MAIL_TO!;

  const rows = summaryRows(p);
  const leadLine = erpLeadUrl ? `\n\nLead in ERPNext: ${erpLeadUrl}` : "";
  const leadHtml = erpLeadUrl ? `<p style="font-family:Arial,sans-serif"><a href="${erpLeadUrl}">Open the lead in ERPNext</a></p>` : "";

  await transport.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    replyTo: p.email,
    subject: subjectFor(p),
    text: rowsToText(rows) + leadLine,
    html: rowsToHtml(rows) + leadHtml,
  });
}
