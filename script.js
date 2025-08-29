// Mobile menu
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  // Close menu on link click (mobile)
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle: stores preference; CSS contains all styling
const modeBtn = document.querySelector(".mode-toggle");
const body = document.body;

const THEME_KEY = "preferred-theme";
const saved = localStorage.getItem(THEME_KEY);
if (saved === "dark") body.classList.replace("theme-light", "theme-dark");
if (saved === "light") body.classList.replace("theme-dark", "theme-light");

modeBtn?.addEventListener("click", () => {
  const isLight = body.classList.contains("theme-light");
  body.classList.toggle("theme-light", !isLight);
  body.classList.toggle("theme-dark", isLight);
  localStorage.setItem(THEME_KEY, isLight ? "dark" : "light");
});

// Contact form validation (no inline styles)
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = form.querySelector(".form-status");
    const fields = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    // Basic validation
    let valid = true;
    // name
    if (!fields.name.value.trim()) {
      setError(fields.name, "Please enter your name.");
      valid = false;
    } else setError(fields.name, "");
    // email
    if (!/^\S+@\S+\.\S+$/.test(fields.email.value)) {
      setError(fields.email, "Enter a valid email address.");
      valid = false;
    } else setError(fields.email, "");
    // message
    if (fields.message.value.trim().length < 10) {
      setError(fields.message, "Message should be at least 10 characters.");
      valid = false;
    } else setError(fields.message, "");

    if (!valid) return;

    // Fake submit (replace with your endpoint / Formspree / EmailJS)
    await new Promise((r) => setTimeout(r, 600));
    status.textContent = "Thanks! Your message has been sent.";
    form.reset();
  });
}

function setError(input, msg) {
  const small = input.parentElement.querySelector(".error");
  small.textContent = msg;
}
