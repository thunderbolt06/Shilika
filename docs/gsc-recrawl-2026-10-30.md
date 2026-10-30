# GSC coverage remediation, 30 Oct 2026

Two exports: "Crawled - currently not indexed" (42 URLs, a quality verdict) and "Discovered - currently not indexed" (55 URLs, never fetched, a crawl-demand problem).

## What changed (Crawled - not indexed)
- 30 pages (14 `/pages/*`, 16 `/playbook/*`) got a first-hand "From the field" block, one added FAQ (visible and in FAQPage JSON-LD, parity audit clean) and a real modified date. Source: `data/recrawl-content.json`, built by `scripts/_recrawl_content_src.py`, injected by `scripts/inject-recrawl-content.py` (idempotent, `--refresh`, `--dry-run`).
- Each X post is quoted once across the site, verbatim, with a link. Pages with no fitting post (InfoSec, US cyber, analyst relations, exchange listing, GEO) carry no quotes by design.
- Security, B2B and press-release page clusters each got a distinct "which page is for me" answer with cross-links, to reduce cannibalization.
- `/authors/shilika-jain` renders a dated, linked track record from `data/author-evidence.json` and `knowsAbout` in Person JSON-LD.
- `app/sitemap.ts`: `lastModified: 2026-10-30` on every edited URL.

## Discovered - not indexed
- 8 `/compare/*`, 3 `/services/ai-seo/*` and the robots/sitemap tool now get contextual links from edited, already-crawled pages.

The new links sit on pages Google already declined to index, and the homepage already links the ai-seo pages, so this is mostly crawl demand, not missing links. The levers are: deploy (the Vercel hook missed pushes on 2026-10-21), resubmit the sitemap, "Validate fix" on both GSC reports, and URL Inspection > Request indexing for the author page and top money pages.

## Not done, needs a decision
- 9 `/blog/*` URLs live in Supabase `blog_posts` (production DB). Not edited.
- 35 locale URLs (zh, ko, ja, es, ru) are machine translations. Options: keep, drop thin ones (`/xx/contact`) from the sitemap, or noindex until reviewed.
- `/pages/*` trust strip claims ("Coverage placed in Dark Reading, SC Media, The Register, Wired") need proof links on `/pages/infosec-pr-agency` and `/pages/cybersecurity-pr-agency*`.
- Merge/redirect decisions: the four security pages, the three B2B pages, the two press-release pages.
- `scripts/check-humanization.mjs` em-dash rule matches every hyphen; fix the regex.

## Update: /blog posts (no database writes)
- `data/blog-field-notes.json` (built by `scripts/_blog_field_notes_src.py`) holds a field-notes block for all 9 flagged posts. `app/(site)/blog/[slug]/page.tsx` renders it under the post body when the slug has an entry, so Supabase is untouched. Styles are at the end of `blog/blog.css`.
- No FAQ was added to blog posts (their FAQ schema is generated from the Supabase body). Verified with a temporary stubbed post, since reverted.
