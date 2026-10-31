import type { Metadata } from "next";
import { Suspense } from "react";

import CountriesExplorer from "@/components/CountriesExplorer";
import CountriesSkeleton from "@/components/CountriesSkeleton";
import { getCountries } from "@/lib/countries";
import { toCountryCardViews } from "@/lib/country-view";

export const metadata: Metadata = {
  title: "Países | Terra em Movimento",
  description: "Explore informações dos países do mundo.",
};

async function CountriesContent() {
  const result = await getCountries();

  if (result.status === "error") {
    return (
      <div className="rounded-2xl border border-danger/50 bg-surface p-8">
        <h1 className="text-2xl font-semibold text-foreground">Não foi possível carregar os países</h1>
        <p className="mt-3 text-muted">{result.error.message}</p>
        <p className="mt-2 text-sm text-muted">Atualize a página e tente novamente.</p>
      </div>
    );
  }

  return <CountriesExplorer countries={toCountryCardViews(result.countries)} />;
}

export default function Paises() {
  return (
    <div className="relative overflow-hidden px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Suspense fallback={<CountriesSkeleton />}>
          <CountriesContent />
        </Suspense>
      </div>
    </div>
  );
}
