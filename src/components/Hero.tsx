"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !container.current) return;

    // Disable parallax on mobile for smoother scrolling performance
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    gsap.to(textRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: container });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section ref={container} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
      <Hero3D />

      {/* Mobile Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none md:hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/40 to-black/80" />

      {/* System Metrics (Universal for Desktop & Mobile) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex flex-col gap-2 font-mono text-[10px] text-white/40 tracking-widest uppercase pointer-events-none">
        <div>SYS.MEM // 2.37 TB</div>
        <div>NET.LAT // 15 MS</div>
        <div>ORIGIN // AHMEDABAD, IN</div>
        <div>EDU.STAT // BACHELORS COMPLETED</div>
        <div>EDU.STAT // MSC IT [ACTIVE]</div>
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full mix-blend-difference mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 md:mb-6 flex flex-col items-center space-y-4 max-md:[filter:none_!important]"
        >
          <div className="px-6 py-2 md:py-3 rounded-full vision-glass-strong text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-[#e0e0e0] text-center leading-relaxed">
            Software Engineer <span className="hidden md:inline">//</span><br className="md:hidden" /> AI Technologist
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-[7vw] leading-[1.1] md:leading-[1] tracking-tight text-white font-medium"
        >
          Rudra Chokshi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 md:mt-4 font-sans text-xs md:text-lg text-[#909090] max-w-lg tracking-wide font-light"
        >
          Building intelligent systems that solve real-world problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 flex items-center justify-center pointer-events-auto"
        >
          <motion.a
            whileTap={{ scale: 0.98 }}
            href="/rudra_chokshi_resume.pdf"
            target="_blank"
            className="hover-target px-8 py-4 min-h-[44px] border border-white/[0.1] bg-black/50 backdrop-blur-md transition-all duration-500 group flex items-center gap-4 rounded hover:border-white/[0.2] hover:bg-white/[0.02] relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="relative z-10 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#a0a0a0] md:group-hover:text-[#e0e0e0] transition-colors duration-300">Extract Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-[#666] md:group-hover:text-[#e0e0e0] transition-all duration-300 md:group-hover:translate-x-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

    </section>
  );
}
