"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './Toast';

function CheckboxGrid({
  items,
  selected,
  onToggle,
  onSelectAll,
  onSelectNone,
}: {
  items: { id: string; label: string }[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-[12px] mb-[10px]">
        <button type="button" onClick={onSelectAll} className="text-[12px] font-semibold text-[var(--accent)] hover:text-[var(--ink)]">
          Select all
        </button>
        <button type="button" onClick={onSelectNone} className="text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--ink)]">
          Clear
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[8px] max-h-[240px] overflow-y-auto pr-[4px]">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-[8px] text-[13px] text-[var(--ink)] rounded-[8px] border border-[var(--line)] px-[10px] py-[7px] cursor-pointer hover:border-[rgba(23,104,214,0.4)]"
          >
            <input
              type="checkbox"
              checked={selected.has(item.id)}
              onChange={() => onToggle(item.id)}
              className="accent-[var(--accent)]"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function BulkLocationForm({
  services,
  industries,
  cities,
}: {
  services: { id: string; title: string }[];
  industries: { id: string; title: string }[];
  cities: string[];
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set());
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id); else next.add(id);
    setter(next);
  };

  const combinationCount = (selectedServices.size + selectedIndustries.size) * selectedCities.size;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch('/api/admin/location-pages/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceIds: [...selectedServices],
        industryIds: [...selectedIndustries],
        cities: [...selectedCities],
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? 'Something went wrong');
      return;
    }

    const result = await res.json();
    showToast(`${result.created} of ${result.requested} city pages created (rest already existed)`, 'success');
    router.push('/admin/location-pages');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[28px] max-w-[720px] space-y-[24px]">
      <div>
        <div className="text-[13px] font-semibold text-[var(--ink)] mb-[10px]">Services</div>
        <CheckboxGrid
          items={services.map((s) => ({ id: s.id, label: s.title }))}
          selected={selectedServices}
          onToggle={(id) => toggle(selectedServices, setSelectedServices, id)}
          onSelectAll={() => setSelectedServices(new Set(services.map((s) => s.id)))}
          onSelectNone={() => setSelectedServices(new Set())}
        />
      </div>

      <div>
        <div className="text-[13px] font-semibold text-[var(--ink)] mb-[10px]">Industries</div>
        <CheckboxGrid
          items={industries.map((i) => ({ id: i.id, label: i.title }))}
          selected={selectedIndustries}
          onToggle={(id) => toggle(selectedIndustries, setSelectedIndustries, id)}
          onSelectAll={() => setSelectedIndustries(new Set(industries.map((i) => i.id)))}
          onSelectNone={() => setSelectedIndustries(new Set())}
        />
      </div>

      <div>
        <div className="text-[13px] font-semibold text-[var(--ink)] mb-[10px]">Cities</div>
        <CheckboxGrid
          items={cities.map((c) => ({ id: c, label: c }))}
          selected={selectedCities}
          onToggle={(id) => toggle(selectedCities, setSelectedCities, id)}
          onSelectAll={() => setSelectedCities(new Set(cities))}
          onSelectNone={() => setSelectedCities(new Set())}
        />
      </div>

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      <div className="flex items-center gap-[16px] pt-[4px] border-t border-[var(--line)]">
        <button
          type="submit"
          disabled={submitting || combinationCount === 0}
          className="px-[20px] py-[10px] rounded-full bg-[var(--ink)] text-white text-[13.5px] font-semibold hover:bg-[var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? 'Creating…' : `Create ${combinationCount || ''} page${combinationCount === 1 ? '' : 's'}`}
        </button>
        <span className="text-[12.5px] text-[var(--muted)]">
          Created unpublished — edit each one to add a real local note before publishing.
        </span>
      </div>
    </form>
  );
}
