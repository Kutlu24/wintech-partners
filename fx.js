/* Winterthur Tech Partners — visual motion layer (fx)
   Progressive enhancement: every effect below is optional. Without this file
   (or without JavaScript) the page renders exactly as the static CSS defines
   it — the classes that hide anything are only added by this script after the
   corresponding vendor/init has actually succeeded.
   Vendors: Lenis (smooth scrolling) + SplitType (word splitting), both
   self-hosted because the site ships script-src 'self'.
   Everything is skipped when the visitor prefers reduced motion. */
(function () {
    "use strict";

    var root = document.documentElement;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasLenis = typeof window.Lenis === "function";
    var hasSplit = typeof window.SplitType === "function";
    var hasIO = "IntersectionObserver" in window;

    /* ── 1. Smooth scrolling (Lenis) ─────────────────────────────────
       allowNestedScroll keeps the chat log (and any other scrollable
       child) scrolling under the wheel instead of scrolling the page. */
    var lenis = null;
    if (!reduced && hasLenis) {
        try {
            lenis = new window.Lenis({
                duration: 1.15,
                smoothWheel: true,
                allowNestedScroll: true
            });
            (function raf(time) {
                lenis.raf(time);
                window.requestAnimationFrame(raf);
            })(window.performance.now());
            root.classList.add("lenis-on");
        } catch (err) {
            lenis = null;
        }
    }

    /* In-page anchors: scroll with Lenis while keeping the sticky-header
       offset (main.js keeps --header-h in sync). Without Lenis the browser
       default runs and CSS scroll-margin-top applies. */
    if (lenis) {
        document.addEventListener("click", function (e) {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            var el = e.target;
            if (!el || typeof el.closest !== "function") return;
            var a = el.closest('a[href*="#"]');
            if (!a) return;
            var url;
            try { url = new URL(a.href, window.location.href); } catch (err) { return; }
            if (url.pathname !== window.location.pathname || url.search !== window.location.search) return;
            if (!url.hash) return;
            var target = document.getElementById(url.hash.slice(1));
            if (!target) return;
            e.preventDefault();
            /* push first so the element becomes :target (its scroll-margin-top
               from style.css applies), then scroll WITHOUT a manual offset —
               Lenis reads the target's computed scroll-margin-top itself, so
               an extra offset would double the sticky-header clearance. */
            if (url.hash !== window.location.hash) history.pushState(null, "", url.hash);
            lenis.scrollTo(target, { duration: 1.15 });
        });
    }

    /* ── 2. Scroll reveals ─────────────────────────────────────────────
       Targets are collected first, then html.fx-on is added — so the
       initial hidden state can never end up on the page without an
       observer that reveals it again (plus a safety timeout). */
    if (hasIO && !reduced) {
        var revealSel = [
            ".section-title",
            ".service-card",
            ".value-card",
            ".experience-content",
            ".experience-image",
            ".service-block > h2",
            ".service-block .service-list",
            ".contact-details",
            ".contact-form",
            ".page-header .section-title",
            ".final-cta-section h2",
            ".final-cta-section p",
            ".final-cta-section .cta-buttons",
            ".hero-content > .eyebrow",
            ".hero-content > p",
            ".hero-content > .hero-buttons",
            ".error-page .container > *"
        ].join(",");
        var targets = Array.prototype.slice.call(document.querySelectorAll(revealSel));

        /* stagger cards and other grid children by their position */
        Array.prototype.forEach.call(document.querySelectorAll(".services-grid"), function (grid) {
            Array.prototype.forEach.call(grid.children, function (child, i) {
                child.style.setProperty("--fx-d", Math.min(i, 8) * 75 + "ms");
            });
        });

        /* hero copy enters in sequence: eyebrow → paragraph → buttons
           (the headline runs its own word stagger via SplitType below) */
        var heroSeq = document.querySelectorAll(
            ".hero-content > .eyebrow, .hero-content > p, .hero-content > .hero-buttons"
        );
        Array.prototype.forEach.call(heroSeq, function (el, i) {
            el.style.setProperty("--fx-d", i * 110 + "ms");
        });

        if (targets.length) {
            /* mark first, then arm the hidden state — one synchronous block,
               so a paint can never catch the page with fx-on but no targets */
            targets.forEach(function (t) { t.classList.add("fx-reveal"); });
            root.classList.add("fx-on");
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
            targets.forEach(function (t) { observer.observe(t); });
            /* Note: no blanket reveal-timeout on purpose — a visitor who
               reads the hero for 30s must still get the reveals when they
               scroll down. Elements never intersecting are ones the visitor
               never sees; @media print forces everything visible. */
        }
    }

    /* ── 3. Headline word reveal (SplitType) ───────────────────────────
       Every published page has exactly one <h1>. Words are split in the
       DOM (text content stays identical for copy/paste and screen
       readers) and slide in with a per-word stagger. */
    var h1 = document.querySelector("h1");
    if (h1 && !reduced && hasSplit) {
        try {
            var split = new window.SplitType(h1, { types: "words" });
            var words = split.words || [];
            words.forEach(function (word, i) {
                word.style.setProperty("--fx-d", i * 55 + "ms");
            });
            root.classList.add("fx-split");
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    h1.classList.add("is-in");
                });
            });
        } catch (err) {
            root.classList.remove("fx-split");
        }
    }

    /* ── 4. Scroll-driven details ───────────────────────────────────────
       Reading progress line in the header, shadow once scrolled, and a
       slow parallax drift on the hero circuit texture. */
    var header = document.querySelector(".main-header");
    var circuit = document.querySelector(".hero-circuit");
    var progress = null;
    if (header) {
        progress = document.createElement("div");
        progress.className = "scroll-progress";
        progress.setAttribute("aria-hidden", "true");
        header.appendChild(progress);
    }

    var lastY = -1;
    function onScroll(y) {
        y = Math.round(y) || 0;
        if (y === lastY) return;
        lastY = y;
        if (header) header.classList.toggle("is-scrolled", y > 6);
        if (progress) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
            progress.style.transform = "scaleX(" + p.toFixed(4) + ")";
        }
        if (circuit && !reduced) {
            circuit.style.transform = "translate3d(0," + (y * 0.1).toFixed(1) + "px,0)";
        }
    }

    if (lenis) {
        lenis.on("scroll", function (l) { onScroll(l.animatedScroll || 0); });
    }
    window.addEventListener("scroll", function () { onScroll(window.scrollY); }, { passive: true });
    onScroll(window.scrollY);
})();
