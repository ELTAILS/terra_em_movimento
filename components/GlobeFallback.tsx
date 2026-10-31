import Link from "next/link";

type GlobeFallbackProps = {
  kind: "loading" | "error" | "webgl";
  message?: string;
};

export default function GlobeFallback({
  kind,
  message,
}: GlobeFallbackProps) {
  const isLoading = kind === "loading";
  const title = isLoading
    ? "Preparando o globo"
    : kind === "webgl"
      ? "Globo 3D indisponível"
      : "Não foi possível carregar o globo";
  const description = message ?? (
    isLoading
      ? "Carregando os contornos dos países."
      : kind === "webgl"
        ? "Seu navegador não disponibilizou WebGL para esta experiência."
        : "Tente novamente ou explore a lista de países."
  );

  return (
    <div
      className="flex min-h-120 items-center justify-center rounded-2xl border border-border bg-surface px-6 py-12 text-center"
      role={isLoading ? "status" : "alert"}
    >
      <div className="max-w-md">
        {isLoading ? (
          <div
            aria-hidden="true"
            className="mx-auto mb-6 size-16 rounded-full border-2 border-border border-t-primary motion-safe:animate-spin"
          />
        ) : null}
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-3 text-muted">{description}</p>
        {kind !== "loading" ? (
          <Link
            className="mt-6 inline-flex rounded-lg border border-primary px-4 py-2 font-medium text-primary outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
            href="/paises"
          >
            Explorar países
          </Link>
        ) : null}
      </div>
    </div>
  );
}
