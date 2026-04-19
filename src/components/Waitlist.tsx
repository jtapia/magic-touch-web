"use client";

import { useState, type FormEvent } from "react";
import { WAITLIST_ENDPOINT } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Waitlist form. Fires POST to WAITLIST_ENDPOINT.
 *
 * Submission shape is provider-agnostic JSON. Swap the body below to match
 * your provider (Formspree, Buttondown, Resend Audiences, custom worker).
 *
 *   Formspree:      { email }
 *   Buttondown:     { email }           (header: Authorization: Token <key>)
 *   Resend:         { email, audience_id }
 *   ConvertKit:     { email_address, api_key }
 *
 * See submitEmail() below. TODO: pick your provider and adjust.
 */
async function submitEmail(email: string): Promise<Response> {
  if (!WAITLIST_ENDPOINT) throw new Error("WAITLIST_ENDPOINT not configured");
  return fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });
}

export default function Waitlist({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await submitEmail(email);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-xl border border-accent/30 bg-accent/5 ${compact ? "px-4 py-3" : "p-5"} text-center`}>
        <p className="text-sm font-semibold text-accent-light">Thanks — you&apos;re on the list.</p>
        <p className="text-xs text-muted mt-1">We&apos;ll email you the moment MagicTouch is ready.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className={`flex flex-col sm:flex-row gap-2 ${compact ? "" : "mb-2"}`}>
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="flex-1 px-4 py-3 rounded-xl border border-border-light bg-card text-sm placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting" || !email}
          className="gradient-bg text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? "Submitting…" : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-xs text-red-500 mt-2">
          Couldn&apos;t sign you up. {errorMsg ?? ""} Please try again or email support@magictouch.app.
        </p>
      )}
      {status !== "error" && (
        <p className="text-xs text-dim mt-2">No spam. One email when we launch, then nothing.</p>
      )}
    </form>
  );
}
