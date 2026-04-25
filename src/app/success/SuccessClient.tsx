"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LICENSE_ISSUER_URL =
  process.env.NEXT_PUBLIC_LICENSE_ISSUER_URL ?? "https://license.gettappit.com";
const POLL_INTERVAL_MS = 1500;
const MAX_ATTEMPTS = 8;

interface SessionInfo {
  email: string;
  maskedKey: string;
  issuedAt: number;
  status: string;
}

type State =
  | { kind: "loading"; attempt: number }
  | { kind: "missingSessionId" }
  | { kind: "ready"; info: SessionInfo }
  | { kind: "timeout" }
  | { kind: "error"; message: string };

export default function SuccessClient() {
  const [state, setState] = useState<State>({ kind: "loading", attempt: 0 });
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setState({ kind: "missingSessionId" });
      return;
    }

    void poll(sessionId, 0);

    return () => {
      cancelled.current = true;
    };

    async function poll(id: string, attempt: number): Promise<void> {
      if (cancelled.current) return;
      try {
        const res = await fetch(`${LICENSE_ISSUER_URL}/session/${encodeURIComponent(id)}`);
        if (res.status === 404) {
          if (attempt + 1 >= MAX_ATTEMPTS) {
            setState({ kind: "timeout" });
            return;
          }
          setState({ kind: "loading", attempt: attempt + 1 });
          setTimeout(() => void poll(id, attempt + 1), POLL_INTERVAL_MS);
          return;
        }
        if (!res.ok) {
          setState({ kind: "error", message: `Server returned ${res.status}` });
          return;
        }
        const info = (await res.json()) as SessionInfo;
        setState({ kind: "ready", info });
      } catch (err) {
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Network error",
        });
      }
    }
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Payment confirmed
        </h1>
        <div className="mt-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          {renderBody(state)}
        </div>
        <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400">
          Need help? Email{" "}
          <Link
            href="mailto:support@gettappit.com"
            className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white"
          >
            support@gettappit.com
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function renderBody(state: State) {
  switch (state.kind) {
    case "loading":
      return <p>Issuing your license… (attempt {state.attempt + 1})</p>;
    case "missingSessionId":
      return (
        <p>
          Thanks for your purchase. Your license has been emailed to you — check
          your inbox (and spam folder).
        </p>
      );
    case "ready":
      return (
        <>
          <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-neutral-500 dark:text-neutral-400">Email</dt>
            <dd className="font-medium">{state.info.email}</dd>
            <dt className="text-neutral-500 dark:text-neutral-400">License</dt>
            <dd className="font-mono tracking-wider">{state.info.maskedKey}</dd>
          </dl>
          <p className="mt-6">
            Your full license key has been emailed to{" "}
            <strong>{state.info.email}</strong>. Open the email on the Mac you
            want to activate.
          </p>
        </>
      );
    case "timeout":
      return (
        <p>
          Your license is being issued. Check your email in a few minutes — if
          it doesn&apos;t arrive, contact support.
        </p>
      );
    case "error":
      return (
        <p>
          Something went wrong loading your confirmation ({state.message}). Your
          license has still been emailed — check your inbox.
        </p>
      );
  }
}
