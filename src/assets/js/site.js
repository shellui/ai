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
