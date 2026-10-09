import type { Payload } from "./forms";

/** Human-readable rows describing a submission, shared by the email and the ERPNext note. */
export function summaryRows(p: Payload): [string, string][] {
  if (p.kind === "contact") {
    return [
      ["Name", p.name],
      ["Email", p.email],
      ["Phone", p.phone || "—"],
      ["Company", p.company || "—"],
      ["Message", p.message],
    ];
  }
  return [
    ["Company", p.companyName],
    ["Contact", p.contactName],
    ["Email", p.email],
    ["Phone", p.phone],
    ["City", p.city],
    ["Business type", p.businessType],
    ["Website / Instagram", p.website || "—"],
    ["Product areas", p.interests.length ? p.interests.join(", ") : "—"],
    ["About the business", p.message || "—"],
  ];
}

export function subjectFor(p: Payload): string {
  return p.kind === "reseller"
    ? `Reseller application: ${p.companyName} (${p.city})`
    : `Website message from ${p.name}`;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function rowsToHtml(rows: [string, string][]): string {
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#59636c;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${body}</table>`;
}

export function rowsToText(rows: [string, string][]): string {
  return rows.map(([k, v]) => `${k}: ${v}`).join("\n");
}
