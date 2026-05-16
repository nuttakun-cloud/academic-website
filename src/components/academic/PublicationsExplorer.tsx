"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PublicationCard from "@/components/academic/PublicationCard";
import { cn, pubTypeLabel } from "@/lib/utils";
import type { Publication, PublicationType } from "@/types/content";

// =============================================================================
// PUBLICATIONS EXPLORER  (client component)
// รับ publications ทั้งหมดจาก server แล้ว filter ในเบราว์เซอร์
// - กรองตาม: ประเภท / ปี / คำค้น
// - จัดกลุ่มผลลัพธ์ตามปี (ใหม่ → เก่า)
// accessibility: ทุก control มี label/aria, ปุ่ม filter มี aria-pressed
// =============================================================================

interface Props {
  publications: Publication[];
}

type TypeFilter = "all" | PublicationType;
type YearFilter = "all" | number;

export default function PublicationsExplorer({ publications }: Props) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [query, setQuery] = useState("");

  // ── ตัวเลือก filter ที่มีจริง (คำนวณครั้งเดียว) ──
  const types = useMemo(
    () =>
      Array.from(new Set(publications.map((p) => p.publicationType))) as PublicationType[],
    [publications]
  );
  const years = useMemo(
    () =>
      Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a),
    [publications]
  );

  // ── ผลลัพธ์หลังกรอง ──
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      if (typeFilter !== "all" && p.publicationType !== typeFilter) return false;
      if (yearFilter !== "all" && p.year !== yearFilter) return false;
      if (q) {
        const haystack = [
          p.title,
          p.venue ?? "",
          ...p.authors.map((a) => a.label),
          ...p.tags.map((t) => t.label),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [publications, typeFilter, yearFilter, query]);

  // ── จัดกลุ่มตามปี (ใหม่ → เก่า) ──
  const grouped = useMemo(() => {
    const map = new Map<number, Publication[]>();
    for (const p of filtered) {
      const arr = map.get(p.year) ?? [];
      arr.push(p);
      map.set(p.year, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="mb-10 space-y-5">

        {/* Type buttons */}
        <div>
          <p className="text-2xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-2">
            Type
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by publication type">
            <FilterButton
              active={typeFilter === "all"}
              onClick={() => setTypeFilter("all")}
            >
              All
            </FilterButton>
            {types.map((t) => (
              <FilterButton
                key={t}
                active={typeFilter === t}
                onClick={() => setTypeFilter(t)}
              >
                {pubTypeLabel[t]}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Year + Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-48">
            <label
              htmlFor="year-filter"
              className="block text-2xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-2"
            >
              Year
            </label>
            <select
              id="year-filter"
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 rounded-md text-sm
                bg-[var(--bg-elevated)] border border-[var(--border)]
                text-[var(--text-primary)]
                focus-visible:outline-2 focus-visible:outline-accent-DEFAULT"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="pub-search"
              className="block text-2xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-2"
            >
              Search
            </label>
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                aria-hidden="true"
              />
              <input
                id="pub-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, author, venue, or topic…"
                className="w-full pl-9 pr-3 py-2 rounded-md text-sm
                  bg-[var(--bg-elevated)] border border-[var(--border)]
                  text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                  focus-visible:outline-2 focus-visible:outline-accent-DEFAULT"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Result count ── */}
      <p className="text-sm text-[var(--text-secondary)] mb-6" aria-live="polite">
        Showing <strong>{filtered.length}</strong> of {publications.length} publications
      </p>

      {/* ── Grouped results ── */}
      {grouped.length === 0 ? (
        <p className="text-[var(--text-muted)] py-12 text-center">
          No publications match your filters.
        </p>
      ) : (
        <div className="space-y-12">
          {grouped.map(([yr, items]) => (
            <section key={yr} aria-label={`Publications from ${yr}`}>
              <h2 className="font-serif text-2xl font-bold text-primary-DEFAULT mb-5">
                {yr}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {items.map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

// ปุ่ม filter — แยกไว้กัน markup ซ้ำ
function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "px-3.5 py-1.5 rounded-full text-xs font-medium font-sans",
        "border transition-colors duration-[120ms]",
        active
          ? "bg-primary-DEFAULT text-white border-primary-DEFAULT"
          : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-primary-DEFAULT/40 hover:text-primary-DEFAULT"
      )}
    >
      {children}
    </button>
  );
}
