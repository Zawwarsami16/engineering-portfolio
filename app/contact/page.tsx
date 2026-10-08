import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MapPin, Github, Linkedin, Twitter, Hexagon, Newspaper } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Pill";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoordinatesHUD } from "@/components/layout/CoordinatesHUD";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Contact Zawwar Sami about philosophy, AI research, authorized security work, open source, or engineering collaboration.",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="Let's start a"
        italic="conversation."
        description="Questions, thoughtful criticism, research connections, or a technical problem worth working on — you're welcome to get in touch."
      />

      <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          {/* Side details */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-12 lg:sticky lg:top-32">
              <div>
                <Tag>Direct</Tag>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="hover"
                  className="mt-6 block font-serif text-[clamp(28px,3vw,40px)] tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {site.email}
                </a>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-fg-dim)]">
                  Prefer email? Same address that comes through the form. I'll
                  reply from this inbox.
                </p>
              </div>

              <div className="space-y-5 border-t border-[var(--color-line)] pt-8">
                <Tag>Where I am</Tag>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.5} />
                  <div>
                    <p className="font-serif text-2xl text-[var(--color-fg)]">
                      {site.location.label}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <CoordinatesHUD />
                </div>
              </div>

              <div className="space-y-4 border-t border-[var(--color-line)] pt-8">
                <Tag>Elsewhere</Tag>
                <div className="grid grid-cols-1 gap-4">
                  <Social
                    href={site.socials.github}
                    label="GitHub"
                    icon={<Github className="h-4 w-4" />}
                  />
                  <Social
                    href={site.socials.linkedin}
                    label="LinkedIn"
                    icon={<Linkedin className="h-4 w-4" />}
                  />
                  <Social
                    href={site.socials.twitter}
                    label="Twitter"
                    icon={<Twitter className="h-4 w-4" />}
                  />
                  <Social
                    href={site.socials.substack}
                    label="Substack"
                    icon={<Newspaper className="h-4 w-4" />}
                  />
                  <Social
                    href={site.socials.htb}
                    label="Hack The Box"
                    icon={<Hexagon className="h-4 w-4" />}
                  />
                </div>
              </div>

              <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent)] uppercase">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                    <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  </span>
                  Correspondence · Open
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-dim)]">
                  Open to research dialogue, engineering projects, and authorized
                  security work. Please include enough context to make the conversation useful.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="group flex items-center justify-between gap-3 border-t border-[var(--color-line)] pt-4 transition-colors first:border-t-0 first:pt-0 hover:text-[var(--color-accent)]"
    >
      <span className="flex items-center gap-3">
        <span className="text-[var(--color-fg-dim)] group-hover:text-[var(--color-accent)]">
          {icon}
        </span>
        <span className="font-serif text-xl text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">
          {label}
        </span>
      </span>
      <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
        ↗
      </span>
    </a>
  );
}
