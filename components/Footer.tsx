import Link from "next/link";
import { GithubIcon, GitlabIcon, InstagramIcon, LinkedinIcon } from "./icons";
import { navigationLinks, socialLinks } from "@/lib/site";

const socialIcons = {
  github: GithubIcon,
  gitlab: GitlabIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-4 py-12 text-muted sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 text-center">
        <Link href="/" className="rounded-lg text-sm font-bold tracking-[0.16em] text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          TERRA EM MOVIMENTO
        </Link>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {navigationLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-md transition-colors motion-reduce:transition-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];

            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank" rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-tertiary text-primary transition-colors motion-reduce:transition-none hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="h-px w-full bg-border" />
        <div className="grid w-full gap-2 text-xs text-muted md:grid-cols-3 md:items-center md:text-left">
          <span>Amostra de Cursos UniALFA Umuarama</span>
          <span className="md:text-center">© 2026 Todos os direitos reservados</span>
          <span className="md:text-right">Wagner Da Silva Junior</span>
        </div>
      </div>
    </footer>
  );
}