import Lenis from "lenis";
import { useEffect } from "react";

function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 👉 Interceptar clics en <a href="#...">
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href) return;

        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        e.preventDefault();
        lenis.scrollTo(targetEl);
      });
    });

    return () => {
      // Limpieza si es necesario (opcional)
    };
  }, []);

  return null;
}
export default LenisScroll;
