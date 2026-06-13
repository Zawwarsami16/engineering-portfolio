import { site } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zawwarsami.com";

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#anteroom`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Zawwar Sami",
        givenName: "Zawwar",
        familyName: "Sami",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        jobTitle: "Engineer, Builder",
        description:
          "Independent engineer and builder. Founder of Anteroom Studio. Builds AI systems for markets, geopolitics, and macro intelligence.",
        nationality: "Canadian",
        address: {
          "@type": "PostalAddress",
          addressCountry: site.location.country,
        },
        worksFor: { "@id": ORG_ID },
        founder: { "@id": ORG_ID },
        sameAs: [
          site.socials.github,
          site.socials.githubOrg,
          site.socials.linkedin,
          site.socials.twitter,
          site.socials.substack,
          site.socials.hub,
          site.socials.htb,
          site.socials.htbProgress,
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Autonomous Intelligence",
          "Multi-agent systems",
          "Macro markets",
          "Geopolitical analysis",
          "Full-stack engineering",
          "Islamic philosophy",
          "Philosophy of mind",
          "Next.js",
          "TypeScript",
          "Python",
        ],
      },
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.studio.name,
        alternateName: "Anteroom",
        url: site.studio.url,
        foundingDate: site.studio.foundedYear,
        founder: { "@id": PERSON_ID },
        slogan: site.studio.tagline,
        description:
          "Solo design and engineering studio building AI systems for markets, geopolitics, and macro intelligence.",
        // Google's Article guidelines require the publisher Organization to
        // carry a logo as an ImageObject; without it BlogPosting publisher is
        // flagged in Rich Results.
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "Zawwar Sami",
        description:
          "Engineer and builder. Founder of Anteroom Studio. Based in Canada.",
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: "Zawwar Sami — Engineer, Builder",
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      ...site.writing.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/#writing-${post.slug}`,
        headline: post.title,
        url: post.url,
        mainEntityOfPage: post.url,
        datePublished: post.datePublished,
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        keywords: post.tags.join(", "),
        description: post.summary,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
