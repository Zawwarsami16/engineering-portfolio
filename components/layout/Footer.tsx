"use client";

import Link from "next/link";
import { Mail, MapPin, CircleDot, Github, Linkedin, Twitter, Hexagon, Newspaper } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-line)]">
      {/* Centered beacon */}
      <div className="pointer-events-none absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <Beacon />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            <FooterColumn icon={<Mail className="h-3.5 w-3.5" />} label="Email">
              <a
                href={`mailto:${site.email}`}
                className="font-serif text-2xl text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
                data-cursor="hover"
              >
                {site.email}
              </a>
            </FooterColumn>
            <FooterColumn icon={<MapPin className="h-3.5 w-3.5" />} label="Based in">
              <p className="font-serif text-2xl text-[var(--color-fg)]">
                {site.location.label}
              </p>
            </FooterColumn>
            <FooterColumn icon={<CircleDot className="h-3.5 w-3.5" />} label="Availability">
              <p className="font-serif text-2xl text-[var(--color-fg)]">
                Research & collaboration
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)]">
                Philosophy · AI · Security
              </p>
            </FooterColumn>
          </div>
        </Reveal>

        {/* Wordmark — full word, centred, with no marquee cut-off */}
        <div className="relative mt-20 flex justify-center overflow-hidden px-4">
          <span
            className="font-serif text-[clamp(64px,14vw,200px)] leading-none font-light tracking-tight whitespace-nowrap text-[var(--color-fg-dim)]/[0.07] select-none"
            aria-hidden
          >
            <em>Zawwar Sami</em>
          </span>
          {/* Soft gradient masks at the edges so the wordmark fades cleanly */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24"
            style={{
              background:
                "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24"
            style={{
              background:
                "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[var(--color-line)] pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
            © {new Date().getFullYear()} Zawwar Sami · Built with care, designed with purpose.
          </p>
          <div className="flex items-center gap-5">
            <SocialIcon href={site.socials.github} label="GitHub">
              <Github className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.socials.twitter} label="Twitter">
              <Twitter className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.socials.substack} label="Substack">
              <Newspaper className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.socials.htb} label="Hack The Box">
              <Hexagon className="h-4 w-4" />
            </SocialIcon>
            <Link
              href="/contact"
              data-cursor="hover"
              className="ml-2 font-mono text-[11px] tracking-[0.3em] text-[var(--color-fg-dim)] uppercase transition-colors hover:text-[var(--color-accent)]"
            >
              Get in touch ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent)] uppercase">
        <span className="text-[var(--color-accent)]">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-pretty">{children}</div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-cursor="hover"
      className="text-[var(--color-fg-dim)] transition-colors hover:text-[var(--color-accent)]"
    >
      {children}
    </a>
  );
}

function Beacon() {
  return (
    <div className="relative h-3 w-3">
      <span className="absolute inset-0 rounded-full bg-[var(--color-accent)]" />
      <span className="pulse-soft absolute -inset-2 rounded-full border border-[var(--color-accent)] opacity-40" />
    </div>
  );
}
