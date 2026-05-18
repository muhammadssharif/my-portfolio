"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { IconSend } from "@/components/ui/icons";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim()
    };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? t("errorSend"));
      }

      setStatus("success");
      setMessage(t("success"));
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t("errorGeneric"));
    }
  };

  return (
    <form onSubmit={onSubmit} className="surface-panel min-w-0 space-y-5 rounded-2xl p-5 phone-lg:p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 phone-lg:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="text-[var(--muted)]">{t("formName")}</span>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_25%,transparent)]"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="text-[var(--muted)]">{t("formEmail")}</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_25%,transparent)]"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="text-[var(--muted)]">{t("formSubject")}</span>
        <input
          name="subject"
          required
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_25%,transparent)]"
        />
      </label>

      <label className="hidden" aria-hidden>
        {t("formCompany")}
        <input type="text" name="company" autoComplete="off" tabIndex={-1} />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="text-[var(--muted)]">{t("formMessage")}</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_25%,transparent)]"
        />
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto">
        {status === "submitting" ? t("submitting") : t("submit")}
        <IconSend size={18} />
      </button>

      {message ? (
        <p
          className={`text-sm leading-relaxed ${status === "error" ? "text-red-400" : "text-emerald-400"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
