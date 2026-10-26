<p align="center">
  <a href="https://bygga-eta.vercel.app"><img alt="Bygga" src="docs/img/banner.svg"></a>
</p>

<h1 align="center">Bygga</h1>

<p align="center">Type the name or article number on an IKEA box and follow every assembly step in 3D, drawn like the paper manual and read out loud. <a href="https://bygga-eta.vercel.app">bygga-eta.vercel.app</a></p>

## Tech stack

- Next.js 16 (App Router, Cache Components) with React 19 and TypeScript, plain CSS, no UI kit
- three.js line-art stage (`src/engine`): ink outlines, fly-in parts, a zoomed callout per fitting, offscreen thumbnails
- A parametric plan generator (`src/lib/plan`) for 7 furniture types and 35 kinds: 778 IKEA products (1,239 sizes) drawn offline, with typo-tolerant search and article numbers
- IKEA's public product facts (`scripts/ikea`): name, type, size and article numbers only, mapped to kinds by `classify.ts`, checked by `npm run ikea:check`; every IKEA family name is known, so MARKUS reads as an office chair and never as a typo of MARIUS
- Manual scanner (`/scan`, parked for v2 and off unless `NEXT_PUBLIC_SCAN=1`): a vision model reads each page, `gpt-oss-120b` lays out the parts in millimetres, and `src/lib/plan/custom.ts` places every dowel, bolt and screw where parts touch
- Together AI for unknown product names (steered by IKEA's own type, cached for good with `use cache: remote`), photo lookup and the "Stuck?" helper, with model fallback lists in `src/lib/together.ts`
- A hands-free voice on Together AI (Kokoro, `src/lib/voice/tts.ts`): every catalog line is pre-recorded with `npm run voice` (937 clips cover all 1,239 guides), the rest are recorded live, product names keep phonetic spellings where they help (`npm run voice:names`), and saying "next" turns the page
- Workshop (`/builds`): every finished build merged into one scene and rendered at true scale next to a person
- Share cards drawn by the engine (`scripts/og/render.mjs`, `src/lib/og`), a picture of your finished build to post, an A4 print view, and a service worker so opened guides work with no signal

## Cloning & running

1. Clone: `git clone https://github.com/Luffixos/bygga.git && cd bygga && npm install`
2. Optional key: `cp .env.example .env.local`, then set `TOGETHER_API_KEY` (the 1,239 offline guides work without it)
3. Run: `npm run dev`, open http://localhost:3000 and type `BISSA`
4. Jump to a step: http://localhost:3000/build/malm-3-drawers?step=12, print one at `/build/malm-3-drawers/print`, or see finished builds at `/builds`
5. Try the scanner free: run with `NEXT_PUBLIC_SCAN=1`, then on `/scan` paste `bygga-dev-mock-key-000000` as the key and add any photo (only `npm run dev` accepts it)
6. Before pushing: `npm run lint && npm run build`

## Roadmap

- [x] let people flag a step that doesn't match their box (logged as `[feedback]`)
- [x] a print view: the whole guide on A4
- [x] cache AI product reads on the server so the second person to ask gets them instantly
- [ ] teach the generator corner sofas, sliding doors, office chairs and kitchen units with drawers (the biggest groups `ikea:check` still skips)
- [ ] the voice in more languages
- [ ] test the scanner on a stack of real manuals and bring it back in v2
- Real IKEA PDFs are not scraped or mirrored on purpose: every guide is generated, and the cover links to the official manual.

## Security

The server's Together key never reaches the browser, and every `/api/*` route is rate limited per IP. A visitor's own key (needed for `/scan`) stays in their `localStorage`, travels only in an `x-together-key` header, and is never stored or logged. Scanned guides and build progress live in the browser too, and a shared scan carries the guide inside its link.

Not affiliated with IKEA, product names are trademarks of Inter IKEA Systems B.V. No license chosen yet, so all rights reserved.
