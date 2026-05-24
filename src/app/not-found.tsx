"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden z-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="font-mono text-cyan-500/50 text-sm tracking-[0.5em] uppercase mb-4 animate-pulse">
          // Error 404
        </div>
        
        <h1 className="font-display text-5xl md:text-8xl font-light tracking-tighter text-[#e0e0e0] mb-6">
          CONNECTION <br />
          <span className="text-white font-medium italic">LOST</span>
        </h1>
        
        <p className="font-sans text-[#888] max-w-md mx-auto mb-12 font-light leading-relaxed">
          The structural node you are attempting to access does not exist in this architecture. The pathway may have been deprecated or re-routed.
        </p>
        
        <Link 
          href="/"
          className="relative px-8 py-4 border border-white/[0.1] bg-white/[0.02] transition-all duration-500 overflow-hidden group flex items-center gap-3 rounded-md hover:bg-white/[0.04] hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <span className="relative z-10 font-mono text-xs tracking-[0.3em] text-[#a0a0a0] group-hover:text-cyan-400 uppercase transition-colors duration-300">
            RE-ESTABLISH UPLINK
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
