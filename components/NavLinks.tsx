"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/site";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex min-w-max items-center gap-1">
      {navigationLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex rounded-xl border-b-2 px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                isActive
                  ? "border-primary bg-surface-elevated text-primary"
                  : "border-transparent text-muted hover:bg-surface-elevated hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
