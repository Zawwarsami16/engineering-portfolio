# Research Universe

Route: `/research` (navigation label: Universe). Existing Writing & Research remains `/writing`.

## Public catalogue

`lib/universe.ts` models World → Cycle → public works → optional synthesis milestone. It selects published records from `lib/writing.ts` and sends only fields needed by the interface to the client. Counts are derived from actual records. Add new cycles/worlds through this catalogue; dormant alphabet letters activate when a world is added. Do not place unpublished records, planned numbering, private totals, or release schedules in this file or public bundles.

A and P contain current public papers. C and S are active inquiry worlds without public papers. Future books must use `status: "future"`; only published books have a reading link. Their visual branch is separate from the paper sequence.

`components/universe/ResearchUniverse.tsx` provides world selection, an all-world map, public paper details, publication-source links, and overview/paper/book views. URL fragments preserve world selection. SVG roots use deterministic geometry; light flow respects reduced motion. Dialogs use native focus containment, Escape, and focus restoration. Desktop and mobile share data and use distinct CSS compositions.

## Visual reference

The three canonical long-term mockups now govern the live visual composition: desktop all-world overview, desktop focused-world/cycle view, and the stacked mobile world/cycle/book treatment. Preserve the crimson/black nebula, cream serif typography, A–Z spine, organic roots, atmospheric landscape, glowing circular nodes, synthesis-book orbit and future-horizon rail. This is a visual/infrastructure direction only: the public catalogue remains truth-driven, so unpublished paper IDs, private totals and release schedules are never exposed merely because a concept mockup shows them.

The only raster artwork is `public/images/universe/cosmos.webp`, generated with the built-in image-generation tool from the supplied desktop reference. Production prompt: text-free 16:9 dark crimson/black nebula sky; shadowy planets at edges; black alien mountains and reflective red river in the bottom 22%; small crimson horizon light; broad dark central negative space. No text, logos, nodes, roots or UI. SVG and HTML draw interface elements. Original generated PNG was converted to WebP quality 88 using Sharp.

## Integrations available during implementation

GitHub: source/version control. Vercel: existing Git deployment integration. Figma: optional editable design work. ZAI Memory Hub: continuity. Sites: available but unnecessary for this existing Vercel project. Plugin availability and authentication must be checked in future sessions; availability is not a guarantee of account access.

## Checks

Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Verify worlds A/C/P/S, dormant letters, all-world map, paper modal and source links, all views, keyboard/Escape/focus, reduced motion, mobile wrapping, and existing homepage and Writing routes. Remove the temporary responsive preview harness after browser QA.

## Visual detail pass

The default entry is World A; #map opens All Worlds, world fragments select details, and browser history restores the requested view. `UniverseConnections.tsx` measures HTML anchors with ResizeObserver and font readiness, keeping SVG roots attached to alphabet rings and labels at each breakpoint. Paper connections likewise use real button centers.

The landscape is a separate native 2172 × 724 image, served directly at high WebP quality, so long mobile pages do not magnify a single full-page raster. The sky retains the original nebula asset. New asset: `public/images/universe/landscape-hd.webp`; generated with the built-in image tool. Prompt: text-free panoramic black obsidian mountain valley with sharp rock detail, winding reflective river, central crimson horizon beacon and delicate celestial rings, matching the supplied reference. Output requested at maximum resolution; actual native output is 2172 × 724.

Validation: production build, TypeScript and ESLint pass. Live desktop map and A detail inspected. Phone layouts at 360px and 390px inspected using a temporary same-origin iframe. At 360px, all four SVG root origins match letter-ring anchors with zero coordinate offset; no horizontal overflow. A4 modal and Escape dismissal verified. The QA harness was removed after testing.

## Papers-first entry — October 8, 2026

The default entry and Universe navigation now open World A with its public paper nodes and readable titles already visible. The explicit All worlds control retains the map at #map; world deep links and history continue to work. Compact desktop spacing places synthesis beneath the papers and retains a narrow future-horizon rail. Mobile uses two-column paper cards with titles; unpublished counts remain private.

## Reference correction

The focused desktop view follows the supplied horizontal reference: cropped left planet, inset world introduction, circular paper grid, synthesis orbit beside the grid, and a future horizon. Persistent paper titles are removed from the overview; full titles remain in accessible button names, paper dialogs and the Papers view. Only current public works populate the grid. The Research route uses a compact Home/Research/Writing/About masthead.

## Approved A1–A18 roadmap and rendering pass

At the author’s request, Cycle 1 displays eighteen numbered slots on desktop and mobile. Public non-draft Writing entries with series codes A1–A18 automatically populate and unlock those slots; locked entries have disabled controls and no invented titles or publication links. Public counts remain actual released counts. SVG components are memoized, redundant geometry state updates are skipped, and paper paths share three row connections instead of five paths per node. SVG playback pauses offscreen, in hidden tabs, and for reduced motion. Mobile omits the hidden paper-connection layer visually. No device-specific frame-rate guarantee is implied.

## World-map entry and tall-viewport correction

Default entry returns to All Worlds. Cosmology and Security labels sit above the alphabet, Artificial Agency and Personhood below. Root anchors support either direction. Page height follows content instead of a viewport-height minimum, preventing the huge empty area on phones requesting desktop mode. World detail no longer starts invisible for a hydration fade. Root glows are batched per branch and geometry is measured before client paint. Native-resolution artwork is retained with a restrained desktop colour adjustment.

## W world addition — October 10, 2026

The author approved an exception to the historical public-catalogue rule for roadmap **labels only**: W exposes the explicitly approved 36-paper plan and its three future standalone books, never unpublished manuscript contents or false public status. W is distinct from digital cybersecurity world S. The plans are represented in `lib/universe.ts` as three twelve-slot cycles with offsets 1, 13 and 25, with working titles as metadata. All W paper links remain locked until genuinely released and separately added to public Writing records.

Click `W` on the A–Z map to enter the W overview with three volume cards. W1/W2/W3 navigate through `#W1`/`#W2`/`#W3`, using the same shared paper-grid and future-book components used in A; back navigation returns to `#W` or `#map`. The map uses a fifth SVG-linked label without altering the four established placements. Desktop keeps W near the right end of the alphabet; phone deliberately extends the world-map section to avoid squeezing all five labels into the existing four positions. Dedicated mobile card/typography styles are scoped to W.

Always distinguish **planned** from **published**, and do not surface W books as published or claim expert review. Test deep links, popstate, 360px/390px readability, A/C/P/S regression, and production builds before considering the design complete.
