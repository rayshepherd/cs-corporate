"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contact, distributedBrands } from "@/content/site";
import type { FieldErrors, FormKind } from "@/lib/forms";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; kind: FormKind } | { state: "failed"; message: string };

const inputCls =
  "mt-1.5 block w-full [&:not(textarea)]:h-12 rounded-sm border border-rule bg-paper-raised px-3.5 py-2.5 text-ink " +
  "placeholder:text-steel/60 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent " +
  "aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] font-medium">
        {label}
        {optional && <span className="font-normal text-steel"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [kind, setKind] = useState<FormKind>("contact");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const open = () => {
      setKind("reseller");
      setErrors({});
      setStatus({ state: "idle" });
    };
    window.addEventListener("cs:open-reseller", open);
    return () => window.removeEventListener("cs:open-reseller", open);
  }, []);

  function switchTo(k: FormKind) {
    setKind(k);
    setErrors({});
    if (status.state !== "sending") setStatus({ state: "idle" });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = { kind, _t: startedAt.current, _hp: fd.get("_hp") ?? "" };
    for (const [k, v] of fd.entries()) {
      if (k === "interests" || k === "_hp") continue;
      body[k] = v;
    }
    if (kind === "reseller") body.interests = fd.getAll("interests");

    setStatus({ state: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { errors?: FieldErrors; error?: string };
      if (res.ok) {
        setStatus({ state: "sent", kind });
        formRef.current?.reset();
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setStatus({ state: "idle" });
        const first = Object.keys(data.errors)[0];
        document.getElementById(`f-${first}`)?.focus();
        return;
      }
      setStatus({ state: "failed", message: data.error || "The form could not be sent." });
    } catch {
      setStatus({ state: "failed", message: "The form could not be sent. Check your connection and try again." });
    }
  }

  const err = (k: string) => errors[k];
  const a11y = (k: string) => ({
    id: `f-${k}`,
    name: k,
    "aria-invalid": err(k) ? true : undefined,
    "aria-describedby": err(k) ? `f-${k}-error` : undefined,
  });

  if (status.state === "sent") {
    return (
      <div role="status" className="border border-ok/40 bg-paper-raised p-8">
        <p className="display text-2xl">
          {status.kind === "reseller" ? "Application sent" : "Message sent"}
        </p>
        <p className="mt-3 text-steel">
          {status.kind === "reseller"
            ? "Our sales team will review your application and contact you within two working days."
            : "We will reply to the email address you gave within two working days."}
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus({ state: "idle" });
          }}
          className="mt-6 font-medium text-accent underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <div>
      <div role="tablist" aria-label="What would you like to do?" className="mb-8 inline-flex border border-ink">
        {(
          [
            ["contact", "Send a message"],
            ["reseller", "Apply to become a reseller"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kind === k}
            onClick={() => switchTo(k)}
            className={`px-4 py-2.5 text-[0.95rem] font-medium ${
              kind === k ? "bg-ink text-paper" : "text-ink hover:bg-rule/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" key={kind}>
        {/* Spam trap: hidden from people, filled in by bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="f-_hp">Leave this empty</label>
          <input id="f-_hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {kind === "contact" ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="f-name" label="Name" error={err("name")}>
                <input {...a11y("name")} autoComplete="name" className={inputCls} />
              </Field>
              <Field id="f-email" label="Email" error={err("email")}>
                <input {...a11y("email")} type="email" autoComplete="email" className={inputCls} />
              </Field>
              <Field id="f-phone" label="Phone" optional error={err("phone")}>
                <input {...a11y("phone")} type="tel" autoComplete="tel" className={inputCls} />
              </Field>
              <Field id="f-company" label="Company" optional error={err("company")}>
                <input {...a11y("company")} autoComplete="organization" className={inputCls} />
              </Field>
            </div>
            <Field id="f-message" label="Message" error={err("message")}>
              <textarea {...a11y("message")} rows={6} className={inputCls} />
            </Field>
          </>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="f-companyName" label="Company name" error={err("companyName")}>
                <input {...a11y("companyName")} autoComplete="organization" className={inputCls} />
              </Field>
              <Field id="f-contactName" label="Contact name" error={err("contactName")}>
                <input {...a11y("contactName")} autoComplete="name" className={inputCls} />
              </Field>
              <Field id="f-email" label="Email" error={err("email")}>
                <input {...a11y("email")} type="email" autoComplete="email" className={inputCls} />
              </Field>
              <Field id="f-phone" label="Phone" error={err("phone")}>
                <input {...a11y("phone")} type="tel" autoComplete="tel" className={inputCls} />
              </Field>
              <Field id="f-city" label="City" error={err("city")}>
                <input {...a11y("city")} autoComplete="address-level2" className={inputCls} />
              </Field>
              <Field id="f-businessType" label="Type of business" error={err("businessType")}>
                <select {...a11y("businessType")} defaultValue="" className={inputCls}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {contact.businessTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="f-website" label="Website or Instagram" optional error={err("website")}>
              <input {...a11y("website")} placeholder="https://" className={inputCls} />
            </Field>
            <fieldset>
              <legend className="text-[0.95rem] font-medium">
                Product areas you want to sell <span className="font-normal text-steel">(optional)</span>
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {distributedBrands.categories.map((c) => (
                  <label key={c.name} className="flex items-center gap-2.5 text-[0.95rem]">
                    <input type="checkbox" name="interests" value={c.name} className="h-4 w-4 accent-accent" />
                    {c.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field id="f-message" label="Tell us about your business" optional error={err("message")}>
              <textarea
                {...a11y("message")}
                rows={5}
                placeholder="Where you sell, who your customers are, which brands you already carry"
                className={inputCls}
              />
            </Field>
          </>
        )}

        {errors.form && <p className="text-danger">{errors.form}</p>}
        {status.state === "failed" && (
          <p role="alert" className="text-danger">
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="rounded-sm bg-accent px-6 py-3 font-medium text-accent-ink hover:opacity-90 disabled:opacity-60"
        >
          {sending ? "Sending…" : kind === "reseller" ? "Send application" : "Send message"}
        </button>
      </form>
    </div>
  );
}
