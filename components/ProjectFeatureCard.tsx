import type { ReactNode } from "react";

type ProjectFeatureCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export default function ProjectFeatureCard({
  eyebrow,
  title,
  description,
  icon,
}: ProjectFeatureCardProps) {
  return (
    <article
      tabIndex={0}
      className="group min-w-0 overflow-hidden rounded-xl border border-border bg-surface-elevated p-6 outline-none transition-[transform,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:scale-[1.03] motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/20 motion-safe:focus-within:scale-[1.03] motion-safe:focus-within:shadow-lg motion-safe:focus-within:shadow-primary/20 motion-reduce:transition-none"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">{eyebrow}</p>
        <span
          aria-hidden="true"
          className="text-primary motion-safe:group-hover:animate-[spin_20s_linear_infinite] motion-safe:group-focus-within:animate-[spin_20s_linear_infinite] motion-reduce:animate-none"
        >
          {icon}
        </span>
      </div>
      <h3 className="mt-8 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-foreground">{description}</p>
    </article>
  );
}
