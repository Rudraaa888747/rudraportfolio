"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Connect() {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

    return (
        <section ref={container} id="connect" className="relative py-16 md:py-24 lg:py-40 px-6 md:px-12 w-full bg-black z-20 border-t border-white/[0.05] overflow-hidden">

            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

            <motion.div
                style={{ opacity, y }}
                className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-4 md:gap-6 lg:gap-8 relative z-10"
            >
                <div className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-[#555] uppercase mb-2 md:mb-4">
          // READY TO BUILD?
                </div>

                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#e0e0e0] leading-[1.1]">
                    LET'S<br />CONNECT
                </h2>

                <p className="text-[#888] font-light leading-relaxed text-sm md:text-lg max-w-lg mx-auto mb-4 md:mb-8 px-4">
                    Ready to build intelligent, scalable architecture together? Let's make it happen.
                </p>

                <motion.a
                    whileTap={{ scale: 0.98 }}
                    href="mailto:rudrachokshi441@gmail.com"
                    suppressHydrationWarning
                    className="hover-target px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 min-h-[44px] min-w-[44px] border border-white/[0.1] bg-black/50 backdrop-blur-md transition-all duration-500 overflow-hidden group flex items-center gap-4 rounded relative hover:bg-white/[0.02] hover:border-white/[0.2] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a0a0a0] group-hover:text-[#e0e0e0] transition-colors duration-300">GET IN TOUCH</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-[#666] group-hover:text-[#e0e0e0] transition-all duration-300 group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </motion.a>
            </motion.div>
        </section>
    );
}
