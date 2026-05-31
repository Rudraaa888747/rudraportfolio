"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Engineering SVGs
const SvgClient = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity={active ? 1 : 0.5} />
    <path d="M3 9h18M9 21V9" strokeOpacity={active ? 0.8 : 0.3} />
    <circle cx="15" cy="15" r="2" fill={active ? "currentColor" : "none"} opacity={active ? 0.8 : 0} className="transition-all duration-500" />
  </svg>
);

const SvgBackend = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
    <rect x="4" y="4" width="16" height="4" rx="1" strokeOpacity={active ? 1 : 0.5} />
    <rect x="4" y="10" width="16" height="4" rx="1" strokeOpacity={active ? 0.8 : 0.4} />
    <rect x="4" y="16" width="16" height="4" rx="1" strokeOpacity={active ? 0.6 : 0.3} />
    <circle cx="8" cy="6" r="1" fill={active ? "currentColor" : "none"} opacity={active ? 0.8 : 0} className="transition-all duration-500 delay-100" />
    <circle cx="8" cy="12" r="1" fill={active ? "currentColor" : "none"} opacity={active ? 0.6 : 0} className="transition-all duration-500 delay-200" />
    <circle cx="8" cy="18" r="1" fill={active ? "currentColor" : "none"} opacity={active ? 0.4 : 0} className="transition-all duration-500 delay-300" />
  </svg>
);

const SvgDatabase = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
    <ellipse cx="12" cy="6" rx="8" ry="3" strokeOpacity={active ? 1 : 0.5} />
    <path d="M4 6v12c0 1.657 3.582 3 8 3s8-1.343 8-3V6" strokeOpacity={active ? 0.8 : 0.4} />
    <path d="M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" strokeOpacity={active ? 0.6 : 0.3} />
    <path d="M12 9v12" strokeOpacity={active ? 0.4 : 0.1} strokeDasharray="2 2" className={active ? "animate-[dash_2s_linear_infinite]" : ""} />
  </svg>
);

const SvgAI = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
    <polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5" strokeOpacity={active ? 1 : 0.5} />
    <line x1="12" y1="3" x2="12" y2="21" strokeOpacity={active ? 0.4 : 0.2} />
    <line x1="4" y1="7.5" x2="20" y2="16.5" strokeOpacity={active ? 0.4 : 0.2} />
    <line x1="20" y1="7.5" x2="4" y2="16.5" strokeOpacity={active ? 0.4 : 0.2} />
    <circle cx="12" cy="12" r="3" fill={active ? "currentColor" : "none"} opacity={active ? 0.8 : 0} className={active ? "animate-pulse" : "transition-all duration-500"} />
  </svg>
);

const SvgDevOps = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
    <path d="M8 8a4 4 0 1 0 0 8h8a4 4 0 1 0 0-8H8z" strokeOpacity={active ? 1 : 0.5} />
    <circle cx="8" cy="12" r="1" fill={active ? "currentColor" : "none"} opacity={active ? 0.8 : 0} />
    <circle cx="16" cy="12" r="1" fill={active ? "currentColor" : "none"} opacity={active ? 0.8 : 0} />
    <path d="M12 8v8" strokeOpacity={active ? 0.4 : 0.2} strokeDasharray="2 2" className={active ? "animate-[dash_2s_linear_infinite]" : ""} />
  </svg>
);

const NODES = [
  {
    id: "NODE_01",
    label: "CLIENT & CORE",
    status: "SYNCED",
    icon: SvgClient,
    tech: ["JavaScript", "Java", "TypeScript", "Python", "HTML/CSS"]
  },
  {
    id: "NODE_02",
    label: "BACKEND ENGINE",
    status: "ONLINE",
    icon: SvgBackend,
    tech: ["Node.js", "REST APIs", "Socket.io", "PHP"]
  },
  {
    id: "NODE_03",
    label: "DATABASE LAYER",
    status: "INDEXED",
    icon: SvgDatabase,
    tech: ["Supabase", "MySQL", "MongoDB"]
  },
  {
    id: "NODE_04",
    label: "AI / MACHINE LEARNING",
    status: "PROCESSING",
    icon: SvgAI,
    tech: ["NLP", "Computer Vision", "Scikit-learn", "Recommendation"],
    isCore: true
  },
  {
    id: "NODE_05",
    label: "DEPLOYMENT",
    status: "ACTIVE",
    icon: SvgDevOps,
    tech: ["Git/GitHub", "Vercel", "CI/CD"]
  }
];

export default function Architecture() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const ambientY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useGSAP(() => {
    if (!container.current) return;
    const nodes = gsap.utils.toArray(".arch-node");

    gsap.from(nodes, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 px-6 md:px-12 w-full bg-black overflow-hidden z-20 border-t border-white/[0.05]">
      
      {/* Environmental Atmosphere */}
      <motion.div style={{ y: ambientY }} className="absolute inset-0 pointer-events-none z-0">
        {/* Soft upper ambient glow to reduce empty space without clutter */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="absolute top-[30%] left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Engineered Copy */}
        <div className="flex flex-col gap-6 max-w-2xl mb-32">
          <h3 className="font-mono text-xs tracking-[0.3em] text-[#555] uppercase">
            // Core Skills & Architecture
          </h3>
          <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight text-[#e0e0e0] leading-[1.1]">
            Every intelligent system begins with architecture.
          </h2>
          <p className="text-[#888] font-light leading-relaxed">
            The foundation of a living digital experience is its backend and intelligence layer. An optimized pipeline of raw logic, robust data architectures, and predictive machine learning models.
          </p>
        </div>

        {/* Ecosystem Visualization Map */}
        <div className="relative w-full pb-20">
          <div className="w-full relative flex flex-wrap items-start justify-center gap-16 lg:gap-4 lg:justify-between px-4 pt-16">
            
            {/* Animated Data Connections (Desktop Only) */}
            <svg className="absolute top-24 left-0 w-full h-full pointer-events-none z-0 opacity-40 hidden lg:block">
              <line x1="10%" y1="0" x2="90%" y2="0" stroke="url(#gradientLine)" strokeWidth="1" strokeOpacity="0.2" />
              {/* Flowing Data Pulses */}
              <line x1="10%" y1="0" x2="90%" y2="0" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" strokeDasharray="10 200" className="animate-[dashflow_3s_linear_infinite]" />
              <line x1="10%" y1="0" x2="90%" y2="0" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 300" className="animate-[dashflow_4s_linear_infinite_reverse]" />
              
              <defs>
                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="20%" stopColor="#ffffff" />
                  <stop offset="80%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            <style>{`
              @keyframes dashflow {
                from { stroke-dashoffset: 210; }
                to { stroke-dashoffset: 0; }
              }
            `}</style>

            {/* Render Nodes */}
            {NODES.map((node, i) => (
              <SystemNode key={node.id} data={node} />
            ))}
            
          </div>
        </div>

      </div>
    </section>
  );
}

function SystemNode({ data }: { data: typeof NODES[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;

  return (
    <div 
      className="arch-node relative flex flex-col items-center group w-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Micro-detail Status Header */}
      <div className="absolute -top-12 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="font-mono text-[8px] tracking-[0.3em] text-[#555]">[{data.id}]</span>
        <span className={`font-mono text-[9px] tracking-widest uppercase ${data.isCore ? 'text-white' : 'text-[#888]'}`}>
          {data.status}
        </span>
      </div>

      {/* The Node Core */}
      <div className="relative z-10 flex items-center justify-center mb-8">
        {/* Connection point line vertical */}
        <div className={`absolute -top-12 w-[1px] h-12 transition-colors duration-500 ${isHovered ? 'bg-white/[0.2]' : 'bg-transparent'}`} />
        
        {/* Core Container */}
        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 bg-black ${
          data.isCore 
            ? 'border-white/[0.5] shadow-[0_0_40px_rgba(255,255,255,0.15)]' 
            : isHovered 
              ? 'border-white/[0.8] shadow-[0_0_40px_rgba(255,255,255,0.3)] bg-white/5' 
              : 'border-white/[0.1]'
        } border vision-glass`}
        >
          {data.isCore && (
            <div className="absolute inset-0 rounded-full border border-white/[0.4] scale-110 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
          )}
          
          <div className={`${data.isCore || isHovered ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-[#666]'} transition-colors duration-500`}>
            <Icon active={isHovered || !!data.isCore} />
          </div>
        </div>
      </div>

      {/* Title */}
      <h4 className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-6 text-center transition-colors duration-300 ${isHovered || data.isCore ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-[#888]'}`}>
        {data.label}
      </h4>

      {/* Interactive Skills */}
      <div className="flex flex-col gap-2 w-full">
        {data.tech.map((tech, i) => (
          <InteractiveSkill key={i} text={tech} isNodeHovered={isHovered} />
        ))}
      </div>
    </div>
  );
}

function InteractiveSkill({ text, isNodeHovered }: { text: string, isNodeHovered: boolean }) {
  const [isSkillHovered, setIsSkillHovered] = useState(false);

  return (
    <div 
      className="relative px-3 py-1.5 cursor-none group/skill overflow-hidden"
      onMouseEnter={() => setIsSkillHovered(true)}
      onMouseLeave={() => setIsSkillHovered(false)}
    >
      {/* Background interaction effect */}
      <div className={`absolute inset-0 bg-white/[0.08] transition-transform duration-300 origin-left ${isSkillHovered ? 'scale-x-100' : 'scale-x-0'}`} />
      
      {/* Left indicator line */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-full transition-all duration-300 ${isSkillHovered ? 'bg-white h-full shadow-[0_0_8px_rgba(255,255,255,1)]' : 'bg-white/[0.1] h-[30%]'}`} />
      
      <div className={`relative font-sans text-xs font-light text-center transition-all duration-300 ${isSkillHovered ? 'text-white translate-x-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isNodeHovered ? 'text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]' : 'text-[#555]'}`}>
        {text}
      </div>
    </div>
  );
}
