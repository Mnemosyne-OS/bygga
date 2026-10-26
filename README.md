<p align="center">
  <a href="https://bygga-eta.vercel.app"><img alt="Bygga" src="docs/img/banner.svg"></a>
</p>

<h1 align="center">Bygga</h1>

<p align="center">Type the name on an IKEA box and follow every assembly step in 3D, drawn like the paper manual. <a href="https://bygga-eta.vercel.app">bygga-eta.vercel.app</a></p>

## Tech stack

- Next.js 16 (App Router, Cache Components) with React 19 and TypeScript, plain CSS, no UI kit
- three.js line-art stage (`src/engine`): ink outlines, fly-in parts, a zoomed callout per fitting, offscreen thumbnails
- A parametric plan generator (`src/lib/plan`) for 7 furniture types, with 152 products drawn offline and typo-tolerant search
- Manual scanner (`/scan`, parked for v2 and off unless `NEXT_PUBLIC_SCAN=1`): a vision model reads each page, `gpt-oss-120b` lays out the parts in millimetres, and `src/lib/plan/custom.ts` places every dowel, bolt and screw where parts touch
- Together AI for unknown product names, photo lookup and the "Stuck?" helper, with model fallback lists in `src/lib/together.ts`
- A hands-free voice on Together AI (Kokoro, `src/lib/voice/tts.ts`): every catalog line is pre-recorded with `npm run voice`, the rest are recorded live, and saying "next" turns the page
- Workshop (`/builds`): every finished build merged into one scene and rendered at true scale next to a person

## Cloning & running

1. Clone: `git clone https://github.com/Luffixos/bygga.git && cd bygga && npm install`
2. Optional key: `cp .env.example .env.local`, then set `TOGETHER_API_KEY` (the 152 offline products work without it)
3. Run: `npm run dev`, open http://localhost:3000 and type `BISSA`
4. Jump to a step: http://localhost:3000/build/malm-3-drawers?step=12, or see finished builds at `/builds`
5. Try the scanner free: run with `NEXT_PUBLIC_SCAN=1`, then on `/scan` paste `bygga-dev-mock-key-000000` as the key and add any photo (only `npm run dev` accepts it)
6. Before pushing: `npm run lint && npm run build`

## Roadmap

- [ ] test the scanner on a stack of real manuals and tune the layout prompt
- [ ] teach the generator bent-wood chairs, pegboards and kitchen units
- [ ] let people flag a step that doesn't match their box
- [ ] a print view: the whole guide on A4, one step per panel
- [ ] cache AI product reads on the server so the second person to ask gets them instantly
- Real IKEA PDFs are not scraped or mirrored on purpose: every guide is generated, and the cover links to the official manual.

## Security

The server's Together key never reaches the browser, and every `/api/*` route is rate limited per IP. A visitor's own key (needed for `/scan`) stays in their `localStorage`, travels only in an `x-together-key` header, and is never stored or logged. Scanned guides and build progress live in the browser too, and a shared scan carries the guide inside its link.

Not affiliated with IKEA, product names are trademarks of Inter IKEA Systems B.V. No license chosen yet, so all rights reserved.
