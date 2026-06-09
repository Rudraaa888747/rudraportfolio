"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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
    const [activeMobileNode, setActiveMobileNode] = useState<string | null>(null);
    const [activeMobileSkill, setActiveMobileSkill] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const ambientY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    useGSAP(() => {
        if (!container.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const nodes = gsap.utils.toArray(".arch-node");
            const texts = gsap.utils.toArray(".arch-text");

            gsap.fromTo(texts,
                { opacity: 0, y: 40, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 70%",
                        end: "center center",
                        scrub: 1,
                    },
                }
            );

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
        });

        // Force instant visibility and remove any potential hidden states on mobile/tablet
        mm.add("(max-width: 1023px)", () => {
            const texts = gsap.utils.toArray(".arch-text");
            const nodes = gsap.utils.toArray(".arch-node");

            // Guarantee immediate render with no animations
            gsap.set(texts, { opacity: 1, y: 0, filter: "none", clearProps: "all" });
            gsap.set(nodes, { opacity: 1, y: 0, clearProps: "all" });
        });

        return () => mm.revert();
    }, { scope: container });

    return (
        <section ref={container} className="relative py-20 md:py-32 px-6 md:px-12 w-full bg-black overflow-hidden z-20 border-t border-white/[0.05]">

            {/* Environmental Atmosphere */}
            <motion.div style={{ y: ambientY }} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="absolute top-[30%] left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Engineered Copy */}
                <div className="flex flex-col gap-4 md:gap-6 mb-20 md:mb-32">
                    <div className="arch-text font-sans text-xs md:text-sm tracking-[0.2em] text-[#555] uppercase mb-2 md:mb-4">
                        // Core Skills & Architecture
                    </div>
                    <h2 className="arch-text font-display text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#e0e0e0] leading-[1.15] max-w-[280px] md:max-w-5xl">
                        Every intelligent system begins with <span className="text-white font-medium italic">decision</span>.
                    </h2>
                    <p className="arch-text text-[#888] font-light leading-relaxed text-sm md:text-lg max-w-2xl mt-2 md:mt-4">
                        Backend is where intentions become infrastructure. I design data pipelines, ML systems, and server architecture with one rule - nothing is clever if it can't survive production.
                    </p>
                </div>

                {/* Ecosystem Visualization Map */}
                <div className="relative w-full pb-10 lg:pb-20">
                    <div className="w-full relative flex flex-col lg:flex-row flex-wrap items-center lg:items-start justify-center gap-12 lg:gap-4 lg:justify-between px-4 lg:pt-16">

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

                        {/* Render Nodes in Desktop Grid / Mobile Pipeline */}
                        <div className="w-full flex flex-col lg:flex-row flex-wrap items-start lg:items-start justify-center gap-0 lg:gap-4 lg:justify-between px-0 lg:px-4">
                            {NODES.map((node, i) => (
                                <SystemNode
                                    key={node.id}
                                    data={node}
                                    isLast={i === NODES.length - 1}
                                    activeMobileNode={activeMobileNode}
                                    setActiveMobileNode={setActiveMobileNode}
                                    activeMobileSkill={activeMobileSkill}
                                    setActiveMobileSkill={setActiveMobileSkill}
                                />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

interface SystemNodeProps {
    data: typeof NODES[0];
    isLast?: boolean;
    activeMobileNode: string | null;
    setActiveMobileNode: (id: string | null) => void;
    activeMobileSkill: string | null;
    setActiveMobileSkill: (id: string | null) => void;
}

function SystemNode({ data, isLast, activeMobileNode, setActiveMobileNode, activeMobileSkill, setActiveMobileSkill }: SystemNodeProps) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = data.icon;

    const isMobileNodeActive = activeMobileNode === data.id;

    const handleMobileNodeTap = () => {
        if (isMobileNodeActive) {
            setActiveMobileNode(null);
        } else {
            setActiveMobileNode(data.id);
            setActiveMobileSkill(null); // Reset skill when node changes
        }
    };

    return (
        <>
            {/* DESKTOP UI (Completely Untouched) */}
            <div
                className="hidden lg:flex arch-node relative flex-col items-center group w-48 z-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Micro-detail Status Header */}
                <div className="absolute -top-12 flex flex-col items-center gap-1 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
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
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 bg-black ${data.isCore
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

            {/* MOBILE UI (Full Redesign - Premium Vertical Pipeline) */}
            <div className="flex lg:hidden arch-node relative w-full flex-row items-stretch gap-6 z-10 group pb-12 pl-2">

                {/* Left Visual Axis */}
                <div className="relative flex flex-col items-center pt-2 cursor-pointer" onClick={handleMobileNodeTap}>
                    {/* Active Icon Node */}
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 bg-black ${data.isCore
                        ? 'border-white/[0.5] shadow-[0_0_40px_rgba(255,255,255,0.15)]'
                        : isMobileNodeActive
                            ? 'border-white/[0.8] shadow-[0_0_40px_rgba(255,255,255,0.3)] bg-white/5'
                            : 'border-white/[0.2]'
                        } border vision-glass z-10 shrink-0`}
                    >
                        {data.isCore && (
                            <div className="absolute inset-0 rounded-full border border-white/[0.4] scale-110 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
                        )}

                        <div className={`${data.isCore || isMobileNodeActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-[#666]'} transition-colors duration-500`}>
                            <Icon active={isMobileNodeActive || !!data.isCore} />
                        </div>
                    </div>

                    {/* Persistent Connection Pipeline */}
                    {!isLast && (
                        <div className={`absolute top-14 bottom-[-1rem] left-1/2 -translate-x-1/2 w-[1px] transition-colors duration-500 ${isMobileNodeActive ? 'bg-white/[0.4]' : 'bg-white/[0.2]'} z-0`} />
                    )}
                </div>

                {/* Right Content Axis */}
                <div className="flex flex-col flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={handleMobileNodeTap}>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#a0a0a0]">[{data.id}]</span>
                        <span className={`w-1 h-1 rounded-full transition-colors duration-300 ${isMobileNodeActive ? 'bg-white' : 'bg-white/[0.3]'}`} />
                        <span className={`font-mono text-[10px] tracking-widest uppercase ${data.isCore ? 'text-white' : isMobileNodeActive ? 'text-white/90' : 'text-[#888]'}`}>
                            {data.status}
                        </span>
                    </div>

                    <h4 className={`font-mono text-sm tracking-[0.2em] uppercase mb-6 transition-colors duration-300 cursor-pointer ${isMobileNodeActive || data.isCore ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-[#888]'}`} onClick={handleMobileNodeTap}>
                        {data.label}
                    </h4>

                    {/* Mobile Skills - Tap Interactive */}
                    <div className="flex flex-col gap-2 w-full">
                        {data.tech.map((tech, i) => {
                            const skillId = `${data.id}-${tech}`;
                            const isSkillActive = activeMobileSkill === skillId;

                            return (
                                <MobileInteractiveSkill
                                    key={i}
                                    text={tech}
                                    isNodeActive={isMobileNodeActive}
                                    isSkillActive={isSkillActive}
                                    onTap={() => {
                                        if (isSkillActive) {
                                            setActiveMobileSkill(null);
                                        } else {
                                            setActiveMobileSkill(skillId);
                                            setActiveMobileNode(data.id);
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

            </div>
        </>
    );
}

function MobileInteractiveSkill({ text, isNodeActive, isSkillActive, onTap }: { text: string, isNodeActive: boolean, isSkillActive: boolean, onTap: () => void }) {
    return (
        <div
            className="relative px-3 py-2 cursor-pointer group/skill overflow-hidden"
            onClick={onTap}
        >
            {/* Background interaction effect */}
            <div className={`absolute inset-0 bg-white/[0.08] transition-transform duration-300 origin-left ${isSkillActive ? 'scale-x-100' : 'scale-x-0'}`} />

            {/* Left indicator line */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-full transition-all duration-300 ${isSkillActive ? 'bg-white h-full shadow-[0_0_8px_rgba(255,255,255,1)]' : 'bg-white/[0.1] h-[30%]'}`} />

            <div className={`relative font-sans text-xs font-light text-left pl-2 transition-all duration-300 ${isSkillActive ? 'text-white translate-x-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isNodeActive ? 'text-white/80 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]' : 'text-[#666]'}`}>
                {text}
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