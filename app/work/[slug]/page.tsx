import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github as GithubIcon } from "lucide-react";
import { caseStudies, getCaseStudy } from "../_data";
import { Reveal } from "@/components/ui/Reveal";
import { Tag, SectionTag } from "@/components/ui/Pill";
import { CaseHeroPattern } from "@/components/work/CaseHeroPattern";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return pageMetadata("Case study not found");
  return pageMetadata(`${study.title} — ${study.tagline}`, study.summary);
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-[var(--color-line)] pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <CaseHeroPattern
            pattern={study.hero.pattern}
            image={study.hero.image}
            alt={`${study.title} — ${study.tagline}`}
          />
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <Link
            href="/work"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[var(--color-fg-dim)] uppercase transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="h-3 w-3" /> All work
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Tag>{study.category}</Tag>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              {study.year} · {study.duration}
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-balance font-serif text-[clamp(48px,8vw,128px)] leading-[0.95] font-light tracking-tight text-[var(--color-fg)]">
            {study.title}
            <span className="block font-serif-italic text-[var(--color-accent)]">
              {study.tagline}.
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-fg-dim)]">
            {study.summary}
          </p>

          {/* Meta strip */}
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-4">
            <Meta label="Role" value={study.role} />
            <Meta label="Year" value={study.year} />
            <Meta label="Duration" value={study.duration} />
            <Meta label="Status" value="Shipped" />
          </ul>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Sticky side */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <SectionTag label="Stack" />
              </Reveal>
              <Reveal delay={0.05}>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-12 space-y-4 border-t border-[var(--color-line)] pt-8">
                  {study.links?.site && (
                    <ExternalRow href={study.links.site} label="Visit site" icon={<ExternalLink className="h-4 w-4" />} />
                  )}
                  {study.links?.repo && (
                    <ExternalRow href={study.links.repo} label="Source code" icon={<GithubIcon className="h-4 w-4" />} />
                  )}
                </div>
              </Reveal>

              {/* Metrics */}
              <Reveal delay={0.15}>
                <ul className="mt-12 flex flex-col gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)]">
                  {study.metrics.map((m) => (
                    <li key={m.label} className="bg-[var(--color-bg)] p-5">
                      <span className="block font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                        {m.label}
                      </span>
                      <span className="mt-2 block font-serif text-3xl text-[var(--color-accent)]">
                        {m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </aside>

          {/* Main column */}
          <div className="space-y-16 lg:col-span-8">
            <Reveal>
              <Section title="The problem" body={study.problem} />
            </Reveal>
            <Reveal>
              <BulletSection title="The approach" items={study.approach} />
            </Reveal>
            <Reveal>
              <BulletSection title="The outcome" items={study.outcome} highlight />
            </Reveal>
          </div>
        </div>
      </article>

      {/* Next case */}
      <section className="mx-auto w-full max-w-[1440px] border-t border-[var(--color-line)] px-6 py-20 lg:px-12 lg:py-28">
        <SectionTag label="Up next" />
        <Link
          href={`/work/${next.slug}`}
          data-cursor="hover"
          className="group mt-6 flex items-end justify-between gap-8"
        >
          <h3 className="font-serif text-[clamp(36px,6vw,96px)] leading-[1] font-light tracking-tight text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
            {next.title}{" "}
            <span className="font-serif-italic text-[var(--color-fg-dim)]">— {next.tagline}</span>
          </h3>
          <span
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-fg-dim)] transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)]"
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </Link>
      </section>

      <FinalCTA />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <li className="bg-[var(--color-bg)] p-5">
      <span className="block font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
        {label}
      </span>
      <span className="mt-2 block font-serif text-xl text-[var(--color-fg)]">{value}</span>
    </li>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <SectionTag label={title} />
      <p className="text-pretty mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-fg)]">
        {body}
      </p>
    </div>
  );
}

function BulletSection({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div>
      <SectionTag label={title} />
      <ul className="mt-8 flex flex-col">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-5 border-t border-[var(--color-line)] py-6 first:border-t-0 first:pt-0"
          >
            <span
              className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                highlight ? "bg-[var(--color-accent)]" : "bg-[var(--color-fg-dim)]"
              }`}
            />
            <p className="text-pretty text-lg leading-relaxed text-[var(--color-fg-dim)]">{it}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExternalRow({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="group flex items-center justify-between font-serif text-xl text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
    >
      <span className="flex items-center gap-3">
        <span className="text-[var(--color-fg-dim)] group-hover:text-[var(--color-accent)]">
          {icon}
        </span>
        {label}
      </span>
      <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">↗</span>
    </a>
  );
}
