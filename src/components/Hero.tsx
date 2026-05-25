"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ mem: "0.0", latency: "0" });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        mem: (Math.random() * 0.5 + 2.1).toFixed(2),
        latency: Math.floor(Math.random() * 5 + 12).toString(),
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!textRef.current || !container.current) return;
    gsap.to(textRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrub
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <Hero3D />
      
      {/* Mobile Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none md:hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/40 to-black/80" />

      {/* System Metrics Overlay */}
      <div className="absolute top-8 left-6 md:left-8 z-20 flex flex-col gap-1 md:gap-2 font-mono text-[8px] md:text-[10px] text-white/40 tracking-widest uppercase pointer-events-none">
        <div>SYS.MEM // {metrics.mem} TB</div>
        <div>NET.LAT // {metrics.latency} MS</div>
        <div>ORIGIN // AHMEDABAD, IN</div>
        <div>EDU.STAT // MSC IT ACTIVE [23-28]</div>
        <div>CORE // ONLINE</div>
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full mix-blend-difference">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col items-center space-y-4"
        >
          <div className="px-6 py-2 rounded-full vision-glass-strong text-[11px] tracking-[0.4em] uppercase text-[#e0e0e0]">
            Junior Software Engineer // AI Technologist
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-[8vw] leading-[1.1] md:leading-[1] tracking-tight text-white font-medium"
        >
          Rudra Chokshi
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-6 font-sans text-xs md:text-lg text-[#909090] max-w-lg tracking-wide font-light"
        >
          Designing and engineering living digital systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-center pointer-events-auto"
        >
          <a 
            href="/Rudra Chokshi Resume.pdf" 
            target="_blank" 
            className="hover-target px-8 py-4 border border-white/[0.1] bg-white/[0.02] transition-all duration-500 overflow-hidden group flex items-center gap-3 rounded-md relative hover:bg-white/[0.04] hover:backdrop-blur-md hover:border-white/[0.2] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="relative z-10 font-mono text-[10px] tracking-[0.3em] uppercase text-[#a0a0a0] group-hover:text-white transition-colors duration-300">Extract Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-[#888] group-hover:text-white transition-colors duration-300">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Cinematic Scroll Cue */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 pointer-events-none mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-[#666]">System Ready</span>
        <div className="w-[1px] h-16 bg-white/[0.05] relative overflow-hidden">
          {/* Subtle energy flow physics */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/[0.8] to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatDelay: 0.5 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
