'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { services } from '@/data/services';
import { cn } from '@/lib/utils';

type Dict = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

type ServicesMap = Record<string, { name: string }>;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({
  dict,
  servicesDict,
}: {
  dict: Dict;
  servicesDict: ServicesMap;
}) {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Web3Forms key — set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      console.warn('NEXT_PUBLIC_WEB3FORMS_KEY not set — form will not submit.');
      setStatus('error');
      return;
    }

    formData.append('access_key', key);
    formData.append('subject', 'New enquiry — Shree Chintamani Services website');
    formData.append('from_name', 'SCS Website');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={dict.name} name="name" required />
        <Field label={dict.email} name="email" type="email" required />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={dict.phone} name="phone" type="tel" />
        <Select label={dict.service} name="service">
          <option value="">—</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {servicesDict[s.slug]?.name}
            </option>
          ))}
        </Select>
      </div>
      <Textarea label={dict.message} name="message" rows={5} required />

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className="btn-primary group disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? dict.sending : status === 'success' ? dict.success.split('—')[0].trim() : dict.submit}
          {status !== 'success' && (
            <Send
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          )}
          {status === 'success' && <Check className="h-4 w-4" strokeWidth={2} />}
        </button>

        {status === 'success' && (
          <p className="flex items-center gap-2 text-sm text-emerald-700">
            <Check className="h-4 w-4" strokeWidth={2} />
            {dict.success}
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-center gap-2 text-sm text-rose-600">
            <AlertCircle className="h-4 w-4" strokeWidth={2} />
            {dict.error}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
        {label}
        {required && <span className="ml-1 text-aqua-700">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="block w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-300 focus:border-aqua-500 focus:outline-none focus:ring-2 focus:ring-aqua-500/20"
      />
    </label>
  );
}

function Select({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
        {label}
      </span>
      <select
        name={name}
        className="block w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 transition-colors focus:border-aqua-500 focus:outline-none focus:ring-2 focus:ring-aqua-500/20"
      >
        {children}
      </select>
    </label>
  );
}

function Textarea({
  label,
  name,
  rows = 4,
  required = false,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
        {label}
        {required && <span className="ml-1 text-aqua-700">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className={cn(
          'block w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 transition-colors',
          'placeholder:text-ink-300 focus:border-aqua-500 focus:outline-none focus:ring-2 focus:ring-aqua-500/20'
        )}
      />
    </label>
  );
}
