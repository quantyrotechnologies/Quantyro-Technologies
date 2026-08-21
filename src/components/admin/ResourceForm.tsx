"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FieldConfig, ResourceConfig } from '@/lib/admin/resources';
import { useToast } from './Toast';

type FormValue = string | number | boolean | string[];

function StringArrayField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const update = (i: number, v: string) => {
    const next = [...value];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className="space-y-[8px]">
      {value.map((v, i) => (
        <div key={i} className="flex items-center gap-[8px]">
          <input
            value={v}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-[12px] text-red-600 hover:text-red-800 shrink-0"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ''])}
        className="text-[12.5px] font-semibold text-[var(--accent)] hover:text-[var(--ink)]"
      >
        + Add item
      </button>
    </div>
  );
}

interface SeoCheck {
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

function computeSeoChecks(values: Record<string, FormValue>, seoFields: NonNullable<ResourceConfig['seoFields']>): SeoCheck[] {
  const title = String(values[seoFields.title] || (seoFields.titleFallback ? values[seoFields.titleFallback] : '') || '');
  const description = String(values[seoFields.description] || (seoFields.descriptionFallback ? values[seoFields.descriptionFallback] : '') || '');
  const body = seoFields.body ? String(values[seoFields.body] || '') : '';
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;

  const checks: SeoCheck[] = [
    {
      label: 'Title length',
      status: title.length === 0 ? 'fail' : title.length < 30 || title.length > 60 ? 'warn' : 'pass',
      detail: title.length === 0 ? 'No title set' : `${title.length} characters — aim for 50–60`,
    },
    {
      label: 'Meta description length',
      status: description.length === 0 ? 'fail' : description.length < 120 || description.length > 160 ? 'warn' : 'pass',
      detail: description.length === 0 ? 'No description set' : `${description.length} characters — aim for 120–160`,
    },
  ];

  if (seoFields.body) {
    checks.push({
      label: 'Content length',
      status: wordCount === 0 ? 'fail' : wordCount < 300 ? 'warn' : 'pass',
      detail: wordCount === 0 ? 'No content yet' : `${wordCount} words — aim for 300+`,
    });
  }

  return checks;
}

function SeoChecklistPanel({ values, seoFields }: { values: Record<string, FormValue>; seoFields: NonNullable<ResourceConfig['seoFields']> }) {
  const checks = computeSeoChecks(values, seoFields);
  const dotClass = { pass: 'bg-emerald-500', warn: 'bg-amber-500', fail: 'bg-red-500' } as const;

  return (
    <div className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[20px] w-full md:w-[260px] shrink-0 h-fit sticky top-[24px]">
      <div className="text-[11px] font-mono font-semibold uppercase tracking-wide text-slate-400 mb-[14px]">
        On-page SEO
      </div>
      <div className="flex flex-col gap-[14px]">
        {checks.map((c) => (
          <div key={c.label} className="flex items-start gap-[9px]">
            <span className={`mt-[4px] w-[8px] h-[8px] rounded-full shrink-0 ${dotClass[c.status]}`} />
            <div>
              <div className="text-[12.5px] font-semibold text-[var(--ink)]">{c.label}</div>
              <div className="text-[11.5px] text-[var(--muted)] mt-[1px]">{c.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResourceForm({
  config,
  initialData,
  id,
}: {
  config: ResourceConfig;
  initialData?: Record<string, unknown>;
  /** Present when editing; absent when creating. */
  id?: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = Boolean(id);

  const [values, setValues] = useState<Record<string, FormValue>>(() => {
    const initial: Record<string, FormValue> = {};
    for (const field of config.fields) {
      const existing = initialData?.[field.name];
      if (field.type === 'string-array') {
        initial[field.name] = Array.isArray(existing) ? existing : [];
      } else if (field.type === 'json') {
        initial[field.name] = existing != null ? JSON.stringify(existing, null, 2) : '[]';
      } else if (field.type === 'boolean') {
        initial[field.name] = Boolean(existing);
      } else if (field.type === 'number') {
        initial[field.name] = typeof existing === 'number' ? existing : '';
      } else if (field.type === 'datetime') {
        // DB returns a full ISO timestamp (with seconds + offset); the
        // datetime-local input needs exactly "YYYY-MM-DDTHH:mm".
        initial[field.name] = typeof existing === 'string' ? existing.slice(0, 16) : '';
      } else {
        initial[field.name] = existing != null ? String(existing) : '';
      }
    }
    return initial;
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (name: string, v: FormValue) => setValues((prev) => ({ ...prev, [name]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const url = isEdit ? `/api/admin/${config.key}/${id}` : `/api/admin/${config.key}`;
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? 'Something went wrong');
      return;
    }

    showToast(isEdit ? `${config.label} saved` : `${config.label} created`, 'success');
    router.push(config.singleton ? '/admin' : `/admin/${config.key}`);
    router.refresh();
  };

  const renderField = (field: FieldConfig) => {
    if (field.readOnly) {
      return (
        <div className="rounded-[10px] border border-[var(--line)] bg-[var(--bg-alt)] px-[12px] py-[9px] text-[14px] text-[var(--muted)]">
          {String(values[field.name] || '—')}
        </div>
      );
    }

    switch (field.type) {
      case 'json':
        return (
          <>
            <textarea
              value={values[field.name] as string}
              onChange={(e) => setField(field.name, e.target.value)}
              rows={8}
              spellCheck={false}
              required={field.required}
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[12.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] resize-y font-mono"
            />
            <p className="mt-[4px] text-[11px] text-slate-400">Raw JSON — must be valid, e.g. {'[{"name": "...", "note": "..."}]'}</p>
          </>
        );
      case 'textarea':
        return (
          <textarea
            value={values[field.name] as string}
            onChange={(e) => setField(field.name, e.target.value)}
            rows={4}
            required={field.required}
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] resize-y"
          />
        );
      case 'boolean':
        return (
          <label className="inline-flex items-center gap-[8px] cursor-pointer">
            <input
              type="checkbox"
              checked={values[field.name] as boolean}
              onChange={(e) => setField(field.name, e.target.checked)}
              className="w-[16px] h-[16px] accent-[var(--accent)]"
            />
            <span className="text-[13.5px] text-[var(--muted)]">Enabled</span>
          </label>
        );
      case 'number':
        return (
          <input
            type="number"
            value={values[field.name] as string | number}
            onChange={(e) => setField(field.name, e.target.value === '' ? '' : Number(e.target.value))}
            required={field.required}
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
        );
      case 'datetime':
        return (
          <>
            <input
              type="datetime-local"
              value={values[field.name] as string}
              onChange={(e) => setField(field.name, e.target.value)}
              required={field.required}
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />
            <p className="mt-[4px] text-[11px] text-slate-400">Time is in UTC.</p>
          </>
        );
      case 'select':
      case 'relation':
        return (
          <select
            value={values[field.name] as string}
            onChange={(e) => setField(field.name, e.target.value)}
            required={field.required}
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          >
            <option value="" disabled>Select…</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'string-array':
        return (
          <StringArrayField
            value={values[field.name] as string[]}
            onChange={(v) => setField(field.name, v)}
          />
        );
      default:
        return (
          <input
            type="text"
            value={values[field.name] as string}
            onChange={(e) => setField(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-[20px] items-start">
      <form onSubmit={handleSubmit} className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[28px] max-w-[640px] w-full space-y-[20px]">
        {error && (
          <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-[10px] px-[12px] py-[8px]">
            {error}
          </p>
        )}

        {config.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-[12px] mono text-[var(--muted)] mb-[6px]">
              {field.label}{field.required && !field.readOnly && ' *'}
            </label>
            {renderField(field)}
          </div>
        ))}

        <div className="flex items-center gap-[12px] pt-[4px]">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[var(--ink)] text-white py-[11px] px-[24px] rounded-full text-[13.5px] font-semibold hover:bg-[var(--accent)] transition-colors disabled:opacity-60"
          >
            {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {config.seoFields && <SeoChecklistPanel values={values} seoFields={config.seoFields} />}
    </div>
  );
}
