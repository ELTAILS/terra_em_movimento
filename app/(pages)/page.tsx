import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import GlobeFallback from "@/components/GlobeFallback";
import GlobeScene from "@/components/GlobeScene";
import { getCountries } from "@/lib/countries";
import { toCountryCardViews } from "@/lib/country-view";

export const metadata: Metadata = {
  title: "Mundo | Terra em Movimento",
  description: "Explore o globo terrestre e os contornos dos países.",
};

async function HomeContent() {
  const result = await getCountries();

  if (result.status === "error") {
    return (
      <div className="rounded-2xl border border-danger/50 bg-surface p-8">
        <h2 className="text-2xl font-semibold text-foreground">
          Não foi possível carregar os países
        </h2>
        <p className="mt-3 text-muted">{result.error.message}</p>
        <Link
          className="mt-6 inline-flex rounded-lg border border-primary px-4 py-2 font-medium text-primary outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
          href="/paises"
        >
          Explorar países
        </Link>
      </div>
    );
  }

  const countries = toCountryCardViews(result.countries);
  const coordinates = Object.fromEntries(
    result.countries.map((country) => [
      country.code,
      country.coordinates,
    ]),
  );

  return (
    <GlobeScene
      countries={countries}
      coordinates={coordinates}
    />
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="relative mx-auto max-w-7xl">
        <header className="mb-6 rounded-2xl border border-border bg-surface px-6 py-6 shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_8%,transparent)] sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Exploração global
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Experiência interativa
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Mundo
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Explore os contornos dos países em um globo terrestre interativo.
          </p>
        </header>
        <Suspense fallback={<GlobeFallback kind="loading" />}>
          <HomeContent />
        </Suspense>
      </div>
    </div>
  );
}
