import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-center">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface px-6 py-10 shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_8%,transparent)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Erro 404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-3 text-muted">
          Verifique o endereço ou retorne à exploração do planeta.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground outline-none transition-colors motion-reduce:transition-none hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Voltar ao Mundo
        </Link>
      </div>
    </main>
  )
}