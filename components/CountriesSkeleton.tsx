export default function CountriesSkeleton() {
  return (
    <div
      aria-label="Carregando países"
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="motion-safe:animate-pulse h-[360px] rounded-2xl border border-border bg-surface"
        />
      ))}
    </div>
  );
}
