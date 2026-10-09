/** Shared form definitions and validation, used by the browser form and the API route. */

export type FormKind = "contact" | "reseller";

export type ContactPayload = {
  kind: "contact";
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export type ResellerPayload = {
  kind: "reseller";
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
  website: string;
  interests: string[];
  message: string;
};

export type Payload = ContactPayload | ResellerPayload;

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,24}$/;

const LIMITS: Record<string, number> = {
  name: 120,
  contactName: 120,
  companyName: 160,
  company: 160,
  email: 200,
  phone: 40,
  city: 80,
  businessType: 80,
  website: 300,
  message: 4000,
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Turns untrusted input into a clean payload, or returns field errors. */
export function parsePayload(input: unknown): { payload?: Payload; errors: FieldErrors } {
  const raw = (input ?? {}) as Record<string, unknown>;
  const errors: FieldErrors = {};
  const kind = raw.kind === "reseller" ? "reseller" : raw.kind === "contact" ? "contact" : null;
  if (!kind) return { errors: { form: "Unknown form type." } };

  const need = (key: string, label: string) => {
    if (!str(raw[key])) errors[key] = `Enter ${label}.`;
  };

  const email = str(raw.email);
  const phone = str(raw.phone);

  if (kind === "contact") {
    need("name", "your name");
    need("message", "a message");
  } else {
    need("companyName", "your company name");
    need("contactName", "a contact name");
    need("city", "your city");
    need("businessType", "your type of business");
    if (!phone) errors.phone = "Enter a phone number we can reach you on.";
  }

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter an email address like name@company.com.";

  if (phone && !PHONE_RE.test(phone)) errors.phone = "Enter a phone number using digits, spaces and +.";

  for (const [key, max] of Object.entries(LIMITS)) {
    if (str(raw[key]).length > max) errors[key] = `Keep this under ${max} characters.`;
  }

  if (Object.keys(errors).length) return { errors };

  if (kind === "contact") {
    return {
      errors,
      payload: {
        kind,
        name: str(raw.name),
        email,
        phone,
        company: str(raw.company),
        message: str(raw.message),
      },
    };
  }

  const interests = Array.isArray(raw.interests)
    ? raw.interests.filter((x): x is string => typeof x === "string").map((x) => x.slice(0, 80)).slice(0, 20)
    : [];

  return {
    errors,
    payload: {
      kind,
      companyName: str(raw.companyName),
      contactName: str(raw.contactName),
      email,
      phone,
      city: str(raw.city),
      businessType: str(raw.businessType),
      website: str(raw.website),
      interests,
      message: str(raw.message),
    },
  };
}
