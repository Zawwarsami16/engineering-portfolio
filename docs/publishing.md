# Writing archive

`/writing` is the public catalogue. `/writing/[slug]` is a permanent entry page with publication details, original source and citation. `/writing/[slug]/citation` downloads BibTeX.

The initial entries preserve the two existing public Substack listings and their dates. They are catalogue records, not new editions of the articles. Full text and PDFs are not inferred from summaries; unpublished sources remain private.

## Release a paper

1. Add a reviewed `WritingEntry` to `lib/writing.ts`, with a permanent slug, original publication date, summary/abstract, tags, kind, status and version.
2. Add the complete text as `sections` and any `references`. Store the reviewed PDF under `public/papers/` and set `pdf` to `/papers/filename-v1.pdf`.
3. Keep versioned PDFs immutable. Add a new filename when the work changes. Only set `doi` after a real DOI is issued.
4. Use `Preprint` or `Draft` where appropriate. Do not imply peer review merely because the work appears on this site.
5. Verify the entry, citation download, PDF link and sitemap before deploying. Preserve existing slugs and source links.

The catalogue filters, entry page, citation and sitemap use this shared data. No database or paid service is required.

## Visual assets

`public/images/observatory.webp` was generated with the built-in image generation tool for this redesign, then encoded as WebP for delivery. It is a decorative cinematic concept, not a scientific diagram.

Prompt: panoramic premium research website hero; a dark futuristic observatory with a monumental eclipsed sphere, thin crimson orbital rings, warm ivory light and obsidian reflections; negative space on the left; no text, logos or people.

## Verification

Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Verify `/`, all main navigation pages, `/writing`, both writing entries and citation endpoints in desktop and narrow layouts. Check archive filters, empty state, search dialog, mobile menu, reading preferences, keyboard focus and reduced-motion behavior. Contact-form delivery requires the existing Resend configuration; it returns a useful error rather than false success when unavailable.
