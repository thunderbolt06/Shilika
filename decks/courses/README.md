# Course decks

PowerPoint decks for the eight programs on /courses, built from `data/courses/*.ts`.
The decks are not published on the site.

Each program folder holds:

- `<slug>-masterclass.pptx`: the one-hour deck, one slide per idea, with timing in the speaker notes
- `<slug>-workshop.pptx`: the three-day facilitator deck, one slide per session, plus each day's deliverable
- `<slug>-module-1.pptx` to `-module-6.pptx`: one deck per course module, with key ideas, in-class exercises, the activity, the quiz (question slide, then answer slide) and a recap

Speaker notes carry the teaching script: each point, each session brief, and each quiz answer with the reason.

## Rebuilding after the course data changes

The generator needs `pptxgenjs`, which is not a dependency of the site. Install it in a throwaway folder and point `NODE_PATH` at it:

```bash
mkdir -p /tmp/deck-deps && (cd /tmp/deck-deps && npm init -y >/dev/null && npm i pptxgenjs@4.0.1 tsx)
NODE_PATH=/tmp/deck-deps/node_modules /tmp/deck-deps/node_modules/.bin/tsx decks/courses/_generator/build.ts
```

Pass one or more slugs to rebuild only those programs. Which masterclass slides and workshop sessions feed each module is set in `MODULE_MAP` in `build.ts`.

Fonts are Georgia (headings) and Arial (body), which ship with macOS, Windows and Office. Every deck passes a PowerPoint file-format check and was rendered in Keynote to check layout. Google Slides has not been tested.
