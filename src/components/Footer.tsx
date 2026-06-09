"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black z-10 flex flex-col items-center justify-center border-t border-white/[0.05]">
      {/* Footer Bottom Bar */}
      <div className="w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-[10px] tracking-widest uppercase text-[#555] font-mono">
        <p className="md:w-1/2 text-center md:text-left">&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
        
        <div className="md:w-1/2 flex justify-center md:justify-end items-center gap-2 group cursor-default">
          <span className="text-[#444] transition-colors duration-300 md:group-hover:text-[#666]">MADE BY</span>
          <span className="text-[#888] font-semibold tracking-[0.4em] transition-all duration-500 md:group-hover:text-white md:group-hover:tracking-[0.5em] md:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">RUDRA CHOKSHI</span>
        </div>
      </div>
    </footer>
  );
}
