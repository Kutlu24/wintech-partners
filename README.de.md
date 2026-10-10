# Winterthur Tech Partners — Website-Konzept

Ein 5-seitiges Website-Konzept für **Winterthur Tech Partners**, eine geplante IT-Support- und Cybersicherheits-Beratung für KMU, Arztpraxen und Anwaltskanzleien in Winterthur.

🇬🇧 English version: [README.md](README.md)

## Was es ist

Ein statisches Website-Mockup: Startseite, Services, Über uns, Cybersecurity und Kontakt, aufgebaut um ein Drei-Säulen-Angebot (IT-Support & Wartung, Cybersicherheit, strategische Beratung/digitale Transformation). Der Inhalt folgt dem ursprünglichen Projektbriefing für das Geschäftskonzept.

Echte Kontaktdaten (Telefon, E-Mail, Adresse) wurden vor der Veröffentlichung durch `[Platzhalter]`-Text ersetzt — vor einem echten Livegang bitte eigene Daten eintragen.

## Sprachen

Die Website erscheint auf Deutsch (Standard), Französisch und Englisch: `de/`, `fr/`, `en/`, jeweils mit denselben fünf Seiten. Die Domain ohne Pfad und die alten Root-URLs leiten auf `/de/` weiter (`routes` in `render.yaml`; die `index.html` im Root ist ein Meta-Refresh-Fallback). Alle Seiten haben `hreflang`-Alternativen und einen DE/FR/EN-Umschalter in der Navigation; `sitemap.xml` listet alle 15 URLs mit Alternativen. Sprachabhängige Texte für JavaScript (Menü-Labels, Formularmeldungen) stehen als `data-*`-Attribute im HTML, `main.js` ist daher gemeinsam. Deutsch folgt der Schweizer Schreibweise (kein ß).

## Technik

Reines HTML und CSS, kein Framework, kein Build-Prozess. Icons über [Font Awesome](https://fontawesome.com/) (CDN).

## Ausführen

`index.html` im Browser öffnen, oder den Ordner mit einem beliebigen statischen Server bereitstellen:

```bash
npx serve .
```

## Verlauf

`archive/` enthält zwei frühere Entwürfe desselben Website-Konzepts, zur Referenz:

- `archive/v1-senioren-hilfe-draft/` — ein früherer Einzelseiten-Entwurf (ursprünglich in einem Ordner namens „Senioren Hilfe" — ein irreführender Restname; der Inhalt ist derselbe IT-Beratungs-Pitch, nicht seniorenspezifisch).
- `archive/v2-single-page-draft/` — ein zweiter Einzelseiten-Entwurf, näher am aktuellen Stand, aber noch einfacher.

Die Seiten auf oberster Ebene in diesem Repository sind die vollständigste Version.
