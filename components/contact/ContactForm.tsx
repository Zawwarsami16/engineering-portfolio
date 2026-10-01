"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, Check } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong");
      }
      setStatus("ok");
      setMessage("Message sent. I'll get back to you within 24 hours.");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      const m = err instanceof Error ? err.message : "Something went wrong";
      setMessage(m);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input
            type="text"
            placeholder="Ada Lovelace"
            autoComplete="name"
            {...register("name")}
            className={inputClasses}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            placeholder="ada@analyticalengine.com"
            autoComplete="email"
            {...register("email")}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message} hint="Optional">
        <input
          type="text"
          placeholder="A new product, a contract, an idea…"
          {...register("subject")}
          className={inputClasses}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={6}
          placeholder="Tell me about the project, the team, and what success looks like."
          {...register("message")}
          className={cn(inputClasses, "min-h-[160px] resize-y leading-relaxed")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting || status === "submitting"}
          data-cursor="hover"
          className="group/btn relative inline-flex items-center gap-3 bg-[var(--color-accent)] px-7 py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--color-bg)] uppercase transition-colors hover:bg-[var(--color-accent-bright)] disabled:opacity-50"
        >
          <span className="relative z-10">
            {status === "submitting"
              ? "Sending…"
              : status === "ok"
                ? "Sent"
                : "Send message"}
          </span>
          <span aria-hidden className="relative z-10">
            {status === "ok" ? (
              <Check className="h-3.5 w-3.5" strokeWidth={1.7} />
            ) : status === "submitting" ? (
              <Send className="h-3.5 w-3.5 animate-pulse" strokeWidth={1.5} />
            ) : (
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
            )}
          </span>
        </button>

        <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
          Replies within 24 hours
        </span>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            role="status"
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={cn(
              "mt-1 rounded-md border px-4 py-3 text-sm",
              status === "ok"
                ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.06] text-[var(--color-fg)]"
                : "border-red-700/40 bg-red-900/10 text-red-400",
            )}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

const inputClasses =
  "w-full bg-transparent border-b border-[var(--color-line)] px-0 py-3 text-base text-[var(--color-fg)] placeholder:text-[var(--color-muted-dim)] focus:border-[var(--color-accent)] focus:outline-none transition-colors";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
        <span>{label}</span>
        {hint && <span className="text-[var(--color-muted-dim)]">{hint}</span>}
      </span>
      {children}
      {error && (
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
          {error}
        </span>
      )}
    </label>
  );
}
