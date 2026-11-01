import type { Metadata } from "next";

import GlobeScene from "@/components/GlobeScene";

export const metadata: Metadata = {
  title: "Mundo | Terra em Movimento",
  description: "Explore o globo terrestre e os contornos dos países.",
};

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
        <GlobeScene />
      </div>
    </div>
  );
}
