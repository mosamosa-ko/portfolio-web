# Task: SEO setup for my English portfolio site

## Context

My portfolio is now live at:

https://koyamasaki.com

The visible website should stay mostly English.
I do not want Japanese text to appear prominently in the UI.

However, I want the site to be discoverable by both English and Japanese search queries.

## Goal

Set up basic SEO for a Next.js App Router portfolio site.

The public-facing UI should remain English and minimal.
Japanese name variants should be included only where appropriate for SEO, metadata, structured data, or a very small hidden/low-visibility profile reference.

## Requirements

### 1. Metadata

Add or update metadata in the appropriate Next.js App Router location, likely `app/layout.tsx`.

Use:

title:
Ko Yamasaki | Portfolio

description:
Portfolio of Ko Yamasaki. App development, interactive web experiences, graph AI research, and product experiments.

keywords:
Ko Yamasaki, Kou Yamasaki, Koyamasaki, 山崎康, 山崎こう,やまさきこう, portfolio, app development, graph AI, web development, Terraplot

canonical:
https://koyamasaki.com

Open Graph:
- title: Ko Yamasaki | Portfolio
- description: App development, interactive web experiences, graph AI research, and product experiments.
- url: https://koyamasaki.com
- type: website
- siteName: Ko Yamasaki Portfolio

Twitter:
- card: summary_large_image
- title: Ko Yamasaki | Portfolio
- description: App development, interactive web experiences, graph AI research, and product experiments.

### 2. Japanese SEO without changing the visual design too much

Keep the visible UI English.

Do NOT translate the whole site into Japanese.

But include Japanese name variants in a subtle way, such as:

- metadata keywords
- JSON-LD alternateName
- a small profile line if it does not harm the design:
  Ko Yamasaki / 山崎康

If adding visible Japanese text makes the design worse, keep Japanese only in metadata and structured data.

### 3. robots.txt

Create `app/robots.ts` or `app/robots.txt`.

Allow all crawlers.

Include sitemap:

https://koyamasaki.com/sitemap.xml

### 4. sitemap.xml

Create `app/sitemap.ts`.

Include at least:

- https://koyamasaki.com

If there are real routes such as `/projects`, `/about`, `/terraplot`, include them too.
Do not include hash-only sections like `/#projects` unless the site actually has separate routes.

### 5. Structured data

Add JSON-LD for a personal portfolio.

Use schema.org Person and WebSite.

Include:
- name: Ko Yamasaki
- alternateName: ["Kou Yamasaki", "Koyamasaki", "山崎康", "山崎こう","やまさきこう"]
- url: https://koyamasaki.com
- sameAs: GitHub or X links if they already exist in the site

Do not invent links.

### 6. Check noindex

Make sure production is indexable.

Check:
- metadata robots
- `robots.txt`
- `next.config`
- `vercel.json`
- headers

There must be no `noindex` on production.

### 7. Build check

Run:

npm run build

Fix any errors.

## Output

After finishing, report:
- files changed
- exact SEO settings added
- whether `robots.txt` and `sitemap.xml` are available
- whether production should be indexable