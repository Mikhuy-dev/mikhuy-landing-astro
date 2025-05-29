import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function MobileSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Texto a mostrar
  const words = ["Mikhuy", "Siempre", "Es", "Tu", "Mejor", "Aliado"];

  // Movimiento en x proporcional a cantidad de palabras
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(words.length - 1) * 100}%`]
  );

  return (
    <section ref={sectionRef} className="relative h-[100vh] bg-gray-200">
      <div className="sticky top-0 h-screen bg-black overflow-hidden flex items-center justify-start">
        <motion.div
          className={`px-4 flex h-full items-center gap-10`}
          style={{
            x,
            width: `${words.length * 100}vw`, // ej. 600vw si hay 6 palabras
          }}
        >
          {words.map((word, i) => (
            <p
              key={i}
              className="italic font-bold uppercase text-white whitespace-nowrap text-[clamp(2rem,10vw,8rem)]"
            >
              {word}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
