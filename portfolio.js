// ---------- Mobile menu ----------
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// ---------- Mark the current page in the navigation ----------
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("#site-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
    }
});

// ---------- Footer year ----------
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Contact form validation ----------
const form = document.querySelector("#contact-form");

if (form) {
    const status = document.querySelector("#form-status");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const rules = {
        name: (value) => (value.length < 2 ? "Enter your name (at least 2 characters)." : ""),
        email: (value) => (emailPattern.test(value) ? "" : "Enter a valid email address, like name@example.com."),
        message: (value) => (value.length < 10 ? "Write a message of at least 10 characters." : ""),
    };

    function validateField(field) {
        const message = rules[field.name](field.value.trim());
        document.querySelector(`#${field.id}-error`).textContent = message;
        field.setAttribute("aria-invalid", message ? "true" : "false");
        return !message;
    }

    // Check each field when the person leaves it, and re-check as they fix it
    form.querySelectorAll("input, textarea").forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
            if (field.getAttribute("aria-invalid") === "true") validateField(field);
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        status.textContent = "";

        const fields = [...form.querySelectorAll("input, textarea")];
        const results = fields.map(validateField);
        const firstInvalid = fields[results.indexOf(false)];

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        // This site has no server, so nothing is sent yet.
        // To receive messages, create a free form endpoint (for example at formspree.io)
        // and send the data with fetch() here.
        const name = form.elements["name"].value.trim();
        status.textContent = `Thanks, ${name}. Your message is valid and ready to send.`;
        form.reset();
        fields.forEach((field) => field.removeAttribute("aria-invalid"));
    });
}