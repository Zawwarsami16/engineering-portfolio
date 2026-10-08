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
        image: `${SITE_URL}/images/zawwar-portrait.avif`,
        jobTitle: "Independent Researcher & Engineer",
        description:
          "Independent research and engineering across philosophy, artificial intelligence, and cybersecurity. Author of preprints and builder of ZAI and ZAI Memory Hub.",
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
          site.socials.orcid,
        ],
        knowsAbout: [
          "Philosophy", "Artificial Intelligence", "Cybersecurity",
          "AI agents", "Personal AI", "Autonomous systems", "Philosophy of mind",
          "Metaphysics", "Islamic philosophy", "Consciousness", "AI memory and continuity",
          "Defensive security research", "Security labs and CTFs", "Full-stack engineering",
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
          "Independent research and engineering studio hosting ZAI, open-source systems, security practice, and experimental projects.",
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
          "Research and engineering across philosophy, artificial intelligence, and cybersecurity.",
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/about#profile`,
        url: `${SITE_URL}/about`,
        name: "Zawwar Sami — Independent Researcher & Engineer",
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
