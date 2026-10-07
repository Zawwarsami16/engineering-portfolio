# Research Universe

Route: `/research` (navigation label: Universe). Existing Writing & Research remains `/writing`.

## Public catalogue

`lib/universe.ts` models World → Cycle → public works → optional synthesis milestone. It selects published records from `lib/writing.ts` and sends only fields needed by the interface to the client. Counts are derived from actual records. Add new cycles/worlds through this catalogue; dormant alphabet letters activate when a world is added. Do not place unpublished records, planned numbering, private totals, or release schedules in this file or public bundles.

A and P contain current public papers. C and S are active inquiry worlds without public papers. Future books must use `status: "future"`; only published books have a reading link. Their visual branch is separate from the paper sequence.

`components/universe/ResearchUniverse.tsx` provides world selection, an all-world map, public paper details, publication-source links, and overview/paper/book views. URL fragments preserve world selection. SVG roots use deterministic geometry; light flow respects reduced motion. Dialogs use native focus containment, Escape, and focus restoration. Desktop and mobile share data and use distinct CSS compositions.

## Visual reference

The two approved initial mockups govern the first release. Preserve the crimson/black nebula, cream serif typography, A–Z spine, organic roots, atmospheric landscape and glowing circular nodes. The earlier three mockups express long-term expansion, not public content to expose.

The only raster artwork is `public/images/universe/cosmos.webp`, generated with the built-in image-generation tool from the supplied desktop reference. Production prompt: text-free 16:9 dark crimson/black nebula sky; shadowy planets at edges; black alien mountains and reflective red river in the bottom 22%; small crimson horizon light; broad dark central negative space. No text, logos, nodes, roots or UI. SVG and HTML draw interface elements. Original generated PNG was converted to WebP quality 88 using Sharp.

## Integrations available during implementation

GitHub: source/version control. Vercel: existing Git deployment integration. Figma: optional editable design work. ZAI Memory Hub: continuity. Sites: available but unnecessary for this existing Vercel project. Plugin availability and authentication must be checked in future sessions; availability is not a guarantee of account access.

## Checks

Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Verify worlds A/C/P/S, dormant letters, all-world map, paper modal and source links, all views, keyboard/Escape/focus, reduced motion, mobile wrapping, and existing homepage and Writing routes. Remove the temporary responsive preview harness after browser QA.

## Visual detail pass

The default entry is All Worlds; world fragments select details and browser Back restores the map. `UniverseConnections.tsx` measures HTML anchors with ResizeObserver and font readiness, keeping SVG roots attached to alphabet rings and labels at each breakpoint. Paper connections likewise use real button centers.

The landscape is a separate native 2172 × 724 image, served directly at high WebP quality, so long mobile pages do not magnify a single full-page raster. The sky retains the original nebula asset. New asset: `public/images/universe/landscape-hd.webp`; generated with the built-in image tool. Prompt: text-free panoramic black obsidian mountain valley with sharp rock detail, winding reflective river, central crimson horizon beacon and delicate celestial rings, matching the supplied reference. Output requested at maximum resolution; actual native output is 2172 × 724.
