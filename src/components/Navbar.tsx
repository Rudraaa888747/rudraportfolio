"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const rcOpacity = useTransform(scrollY, [0, 50, 150], [0, 0, 1]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none mix-blend-difference"
      >
        <motion.div 
          style={{ opacity: rcOpacity }}
          className="font-display text-white text-xl font-bold tracking-widest uppercase cursor-pointer hover-target pointer-events-auto" 
          onClick={() => { setMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
        >
          RC
        </motion.div>
        
        {/* Desktop Links (Untouched) */}
        <div className="hidden md:flex gap-4 md:gap-8 text-white text-xs font-mono tracking-widest uppercase pointer-events-auto">
          <button onClick={() => scrollTo('work')} className="relative group px-4 py-2 hover-target">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-[#a0a0a0]">WORK</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out bg-white/[0.03] backdrop-blur-md border border-white/[0.15] rounded-md shadow-[0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
          </button>
          <button onClick={() => scrollTo('about')} className="relative group px-4 py-2 hover-target">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-[#a0a0a0]">ABOUT</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out bg-white/[0.03] backdrop-blur-md border border-white/[0.15] rounded-md shadow-[0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
          </button>
          <button onClick={() => scrollTo('contact')} className="relative group px-4 py-2 hover-target">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-[#a0a0a0]">CONTACT</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out bg-white/[0.03] backdrop-blur-md border border-white/[0.15] rounded-md shadow-[0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col gap-2 pointer-events-auto p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <div className="w-8 h-[1px] bg-[#e0e0e0]" />
          <div className="w-8 h-[1px] bg-[#e0e0e0]" />
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              className="absolute top-8 right-6 p-4 text-[#888] hover:text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              [ CLOSE ]
            </button>

            <div className="flex flex-col gap-10 text-center">
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo('work')} 
                className="font-display text-5xl text-white tracking-widest uppercase hover:text-cyan-400 transition-colors"
              >
                WORK
              </motion.button>
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo('about')} 
                className="font-display text-5xl text-white tracking-widest uppercase hover:text-cyan-400 transition-colors"
              >
                ABOUT
              </motion.button>
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo('contact')} 
                className="font-display text-5xl text-white tracking-widest uppercase hover:text-cyan-400 transition-colors"
              >
                CONTACT
              </motion.button>
              
              <motion.a 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                href="/RUDRA_RESUME.pdf"
                target="_blank"
                className="mt-8 font-mono text-xs text-[#888] tracking-[0.3em] uppercase border-b border-[#333] pb-2 hover:text-white transition-colors inline-block mx-auto"
              >
                EXTRACT RESUME
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
