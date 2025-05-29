import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  {
    threshold: 0.6,
  }
);

document.querySelectorAll(".panel").forEach((el) => observer.observe(el));

// 🔁 Forzar update al observer con cada frame
lenis.on("scroll", () => {
  observer.takeRecords(); // puede ayudar a forzar actualizaciones
});
