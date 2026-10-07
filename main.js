/* Winterthur Tech Partners — navigation toggle + contact form helper.
   External file on purpose: the site ships a strict Content-Security-Policy
   (script-src 'self'), so no inline scripts or event handlers. */
(function () {
    "use strict";

    /* Signal to the stylesheet that JS is available: the menu is only
       collapsed into the toggle panel when this class is present, so the
       links stay reachable without JavaScript. */
    document.documentElement.classList.add("js");

    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");

    function setMenu(open) {
        if (!toggle || !menu) return;
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        menu.classList.toggle("is-open", open);
    }

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            setMenu(toggle.getAttribute("aria-expanded") !== "true");
        });

        /* Close after choosing a page. */
        menu.addEventListener("click", function (e) {
            if (e.target.closest("a")) setMenu(false);
        });

        /* Escape closes, click outside closes. */
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setMenu(false);
        });
        document.addEventListener("click", function (e) {
            if (!menu.classList.contains("is-open")) return;
            if (!e.target.closest(".main-nav")) setMenu(false);
        });

        /* Reset when the layout returns to the wide header. */
        var wide = window.matchMedia("(min-width: 901px)");
        var onChange = function (e) { if (e.matches) setMenu(false); };
        if (wide.addEventListener) wide.addEventListener("change", onChange);
        else if (wide.addListener) wide.addListener(onChange);
    }

    /* ------------------------------------------------------------------
       Contact form: there is no backend, so a valid submission opens the
       visitor's mail client with a pre-filled message. Honeypot field
       silently drops bot submissions. */
    var form = document.querySelector(".contact-form");
    if (form) {
        var status = form.querySelector(".form-status");
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var hp = form.querySelector('[name="company"]');
            if (hp && hp.value) { setFormStatus("Thanks — your message has been received."); return; }

            if (!form.reportValidity()) return;

            var name = (form.querySelector('[name="name"]') || {}).value || "";
            var email = (form.querySelector('[name="email"]') || {}).value || "";
            var subject = (form.querySelector('[name="subject"]') || {}).value || "";
            var message = (form.querySelector('[name="message"]') || {}).value || "";

            var body = message + "\n\n— " + name + " (" + email + ")";
            var href = "mailto:wintechpartners@gmail.com" +
                "?subject=" + encodeURIComponent(subject || "Website enquiry") +
                "&body=" + encodeURIComponent(body);

            setFormStatus("Opening your email app… if nothing happens, write to wintechpartners@gmail.com.");
            window.location.href = href;
        });

        function setFormStatus(text) {
            if (status) status.textContent = text;
        }
    }
})();
