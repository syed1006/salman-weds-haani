# Salman & Hani — Wedding Invitation

A one-page digital wedding invitation built with Astro + GSAP, inspired by the
scroll-story invitation reels — themed after the couple's printed card:
**ivory & mint base, blush-pink panels, antique gold ornament, dusty-rose
lettering**, with rose petals falling gently behind everything.

The experience, in order:

1. **Gate** — "Open Invitation" (personalised per guest, unlocks the nasheed)
2. **Curtain reveal** — blush velvet curtains billow and part under a gold-fringed valance, golden light blooms through
3. **Hero** — swaying chandelier, the couple's names, the date
4. **Dua** — Bismillah + the Tirmidhi 1091 dua printed on the physical card
5. **Invitation** — hosts' wording, groom & bride cards with lineage
6. **Save the date** — scratch three gold-foil hearts (canvas) to reveal the date, confetti burst, live countdown
7. **Events & venues** — Nikah / Dawat-e-Nikah / Valima cards with Google Maps links
8. **RSVP** — I'll Be There / Will Miss It → confetti + prefilled WhatsApp message
9. **Compliments & Thank You** — family names and a thank-you envelope

## Run

```sh
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static site → dist/
npm run preview  # serve the built site
```

## Edit content

All names, dates, venues, dua text, RSVP WhatsApp number, and family names live
in one file: **`src/data/wedding.ts`**. Details are from the printed card.

- **Per-guest links** — share `https://yoursite.com/?to=Guest+Name` to show
  "Dear Guest Name & family" on the gate and hero; the guest's name is also
  appended to their WhatsApp RSVP message.
- **Background nasheed** — drop an audio file at `public/audio/nasheed.mp3`
  and the floating music button appears automatically (starts on gate tap).
- **RSVP WhatsApp** — `rsvp.whatsapp` in `wedding.ts` (currently the number
  printed on the card).

## Structure

- `src/pages/index.astro` — assembles the sections
- `src/components/` — Gate, Curtains, MusicToggle, Hero, Dua, Invitation,
  SaveTheDate, Events, Rsvp, Compliments, ThankYou, Ornament
- `src/scripts/interactions.ts` — gate/curtains, scratch cards, countdown,
  RSVP, confetti, music, per-guest personalisation
- `src/scripts/scroll.ts` — GSAP scroll choreography (reduced-motion aware)
- `src/scripts/petals.ts` — falling rose petals canvas
- `src/styles/global.css` — palette and all section styles

Accessibility: with `prefers-reduced-motion` (or JS disabled) all content is
visible with no gate/curtains/confetti, and a "Reveal The Date" button covers
the scratch interaction.

Research behind the original concept lives in `RESEARCH.md`.
