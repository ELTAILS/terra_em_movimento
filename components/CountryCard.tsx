import Link from "next/link";

import {
  ArrowRightIcon,
} from "@/components/icons";
import { requestCountry } from "@/lib/globe-intent";
import type { CountryCardView } from "@/lib/country-view";

type CountryCardProps = {
  country: CountryCardView;
};

export default function CountryCard({
  country,
}: CountryCardProps) {
  return (
    <article
      className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/60 motion-safe:duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-16 w-20 items-center justify-center rounded-xl border border-border bg-surface-elevated text-4xl">
          {country.flagUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={country.flagUrl}
              alt={country.flagAlt}
              width={80}
              height={56}
              loading="lazy"
              className="h-14 w-20 rounded-lg object-cover"
            />
          ) : (
            <span aria-label={country.flagAlt} role="img">
              {country.flagEmoji ?? "🌐"}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-muted">
          {country.code}
          {country.numericCode ? ` / ${country.numericCode}` : ""}
        </span>
      </div>
      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {country.subregion}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">{country.name}</h2>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-surface-elevated p-4 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Capital</dt>
          <dd className="mt-1 break-words text-foreground">{country.capital}</dd>
        </div>
        <div className="text-right">
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">População</dt>
          <dd className="mt-1 text-foreground">{country.population}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Moeda</dt>
          <dd className="mt-1 break-words text-foreground">{country.currency}</dd>
        </div>
        <div className="text-right">
          <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Fuso</dt>
          <dd className="mt-1 text-primary">{country.timezone}</dd>
        </div>
      </dl>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="font-mono text-xs text-muted">{country.coordinates}</span>
        <Link
          href="/"
          aria-label={`Explorar ${country.name} no globo`}
          onClick={() => requestCountry(country.id)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-primary outline-none transition hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-150"
        >
          Explorar país
          <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
