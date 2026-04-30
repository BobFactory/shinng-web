# Shinng Web

Static marketing and compliance website for Shinng, the manual expense tracker Android app.

## Related Repositories

- `BobFactory/shinng`: Flutter mobile app
- `BobFactory/shinng-web`: marketing website, privacy policy, data deletion page, and Netlify deploy bundle

## Local Development

Install dependencies:

```bash
npm install
```

Watch Tailwind styles while editing:

```bash
npm run dev
```

Open `index.html` through a local static server when testing deploy paths.

## Build

Generate the Netlify-ready static site:

```bash
npm run build:site
```

The deployable output is generated in `build/`.

## Netlify

For Git-based Netlify deploys:

- Build command: `npm run build:site`
- Publish directory: `build`

The current production URL is:

```text
https://shinng.netlify.app
```

## Pages

- `/` - product landing page
- `/privacy.html` - privacy policy
- `/data-deletion.html` - account and data deletion instructions
