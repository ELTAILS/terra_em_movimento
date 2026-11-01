"use client";

import { useMemo, useState } from "react";

import {
  ChevronDownIcon,
  RefreshIcon,
  SearchIcon,
} from "@/components/icons";
import CountryCard from "@/components/CountryCard";
import CountryDetails from "@/components/CountryDetails";
import type { CountryCardView } from "@/lib/country-view";

type CountriesExplorerProps = {
  countries: CountryCardView[];
};

type RegionFilter = "all" | "Americas" | "Europe" | "Africa" | "Asia" | "Oceania";
type SortOrder = "az" | "za" | "population-desc" | "population-asc";

const filters: Array<{ key: RegionFilter; label: string }> = [
  { key: "all", label: "Todos os países" },
  { key: "Americas", label: "América" },
  { key: "Europe", label: "Europa" },
  { key: "Africa", label: "África" },
  { key: "Asia", label: "Ásia" },
  { key: "Oceania", label: "Oceania" },
];

const collator = new Intl.Collator("pt-BR", { sensitivity: "base" });

export default function CountriesExplorer({
  countries,
}: CountriesExplorerProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("az");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLocaleLowerCase("pt-BR")
      .trim();
    const filtered = countries.filter((country) => {
      const matchesQuery = normalizedQuery === ""
        || country.searchText.includes(normalizedQuery);
      const matchesRegion = region === "all" || country.regionKey === region;
      return matchesQuery && matchesRegion;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "population-desc" || sortOrder === "population-asc") {
        if (a.populationValue === null && b.populationValue === null) {
          return 0;
        }
        if (a.populationValue === null) {
          return 1;
        }
        if (b.populationValue === null) {
          return -1;
        }

        const aPopulation = a.populationValue;
        const bPopulation = b.populationValue;
        return sortOrder === "population-desc"
          ? bPopulation - aPopulation
          : aPopulation - bPopulation;
      }

      const result = collator.compare(a.name, b.name);
      return sortOrder === "za" ? result * -1 : result;
    });
  }, [countries, query, region, sortOrder]);

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const selectedCountry = countries.find((country) => country.id === selectedId) ?? null;

  function resetVisibleCount() {
    setVisibleCount(12);
  }

  function updateQuery(value: string) {
    setQuery(value);
    resetVisibleCount();
  }

  function updateRegion(value: RegionFilter) {
    setRegion(value);
    resetVisibleCount();
  }

  function updateSortOrder(value: SortOrder) {
    setSortOrder(value);
    resetVisibleCount();
  }

  return (
    <section className={selectedCountry ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]" : "space-y-8"}>
      <div className="min-w-0 space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary">
            <span aria-hidden="true">◉</span>
            CARTOGRAFIA GLOBAL • DADOS REST COUNTRIES
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Explore os países do mundo
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Descubra informações e características de cada país do planeta.
          </p>
        </div>
        <div className="min-w-52 rounded-2xl border border-border bg-surface-elevated p-5">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted">
            PAÍSES ENCONTRADOS
          </p>
          <p className="mt-2 text-3xl font-semibold text-primary">
            {filteredCountries.length} / {countries.length}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface-elevated p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Buscar países</span>
            <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Buscar por nome do país, capital ou continente..."
              className="h-12 w-full rounded-xl border border-border bg-surface pl-12 pr-4 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 xl:max-w-2xl">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                aria-pressed={region === filter.key}
                onClick={() => updateRegion(filter.key)}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-150 ${
                  region === filter.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {region === filter.key && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />}
                {filter.label}
              </button>
            ))}
          </div>
          <label className="relative shrink-0">
            <span className="sr-only">Ordenar países</span>
            <select
              value={sortOrder}
              onChange={(event) => updateSortOrder(event.target.value as SortOrder)}
              className="h-12 w-full appearance-none rounded-xl border border-border bg-surface px-4 pr-10 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring xl:w-56"
            >
              <option value="az">Ordenar: Ordem alfabética (A-Z)</option>
              <option value="za">Ordenar: Ordem alfabética (Z-A)</option>
              <option value="population-desc">Ordenar: Maior população</option>
              <option value="population-asc">Ordenar: Menor população</option>
            </select>
            <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </label>
        </div>
      </div>

      {visibleCountries.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleCountries.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              selected={selectedId === country.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">Nenhum país encontrado</h2>
          <p className="mt-2 text-muted">Tente outra busca ou remova os filtros atuais.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRegion("all");
              setVisibleCount(12);
            }}
            className="mt-5 min-h-11 rounded-lg border border-primary px-4 text-sm font-medium text-primary outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
          >
            Limpar filtros
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="flex items-center gap-2 text-muted">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-secondary" />
          Exibindo {visibleCountries.length} de {filteredCountries.length} países
        </p>
        {visibleCount < filteredCountries.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 12)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 font-medium text-foreground outline-none hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RefreshIcon aria-hidden="true" className="h-4 w-4" />
            Carregar mais países
          </button>
        )}
      </div>
      </div>
      {selectedCountry ? (
        <CountryDetails
          country={selectedCountry}
          onClose={() => setSelectedId(null)}
          className="fixed inset-x-3 bottom-3 z-30 sm:static sm:top-24 sm:max-h-[calc(100dvh-7rem)] sm:w-96 sm:self-start lg:sticky"
        />
      ) : null}
    </section>
  );
}
