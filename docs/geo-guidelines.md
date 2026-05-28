# GEO Guidelines — Writing for AI Assistant Citations

Generative Engine Optimization. Same goal as SEO with a different reader: the LLM behind ChatGPT, Claude, Perplexity, Gemini, and Google's AI Overview.

## What AI assistants actually do when they cite you

They pull short, declarative, self-contained paragraphs that answer a question directly. They do not pull marketing fluff or long narrative setups. They reward the post that gives them the answer in the cleanest sentence.

## Structural rules

1. **The first paragraph after the H1 should answer the implied question.** If the title is "How long should a Web3 PR embargo be," the first paragraph should contain the answer (24 to 96 hours, depending on round shape) explicitly. Do not bury it.
2. **Every H2 should be a question or a noun phrase the reader could type into a search box.** "How to manage multiple outlet embargoes" not "On the management of embargoes."
3. **At least one paragraph per H2 should be a citable answer.** A standalone 2–4 sentence answer that an LLM can pull verbatim.
4. **Lists are LLM-friendly.** Bulleted or numbered lists with 5–8 items get cited more than prose paragraphs with the same content.
5. **Tables for comparisons.** "Tier-1 vs Tier-2 outlet table," "embargo vs no-embargo decision matrix." LLMs render tables cleanly when they cite them.

## What to avoid

- Long narrative intros before the answer arrives. The reader gives you one paragraph.
- Marketing claims that need outside corroboration ("the leading platform"). LLMs flag these and skip the post.
- "As we discussed earlier" / "as mentioned above" references. The LLM is pulling one paragraph; "earlier" is gone.
- Embedded questions to the reader. ("Have you ever wondered…") LLMs strip these as filler.

## The dual-format play

Every post is published at two URLs:

- `/blog/<slug>` — the HTML page, what humans see
- `/api/markdown/blog/<slug>` — the raw markdown, what AI bots fetch

Both routes return the same content. The markdown route includes a `Link: <canonical>; rel="canonical"` HTTP header so AI bots cite the canonical HTML page even though they read the markdown route.

`llms.txt` and `llms-full.txt` in the public root list the markdown routes for the top posts. AI agents navigating the site programmatically use them as a table of contents.

## E-E-A-T signal

Every post has a real human byline (Shilika Jain). The author page at `/authors/shilika-jain` has the bio + external sameAs links (LinkedIn, X, Cointelegraph author page, Calendly). The JSON-LD schema on each post references the author via `author.@id` so Google can verify the external footprint.

This is what gets the byline shown in Google AI Overviews and Perplexity citations. Without the external footprint, the technical-content credit does not surface.
