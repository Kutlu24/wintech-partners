# Winterthur Tech Partners — Business Website Concept

A 5-page marketing website concept for **Winterthur Tech Partners**, a proposed IT-support and cybersecurity consulting practice for small and medium businesses (SMEs), medical practices, and law firms in Winterthur, Switzerland.

🇩🇪 German version: [README.de.md](README.de.md)

## What it is

A static business website mockup: home, services, about, cybersecurity, and contact pages, built around a three-pillar service offering (IT support & maintenance, cybersecurity, strategic/digital-transformation consulting). The content follows the original project brief for the business concept.

Contact details are filled in: phone `+41 77 205 38 34` (a `tel:` link in the header, contact page and footer), email `wintechpartners@gmail.com`, and click-to-chat links for WhatsApp, Signal and Telegram on the contact page.

## Research projects

The research tools (Worldora, Worldora Intelligence, Global Monitor) live in the Geo Analysis Hub: https://global-monitor-render-relay.onrender.com/hub/ . The home page cards and `/{de,fr,en}/research.html` forward there (Render redirect routes; `research.html` is only a meta-refresh fallback and is not published).

## Languages

The site is published in German (default), French and English: `de/`, `fr/`, `en/`, each with the same five pages. The bare domain and the old root URLs redirect to `/de/` (see `routes` in `render.yaml`; root `index.html` is a meta-refresh fallback). Pages carry `hreflang` alternates and a DE/FR/EN switcher in the navigation; `sitemap.xml` lists all 15 URLs with alternates. Per-language strings that JavaScript needs (menu labels, contact-form messages) are `data-*` attributes in the HTML, so `main.js` is shared. German uses Swiss spelling (no ß).

## Tech stack

Plain HTML and CSS, no framework, no build step. Icons via [Font Awesome](https://fontawesome.com/) (CDN).

## Running it

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

## History

`archive/` holds two earlier drafts of this same site concept, kept for reference:

- `archive/v1-senioren-hilfe-draft/` — an earlier single-page draft (originally in a folder named "Senioren Hilfe", a leftover/misleading name — the content is the same IT-consulting pitch, not senior-specific).
- `archive/v2-single-page-draft/` — a second single-page draft, closer to but still simpler than the current 5-page site.

This repository's top-level pages are the most complete version.
