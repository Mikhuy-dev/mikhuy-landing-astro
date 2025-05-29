import Lenis from "lenis";

const lenis = new Lenis({
  smoothWheel: true,
  lerp: 0.1,
  wheelMultiplier: 1,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
