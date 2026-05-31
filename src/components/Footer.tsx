"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <footer ref={container} className="relative min-h-screen w-full overflow-hidden bg-black z-10 flex flex-col items-center justify-center border-t border-white/[0.05] py-32">
      <motion.div 
        style={{ y, scale, opacity }} 
        className="relative w-full flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="font-mono text-[10px] tracking-[0.5em] text-[#555] uppercase mb-12">
          // End of Transmission
        </div>
        
        <h2 className="font-display text-[12vw] md:text-[10vw] leading-[0.8] font-medium tracking-tighter text-gradient-silver mb-8">
          DEPLOY<br/>SYSTEM
        </h2>
        
        <p className="font-sans text-lg md:text-xl text-[#888] font-light max-w-lg mb-16">
          Ready to build intelligent, scalable architecture together?
        </p>

        <a 
          href="mailto:rudrachokshi441@gmail.com" 
          className="relative px-8 py-4 border border-white/[0.1] bg-white/[0.02] transition-all duration-500 overflow-hidden group flex items-center gap-3 rounded-md hover:bg-white/[0.04] hover:backdrop-blur-md hover:border-white/[0.2] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <span className="relative z-10 font-mono text-xs tracking-[0.3em] text-[#a0a0a0] group-hover:text-white uppercase transition-colors duration-300">
            INITIALIZE UPLINK
          </span>
        </a>
      </motion.div>

      {/* Footer Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-t border-white/[0.05] text-[10px] tracking-widest uppercase text-[#555] font-mono">
        <p className="md:w-1/3 text-center md:text-left">&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
        
        <div className="md:w-1/3 flex justify-center items-center gap-2 group">
          <span className="text-[#444] transition-colors duration-300 group-hover:text-[#666]">MADE BY</span>
          <span className="text-[#888] font-semibold tracking-[0.4em] transition-all duration-500 group-hover:text-white group-hover:tracking-[0.5em] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">RUDRA CHOKSHI</span>
        </div>

        <div className="md:w-1/3 flex justify-center md:justify-end items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
          <p className="text-[#666]">System V10.0 Online</p>
        </div>
      </div>
    </footer>
  );
}
