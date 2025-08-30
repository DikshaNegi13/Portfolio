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

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = form.querySelector(".form-status");
    const fields = { name: form.name, email: form.email, message: form.message };

    // Basic validation
    let valid = true;
    if (!fields.name.value.trim()) { setError(fields.name, "Please enter your name."); valid = false; } else setError(fields.name, "");
    if (!/^\S+@\S+\.\S+$/.test(fields.email.value)) { setError(fields.email, "Enter a valid email address."); valid = false; } else setError(fields.email, "");
    if (fields.message.value.trim().length < 10) { setError(fields.message, "Message should be at least 10 characters."); valid = false; } else setError(fields.message, "");
    if (!valid) return;

    status.textContent = "Sending…";

    try {
      const resp = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" },
      });

      if (resp.ok) {
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      } else {
        const data = await resp.json().catch(() => ({}));
        if (data && data.errors && data.errors.length) {
          status.textContent = data.errors.map(e => e.message).join(", ");
        } else {
          status.textContent = "Oops, something went wrong. Please try again.";
        }
      }
    } catch {
      status.textContent = "Network error. Please check your connection and try again.";
    }
  });
}

function setError(input, msg) {
  const small = input.parentElement.querySelector(".error");
  if (small) small.textContent = msg;
}

// Dynamic typing effect
const roles = ["Diksha Negi","a Backend Developer", "a Software Engineer", "a LeetCode Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // ms per character
const erasingSpeed = 60;
const delayBetween = 1500; // pause before erasing

const dynamicEl = document.getElementById("dynamic-text");

function typeRole() {
  if (!dynamicEl) return;
  if (charIndex < roles[roleIndex].length) {
    dynamicEl.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, typingSpeed);
  } else {
    setTimeout(eraseRole, delayBetween);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    dynamicEl.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length; // move to next role
    setTimeout(typeRole, typingSpeed);
  }
}

// Start when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (dynamicEl) setTimeout(typeRole, 500);
});
