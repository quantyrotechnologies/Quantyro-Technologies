"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FieldConfig, ResourceConfig } from '@/lib/admin/resources';
import { useToast } from './Toast';
import RichTextEditor from './RichTextEditor';
import RichText from '@/components/RichText';
import { stripHtml } from '@/lib/stripHtml';

type FormValue = string | number | boolean | string[];

function StringArrayField({ value, onChange, placeholder = 'Add an item...' }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
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
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] shadow-xs"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-[12px] text-red-600 hover:text-red-800 shrink-0 px-[8px] py-[4px] rounded-md hover:bg-red-50 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ''])}
        className="inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-[var(--accent)] hover:text-[var(--ink)] bg-[rgba(23,104,214,0.06)] px-[12px] py-[6px] rounded-lg transition-colors"
      >
        + Add New Line / Tag
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
  const body = seoFields.body ? stripHtml(String(values[seoFields.body] || '')) : '';
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
    <div className="rounded-[16px] border border-[var(--line)] bg-white p-[20px] shadow-sm">
      <div className="text-[11px] font-mono font-semibold uppercase tracking-wide text-slate-400 mb-[14px] flex items-center gap-[6px]">
        <span>🔍</span>
        <span>Live On-Page SEO Checks</span>
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

/** Live real-time preview card that shows how the H1/H2/P/Badge will look on the live site */
function LiveWebsiteCardPreview({
  config,
  values,
}: {
  config: ResourceConfig;
  values: Record<string, FormValue>;
}) {
  const title = String(values.title || values.name || values.sector || values.question || values.org_name || 'Your Main Headline');
  const subtitle = String(values.subtitle || values.tagline || values.role || values.executive_headline || values.issuer || '');
  const badge = String(values.tag || values.badge || values.experience || values.metric || values.phase_tag || values.category || '');
  const bodyHtml = String(values.description || values.bio || values.summary || values.quote || values.answer || values.use_case || values.overview || '');
  const imageUrl = String(values.photo_url || values.image_url || '');

  return (
    <div className="rounded-[20px] border border-[rgba(23,104,214,0.2)] bg-gradient-to-br from-white to-slate-50 p-[22px] shadow-[0_8px_30px_rgba(23,104,214,0.06)] relative overflow-hidden">
      <div className="flex items-center justify-between pb-[14px] mb-[16px] border-b border-[var(--line)]">
        <div className="flex items-center gap-[6px] mono text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
          <span>Live Website Card Preview</span>
        </div>
        <span className="mono text-[10.5px] px-[8px] py-[2px] rounded-full bg-slate-100 text-slate-500 font-semibold">
          {config.label}
        </span>
      </div>

      <div className="space-y-[12px]">
        {/* Badge / Pill */}
        {badge && (
          <div>
            <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-bold">
              {badge}
            </span>
          </div>
        )}

        {/* H1 Main Headline */}
        <h3 className="text-[20px] md:text-[22px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.25] tracking-tight">
          {title}
        </h3>

        {/* H2 Subheading / Role */}
        {subtitle && (
          <div className="text-[13.5px] font-semibold text-[var(--accent)]">
            {subtitle}
          </div>
        )}

        {/* Image Preview if present */}
        {imageUrl && (
          <div className="relative w-full h-[140px] rounded-[12px] overflow-hidden bg-slate-900 border border-[var(--line)] my-[10px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Live preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* P Body / Rich Text Description */}
        {bodyHtml ? (
          <div className="text-[13.5px] text-[var(--muted)] leading-[1.65] line-clamp-4 bg-white/70 p-[12px] rounded-[10px] border border-slate-200/60">
            <RichText html={bodyHtml} />
          </div>
        ) : (
          <p className="text-[13px] italic text-slate-400">Enter a description or body to see text rendered here...</p>
        )}
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
      if (field.type === 'string-array' || field.type === 'relation-multi') {
        initial[field.name] = Array.isArray(existing) ? existing : [];
      } else if (field.type === 'json') {
        initial[field.name] = existing != null ? JSON.stringify(existing, null, 2) : '[]';
      } else if (field.type === 'boolean') {
        initial[field.name] = Boolean(existing);
      } else if (field.type === 'number') {
        initial[field.name] = typeof existing === 'number' ? existing : '';
      } else if (field.type === 'datetime') {
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

    showToast(isEdit ? `${config.label} saved successfully!` : `${config.label} created successfully!`, 'success');
    router.push(config.singleton ? '/admin' : `/admin/${config.key}`);
    router.refresh();
  };

  const getVisualBadge = (field: FieldConfig) => {
    const n = field.name.toLowerCase();
    const l = field.label.toLowerCase();
    if (n.includes('title') || l.includes('headline') || l.includes('h1') || n === 'name' || n === 'question') {
      return <span className="mono text-[9.5px] px-[6px] py-[1.5px] rounded bg-blue-100 text-blue-700 font-bold uppercase">H1 Title</span>;
    }
    if (n.includes('subtitle') || n.includes('tagline') || l.includes('h2') || l.includes('subheading') || n === 'role') {
      return <span className="mono text-[9.5px] px-[6px] py-[1.5px] rounded bg-cyan-100 text-cyan-700 font-bold uppercase">H2 Subtitle</span>;
    }
    if (field.type === 'richtext' || field.type === 'textarea' || n.includes('desc') || n.includes('bio') || n === 'quote' || n === 'answer') {
      return <span className="mono text-[9.5px] px-[6px] py-[1.5px] rounded bg-purple-100 text-purple-700 font-bold uppercase">P Tag / Content</span>;
    }
    if (n.includes('badge') || n.includes('tag') || n.includes('experience') || n.includes('metric')) {
      return <span className="mono text-[9.5px] px-[6px] py-[1.5px] rounded bg-emerald-100 text-emerald-700 font-bold uppercase">Badge Pill</span>;
    }
    if (n.includes('image') || n.includes('photo')) {
      return <span className="mono text-[9.5px] px-[6px] py-[1.5px] rounded bg-amber-100 text-amber-800 font-bold uppercase">Media URL</span>;
    }
    return null;
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
              rows={6}
              spellCheck={false}
              required={field.required}
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[12.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] resize-y font-mono shadow-xs"
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
            placeholder={field.placeholder}
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] resize-y shadow-xs"
          />
        );
      case 'richtext':
        return (
          <div className="shadow-xs">
            <RichTextEditor
              value={values[field.name] as string}
              onChange={(html) => setField(field.name, html)}
              required={field.required}
            />
          </div>
        );
      case 'boolean':
        return (
          <label className="inline-flex items-center gap-[10px] cursor-pointer bg-slate-50 border border-[var(--line)] px-[14px] py-[8px] rounded-[10px] hover:bg-slate-100 transition-colors">
            <input
              type="checkbox"
              checked={values[field.name] as boolean}
              onChange={(e) => setField(field.name, e.target.checked)}
              className="w-[18px] h-[18px] accent-[var(--accent)] cursor-pointer"
            />
            <span className="text-[13.5px] font-semibold text-[var(--ink)]">Yes, show live on website</span>
          </label>
        );
      case 'number':
        return (
          <input
            type="number"
            value={values[field.name] as string | number}
            onChange={(e) => setField(field.name, e.target.value === '' ? '' : Number(e.target.value))}
            required={field.required}
            placeholder={field.placeholder}
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] shadow-xs"
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
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] shadow-xs"
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
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] shadow-xs cursor-pointer"
          >
            <option value="" disabled>Select an option…</option>
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
            placeholder={field.placeholder}
          />
        );
      case 'relation-multi': {
        const selected = (values[field.name] as string[]) ?? [];
        const toggle = (id: string) => {
          setField(
            field.name,
            selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id]
          );
        };
        return (
          <div className="rounded-[10px] border border-[var(--line)] bg-white max-h-[220px] overflow-y-auto divide-y divide-[var(--line)] shadow-xs">
            {(field.options ?? []).length === 0 ? (
              <p className="px-[12px] py-[9px] text-[13px] text-slate-400">No options available</p>
            ) : (
              field.options!.map((opt) => (
                <label key={opt.value} className="flex items-center gap-[10px] px-[12px] py-[8px] cursor-pointer hover:bg-[var(--bg-alt)]">
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.value)}
                    onChange={() => toggle(opt.value)}
                    className="w-[15px] h-[15px] accent-[var(--accent)]"
                  />
                  <span className="text-[13.5px] text-[var(--ink)]">{opt.label}</span>
                </label>
              ))
            )}
          </div>
        );
      }
      default: {
        const isImageField = field.name.includes('image') || field.name.includes('photo');
        const strVal = String(values[field.name] || '');
        return (
          <div className="space-y-[8px]">
            <input
              type="text"
              value={strVal}
              onChange={(e) => setField(field.name, e.target.value)}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[12px] py-[9px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] shadow-xs"
            />
            {isImageField && strVal && (
              <div className="flex items-center gap-[12px] p-[10px] rounded-[10px] bg-slate-50 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={strVal}
                  alt="Thumbnail"
                  className="w-[48px] h-[48px] rounded-[8px] object-cover bg-slate-900 border border-slate-300"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <div className="text-[11.5px] text-slate-600">
                  <span className="font-semibold text-emerald-600">✓ Image Preview Loaded</span>
                  <div className="text-slate-400 truncate max-w-[300px]">{strVal}</div>
                </div>
              </div>
            )}
          </div>
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-[24px] items-start">
      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="rounded-[20px] border border-[var(--line)] bg-white p-[28px] md:p-[36px] shadow-sm space-y-[24px]">
        <div className="flex items-center justify-between pb-[16px] border-b border-[var(--line)]">
          <div>
            <h2 className="text-[20px] font-[var(--font-display)] font-bold text-[var(--ink)]">
              {isEdit ? `Edit ${config.label}` : `Create New ${config.label}`}
            </h2>
            <p className="text-[13px] text-[var(--muted)] mt-[2px]">
              Fill out the fields below. Every field maps directly to what shows on the live site.
            </p>
          </div>
          <span className="mono text-[11px] font-bold px-[10px] py-[4px] rounded-full bg-blue-50 text-[var(--accent)] border border-blue-200">
            {config.key}
          </span>
        </div>

        {error && (
          <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-[10px] px-[14px] py-[10px]">
            {error}
          </p>
        )}

        {config.fields.map((field) => (
          <div key={field.name} className="space-y-[6px]">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[var(--ink)] flex items-center gap-[6px]">
                <span>{field.label}</span>
                {field.required && !field.readOnly && <span className="text-red-500 font-bold">*</span>}
              </label>
              {getVisualBadge(field)}
            </div>
            {renderField(field)}
          </div>
        ))}

        <div className="flex items-center gap-[12px] pt-[12px] border-t border-[var(--line)]">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[var(--ink)] text-white py-[11px] px-[28px] rounded-full text-[14px] font-semibold hover:bg-[var(--accent)] shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
          >
            {submitting ? 'Saving changes…' : isEdit ? 'Save Changes' : 'Create & Publish'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--ink)] px-[16px] py-[10px] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Right Column: Live Website Preview & SEO Panel */}
      <div className="space-y-[20px] sticky top-[24px]">
        <LiveWebsiteCardPreview config={config} values={values} />
        {config.seoFields && <SeoChecklistPanel values={values} seoFields={config.seoFields} />}
      </div>
    </div>
  );
}
