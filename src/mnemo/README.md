# Bygga as a Mnemosyne OS cartridge

This folder, `vite.mnemo.config.ts` and `mnemo-plugin.json` turn Bygga into a
[Mnemosyne OS](https://github.com/Mnemosyne-OS) cartridge. They live on the
`mnemosyne-os` branch of the fork. `main` stays identical to
[Nutlope/bygga](https://github.com/Nutlope/bygga).

No file of the site is changed. Vite compiles the site's own components next to
the Next build, because an installed cartridge is a folder of static files with
no server behind it.

```bash
npm run dev:cartridge    # http://127.0.0.1:5397
npm run build:cartridge  # dist/, what the host serves once installed
npm run test:cartridge   # the cartridge layer's tests (src/mnemo/test)
```

## What stands in for Next

| The site uses | The cartridge uses |
|---|---|
| `next/link`, `next/navigation` | `shims/`: the route lives in the hash, `index.html#/build/kallax-2x2?step=3` |
| `/build/[slug]` and the other pages | `main.tsx` reads the hash and renders the same components |
| `app/error.tsx` | `PageErrorBoundary.tsx` shows it when a page breaks while drawing |
| the header's live GitHub star count (an async server component) | `SiteHeader.tsx`, the same header with a plain GitHub link |
| `/voice/…` and `/og/…` from the domain root | rewritten to `./voice/…` and `./og/…` at build time. The build fails if those paths move upstream |
| `next/font` | `mnemo.css` names the two font variables |
| `/api/guide` | `siteApi.ts` works the product out from the catalog, as the route does without a key (match, typical build, close names) |
| the other `/api/*` routes, on the visitor's Together AI key | `{ "error": "key" }`, as the site answers a visitor with no key. `/api/feedback` is sent nowhere; the site's thank-you shows anyway |
| the Together AI key dialog (`KeyModal`) | `KeyModal.tsx`, same props: « voice » offers the read-aloud and the Mnemosyne assistant, the other reasons say they run on Together AI |
| Vercel Analytics | nothing is sent |

`SiteHeader` and `KeyModal` are swapped at build time by `swapModules` in
`vite.mnemo.config.ts`, whatever path the import takes.

## The agent door

`agentDoor.ts` serves the actions declared in `mnemo-plugin.json` (`agentActions`), so an
agent, or the assistant's voice, can drive the guide:

| Action | What it does |
|---|---|
| `status` | the screen, and in a guide the product, the phase and the step, read from the page title |
| `open {product, step?}` | the guide of a product, matched like the search box, on its cover or straight on a step. What opens carries the name that was said |
| `next`, `back` | the right and left arrow keys of the guide |
| `again` | the R key: the step's 3D animation plays again |

Each action checks the screen. `next`, `back` and `open` read it back after the gesture;
`again`, whose replay changes nothing in the title, checks before that nothing covers the
guide. An action that cannot have happened is refused with a sentence for the person
(`TO_PERSON:`), in the host's language (`strings.ts`, English, French, Spanish).

The door reads the guide's title. The build fails if `GuideApp.tsx` stops writing the two
title templates it parses (`guideTitleGuard`).

## After an upstream merge

1. `npm run build:cartridge`. It must end with no error.
2. `npm run test:cartridge`. All green.
3. Open KALLAX, go through tools, parts and two steps.
4. Search `BILLY`, open Browse, open the workshop.
