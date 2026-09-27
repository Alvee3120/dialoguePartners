"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle, X } from "@phosphor-icons/react";
import { submitContactAction, type ContactState } from "@/lib/actions/contact";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    submitContactAction,
    undefined,
  );
  // The success state object is a fresh identity per submission, so dismissing
  // it hides the toast until the next successful send.
  const [dismissedState, setDismissedState] = useState<ContactState>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = Boolean(state?.ok) && dismissedState !== state;

  useEffect(() => {
    if (!state?.ok) return;
    formRef.current?.reset();
    const timer = window.setTimeout(() => setDismissedState(state), 6000);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <>
      <form
        ref={formRef}
        action={action}
        className="rounded-3xl border border-line bg-paper p-7 sm:p-10"
      >
        <p className="text-sm leading-relaxed">
          Complete the form and one of our advisors will be in touch to arrange
          a conversation.
        </p>

        {/* Honeypot — hidden from humans, tempting to bots. */}
        <div className="hidden" aria-hidden="true">
          <label>
            Company website
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {state?.error ? (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.error}
          </p>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Full Name</span>
            <input type="text" name="name" required placeholder="Jane Doe" className={`mt-2 ${fieldClass}`} />
            <FieldError message={state?.fieldErrors?.name} />
          </label>
          <label className="block">
            <span className={labelClass}>Company / Organization</span>
            <input type="text" name="company" placeholder="Acme Ltd." className={`mt-2 ${fieldClass}`} />
            <FieldError message={state?.fieldErrors?.company} />
          </label>
          <label className="block">
            <span className={labelClass}>Email Address</span>
            <input type="email" name="email" required placeholder="you@company.com" className={`mt-2 ${fieldClass}`} />
            <FieldError message={state?.fieldErrors?.email} />
          </label>
          <label className="block">
            <span className={labelClass}>Phone Number</span>
            <input type="tel" name="phone" placeholder="+880 ..." className={`mt-2 ${fieldClass}`} />
            <FieldError message={state?.fieldErrors?.phone} />
          </label>
          <label className="block">
            <span className={labelClass}>I am a</span>
            <select name="role" className={`mt-2 ${fieldClass}`} defaultValue="">
              <option value="" disabled>Select one</option>
              <option value="global-brand">Global Brand</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="investor">Investor</option>
              <option value="policymaker">Policymaker</option>
              <option value="technology">Technology Partner</option>
              <option value="other">Other</option>
            </select>
            <FieldError message={state?.fieldErrors?.role} />
          </label>
          <label className="block">
            <span className={labelClass}>Area of Interest</span>
            <select name="interest" className={`mt-2 ${fieldClass}`} defaultValue="">
              <option value="" disabled>Select one</option>
              <option value="sustainability">Sustainability</option>
              <option value="investment-trade">Investment &amp; Trade</option>
              <option value="supply-chain">Supply Chain</option>
              <option value="operational-excellence">Operational Excellence</option>
              <option value="general">General Inquiry</option>
            </select>
            <FieldError message={state?.fieldErrors?.interest} />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Message</span>
            <textarea name="message" required rows={5} placeholder="Tell us a little about your goals..." className={`mt-2 ${fieldClass} resize-y`} />
            <FieldError message={state?.fieldErrors?.message} />
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send Message"}
          {pending ? null : <span aria-hidden="true">→</span>}
        </button>
      </form>

      {/* Confirmation toast — announced to screen readers via aria-live. */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 top-24 z-[60] flex justify-center px-4 sm:justify-end sm:px-8"
      >
        {showToast ? (
          <div
            role="status"
            className="animate-toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-2xl shadow-navy/10"
          >
            <CheckCircle
              weight="fill"
              className="mt-0.5 h-6 w-6 shrink-0 text-accent-deep"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">Thank you!</p>
              <p className="mt-0.5 text-sm text-foreground">
                We&rsquo;ll contact you soon.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDismissedState(state)}
              aria-label="Dismiss notification"
              className="ml-auto rounded-full p-1 text-foreground/50 transition-colors hover:bg-paper hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
