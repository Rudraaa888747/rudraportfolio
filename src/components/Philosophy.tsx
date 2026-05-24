"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES = [
  {
    type: "header",
    text: "INITIALIZING PROFESSIONAL SUMMARY..."
  },
  {
    type: "interactive",
    label: "STATUS",
    value: "MSc IT @ GLS University | 2023 — 2028",
    details: "Currently pursuing a Master of Science in Information Technology. Focusing on advanced software engineering principles, scalable data architectures, and AI integration."
  },
  {
    type: "interactive",
    label: "EXPERIENCE_LOG",
    value: "Hands-on web development, intelligent systems & AI-focused engineering.",
    details: "Building robust backend services, integrating machine learning models, and crafting seamless, cinematic user interfaces for futuristic web applications."
  },
  {
    type: "interactive",
    label: "CORE_STRENGTH",
    value: "Programming, backend systems, databases, and problem-solving architecture.",
    details: "Proficient in designing highly scalable system architectures, optimizing complex database queries, and structuring maintainable, elegant codebases."
  },
  {
    type: "interactive",
    label: "CURRENT_FOCUS",
    value: "AI-driven system design, modern frontend experiences & scalable backend logic.",
    details: "Exploring the intersection of artificial intelligence and web technologies to create intuitive, predictive, and emotionally resonant digital products."
  },
  {
    type: "interactive",
    label: "BACKGROUND_PROCESS",
    value: "Continuously learning, experimenting, and evolving.",
    details: "Active research in emerging technologies, open-source contributions, and relentless refinement of my engineering protocols."
  },
  {
    type: "footer",
    text: "END_OF_TRANSMISSION."
  }
];

export default function Philosophy() {
  const container = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: "-100px" });
  const [displayedLines, setDisplayedLines] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < TERMINAL_LINES.length) {
        setDisplayedLines(current + 1);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, [isInView]);

  useGSAP(() => {
    if (!container.current) return;
    const elements = gsap.utils.toArray(".reveal-line");

    gsap.fromTo(elements, 
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="about" className="min-h-screen w-full flex items-center justify-center py-32 px-6 md:px-12 relative z-10 bg-black">
      <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-24 w-full">
        
        {/* Core Philosophy */}
        <div className="flex flex-col gap-6">
          <div className="reveal-line font-sans text-sm tracking-[0.2em] text-[#555] uppercase mb-4">
            // Operating Philosophy
          </div>
          <h2 className="reveal-line font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#e0e0e0] leading-[1.1]">
            I engineer systems that feel <span className="text-white font-medium italic">alive</span>.
          </h2>
          <h2 className="reveal-line font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#888] leading-[1.1]">
            Bridging the gap between raw backend architecture and cinematic human-computer interaction.
          </h2>
        </div>

        {/* Terminal Summary */}
        <div ref={terminalRef} className="reveal-line w-full max-w-4xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-8 rounded-sm">
          <div className="flex gap-2 mb-6 border-b border-white/[0.05] pb-4">
            <div className="w-2 h-2 rounded-full bg-[#333]" />
            <div className="w-2 h-2 rounded-full bg-[#333]" />
            <div className="w-2 h-2 rounded-full bg-[#333]" />
          </div>
          
          <div className="font-mono text-xs md:text-sm text-[#888] flex flex-col gap-1">
            {TERMINAL_LINES.slice(0, displayedLines).map((line, i) => (
              <TerminalLine key={i} item={line} index={i} />
            ))}
            
            {displayedLines > 0 && displayedLines < TERMINAL_LINES.length && (
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-[#888] mt-3"
              />
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

function TerminalLine({ item, index }: { item: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (item.type === "header" || item.type === "footer") {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`py-2 ${item.type === "footer" ? "text-[#555] mt-6" : "text-[#888] mb-4"}`}
      >
        {item.text}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3 py-2 px-3 -mx-3 rounded-md transition-all duration-500 hover:bg-white/[0.02]">
        
        {/* Subtle hover glow indicator */}
        <div className={`mt-[6px] w-[2px] h-[2px] transition-all duration-500 rounded-full ${isExpanded ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-[#333] group-hover:bg-[#888]'}`} />
        
        <div className="flex-1">
          <span className="text-[#a0a0a0] transition-colors duration-300 group-hover:text-white">
            {item.label}:
          </span>
          {" "}
          <span className="text-[#666] transition-colors duration-300 group-hover:text-[#a0a0a0]">
            {item.value}
          </span>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-6 pr-4 py-3 text-[#c0c0c0] text-sm leading-relaxed border-l border-white/[0.1] ml-[3px] my-2 bg-gradient-to-r from-white/[0.02] to-transparent">
              <span className="opacity-100 block tracking-wide">{item.details}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
