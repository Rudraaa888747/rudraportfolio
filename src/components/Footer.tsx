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
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-center border-t border-white/[0.05] text-[10px] tracking-widest uppercase text-[#555] font-mono">
        <p>&copy; {new Date().getFullYear()} Rudra Chokshi</p>
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d0d0d0] animate-pulse" />
          <p>System V10.0 Online</p>
        </div>
      </div>
    </footer>
  );
}
