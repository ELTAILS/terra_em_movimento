"use client";

import { useEffect, useId, useRef } from "react";

import { XIcon } from "@/components/icons";
import type { CountryCardView } from "@/lib/country-view";

type CountryDetailsProps = {
  country: CountryCardView;
  onClose: () => void;
  className?: string;
};

const fallback = "Não informado";

function ValueList({
  values,
  className = "",
}: {
  values: string[];
  className?: string;
}) {
  if (values.length === 0) {
    return <span className="text-muted">{fallback}</span>;
  }

  return (
    <div className={className}>
      {values.map((value, index) => (
        <span key={`${value}-${index}`}>{value}</span>
      ))}
    </div>
  );
}

export default function CountryDetails({
  country,
  onClose,
  className = "",
}: CountryDetailsProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    titleRef.current?.focus();

    return () => {
      const opener = openerRef.current;
      if (opener && document.contains(opener)) {
        opener.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <aside
      aria-labelledby={titleId}
      className={`relative pointer-events-auto flex max-h-[80dvh] flex-col overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-[0_0_28px_color-mix(in_srgb,var(--primary)_14%,transparent)] outline-none after:pointer-events-none after:absolute after:inset-x-5 after:bottom-0 after:h-5 after:bg-gradient-to-t after:from-surface after:to-transparent motion-safe:transition motion-safe:duration-200 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-elevated text-4xl">
          {country.flagUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={country.flagUrl}
              alt={country.flagAlt}
              width={96}
              height={64}
              className="h-16 w-24 object-cover"
            />
          ) : (
            <span aria-label={country.flagAlt} role="img">
              {country.flagEmoji ?? "🌐"}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={`Fechar detalhes de ${country.name}`}
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-lg font-medium text-muted outline-none transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-150"
        >
          <XIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 font-mono text-xs text-muted">
        {country.code}
        {country.numericCode ? ` / ${country.numericCode}` : ""}
      </p>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
        {country.subregion}
      </p>
      <h2
        id={titleId}
        ref={titleRef}
        tabIndex={-1}
        className="mt-2 text-2xl font-semibold text-foreground outline-none"
      >
        {country.name}
      </h2>
      <p className="mt-1 text-sm text-muted">{country.officialName}</p>
      <p aria-live="polite" className="sr-only">
        Detalhes de {country.name}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-surface-elevated p-4 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Capitais</dt>
          <dd className="mt-1 break-words text-foreground">
            <ValueList values={country.capitals} className="space-y-1" />
          </dd>
        </div>
        <div className="text-right">
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">População</dt>
          <dd className="mt-1 text-foreground">{country.population}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Região</dt>
          <dd className="mt-1 break-words text-foreground">{country.region}</dd>
        </div>
        <div className="text-right">
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Sub-região</dt>
          <dd className="mt-1 break-words text-foreground">{country.subregion}</dd>
        </div>
      </dl>

      <section className="mt-5 space-y-4 text-sm">
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Idiomas</h3>
          {country.languages.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {country.languages.map((language, index) => (
                <span
                  key={`${language.name}-${language.nativeName ?? ""}-${index}`}
                  className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-foreground"
                >
                  {language.name}
                  {language.nativeName &&
                  language.nativeName.normalize("NFD").toLocaleLowerCase("pt-BR") !==
                    language.name.normalize("NFD").toLocaleLowerCase("pt-BR") ? (
                    <span className="ml-1 text-muted">({language.nativeName})</span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-muted">{fallback}</p>
          )}
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Moedas</h3>
          <ValueList values={country.currencies} className="mt-2 space-y-1 text-foreground" />
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Fusos horários</h3>
          {country.timezones.length > 0 ? (
            <div className="mt-2 flex max-h-28 flex-wrap gap-2 overflow-y-auto">
              {country.timezones.map((timezone, index) => (
                <span
                  key={`${timezone}-${index}`}
                  className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-primary"
                >
                  {timezone}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-muted">{fallback}</p>
          )}
        </div>
      </section>

      <p className="mt-5 font-mono text-xs text-muted">{country.coordinates}</p>
    </aside>
  );
}