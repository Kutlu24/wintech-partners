/* Winterthur Tech Partners — site assistant.
   A small, rule-based FAQ bot. Deliberately local and dependency-free:
   the site ships a strict Content-Security-Policy (script-src 'self',
   connect-src 'self'), so no remote model and no third-party widget is
   possible — and none is needed for routing a visitor to the right page
   or channel. It doubles as a working demo of the "Kundenservice-Chatbot"
   service offered on the services page.
   Language follows the <html lang> attribute (de | fr | en). */
(function () {
    "use strict";

    if (document.getElementById("wtp-chat-root")) return;

    var lang = (document.documentElement.lang || "de").slice(0, 2).toLowerCase();

    /* ------------------------------------------------------------------
       Strings
       ------------------------------------------------------------------ */
    var S = {
        de: {
            open: "Assistent öffnen",
            close: "Assistent schliessen",
            title: "WinTech Assistent",
            status: "Antwortet in der Regel sofort",
            placeholder: "Ihre Frage eingeben …",
            send: "Senden",
            greet: "Grüezi! Ich bin der WinTech-Assistent. Ich beantworte Fragen zu Leistungen, Preisen und Erreichbarkeit – und bringe Sie zum richtigen Kanal.",
            fallback: "Dazu habe ich leider keine Angabe. Versuchen Sie ein Stichwort – oder schreiben Sie mir direkt.",
            thinking: "Schreibt …",
            you: "Sie",
            bot: "Assistent",
            channels: "Sie erreichen mich unter +41 77 205 38 34 – auch per WhatsApp, Signal und Telegram über dieselbe Nummer – oder per E-Mail.",
            chips: {
                services: "Leistungen",
                cyber: "Cybersicherheit",
                onsite: "Technik vor Ort",
                webdesign: "Webdesign",
                chatbotService: "Chatbot für meine Firma",
                pricing: "Preise",
                contact: "Kontakt",
                area: "Einsatzgebiet",
                about: "Über mich"
            },
            answers: {
                greeting: "Grüezi! Womit kann ich helfen?",
                services: "Acht Leistungen: IT-Support & Wartung, Cybersicherheit, Technik vor Ort, Webdesign, Geräte-Lifecycle-Management, Digitalisierung & Automatisierung, Kundenservice-Chatbot und strategische Beratung – für KMU, Arztpraxen und Anwaltskanzleien.",
                cyber: "Enthalten sind Virenschutz & Endpoint-Security, Firewall-Konfiguration, Datensicherung und Datenverschlüsselung. Dazu eine Bestandsaufnahme Ihrer Infrastruktur. Die Bedrohung ist real – und wächst.",
                onsite: "Technik vor Ort: Internetanschluss & Router, WLAN & Mesh, Kabel-TV & Streaming, Netzwerkverkabelung, Homeoffice-Arbeitsplätze und Smart-Home – bei Ihnen zu Hause oder im Betrieb.",
                webdesign: "Webdesign & Website-Wartung: individuelle Websites, die auf dem Handy gut aussehen, plus Hosting, Domain, SSL, Updates und laufende Betreuung.",
                chatbotService: "Für Ihre Website und Messenger: Assistent mit Wissensdatenbank und FAQ, Triage und Lead-Erfassung, Datenschutz by Design. So wie ich hier – nur mit Ihrem Inhalt.",
                pricing: "Die Erstberatung ist kostenlos und unverbindlich. Danach ein fixes Angebot – ohne Abo-Falle. Schreiben Sie mir, was ansteht.",
                area: "Winterthur und Umgebung, Schweiz.",
                about: "Über 15 Jahre IT-Erfahrung in strategischen und regulierten Umfeldern. Ein echter Partner: verlässlich, strategisch, vor Ort.",
                hours: "Ich melde mich werktags in der Regel innerhalb weniger Stunden. Schreiben Sie jederzeit – die Nachricht erreicht mich auch abends.",
                thanks: "Gerne. Wenn noch etwas offen ist, fragen Sie einfach.",
                bye: "Bis dann. Schreiben Sie, wenn Sie bereit sind.",
                phone: "Sie erreichen mich unter +41 77 205 38 34. Dieselbe Nummer funktioniert auch über WhatsApp, Signal und Telegram – schreiben Sie mir dort einfach."
            }
        },
        fr: {
            open: "Ouvrir l’assistant",
            close: "Fermer l’assistant",
            title: "Assistant WinTech",
            status: "Répond en général instantanément",
            placeholder: "Posez votre question …",
            send: "Envoyer",
            greet: "Bonjour ! Je suis l’assistant WinTech. Je réponds aux questions sur les prestations, les tarifs et la façon de vous joindre à moi.",
            fallback: "Je n’ai pas cette information. Essayez un mot-clé – ou écrivez-moi directement.",
            thinking: "Écrit …",
            you: "Vous",
            bot: "Assistant",
            channels: "Vous pouvez m’appeler au +41 77 205 38 34 – ce même numéro fonctionne aussi sur WhatsApp, Signal et Telegram – ou m’écrire par e-mail.",
            chips: {
                services: "Prestations",
                cyber: "Cybersécurité",
                onsite: "Services sur site",
                webdesign: "Conception web",
                chatbotService: "Un chatbot pour mon entreprise",
                pricing: "Tarifs",
                contact: "Contact",
                area: "Zone d’intervention",
                about: "À propos"
            },
            answers: {
                greeting: "Bonjour ! Que puis-je faire pour vous ?",
                services: "Huit prestations : support informatique & maintenance, cybersécurité, services sur site, conception web, gestion du cycle de vie des appareils, digitalisation & automatisation, chatbot de service client et conseil stratégique – pour les PME, cabinets médicaux et juridiques.",
                cyber: "Compris : antivirus & endpoint security, configuration du firewall, sauvegarde des données et chiffrement. Plus un état des lieux de votre infrastructure. La menace est réelle – et elle augmente.",
                onsite: "Services sur site : connexion internet & routeur, Wi-Fi & réseau maillé, TV par câble & streaming, câblage réseau, postes de travail à domicile et maison connectée – chez vous ou en entreprise.",
                webdesign: "Conception web & maintenance : sites web sur mesure, adaptés au mobile, plus hébergement, nom de domaine, SSL, mises à jour et entretien continu.",
                chatbotService: "Pour votre site et vos messageries : assistant avec base de connaissances et FAQ, tri et capture de prospects, protection des données by design. Comme moi ici – mais avec votre contenu.",
                pricing: "Le premier entretien est gratuit et sans engagement. Ensuite un devis fixe – sans abonnement piège. Écrivez-moi ce qu’il y a à faire.",
                area: "Winterthur et sa région, Suisse.",
                about: "Plus de 15 ans d’expérience informatique dans des environnements stratégiques et réglementés. Un vrai partenaire : fiable, stratégique, sur place.",
                hours: "Je réponds en général en quelques heures les jours ouvrables. Écrivez quand vous voulez – le message m’arrive aussi le soir.",
                thanks: "Avec plaisir. S’il reste une question, demandez simplement.",
                bye: "À bientôt. Écrivez-moi quand vous êtes prêt.",
                phone: "Vous pouvez m’appeler au +41 77 205 38 34. Ce même numéro fonctionne aussi sur WhatsApp, Signal et Telegram – écrivez-moi simplement là-bas."
            }
        },
        en: {
            open: "Open assistant",
            close: "Close assistant",
            title: "WinTech Assistant",
            status: "Usually replies instantly",
            placeholder: "Type your question …",
            send: "Send",
            greet: "Hello! I’m the WinTech assistant. I can answer questions about services, pricing and how to reach us.",
            fallback: "I don’t have that information. Try a keyword – or write to us directly.",
            thinking: "Typing …",
            you: "You",
            bot: "Assistant",
            channels: "Call us on +41 77 205 38 34 – the same number also works on WhatsApp, Signal and Telegram – or send an email.",
            chips: {
                services: "Services",
                cyber: "Cybersecurity",
                onsite: "On-site services",
                webdesign: "Web design",
                chatbotService: "A chatbot for my business",
                pricing: "Pricing",
                contact: "Contact",
                area: "Service area",
                about: "About"
            },
            answers: {
                greeting: "Hello! How can I help?",
                services: "Eight services: IT support & maintenance, cybersecurity, on-site services, web design, device lifecycle management, digitalisation & automation, customer-service chatbot and strategic consulting – for SMEs, medical and law practices.",
                cyber: "Included: antivirus & endpoint security, firewall configuration, data backup and encryption. Plus a review of your infrastructure. The threat is real – and growing.",
                onsite: "On-site services: internet connection & router, Wi-Fi & mesh, cable TV & streaming, network cabling, home-office workspaces and smart home – at your home or business.",
                webdesign: "Web design & website maintenance: bespoke, mobile-friendly websites plus hosting, domain, SSL, updates and ongoing care.",
                chatbotService: "For your website and messengers: an assistant with a knowledge base and FAQ, triage and lead capture, privacy by design. like this one here – only with your content.",
                pricing: "The first consultation is free and without obligation. After that a fixed quote – no subscription trap. Write to us about what’s needed.",
                area: "Winterthur and the surrounding area, Switzerland.",
                about: "Over 15 years of IT experience in strategic and regulated environments. A real partner: reliable, strategic, on site.",
                hours: "We usually reply within a few hours on working days. Write any time – your message reaches us in the evening too.",
                thanks: "Happy to help. If anything is still open, just ask.",
                bye: "Talk soon. Write when you’re ready.",
                phone: "Call us on +41 77 205 38 34. The same number also works on WhatsApp, Signal and Telegram – just write to us there."
            }
        }
    };

    var T = S[lang] || S.de;
    var EMAIL = "wintechpartners@gmail.com";

    /* ------------------------------------------------------------------
       Intent matching — keyword lists, scored by hits.
       Normalised so "ueber"/"über", "securite"/"sécurité" etc. all match.
       ------------------------------------------------------------------ */
    function norm(s) {
        return s.toLowerCase()
            .replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss")
            .replace(/é/g, "e").replace(/è/g, "e").replace(/ê/g, "e").replace(/ë/g, "e")
            .replace(/à/g, "a").replace(/â/g, "a").replace(/ç/g, "c")
            .replace(/ô/g, "o").replace(/û/g, "u").replace(/ù/g, "u")
            .replace(/î/g, "i").replace(/ï/g, "i");
    }

    var INTENTS = [
        {
            id: "phone",
            /* asked before "contact" so a phone question gets the honest answer */
            kw: ["anruf", "telefon", "phone", "appel", "appeler", "rufen",
                 "call", "num", "number", "t phone"]
        },
        {
            id: "contact",
            kw: ["kontakt", "kontaktier", "erreichen", "contact", "contactez", "joindre",
                 "whatsapp", "signal", "telegram", "e mail", "email", "mail", "schreiben",
                 "ecrit", "write", "kanal", "channel", "moyen", "reach", "direct", "direkt"]
        },
        {
            id: "cyber",
            kw: ["cyber", "sicherheit", "securite", "security", "virus", "malware", "firewall",
                 "backup", "sicherung", "sauvegarde", "verschluessel", "chiffre", "phishing",
                 "ransomware", "endpoint", "schutz", "protection", "datenverlust", "attack",
                 "secure", "secur", "pirat", "hack"]
        },
        {
            id: "onsite",
            kw: ["vor ort", "on site", "sur site", "kabel", "cable", "tv", "fernseh",
                 "streaming", "router", "wlan", "wifi", "wi fi", "mesh", "internet",
                 "modem", "anschluss", "connection", "cable tv", "smart home",
                 "maison", "home office", "homeoffice", "bureau", "arbeitsplatz",
                 "steckdose", "koax", "koaxial", "satellit", "satellite", "antenne",
                 "wohnung", "haushalt", "immo", "technicien", "installateur"]
        },
        {
            id: "webdesign",
            kw: ["webdesign", "web design", "website", "webseite", "web seite", "homepage",
                 "page web", "site web", "site internet", "internetseite", "wordpress",
                 "wix", "squarespace", "shopify", "hosting", "domain", "ssl", "redesign",
                 "relaunch", "responsive", "seo", "mobile friendly", "layout", "gestaltung",
                 "refonte", "creation de site", "création de site", "website wartung",
                 "website pflege", "site web maintenance", "website maintenance"]
        },
        {
            id: "chatbotService",
            kw: ["chatbot", "bot", "assistant", "faq", "wissensdatenbank", "knowledge base",
                 "triage", "lead", "messenger bot", "whatsapp bot", "virtual assistant", "automat"]
        },
        {
            id: "pricing",
            kw: ["preis", "preise", "kosten", "kostet", "kostenlos", "gratis", "beratung kostenlos",
                 "tarif", "prix", "cout", "gratuit", "price", "pricing", "cost",
                 "how much", "quote", "angebot", "devis", "budget", "abo", "subscription",
                 "free", "worth", "kondition"]
        },
        {
            id: "area",
            kw: ["winterthur", "umgebung", "standort", "einsatzgebiet", "gebiet", "wo arbeit",
                 "zone", "intervention", "region", "ou etes", "where", "location", "swiss",
                 "schweiz", "suisse", "zurich", "zürich", "near", "nahe", "proche", "around",
                 "kanton", "arbeit", "basier", "sitz"]
        },
        {
            id: "hours",
            kw: ["erreichbar", "offnungs", "offnung", "wann", "zeit", "horaires", "disponib",
                 "quand", "hours", "available", "availability", "when", "opening", "response time",
                 "antwortzeit", "delai", "sofort", "schnell", "asap", "today", "heute", "tomorrow",
                 "weekend", "wochenende", "samedi", "sunday", "sonntag", "saturday", "weekday",
                 "arbeitstag", "business hours", "office hours", "reopen", "urgence", "urgent",
                 "reply", "antwort", "react", "reagier", "notfall", "emergency", "urgence",
                 "dienst", "service client", "support hours"]
        },
        {
            id: "about",
            kw: ["uber", "ueber", "wer", "hintergrund", "erfahrung", "about", "qui etes",
                 "experience", "background", "who are", "who is", "team", "unternehmen",
                 "entreprise", "company", "geschichte", "histor", "profil", "story", "qualif"]
        },
        {
            id: "services",
            kw: ["leistung", "service", "angebot", "biet", "que faites",
                 "what do you", "offering", "support", "wartung", "maintenance", "it support",
                 "digitalisierung", "digitalisation", "automatis", "consulting", "beratung",
                 "conseil", "consult", "lifecycle", "gerate", "appareil", "angebot", "offer",
                 "konnen", "prestation", "solution", "losung", "propos", "deliver", "scope",
                 "fix", "repair", "reparier", "repair", "computer", "pc", "laptop", "netzwerk",
                 "network", "server", "drucker", "printer", "install", "einricht", "set up"]
        },
        {
            id: "thanks",
            kw: ["danke", "merci", "thanks", "thank", "grand merci", "vielen dank"]
        },
        {
            id: "bye",
            kw: ["tschuss", "tschüss", "wiedersehen", "bye", "goodbye", "au revoir",
                 "a bientot", "a bientôt", "see you", "ciao", "bis bald", "good day"]
        },
        {
            id: "greeting",
            kw: ["hallo", "hi", "hey", "gruezi", "grüezi", "guten tag", "guten morgen",
                 "bonjour", "salut", "hello", "servus", "greetings", "tag"]
        }
    ];

    var ORDER = ["phone", "contact", "cyber", "onsite", "webdesign", "chatbotService", "pricing", "area",
                 "hours", "about", "services", "thanks", "bye", "greeting"];

    function wordsOf(text) {
        return norm(text).replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim().split(" ");
    }

    /* One word matches one keyword fragment if either is a prefix of the
       other, so "bietet" hits "biet" and "erreiche" hits "erreichen".
       Fragments and words of 3 characters or less must match exactly, and
       the reverse direction only fires when the word nearly covers the
       fragment — otherwise a stray "what" would hit inside "whatsapp". */
    function wordHit(w, frag) {
        if (w === frag) return true;
        if (w.length <= 3 || frag.length <= 3) return false;
        if (w.indexOf(frag) === 0) return true;              /* keyword is a prefix of the word */
        return frag.indexOf(w) === 0 && frag.length - w.length <= 2;
    }

    /* A keyword hits if every one of its words matches a consecutive word
       in the input — so "qui etes" matches "Qui êtes-vous?" and the
       single-word keywords behave as before. */
    function hit(words, kw) {
        var parts = kw.split(" ");
        if (parts.length === 1) {
            for (var i = 0; i < words.length; i++) {
                if (wordHit(words[i], parts[0])) return true;
            }
            return false;
        }
        for (var s = 0; s + parts.length <= words.length; s++) {
            var ok = true;
            for (var k = 0; k < parts.length; k++) {
                if (!wordHit(words[s + k], parts[k])) { ok = false; break; }
            }
            if (ok) return true;
        }
        return false;
    }

    /* Multi-word phrases and long keywords are stronger signals than short
       stems: "how much" should beat a stray "firewall", and "chatbot"
       should beat the generic "offer". */
    function weight(kw) {
        var bare = kw.replace(/ /g, "");
        if (kw.indexOf(" ") !== -1) return 3;
        return bare.length >= 6 ? 2 : 1;
    }

    function match(text) {
        var words = wordsOf(text);
        var best = null, bestScore = 0;
        for (var i = 0; i < INTENTS.length; i++) {
            var it = INTENTS[i], score = 0;
            for (var j = 0; j < it.kw.length; j++) {
                if (hit(words, it.kw[j])) score += weight(it.kw[j]);
            }
            if (score > bestScore) { bestScore = score; best = it.id; }
        }
        return bestScore ? best : "fallback";
    }

    /* Intents whose answer should end with the contact-channel block. */
    var CHANNEL_INTENTS = { contact: 1, phone: 1, pricing: 1, hours: 1, fallback: 1 };

    /* ------------------------------------------------------------------
       DOM
       ------------------------------------------------------------------ */
    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    var ICON_CHAT = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
    var ICON_SEND = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    var ICON_CLOSE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    var root = el("div", "wtp-chat");
    root.id = "wtp-chat-root";

    /* launcher */
    var launcher = el("button", "wtp-chat-launcher");
    launcher.type = "button";
    launcher.setAttribute("aria-label", T.open);
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-controls", "wtp-chat-panel");
    launcher.innerHTML = ICON_CHAT;

    /* panel */
    var panel = el("div", "wtp-chat-panel");
    panel.id = "wtp-chat-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", T.title);
    panel.setAttribute("aria-modal", "false");
    panel.hidden = true;

    var head = el("div", "wtp-chat-head");
    var headText = el("div", "wtp-chat-head-text");
    headText.appendChild(el("p", "wtp-chat-title", T.title));
    headText.appendChild(el("p", "wtp-chat-status", T.status));
    var headClose = el("button", "wtp-chat-iconbtn");
    headClose.type = "button";
    headClose.setAttribute("aria-label", T.close);
    headClose.innerHTML = ICON_CLOSE;
    head.appendChild(headText);
    head.appendChild(headClose);

    var log = el("div", "wtp-chat-log");
    log.setAttribute("role", "log");
    log.setAttribute("aria-live", "polite");
    log.setAttribute("aria-relevant", "additions");

    var form = el("form", "wtp-chat-form");
    var input = el("input", "wtp-chat-input");
    input.type = "text";
    input.placeholder = T.placeholder;
    input.setAttribute("aria-label", T.placeholder);
    input.setAttribute("autocomplete", "off");
    input.setAttribute("maxlength", "300");
    var send = el("button", "wtp-chat-send");
    send.type = "submit";
    send.setAttribute("aria-label", T.send);
    send.innerHTML = ICON_SEND;
    form.appendChild(input);
    form.appendChild(send);

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(form);
    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);

    /* ------------------------------------------------------------------
       Conversation
       ------------------------------------------------------------------ */
    var reduced = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var greeted = false;
    var lastFocus = null;

    function scrollDown() { log.scrollTop = log.scrollHeight; }

    function addUser(text) {
        var row = el("div", "wtp-chat-row is-user");
        var b = el("p", "wtp-chat-bubble", text);
        b.setAttribute("aria-label", T.you + ": " + text);
        row.appendChild(b);
        log.appendChild(row);
        scrollDown();
    }

    function channelLinks() {
        var wrap = el("div", "wtp-chat-channels");
        var links = [
            { label: "WhatsApp", href: "https://wa.me/41772053834", icon: "whatsapp" },
            { label: "Signal", href: "https://signal.me/#p/41772053834", icon: "signal" },
            { label: "Telegram", href: "https://t.me/+41772053834", icon: "telegram" },
            { label: "E-Mail", href: "mailto:" + EMAIL, icon: "email" }
        ];
        for (var i = 0; i < links.length; i++) {
            var a = el("a", "wtp-chat-channel");
            a.href = links[i].href;
            a.textContent = links[i].label;
            if (links[i].icon !== "email") {
                a.target = "_blank";
                a.rel = "noopener";
            }
            wrap.appendChild(a);
        }
        return wrap;
    }

    function addBot(text, withChannels, chips) {
        var row = el("div", "wtp-chat-row");
        var b = el("p", "wtp-chat-bubble", text);
        b.setAttribute("aria-label", T.bot + ": " + text);
        row.appendChild(b);
        if (withChannels) {
            row.appendChild(el("p", "wtp-chat-note", T.channels));
            row.appendChild(channelLinks());
        }
        if (chips && chips.length) {
            var bar = el("div", "wtp-chat-chips");
            for (var i = 0; i < chips.length; i++) {
                (function (c) {
                    var btn = el("button", "wtp-chat-chip", c.label);
                    btn.type = "button";
                    btn.addEventListener("click", function () { submit(c.ask); });
                    bar.appendChild(btn);
                })(chips[i]);
            }
            row.appendChild(bar);
        }
        log.appendChild(row);
        scrollDown();
    }

    function showTyping() {
        var row = el("div", "wtp-chat-row is-typing");
        var d = el("div", "wtp-chat-typing");
        d.setAttribute("aria-label", T.thinking);
        for (var i = 0; i < 3; i++) d.appendChild(el("span"));
        row.appendChild(d);
        log.appendChild(row);
        scrollDown();
        return row;
    }

    var CHIP_SETS = {
        services: [
            { label: T.chips.cyber, ask: T.chips.cyber },
            { label: T.chips.pricing, ask: T.chips.pricing },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        cyber: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.pricing, ask: T.chips.pricing },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        onsite: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.pricing, ask: T.chips.pricing },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        webdesign: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.pricing, ask: T.chips.pricing },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        chatbotService: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        pricing: [
            { label: T.chips.contact, ask: T.chips.contact },
            { label: T.chips.services, ask: T.chips.services }
        ],
        about: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        area: [
            { label: T.chips.contact, ask: T.chips.contact },
            { label: T.chips.services, ask: T.chips.services }
        ],
        hours: [
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        contact: [
            { label: T.chips.services, ask: T.chips.services }
        ],
        phone: [
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        greeting: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.pricing, ask: T.chips.pricing },
            { label: T.chips.contact, ask: T.chips.contact }
        ],
        fallback: [
            { label: T.chips.services, ask: T.chips.services },
            { label: T.chips.pricing, ask: T.chips.pricing },
            { label: T.chips.contact, ask: T.chips.contact }
        ]
    };

    var ANSWER_KEY = {
        phone: "phone",
        contact: "channels",
        cyber: "cyber",
        onsite: "onsite",
        webdesign: "webdesign",
        chatbotService: "chatbotService",
        pricing: "pricing",
        area: "area",
        hours: "hours",
        about: "about",
        services: "services",
        thanks: "thanks",
        bye: "bye",
        greeting: "greeting",
        fallback: "fallback"
    };

    function answerFor(intent) {
        if (intent === "contact") return T.channels;
        var key = ANSWER_KEY[intent];
        return T.answers[key] || T.answers.fallback;
    }

    function submit(text) {
        text = (text || "").replace(/^\s+|\s+$/g, "");
        if (!text) return;
        addUser(text);

        var intent = match(text);
        var withChannels = !!CHANNEL_INTENTS[intent];

        if (reduced) {
            addBot(answerFor(intent), withChannels, CHIP_SETS[intent]);
            return;
        }
        var typing = showTyping();
        setTimeout(function () {
            if (typing.parentNode) typing.parentNode.removeChild(typing);
            addBot(answerFor(intent), withChannels, CHIP_SETS[intent]);
        }, 420);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        submit(input.value);
        input.value = "";
        input.focus();
    });

    /* ------------------------------------------------------------------
       Open / close
       ------------------------------------------------------------------ */
    function setOpen(open) {
        panel.hidden = !open;
        launcher.setAttribute("aria-expanded", open ? "true" : "false");
        launcher.setAttribute("aria-label", open ? T.close : T.open);
        root.classList.toggle("is-open", open);
        if (open) {
            lastFocus = document.activeElement;
            if (!greeted) {
                greeted = true;
                addBot(T.greet, false, CHIP_SETS.greeting);
            }
            input.focus();
        } else if (lastFocus && lastFocus.focus) {
            lastFocus.focus();
        }
    }

    launcher.addEventListener("click", function () {
        setOpen(panel.hidden);
    });
    headClose.addEventListener("click", function () { setOpen(false); });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !panel.hidden) setOpen(false);
    });

    /* Dismiss on outside click, same pattern as the nav menu. */
    document.addEventListener("click", function (e) {
        if (panel.hidden) return;
        if (!e.target.closest(".wtp-chat")) setOpen(false);
    });
})();
