import type { Payload } from "./forms";
import { rowsToHtml, subjectFor, summaryRows } from "./summary";

/**
 * Records the submission as a Lead in ERPNext.
 * If a Lead with the same email already exists, the submission is added to it as a comment
 * instead of creating a duplicate.
 *
 * Environment variables:
 *   ERPNEXT_URL          e.g. https://erp.lb.djlab.xyz
 *   ERPNEXT_API_KEY      API key of a dedicated "Website" user with Lead + Comment permissions
 *   ERPNEXT_API_SECRET   its API secret
 *   ERPNEXT_LEAD_SOURCE  optional: name of an existing Lead Source, e.g. "Website"
 */
export function erpConfigured(): boolean {
  return Boolean(process.env.ERPNEXT_URL && process.env.ERPNEXT_API_KEY && process.env.ERPNEXT_API_SECRET);
}

function base(): string {
  return process.env.ERPNEXT_URL!.replace(/\/+$/, "");
}

async function erp(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${base()}${path}`, {
    ...init,
    headers: {
      Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
}

async function readError(res: Response): Promise<string> {
  const text = await res.text().catch(() => "");
  try {
    const j = JSON.parse(text) as { exception?: string; exc_type?: string; _server_messages?: string };
    return `${res.status} ${j.exc_type || ""} ${j.exception || j._server_messages || ""}`.trim().slice(0, 500);
  } catch {
    return `${res.status} ${text.slice(0, 300)}`;
  }
}

async function findLeadByEmail(email: string): Promise<string | null> {
  const qs = new URLSearchParams({
    filters: JSON.stringify([["email_id", "=", email]]),
    fields: JSON.stringify(["name"]),
    limit_page_length: "1",
  });
  const res = await erp(`/api/resource/Lead?${qs}`);
  if (!res.ok) throw new Error(`Lead lookup failed: ${await readError(res)}`);
  const data = (await res.json()) as { data?: { name: string }[] };
  return data.data?.[0]?.name ?? null;
}

function leadFields(p: Payload): Record<string, unknown> {
  const person = p.kind === "reseller" ? p.contactName : p.name;
  const fields: Record<string, unknown> = {
    lead_name: person,
    first_name: person,
    email_id: p.email,
    mobile_no: p.phone || undefined,
    company_name: (p.kind === "reseller" ? p.companyName : p.company) || undefined,
    type: p.kind === "reseller" ? "Channel Partner" : "Client",
  };
  if (p.kind === "reseller") {
    fields.city = p.city;
    fields.website = p.website || undefined;
  }
  if (process.env.ERPNEXT_LEAD_SOURCE) fields.source = process.env.ERPNEXT_LEAD_SOURCE;
  return fields;
}

async function createLead(p: Payload): Promise<string> {
  let res = await erp("/api/resource/Lead", { method: "POST", body: JSON.stringify(leadFields(p)) });
  if (!res.ok) {
    // Retry with the minimum fields in case an optional field (source, type, website) is rejected
    const firstError = await readError(res);
    const person = p.kind === "reseller" ? p.contactName : p.name;
    res = await erp("/api/resource/Lead", {
      method: "POST",
      body: JSON.stringify({ lead_name: person, first_name: person, email_id: p.email }),
    });
    if (!res.ok) throw new Error(`Lead create failed: ${firstError} / retry: ${await readError(res)}`);
  }
  const data = (await res.json()) as { data: { name: string } };
  return data.data.name;
}

async function addComment(leadName: string, p: Payload): Promise<void> {
  const content = `<p><b>${subjectFor(p)}</b> (submitted on the website)</p>${rowsToHtml(summaryRows(p))}`;
  const res = await erp("/api/resource/Comment", {
    method: "POST",
    body: JSON.stringify({
      comment_type: "Comment",
      reference_doctype: "Lead",
      reference_name: leadName,
      content,
    }),
  });
  if (!res.ok) throw new Error(`Comment failed: ${await readError(res)}`);
}

/** Returns the Lead's URL in ERPNext. */
export async function recordLead(p: Payload): Promise<string> {
  const existing = await findLeadByEmail(p.email);
  const leadName = existing ?? (await createLead(p));
  await addComment(leadName, p);
  return `${base()}/app/lead/${encodeURIComponent(leadName)}`;
}
