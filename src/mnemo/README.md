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
```

## What stands in for Next

| The site uses | The cartridge uses |
|---|---|
| `next/link`, `next/navigation` | `shims/`: the route lives in the hash, `index.html#/build/kallax-2x2?step=3` |
| `/build/[slug]` and the other pages | `main.tsx` reads the hash and renders the same components |
| the header's live GitHub star count (an async server component) | `SiteHeader.tsx`, the same header with a plain GitHub link |
| `/voice/…` and `/og/…` from the domain root | rewritten to `./voice/…` and `./og/…` at build time. The build fails if those paths move upstream |
| `next/font` | `mnemo.css` names the two font variables |
| `/api/*` on the visitor's Together AI key | answers `{ "error": "key" }`, as the site does for a visitor with no key |
| Vercel Analytics | nothing is sent |

## After an upstream merge

1. `npm run build:cartridge`. It must end with no error.
2. Open KALLAX, go through tools, parts and two steps.
3. Search `BILLY`, open Browse, open the workshop.
