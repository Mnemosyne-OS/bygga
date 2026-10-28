# Manual sweep, 28 October 2026

Every catalog guide is being rebuilt to follow its product's IKEA assembly manual: the same steps in the same order, the same parts, fittings and counts, the build poses the manual shows (lying on its back, upside down) and two people where it shows two. The drawings and words are our own.

**Status: 1,974 of 2,180 guides (90%) are built from their manuals; every guide builds.**

## How it works

- `src/lib/plan/families/<family>.ts`: one file per IKEA family (461 files). Each exports a `Family` (`family.ts`): a `recipe` (parts as boxes and steps, turned into a guide by `src/lib/plan/custom.ts`), a `build` drawn with `PlanBuilder`, and optionally a `row` for sets of frames. A family returns null for a product it doesn't cover, which keeps the old builder for that guide.
- `src/lib/plan/index.ts` asks the family first, then falls back to the kind's builder.
- `npm run families` rewrites `families/index.ts` from the files in the folder.
- New fitting kinds: clip, strap, nut, washer, stud, clamp, angle, foot, cap, spacer; fittings can carry their own name. New part material `glass`, half-disc pieces for split round tops.
- Product data: `src/data/fixes.ts` holds about 90 single-product corrections; `scripts/ikea/classify.ts` now reads corner sofas, bed frames, sofa-beds, office chairs and more from IKEA's measurements.

## Still on the old builder (about 200 guides)

- No assembly manual on IKEA's site, or sold fully assembled (folding chairs, small outdoor tables, drying racks): about 60. The assembled ones should get an honest "unfold it" guide.
- Long manuals not finished yet: SEKTION corner cabinets (10); HEMNES desks, dressing tables, day-beds and others (11); IDANÄS desk and 6 beds; MALM ottoman beds and chest of 6; FÅGELFJÄLLET beds (4); NORDLI storage beds and the chests without a manual page; IVAR cabinets and door units; BROR steel cabinets (5); STOCKHOLM 2025 cabinets (3); LOMMARP, STOREMOLLA, BAGGEBO, FJÄLLBO, FRYKSÅS, TORNVIKEN leftovers; ANKARUDDEN, STÄLL, HOLMERUD, VISTHUS; changing tables (SUNDVIK, ÄLSKVÄRD, SMÅGÖRA, SMÅSTAD); MICKE, BRYTNING, BEKANT, FLISAT, KLEPPSTAD sliding wardrobe; PAX add-on corner unit; UTKLASSNING.
- Sets of frames: PAX joins (the manual uses 2 screws and 2 barrel nuts per joint), PLATSA sets of mixed heights (8), IVAR sections sharing a ladder.

## To do next

- Finish the list above.
- Record voice clips for the new step lines (`npm run voice -- --dry` first for the cost); until then, new lines are spoken live only for visitors with their own key.
- Re-render the share images (`scripts/og/render.mjs`), which still show the old models.
- Page weight: the family files are in the client bundle that every page loads (about 1.5 MB gzipped for that chunk). Load them only on guide pages, or per family.
- `npm run ikea:check` reports 7 guides with a part outside the product's listed size (KLIPPUGGLA, LILLEHEM, MORABO add-on, STORÅ full, VIHALS trundle): their sizes need checking.
