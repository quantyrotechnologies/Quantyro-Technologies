"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ResourceConfig } from '@/lib/admin/resources';
import { useToast } from './Toast';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  read: 'bg-slate-50 text-slate-600 border-slate-200',
  archived: 'bg-slate-100 text-slate-400 border-slate-200',
};

function Badge({ label, tone }: { label: string; tone: 'positive' | 'neutral' | string }) {
  const className =
    tone === 'positive'
      ? 'bg-[rgba(23,104,214,0.08)] text-[var(--accent)] border-[rgba(23,104,214,0.25)]'
      : tone === 'neutral'
        ? 'bg-slate-50 text-slate-400 border-slate-200'
        : (STATUS_STYLES[tone] ?? 'bg-slate-50 text-slate-600 border-slate-200');

  return (
    <span className={`inline-flex items-center px-[9px] py-[2.5px] rounded-full text-[11px] font-semibold border ${className}`}>
      {label}
    </span>
  );
}

export default function ResourceTable({
  config,
  rows: initialRows,
}: {
  config: ResourceConfig;
  rows: Record<string, unknown>[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [rows, setRows] = useState(initialRows);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const columns = config.listColumns ?? config.fields.slice(0, 3).map((f) => f.name);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/${config.key}/${id}`, { method: 'DELETE' });
    setDeletingId(null);
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
      showToast(`${config.label} deleted`, 'success');
    } else {
      const body = await res.json().catch(() => ({}));
      showToast(body.error ?? 'Delete failed', 'error');
    }
  };

  const renderCell = (col: string, value: unknown) => {
    const field = config.fields.find((f) => f.name === col);

    if (field?.type === 'boolean') {
      return <Badge label={value ? 'Yes' : 'No'} tone={value ? 'positive' : 'neutral'} />;
    }
    if (field?.type === 'select' && typeof value === 'string' && field.name === 'status') {
      return <Badge label={value} tone={value} />;
    }
    if (value === null || value === undefined || value === '') return <span className="text-slate-300">—</span>;
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  return (
    <div className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="border-b border-[var(--line)] text-left">
              {columns.map((col) => (
                <th key={col} className="px-[16px] py-[12px] font-semibold text-[var(--muted)] text-[11px] uppercase tracking-wide mono">
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
              <th className="px-[16px] py-[12px]" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-[16px] py-[24px] text-center text-[var(--muted)]">
                  No {config.pluralLabel.toLowerCase()} yet.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={String(row.id)} className="border-b border-[var(--line)] last:border-0 hover:bg-[rgba(23,104,214,0.03)]">
                {columns.map((col) => (
                  <td key={col} className="px-[16px] py-[12px] text-[var(--ink)] max-w-[280px] truncate">
                    {renderCell(col, row[col])}
                  </td>
                ))}
                <td className="px-[16px] py-[12px] text-right whitespace-nowrap">
                  <Link
                    href={`/admin/${config.key}/${row.id}`}
                    className="text-[12.5px] font-semibold text-[var(--accent)] hover:text-[var(--ink)] transition-colors mr-[14px]"
                  >
                    Edit
                  </Link>
                  {config.allowDelete !== false && (
                    <button
                      type="button"
                      onClick={() => handleDelete(String(row.id))}
                      disabled={deletingId === row.id}
                      className="text-[12.5px] font-semibold text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                    >
                      {deletingId === row.id ? 'Deleting…' : 'Delete'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
