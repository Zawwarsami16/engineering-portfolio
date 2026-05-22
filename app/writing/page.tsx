import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Pill";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Writing",
  "Essays by Zawwar Sami — on autonomous intelligence, Islamic philosophy, and the present moment in AI. Published on Substack.",
);

export default function WritingPage() {
  const posts = [...site.writing].sort(
    (a, b) => b.datePublished.localeCompare(a.datePublished),
  );

  return (
    <>
      <PageHero
        tag="Writing"
        title="Notes from"
        italic="the anteroom."
        description="Essays on the shape of the present moment — autonomous intelligence, the substrate beneath function, and the older traditions that prefigured all of it. Published on Substack."
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 lg:px-12 lg:py-28">
        <ul className="flex flex-col">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <li className="border-t border-[var(--color-line)] last:border-b">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col gap-4 py-10 lg:flex-row lg:items-baseline lg:gap-10 lg:py-14"
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase lg:w-28">
                    {post.datePublished}
                  </span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h2 className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.1] tracking-tight font-light text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="max-w-[64ch] text-[var(--color-muted)] leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Subscribe ·
          </span>
          <Link
            href={site.socials.substack}
            className="underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
          >
            zawwar16.substack.com
          </Link>
        </div>
      </section>
    </>
  );
}
