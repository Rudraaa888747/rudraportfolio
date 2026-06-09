"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const rcOpacity = useTransform(scrollY, [0, 50, 150], [0, 0, 1]);

  useEffect(() => {
    const handleModalState = (e: any) => {
      setIsProjectModalOpen(e.detail);
    };
    window.addEventListener('projectModalState', handleModalState);
    return () => window.removeEventListener('projectModalState', handleModalState);
  }, []);

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
        animate={{ 
          y: isProjectModalOpen ? -50 : 0, 
          opacity: isProjectModalOpen ? 0 : 1 
        }}
        transition={{ 
          duration: isProjectModalOpen ? 0.3 : 1, 
          delay: isProjectModalOpen ? 0 : 0.5, 
          ease: "easeOut" 
        }}
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none mix-blend-difference"
      >
        <motion.div 
          style={{ opacity: rcOpacity }}
          className={`font-display text-white text-xl font-bold tracking-widest uppercase cursor-pointer hover-target ${isProjectModalOpen ? 'pointer-events-none' : 'pointer-events-auto'}`} 
          onClick={() => { setMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
        >
          RC
        </motion.div>
        
        {/* Desktop Links (Untouched) */}
        <div className={`hidden md:flex gap-4 md:gap-8 text-white text-xs font-mono tracking-widest uppercase ${isProjectModalOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>
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
          className={`md:hidden flex flex-col justify-center gap-2 p-4 min-w-[44px] min-h-[44px] -mr-2 ${isProjectModalOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
          onClick={() => {
            setMobileMenuOpen(true);
            document.body.style.overflow = 'hidden';
          }}
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
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 pointer-events-auto"
          >
            {/* Top HUD */}
            <div className="flex justify-between items-start mt-2">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] md:text-[10px] text-cyan-400 tracking-[0.2em]">SYS_STATUS: ONLINE</span>
                <span className="font-mono text-[9px] md:text-[10px] text-[#555] tracking-widest">NET_PROTOCOL: SECURE</span>
              </div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="p-4 -mr-2 min-w-[44px] min-h-[44px] text-[#888] hover:text-white font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.body.style.overflow = '';
                }}
              >
                [ CLOSE ]
              </motion.button>
            </div>

            {/* Main Links */}
            <div className="flex flex-col gap-6 md:gap-10 text-left my-auto px-4 md:px-12 relative">
              <div className="absolute left-0 top-[10%] w-[1px] h-[80%] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
              
              <motion.button 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98, x: 10 }}
                onClick={() => {
                  scrollTo('work');
                  document.body.style.overflow = '';
                }} 
                className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase hover:text-cyan-400 transition-all text-left flex flex-col items-start group"
              >
                <span className="font-mono text-[8px] md:text-[10px] text-[#555] group-hover:text-cyan-400/50 tracking-widest mb-1 transition-colors">DIR // 01</span>
                WORK
              </motion.button>

              <motion.button 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98, x: 10 }}
                onClick={() => {
                  scrollTo('about');
                  document.body.style.overflow = '';
                }} 
                className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase hover:text-cyan-400 transition-all text-left flex flex-col items-start group"
              >
                <span className="font-mono text-[8px] md:text-[10px] text-[#555] group-hover:text-cyan-400/50 tracking-widest mb-1 transition-colors">DIR // 02</span>
                ABOUT
              </motion.button>

              <motion.button 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98, x: 10 }}
                onClick={() => {
                  scrollTo('contact');
                  document.body.style.overflow = '';
                }} 
                className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase hover:text-cyan-400 transition-all text-left flex flex-col items-start group"
              >
                <span className="font-mono text-[8px] md:text-[10px] text-[#555] group-hover:text-cyan-400/50 tracking-widest mb-1 transition-colors">DIR // 03</span>
                CONTACT
              </motion.button>
            </div>

            {/* Bottom Footer HUD */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-between items-end border-t border-white/[0.05] pt-6 md:pt-8"
            >
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="/rudra_chokshi_resume.pdf"
                target="_blank"
                className="font-mono text-[10px] md:text-xs text-cyan-400 tracking-[0.2em] uppercase hover:text-white transition-colors flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                EXTRACT RESUME
              </motion.a>
              <div className="font-mono text-[8px] md:text-[10px] text-[#444] tracking-widest text-right">
                AUTH: ADMIN<br/>VER: 4.2.9
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
