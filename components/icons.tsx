import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c.7-3.1 3-4.8 6.5-4.8s5.8 1.7 6.5 4.8" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7 1 .7 1.9v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  );
}

export function GitlabIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="m12 20.5 3.4-9.8H8.6L12 20.5Z" />
      <path d="m8.6 10.7 1.3-4.2c.1-.4.7-.4.8 0l1.3 4.2M15.4 10.7l-1.3-4.2c-.1-.4-.7-.4-.8 0l-1.3 4.2M8.6 10.7H5.4c-.5 0-.8.5-.5.9l7.1 8.9M15.4 10.7h3.2c.5 0 .8.5.5.9L12 20.5" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.2 7.3A1.7 1.7 0 1 1 5.2 4a1.7 1.7 0 0 1 0 3.3ZM3.7 9h3v9.8h-3V9Zm4.8 0h2.9v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v5.4h-3v-4.8c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4v4.9h-3V9Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.3" cy="6.8" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}
