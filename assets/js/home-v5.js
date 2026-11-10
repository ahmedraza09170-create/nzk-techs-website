// Home hero: word rotator + gentle pointer tilt. Pure JS, no libraries.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = document.querySelector(".rotator");
  if (el) {
    const words = (el.dataset.words || "").split(",").map(w => w.trim()).filter(Boolean);
    if (reduce || words.length < 2) { el.textContent = words[0] || ""; }
    else {
      let w = 0, c = 0, del = false;
      const tick = () => {
        const word = words[w];
        c += del ? -1 : 1;
        el.textContent = word.slice(0, c);
        let t = del ? 40 : 85;
        if (!del && c === word.length) { del = true; t = 1500; }
        else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 300; }
        setTimeout(tick, t);
      };
      tick();
    }
  }
  const hv = document.querySelector(".hv"), br = document.querySelector(".hv-browser");
  if (hv && br && !reduce && matchMedia("(hover:hover) and (min-width:992px)").matches) {
    hv.addEventListener("pointermove", e => {
      const r = hv.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      br.style.transform = `rotateY(${-7 + x * 8}deg) rotateX(${3 - y * 8}deg)`;
    });
    hv.addEventListener("pointerleave", () => { br.style.transform = ""; });
  }
})();
