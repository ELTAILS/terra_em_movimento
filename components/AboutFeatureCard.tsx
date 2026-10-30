import type { ReactNode } from "react";

type AboutFeatureCardProps = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  footer: string;
  icon: ReactNode;
};

export default function AboutFeatureCard({
  number,
  title,
  eyebrow,
  description,
  footer,
  icon,
}: AboutFeatureCardProps) {
  return (
    <article
      tabIndex={0}
      className="group min-w-0 rounded-xl border border-border bg-surface-elevated p-5 shadow-sm outline-none transition-[transform,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:scale-[1.03] motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/20 motion-safe:focus-visible:scale-[1.03] motion-safe:focus-visible:shadow-lg motion-safe:focus-visible:shadow-primary/20 motion-reduce:transition-none cursor-pointer "
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-2xl font-bold text-foreground/15">{number}</span>
        <span
          aria-hidden="true"
          className="text-foreground motion-safe:group-hover:animate-spin motion-safe:group-focus-visible:animate-spin"
        >
          {icon}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-secondary">{eyebrow}</p>
      <p className="mt-4 text-sm leading-5 text-foreground">{description}</p>
      <p className="mt-6 flex items-center gap-2 text-xs text-foreground">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
        {footer}
      </p>
    </article>
  );
}
