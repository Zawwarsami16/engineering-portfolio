/**
 * Backward-compatible W1 PDF entry point.
 *
 * The 18-page original file is now stored in the static public/papers
 * directory and has been verified byte-for-byte against the author PDF.
 * Redirect any previously shared API link to that immutable local asset.
 */
export function GET(request: Request) {
  return Response.redirect(
    new URL("/papers/Zawwar-Sami-W1-Weapons-as-Systems-v1.0.pdf", request.url),
    308,
  );
}
