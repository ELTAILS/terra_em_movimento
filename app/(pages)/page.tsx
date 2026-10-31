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
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
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
