
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero image tilt (desktop mouse only) ---------- */
  const visual = document.querySelector(".hero-visual");
  const frame = document.querySelector(".hero-frame");
  if (visual && frame && !reduce && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    visual.addEventListener("pointermove", e => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      frame.style.setProperty("--tx", (x * 9).toFixed(2) + "deg");
      frame.style.setProperty("--ty", (-y * 7).toFixed(2) + "deg");
    });
    visual.addEventListener("pointerleave", () => {
      frame.style.setProperty("--tx", "0deg");
      frame.style.setProperty("--ty", "0deg");
    });
  }

  /* ---------- AOS ---------- */
  if (!window.AOS || reduce) return;

  AOS.init({ duration: 850, easing: "ease-out-cubic", once: true, offset: 60 });
  document.documentElement.classList.add("aos-on");

  const effect = el =>
    el.classList.contains("reveal-right") ? "fade-left" :
    el.classList.contains("reveal-left") ? "fade-right" :
    el.matches(".feature-img, .project-hero-img") ? "clip-up" :
    el.querySelector(".service-card, .quality-card, .info-card, .step-card") ? "fade-up" :
    "fade-up";

  // Turn every old ".reveal" element into an AOS element (also for cards added later by pages.js)
  const convert = (root = document) => {
    const groups = new Map();
    root.querySelectorAll(".reveal").forEach(el => {
      const key = el.parentElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(el);
    });
    groups.forEach(list => list.forEach((el, i) => {
      el.setAttribute("data-aos", effect(el));
      el.setAttribute("data-aos-delay", String(Math.min(i, 5) * 90));
      el.style.transitionDelay = "";
      el.classList.remove("reveal", "reveal-left", "reveal-right");
      el.classList.add("show");
    }));
    // standalone images get a clip reveal too
    root.querySelectorAll(".feature-img:not([data-aos])").forEach(el => el.setAttribute("data-aos", "clip-up"));
  };

  const base = window.observeReveals;
  window.observeReveals = (root = document) => {
    convert(root);
    if (base) base(root);         
    AOS.refreshHard();
  };
  window.observeReveals();
})();
