"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CREDO_STATEMENTS = [
  {
    title: "SYSTEM ARCHITECT",
    text: "I don't just write code. I engineer scalable, intelligent systems designed for the future."
  },
  {
    title: "AI INTEGRATOR",
    text: "Bridging the gap between raw machine learning pipelines and intuitive, human-centric product design."
  },
  {
    title: "CONTINUOUS PROTOCOL",
    text: "Every six months, the best practice changes. I don't resist that - I build it into how I work. Adaptability isn't a trait. It's a system."
  }
];

export default function Credibility() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useGSAP(() => {
    if (!container.current) return;

    const elements = gsap.utils.toArray(".credo-item");
    const texts = gsap.utils.toArray(".credo-text");

    gsap.fromTo(texts,
      { opacity: 0, y: 40, filter: isMobile ? "none" : "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative pt-12 pb-20 md:pt-20 md:pb-48 px-6 md:px-12 w-full bg-black overflow-hidden border-t border-white/[0.05] z-30">
      {/* Subtle Environmental Motion */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0,transparent_50%)]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_50%)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
        <div className="md:w-1/2 static md:sticky md:top-32 mb-12 md:mb-0">
          <h3 className="credo-text font-sans text-sm tracking-[0.2em] text-[#555] uppercase mb-4">
            // Value Proposition
          </h3>
          <h2 className="credo-text font-display text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight text-[#e0e0e0] leading-[1.1] w-full">
            Why integrate<br className="hidden sm:block" />
            <span className="text-white font-medium italic">this</span> engineer<br className="hidden sm:block" />
            into your team?
          </h2>
        </div>

        <div className="md:w-1/2 flex flex-col gap-16 md:gap-24 pt-4 md:pt-16">
          {CREDO_STATEMENTS.map((item, index) => (
            <div key={index} className="credo-item flex flex-col gap-4">
              <div className="flex items-center gap-4 border-b border-white/[0.1] pb-4">
                <span className="font-mono text-[#555] text-xs">0{index + 1}</span>
                <h4 className="font-mono text-sm tracking-[0.3em] uppercase text-[#a0a0a0]">
                  {item.title}
                </h4>
              </div>
              <p className="font-sans text-2xl md:text-3xl text-[#888] font-light leading-relaxed max-w-2xl">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
