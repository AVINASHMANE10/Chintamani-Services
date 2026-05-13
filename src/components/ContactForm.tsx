'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { services } from '@/data/services';
import { SITE } from '@/lib/utils';

type ContactDict = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  whatsapp?: string;
};

type ServicesMap = Record<string, { name: string }>;

export default function ContactForm({
  dict,
  servicesDict,
}: {
  dict: ContactDict;
  servicesDict: ServicesMap;
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildWhatsappUrl = () => {
    const serviceName = form.service
      ? servicesDict[form.service]?.name || form.service
      : 'a service enquiry';
    const lines = [
      `Hello Shree Chintamani Services,`,
      ``,
      `I would like to enquire about ${serviceName}.`,
      ``,
      `Name: ${form.name || '—'}`,
      `Phone: ${form.phone || '—'}`,
      form.email ? `Email: ${form.email}` : '',
      ``,
      form.message ? `Details: ${form.message}` : '',
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, '')}?text=${text}`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const url = buildWhatsappUrl();
    // Open WhatsApp in a new tab — works on both mobile and desktop
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className="font-display mt-6 text-2xl text-ink-900 md:text-3xl">
          {dict.success}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
          We've opened WhatsApp with your message. Tap send there to reach us
          instantly, or call us directly.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}
            className="btn-primary"
          >
            Call {SITE.phones[0]}
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: '',
              });
            }}
            className="btn-ghost"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={dict.name} required>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            autoComplete="name"
            className="input"
          />
        </Field>

        <Field label={dict.phone} required>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            autoComplete="tel"
            inputMode="tel"
            className="input"
          />
        </Field>
      </div>

      <Field label={dict.email}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          autoComplete="email"
          className="input"
        />
      </Field>

      <Field label={dict.service}>
        <select
          name="service"
          value={form.service}
          onChange={onChange}
          className="input"
        >
          <option value="">—</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {servicesDict[s.slug]?.name || s.slug}
            </option>
          ))}
        </select>
      </Field>

      <Field label={dict.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={4}
          className="input resize-none"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary group disabled:opacity-60"
        >
          {submitting ? dict.sending : dict.submit}
          <Send
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </button>
        <span className="text-xs text-ink-500">
          {dict.whatsapp || 'Opens in WhatsApp'}
        </span>
      </div>

      {/* Local styles for input */}
      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #c9d5e3;
          background-color: white;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          color: #0a1628;
          transition: all 0.2s;
        }
        :global(.input:focus) {
          border-color: #0080f5;
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(72, 191, 255, 0.2);
        }
        :global(.input::placeholder) {
          color: #6b85a3;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
        {label} {required && <span className="text-aqua-600">*</span>}
      </span>
      {children}
    </label>
  );
}
