(function () {
  const html = document.documentElement;
  const toggles = document.querySelectorAll(".theme-toggle");

  function applyTheme(mode) {
    const isDark = mode === "dark";
    html.classList.toggle("dark", isDark);
    localStorage.setItem("theme", mode);
    toggles.forEach((toggle) => {
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  }

  function getInitialTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme, event) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const apply = () => applyTheme(theme);

    if (!document.startViewTransition || prefersReducedMotion) {
      apply();
      return;
    }

    if (event) {
      html.style.setProperty("--x", `${event.clientX}px`);
      html.style.setProperty("--y", `${event.clientY}px`);
    }

    document.startViewTransition(apply);
  }

  function toggleTheme(event) {
    const next = html.classList.contains("dark") ? "light" : "dark";
    setTheme(next, event);
  }

  applyTheme(getInitialTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        const label = btn.querySelector("[data-copy-label]");
        if (label) {
          const prev = label.textContent;
          label.textContent = "Copied";
          setTimeout(() => {
            label.textContent = prev;
          }, 1600);
        }
      } catch {
        /* ignore */
      }
    });
  });
});

/* Subtle moving dots. Static under reduced motion, paused when the tab is hidden. */
(function () {
  const canvas = document.getElementById("dots");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const GAP = 28;
  let w = 0, h = 0, dpr = 1, raf = 0, t = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = getComputedStyle(canvas).color;
    for (let y = GAP / 2; y < h; y += GAP) {
      for (let x = GAP / 2; x < w; x += GAP) {
        const wave = Math.sin(x * 0.012 + t) * Math.cos(y * 0.016 - t * 0.8);
        ctx.globalAlpha = 0.15 + 0.35 * (wave + 1) / 2;
        ctx.beginPath();
        ctx.arc(x, y + wave * 2, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function loop() {
    t += 0.006;
    draw();
    raf = requestAnimationFrame(loop);
  }

  function update() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (reduce.matches || document.hidden) draw();
    else raf = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", update);
  reduce.addEventListener("change", update);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  resize();
  update();
})();
