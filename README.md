<p align="center">
  <img alt="Bygga" src="docs/img/banner.svg">
</p>

<h1 align="center">Bygga</h1>

<p align="center">Type the name on an IKEA box (or snap the label) and get a moving, manual-style assembly guide: tools check, parts check, then every step drawn in 3D line art. Not from IKEA? Photograph any paper manual and it becomes the same kind of guide. Runs locally, no live site yet.</p>

## Tech stack

- Next.js 16 (App Router, Cache Components) with React 19 and TypeScript, no CSS framework
- three.js stage with ink outlines, hidden-line removal, fly-in arrows and a magnified callout per fitting
- A parametric generator (`src/lib/plan`) that turns a product spec into panels, hardware, holes and ordered steps
- Together AI: `openai/gpt-oss-120b` reads unknown products and answers "Stuck?" questions (streamed), a vision model reads box photos and identifies loose parts
- 152 products drawn offline with typo-tolerant search; unknown names get a "what does it look like?" picker
- Scan any manual (`/scan`): a vision model reads each page, `gpt-oss-120b` lays the parts out as boxes in millimetres, and `src/lib/plan/custom.ts` works out every joint, dowel, bolt and screw from where parts touch. Runs on the visitor's own Together key
- Workshop (`/builds`): everything you finished, rendered together in one drawing at true scale next to a person

## Cloning & running

1. Install: `npm install`
2. Add your key: `cp .env.example .env.local`, then set `TOGETHER_API_KEY`
3. Run it: `npm run dev`, then open http://localhost:3000 and try `BISSA`
4. Deep link to a step: http://localhost:3000/build/malm-3-drawers?step=12, or see your builds at `/builds`
5. Try the manual scanner without spending credits: on `/scan`, paste `bygga-dev-mock-key-000000` as the key (only accepted by `npm run dev`) and add any photo
6. Before shipping: `npm run lint && npm run build`

## Roadmap

- [ ] teach the generator a few more shapes: bent-wood chairs like POÄNG, pegboards, kitchen units
- [ ] let people flag a step that doesn't match their box, and feed that back into the spec
- [ ] print view: the whole manual on A4, one step per panel
- [ ] cache AI product reads on the server so the second person to ask gets it instantly
- Real IKEA manuals are not scraped or mirrored on purpose: every guide is generated, and the cover links to the official PDF.

## Security

The server's Together key never leaves the server; the browser only talks to `/api/*`, which is rate limited per IP. A visitor's own key (needed for `/scan`) lives in their `localStorage`, rides along on their requests in an `x-together-key` header, and is never stored or logged. Scanned guides stay in the browser; sharing one puts the guide itself, compressed, in the link. Build progress lives in `localStorage` on the device and is never uploaded. Bygga is not affiliated with IKEA; product names are trademarks of Inter IKEA Systems B.V. MIT licensed.
