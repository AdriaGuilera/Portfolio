# Adrià Guilera Bernabé - Portfolio

A portfolio set in a koi pond seen from above. The pond is a three.js scene rendered through a square-mosaic shader: click the water to drop food and the koi swim over to eat it, and a koi that the cursor comes close to follows it for a few seconds.

## How it works

- `lib/content.ts` holds every piece of text on the site. Edit this file to change the content.
- `lib/pond.js` builds and animates the pond (koi, lily pads, ripples, food) and draws it to a single `<canvas>`.
- `components/Pond.tsx` mounts the pond. The home page shows it full screen; every other page shows a short strip of it above the content.
- `app/` has one route per page: `/`, `/work`, `/projects`, `/blog` and `/contact`. The `cv` link in the navigation downloads the PDF in `public/`.

All content is real HTML and the canvas is decorative. `prefers-reduced-motion` shows the pond as a still image.

## Running

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm start
```

The Docker image serves the standalone build on port 3005.
