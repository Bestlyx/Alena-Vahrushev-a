const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const yearEl = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");
const reveals = document.querySelectorAll(".reveal");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

document.body.classList.add("is-ready");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (header) {
    header.classList.toggle("is-scrolled", y > 40);
  }
  lastScroll = y;
}, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
    observer.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  let raf = 0;
  let mx = 0;
  let my = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        cursorGlow.style.left = `${mx}px`;
        cursorGlow.style.top = `${my}px`;
        raf = 0;
      });
    }
  });
}
