# LEHO website

The Ladakh Environment and Health Organization website is built with Next.js, React, and TypeScript.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Tender metadata database

Tender documents are stored in Vercel Blob and their submission dates and Blob references are stored in Neon through Drizzle.

After configuring `DATABASE_URL`, create or update the Neon schema with:

```bash
npm run db:migrate
```

## Production checks

```bash
npm run build
npm start
```

The public pages live under `app/`. Images and tender documents are stored in `public/images/`.
