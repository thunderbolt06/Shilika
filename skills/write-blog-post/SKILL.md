# Write Blog Post — Skill

Generate a publication-ready blog post for Shilika Jain's site.

## Prerequisites (read these before writing)

1. The content_idea row you were given: title, description, target queries, angle, CTA hint.
2. `agents/content-strategist/PERSONA.md` (voice, what you ship, what you do not invent)
3. `agents/content-strategist/STRATEGY.md` (4Ps + audience + channels)
4. `agents/content-strategist/IMPORTANT.md` (memory — lessons from previous runs)
5. `docs/humanization-guide.md` (the rules the validator enforces)
6. `docs/geo-guidelines.md` (how to write so AI assistants cite you cleanly)
7. The `knowledge_base` rows tagged with at least one of the idea's tags, plus all `kind='brand_voice'` and `kind='case_study'` rows.
8. The 3 highest-ranking results currently on Google for the target query. Use the built-in `web_search` tool. Identify what they cover, what they skip, where they are thin.
9. The list of currently published posts (slug + title + tags) for related_posts wiring.

## Voice and structure

- Smart colleague debriefing you, not tutorial talking down.
- "you" not "users." First person from Shilika.
- Contractions. Specific outlets, reporters, services, numbers.
- 1,500–2,500 words.
- H1 = the title. 4–8 H2 sections. Short H3s only when they earn their place.
- Paragraphs of varying length. Three- and four-sentence paragraphs interspersed with one-line statements.

## 10x quality bar

Every post must beat the top 3-5 ranking results for the target query. Cover what they cover, plus the gaps.

1. **Cover both the manual approach and the Shilika approach.** Most posts in this category are either "here's what to do yourself" or "hire a PR firm." Show both, side by side. The reader leaves with a useful answer regardless of whether they hire.
2. **Common pitfalls section.** Every operation has gotchas. Embargo breaks. Wrong outlet for the angle. KOL fraud. APAC compliance traps. Competitors skip them. We do not.
3. **Multiple input scenarios.** Pre-seed, Series A, Series B. Token launch vs equity-funded. Crypto-native vs enterprise. Cover at least two angles.
4. **Concrete numbers and named entities.** No "many outlets," no "various reporters." Specific outlets, specific timelines, specific dollar bands when accurate.
5. **At least one piece of original analysis.** A frame, a heuristic, a model. The thing the reader has not seen in the top 3 results.
6. **Cross-link to related deep content.** Use real published slugs, never fake ones.
7. **Research what currently ranks before drafting.** Use `web_search`. Cover everything they cover. Add what they miss.

## Code verification (mandatory)

Before any named claim (outlet, reporter, dollar amount, named protocol) ends up in the draft:

- Verify against the knowledge base or against existing published posts.
- If the knowledge base does not back it, do not write it. Replace with a generic descriptor ("a tier-1 trade reporter," "a Forbes contributor," "a mid-tier exchange") or ask for the fact to be added.
- Pricing claims must match the service pages.
- Case study claims must match the `kind='case_study'` knowledge base entries.

## Frontmatter (returned as the JSON envelope)

Your output is a JSON object with these fields:

| Field | Constraint |
|---|---|
| slug | lowercase letters, numbers, hyphens. Unique. 30–60 chars. |
| title | max 65 chars. Include the target query verbatim if it reads naturally. |
| description | 150–160 chars. Earns the click. |
| body | Markdown. 1,500–2,500 words. |
| tags | 3–5 lowercase tags, comma-separated. |
| related_posts | 2–3 existing published slugs the reader would also want. |
| cta_label | Default "Book a 30-min teardown with Shilika" unless the post calls for a service-specific CTA. |
| cta_url | Default `https://calendly.com/shilikajain/30min/`. |
| image_prompt | A self-contained prompt for the hero image generator (1,200x630, no people, geometric/editorial). |

## Handoff

After you produce the draft:

1. The system runs the humanization validator. If it fails, you receive the failures and fix them. Loop until clean.
2. The system generates the hero image from your `image_prompt`. You do not pick the image yourself.
3. The system writes the draft into `content_ideas` with `status='ready_for_review'`.
4. Shilika reviews in the admin queue, edits as needed, hits approve.
5. The publisher cron lifts it to `blog_posts` and revalidates the site.

Your job is the draft. The system handles the pipeline.
