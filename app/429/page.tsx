import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Muitas requisições | Terra em Movimento",
  description: "Você está fazendo muitas requisições. Por favor, tente novamente mais tarde.",
};


export default function Page429() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-center">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface px-6 py-10 shadow-[0_0_0_1px_color-mix(in_srgb,var(--secondary)_8%,transparent)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Erro 429
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Muitas requisições
        </h1>
        <p className="mt-3 text-muted">
          Aguarde um momento antes de tentar novamente.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground outline-none transition-colors motion-reduce:transition-none hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Voltar ao Mundo
          </Link>
          <Link
            href="/paises"
            className="rounded-lg border border-border bg-tertiary px-5 py-3 font-semibold text-foreground outline-none transition-colors motion-reduce:transition-none hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Ver Países
          </Link>
        </div>
      </div>
    </main>
  );
}