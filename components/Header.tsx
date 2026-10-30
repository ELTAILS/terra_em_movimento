import Link from "next/link";
import NavLinks from "./NavLinks";
import { GlobeIcon, UserIcon } from "./icons";

export default function Header() {
  return (
    <header className="border-b border-border bg-background text-foreground">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-lg text-sm font-bold tracking-[0.16em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          TERRA EM MOVIMENTO<span className="ml-1 text-primary" aria-hidden="true">•</span>
        </Link>
        <nav aria-label="Principal" className="order-3 w-full overflow-x-auto md:order-0 md:w-auto md:flex-1">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-[10px] font-semibold tracking-[0.14em] text-muted lg:flex">
            <GlobeIcon className="size-4 text-primary" aria-hidden="true" />
            EXPLORADOR DO PLANETA
          </div>
          <Link
            href="/sobre"
            aria-label="Sobre mim"
            className="rounded-full border border-border bg-surface p-2 text-primary transition-colors motion-reduce:transition-none hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <UserIcon className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
