"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false },
] as const;

/**
 * The site's single action. Rendered as a full-height panel sliding in from the
 * right, in the world's own vocabulary — hairline rules, mono labels, no chrome.
 */
export default function Contact({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset a resolved form when the panel is reopened, but never mid-send.
  useEffect(() => {
    if (!open && status !== "sending") {
      const t = setTimeout(() => {
        setStatus("idle");
        setError(null);
        setErrors({});
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open, status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const next: Record<string, string> = {};
    if (values.name.length < 2) next.name = "Needs at least two characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "That address doesn’t look right.";
    if (values.message.length < 10) next.message = "A sentence or two, so I know what this is about.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const result = await sendContactEmail(values);
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(result.error ?? "Something went wrong at my end.");
      }
    } catch {
      setStatus("error");
      setError("Couldn’t reach the server.");
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={className}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#060608]/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[34rem] flex-col overflow-y-auto border-l border-[var(--rule)] bg-[#08080b] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right duration-500"
          aria-describedby="contact-desc"
        >
          <div className="flex items-start justify-between gap-6 border-b border-[var(--rule)] px-6 py-5 sm:px-10">
            <div>
              <Dialog.Title className="d3">Let’s talk.</Dialog.Title>
              <p id="contact-desc" className="label mt-2">
                Perth, Australia · Open to new roles
              </p>
            </div>
            <Dialog.Close
              className="label label--bright -mr-1 shrink-0 pt-1 transition-colors hover:text-[var(--ink)]"
              aria-label="Close contact panel"
            >
              Close
            </Dialog.Close>
          </div>

          {status === "sent" ? (
            <div className="flex flex-1 flex-col justify-center px-6 py-16 sm:px-10">
              <p className="d2">Got it.</p>
              <p className="body mt-4">
                That’s landed in my inbox. I read everything and I’ll come back to you
                properly, usually within a day.
              </p>
              <Dialog.Close className="label label--bright mt-10 self-start transition-colors hover:text-[var(--ink)]">
                ← Back to the site
              </Dialog.Close>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col">
              <div className="flex-1 px-6 sm:px-10">
                {FIELDS.map((f) => (
                  <label key={f.name} className="block border-b border-[var(--rule)] py-5">
                    <span className="label">
                      {f.label}
                      {!f.required && " (optional)"}
                    </span>
                    <input
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      aria-invalid={!!errors[f.name]}
                      aria-errormessage={errors[f.name] ? `${f.name}-err` : undefined}
                      className="mt-2 w-full bg-transparent text-[1.0625rem] text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
                    />
                    {errors[f.name] && (
                      <span id={`${f.name}-err`} className="label mt-2 block text-[#ff8f7a]">
                        {errors[f.name]}
                      </span>
                    )}
                  </label>
                ))}
                <label className="block py-5">
                  <span className="label">What’s on your mind</span>
                  <textarea
                    name="message"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-errormessage={errors.message ? "message-err" : undefined}
                    className="mt-2 w-full resize-none bg-transparent text-[1.0625rem] leading-relaxed text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
                  />
                  {errors.message && (
                    <span id="message-err" className="label mt-2 block text-[#ff8f7a]">
                      {errors.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="sticky bottom-0 border-t border-[var(--rule)] bg-[#08080b] px-6 py-5 sm:px-10">
                {status === "error" && (
                  <p role="alert" className="label mb-4 text-[#ff8f7a]">
                    {error} Try again, or reach me through LinkedIn.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="label label--bright group flex w-full items-center justify-between border border-[var(--rule-strong)] px-5 py-4 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[#060608] disabled:opacity-50"
                >
                  <span>{status === "sending" ? "Sending" : "Send it"}</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
