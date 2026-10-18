# Winterthur Tech Partners — Website-Konzept

Ein 7-seitiges Website-Konzept für **Winterthur Tech Partners**, eine geplante IT-Support- und Cybersicherheits-Beratung für KMU, Arztpraxen und Anwaltskanzleien in Winterthur.

🇬🇧 English version: [README.md](README.md)

## Was es ist

Ein statisches Website-Mockup: Startseite, Services, Über uns, Cybersecurity, Technik vor Ort, Webdesign und Kontakt, aufgebaut um ein Drei-Säulen-Angebot (IT-Support & Wartung, Cybersicherheit, strategische Beratung/digitale Transformation). Der Inhalt folgt dem ursprünglichen Projektbriefing für das Geschäftskonzept.

Echte Kontaktdaten (E-Mail, WhatsApp, Signal, Telegram unter derselben Nummer `+41 77 205 38 34` — die Nummer erscheint nur in diesen Messenger-Links) sind eingetragen. Header, Kontaktseite und Footer bieten diese vier Kanäle; telefonisch ist keine Erreichbarkeit vorgesehen. Die Kontaktseite und der Website-Assistent verweisen auf die Kanäle.

Auf allen Seiten liegt ein kleiner Website-Assistent (`chatbot.js`): ein regelbasieter FAQ-Bot auf DE/FR/EN, der Fragen zu Leistungen, Preisen, Cybersicherheit und Erreichbarkeit beantwortet und die Besucher zu diesen Kontakt-Kanälen führt. Er ist bewusst lokal und ohne Fremddependencies — die Website liefert eine strikte Content-Security-Policy (`script-src 'self'`), weshalb weder ein entferntes Modell noch ein Drittanbieter-Widget möglich sind, und keines nötig ist. Er ist zugleich ein funktionierender Demo-Beitrag zum Angebot „Kundenservice-Chatbot“ auf der Services-Seite.

## Sprachen

Die Website erscheint auf Deutsch (Standard), Französisch und Englisch: `de/`, `fr/`, `en/`, jeweils mit denselben sieben Seiten. Die Domain ohne Pfad und die alten Root-URLs leiten auf `/de/` weiter (`routes` in `render.yaml`; die `index.html` im Root ist ein Meta-Refresh-Fallback). Alle Seiten haben `hreflang`-Alternativen und einen DE/FR/EN-Umschalter in der Navigation; `sitemap.xml` listet alle 21 URLs mit Alternativen. Sprachabhängige Texte für JavaScript (Menü-Labels, Formularmeldungen) stehen als `data-*`-Attribute im HTML, `main.js` ist daher gemeinsam. Deutsch folgt der Schweizer Schreibweise (kein ß).

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
