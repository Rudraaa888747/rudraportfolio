"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code, X } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: "SWITCH",
    subtitle: "AI-Powered Online Clothing Store",
    overview: "Most e-commerce platforms show you products. SWITCH understands what you're trying to look like - and builds the outfit around that.",
    problem: "Static filters don't understand style. They understand keywords. That gap between what a shopper imagines and what a store surfaces - that's the problem SWITCH was built to close.",
    solution: "Built a full AI shopping layer - computer vision for real-time visual input, ML-driven recommendations, and a backend that keeps every state in sync without the user ever noticing the complexity underneath.",
    features: [
      "AI Style Advisor for intelligent outfit matching",
      "Integrated Digital Wallet System",
      "Real-time Returns & Logistics Tracking",
      "Predictive Admin Dashboard for inventory forecasting",
      "Highly Optimized Checkout Flow"
    ],
    highlights: [
      "Supabase architecture designed for real-time state sync across concurrent sessions - no polling, no lag.",
      "Row Level Security enforced at the database layer - not the application layer. Security that can't be bypassed.",
      " ML models integrated directly into the production pipeline - not prototyped, not mocked. Deployed."
    ],
    impact: "Shipped a production- ready AI commerce system where the intelligence is invisible and the experience is instant - from search to checkout, zero friction.",
    tech: ["Next.js", "Computer Vision", "Supabase", "Machine Learning", "Tailwind CSS"],
    number: "01",
    type: "switch",
    liveLink: "https://switch-iota-jet.vercel.app/",
    githubLink: "https://github.com/Rudraaa888747/switch"
  },
  {
    title: "TRAVEL GUIDE",
    subtitle: "Dynamic Location-Based Routing",
    overview: "A location-aware travel content platform built on a fully customized CMS architecture - where dynamic routing and modular content management work without exposing complexity to the people who maintain it.",
    problem: "Most content-heavy platforms force a choice: flexible for developers or manageable for editors. Rigid architectures break under scale. Loosely built ones become unmaintainable in weeks.",
    solution: "Engineered a Joomla CMS architecture from scratch - custom templates, dynamic routing logic, and a modular content layer that lets non-technical editors update location-based data without touching a single line of code.",
    features: [
      "Modular Content Management System",
      "Dynamic Travel Information Delivery",
      "Advanced Template Customisation",
      "Secure and Optimized Deployment Configuration"
    ],
    highlights: [
      "CMS architecture designed modular from day one - each content type isolated, independently updatable, zero coupling.",
      "Custom Joomla templates engineered for seamless UX - not adapted from defaults, built to spec.",
      "Server-side configuration optimized for rapid content delivery - performance baked into deployment, not bolted on after."
    ],
    impact: "Delivered a platform where content velocity and frontend performance don't trade off against each other - editors move fast, users load faster, and the architecture holds both without compromise.",
    tech: ["PHP", "Joomla CMS", "MySQL", "Server-Side Logic"],
    number: "02",
    type: "travel",
    githubLink: "https://github.com/Rudraaa888747/travelguide"
  },
  {
    title: "AZURE SMILES",
    subtitle: "AI-Powered Dental ERP Platform",
    overview: "Healthcare runs on trust. Azure Smiles is the infrastructure behind that trust - a full-stack dental ERP where patient records, appointments, billing, and AI-driven triage operate as one unified, real-time system.",
    problem: "Dental clinics don't fail because of bad doctors. They fail because their systems don't talk to each other - disconnected records, manual scheduling, and billing handled in spreadsheets. Every gap costs time. In healthcare, time costs patients.",
    solution: "Built a centralized ERP from the ground up - RBAC security, JWT-protected APIs, real-time dashboard sync, and an AI triage layer that surfaces the right clinical insight at the right moment, without adding friction to the workflow.",
    features: [
      "End-to-End Patient & Clinic Management",
      "Real-time Appointment System",
      "Integrated Billing & EMI Management",
      "AI-driven Clinical Insights & Triage",
      "Optimized Mobile-first Patient Experience"
    ],
    highlights: [
      "Enterprise-grade RBAC implemented at the system level - every role sees exactly what it needs, nothing it doesn't.",
      "JWT authentication securing every API endpoint - not optional layers, structural guarantees.",
      "Real-time data synchronization across all clinic dashboards - no refresh, no lag, no version mismatch."
    ],
    impact: "Replaced a fragmented clinic operation with a single source of truth - where a receptionist, doctor, and billing manager all work from the same live data, and the AI works silently in the background making each of them faster.",
    tech: ["React 19", "Node.js", "MongoDB", "JWT Auth", "AI Integration"],
    number: "03",
    type: "dental",
    liveLink: "https://dental-clinic-2ujz.onrender.com",
    githubLink: "https://github.com/Rudraaa888747/Dental-Clinic"
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <>
      <section id="work" className="relative z-20 bg-black w-full border-t border-white/[0.05] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16 md:mb-24">
          <div className="flex flex-col">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#555] uppercase mb-3">
              // Directory
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-widest text-[#e0e0e0] uppercase">
              PROJECTS
            </h2>
          </div>
        </div>

        <div className="flex flex-col w-full gap-32 md:gap-40">
          {PROJECTS.map((project, i) => (
            <EditorialProject
              key={i}
              project={project}
              onOpenCaseStudy={() => setActiveProject(project)}
              index={i}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <CaseStudyViewer
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function EditorialProject({ project, onOpenCaseStudy, index }: { project: typeof PROJECTS[0], onOpenCaseStudy: () => void, index: number }) {
  const projectRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useGSAP(() => {
    if (!projectRef.current) return;
    const texts = gsap.utils.toArray(`.editorial-text-${index}`);

    gsap.fromTo(texts,
      { opacity: 0, y: 30, filter: isMobile ? "none" : "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: projectRef });

  return (
    <div ref={projectRef} className="w-full relative flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-20 items-center px-6 md:px-12 max-w-7xl mx-auto">

      {/* LEFT SIDE (Content) */}
      <div className="relative z-10 w-full flex flex-col justify-center order-2 md:order-1 mt-4 md:mt-0">
        <div className={`editorial-text-${index} font-mono text-[#555] mb-2 md:mb-4 text-[10px] md:text-xs tracking-widest uppercase`}>
          SYS_ID: {project.number}
        </div>

        <h3 className={`editorial-text-${index} font-display text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight mb-2 md:mb-4 text-[#e0e0e0]`}>
          {project.title}
        </h3>
        <p className={`editorial-text-${index} text-sm md:text-xl text-[#888] mb-6 md:mb-10 font-light tracking-wide`}>
          {project.subtitle}
        </p>

        <div className="space-y-6 md:space-y-8 mb-8 md:mb-12 border-l-2 border-white/[0.15] pl-4 md:pl-6 py-1">
          <div className={`editorial-text-${index}`}>
            <h4 className="font-mono text-xs text-[#a0a0a0] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
              <span className="text-cyan-500/50">{"//"}</span> Problem Statement
            </h4>
            <p className="text-[#c0c0c0] text-sm md:text-base leading-relaxed font-light">
              {project.problem}
            </p>
          </div>
          <div className={`editorial-text-${index}`}>
            <h4 className="font-mono text-xs text-[#a0a0a0] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
              <span className="text-cyan-500/50">{"//"}</span> Architectural Solution
            </h4>
            <p className="text-[#c0c0c0] text-sm md:text-base leading-relaxed font-light">
              {project.solution}
            </p>
          </div>
        </div>

        <div className={`editorial-text-${index} flex flex-wrap gap-2 mb-8 md:mb-12`}>
          {project.tech.map((t, i) => (
            <span key={i} className="px-2 py-1 md:px-3 md:py-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#888]">
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className={`editorial-text-${index} flex flex-col xl:flex-row items-start xl:items-center gap-4 md:gap-6`}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCaseStudy}
            suppressHydrationWarning
            className="flex items-center justify-center min-h-[44px] min-w-[44px] w-full md:w-auto gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#e0e0e0] hover:text-white transition-colors group px-6 py-4 border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05] rounded"
          >
            Explore Case Study
            <motion.span
              className="inline-block transition-transform duration-300 md:group-hover:translate-x-1"
            >→</motion.span>
          </motion.button>

          <div className="flex gap-6 mt-2 xl:mt-0 w-full md:w-auto">
            {project.liveLink && (
              <a href={project.liveLink} suppressHydrationWarning target="_blank" rel="noopener noreferrer" className="flex items-center min-h-[44px] min-w-[44px] gap-2 text-[10px] uppercase tracking-widest text-[#888] hover:text-[#e0e0e0] transition-colors group">
                Access Interface
                <ExternalLink size={14} className="text-[#555] md:group-hover:text-white transition-colors" />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} suppressHydrationWarning target="_blank" rel="noopener noreferrer" className="flex items-center min-h-[44px] min-w-[44px] gap-2 text-[10px] uppercase tracking-widest text-[#888] hover:text-[#e0e0e0] transition-colors group">
                Repository
                <Code size={14} className="text-[#555] md:group-hover:text-white transition-colors" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Visual) */}
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[60vh] lg:h-[70vh] z-0 flex items-center justify-center order-1 md:order-2 overflow-hidden rounded-sm bg-[#050505] border border-white/[0.05] group">
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] flex items-center justify-center"
        >
          <div className="relative w-full h-full scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {project.type === "switch" ? (
              <SwitchEnvironment />
            ) : project.type === "travel" ? (
              <TravelEnvironment />
            ) : (
              <DentalEnvironment />
            )}
          </div>
        </motion.div>

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
      </div>

    </div>
  );
}

function CaseStudyViewer({ project, onClose }: { project: typeof PROJECTS[0], onClose: () => void }) {
  useEffect(() => {
    // 3. Preserve the exact scroll position on close.
    const originalScrollY = window.scrollY;

    // 1. Explicit timeline pause when a case study opens
    ScrollTrigger.getAll().forEach(st => st.disable(false));

    // 1. Explicit lenis.stop() via custom event to SmoothScroll.tsx
    window.dispatchEvent(new CustomEvent('projectModalState', { detail: true }));

    // Completely lock background scrolling
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore background scrolling
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      // 2. Explicit timeline restoration when it closes
      ScrollTrigger.getAll().forEach(st => st.enable());

      // 2. Explicit lenis.start() via custom event
      window.dispatchEvent(new CustomEvent('projectModalState', { detail: false }));

      // 3. Restore the exact scroll position on close.
      window.scrollTo(0, originalScrollY);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999] bg-black flex flex-col overflow-y-auto overscroll-contain w-full h-[100svh]"
      data-lenis-prevent="true"
    >
      {/* Top Navigation Bar with Premium Close Button */}
      <div className="sticky top-0 z-[1000] w-full bg-gradient-to-b from-black via-black/90 to-transparent pt-6 pb-12 px-6 md:px-12 flex justify-end pointer-events-none">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="flex items-center justify-center min-h-[44px] gap-3 px-6 py-3 text-[#888] hover:text-white bg-white/[0.05] rounded-full hover:bg-white/[0.1] transition-all border border-white/[0.05] hover:border-white/[0.2] pointer-events-auto backdrop-blur-xl"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Close</span>
          <X size={18} />
        </motion.button>
      </div>

      <div className="max-w-5xl w-full mx-auto px-6 md:px-12 pb-32 -mt-8">
        <div className="font-mono text-[#555] mb-4 text-[10px] md:text-xs tracking-widest uppercase">
          ENGINEERING CASE STUDY // SYS_ID: {project.number}
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-4 text-[#e0e0e0]">
          {project.title}
        </h2>
        <p className="text-lg md:text-2xl text-[#888] mb-16 md:mb-24 font-light tracking-wide">
          {project.subtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-16">
            <section>
              <h4 className="font-mono text-xs text-[#888] tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-[#444]"></span>
                Project Overview
              </h4>
              <p className="text-[#e0e0e0] text-base md:text-lg leading-relaxed font-light">
                {project.overview}
              </p>
            </section>

            <section>
              <h4 className="font-mono text-xs text-[#888] tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-[#444]"></span>
                The Problem
              </h4>
              <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed font-light">
                {project.problem}
              </p>
            </section>

            <section>
              <h4 className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-cyan-500/50"></span>
                The Solution
              </h4>
              <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed font-light">
                {project.solution}
              </p>
            </section>

            <section>
              <h4 className="font-mono text-xs text-[#888] tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-[#444]"></span>
                Impact & Outcome
              </h4>
              <p className="text-[#e0e0e0] text-base md:text-lg leading-relaxed font-light border-l-2 border-white/[0.1] pl-6 py-2 italic">
                "{project.impact}"
              </p>
            </section>
          </div>

          {/* Sidebar Highlights */}
          <div className="lg:col-span-5 space-y-16">
            <section>
              <h4 className="font-mono text-xs text-[#888] tracking-[0.2em] uppercase mb-6 border-b border-white/[0.05] pb-4">
                Key Features
              </h4>
              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#c0c0c0] font-light text-sm md:text-base">
                    <span className="font-mono text-cyan-500/50 mt-1">{"//"}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-mono text-xs text-[#888] tracking-[0.2em] uppercase mb-6 border-b border-white/[0.05] pb-4">
                Technical Highlights
              </h4>
              <div className="space-y-4">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.05] rounded flex gap-4">
                    <span className="font-mono text-xs text-cyan-400 mt-1">0{i + 1}</span>
                    <p className="text-sm md:text-base text-[#c0c0c0] font-light leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="font-mono text-xs text-[#888] tracking-[0.2em] uppercase mb-6 border-b border-white/[0.05] pb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-4 py-2 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#a0a0a0]">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// CINEMATIC ENVIRONMENTS
// ----------------------------------------------------

function SwitchEnvironment() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end p-4 md:p-12 lg:pr-24">
      <div className="absolute right-[20%] top-[40%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-cyan-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[10%] bottom-[30%] w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-purple-500/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="hidden md:block absolute inset-0 z-20 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        <motion.div
          className="w-full h-20 md:h-40 bg-gradient-to-b from-transparent to-cyan-500/10 border-b border-cyan-400/60 shadow-[0_4px_30px_rgba(34,211,238,0.2)]"
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="relative w-full h-[80%] md:h-[85%] max-w-2xl opacity-100 z-10 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image
          src="/switch-mockup.webp"
          alt="SWITCH Architecture"
          fill
          className="object-contain md:object-right"
          priority
        />
      </div>
    </div>
  );
}

function TravelEnvironment() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end p-4 md:p-12 lg:pr-24">
      <div className="absolute right-[15%] top-[50%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[25%] bottom-[20%] w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-indigo-500/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="hidden md:block absolute inset-0 z-20 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        <motion.div
          className="h-full w-24 md:w-48 bg-gradient-to-r from-transparent via-cyan-500/5 to-cyan-400/20 border-r border-cyan-400/50 absolute left-0 top-0 shadow-[4px_0_30px_rgba(34,211,238,0.15)]"
          animate={{ x: ["-20vw", "120vw"] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="relative w-full h-[80%] md:h-[85%] max-w-2xl opacity-100 z-10 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image
          src="/travel-mockup.webp"
          alt="TRAVEL GUIDE Platform"
          fill
          className="object-contain md:object-right"
        />
      </div>
    </div>
  );
}

function DentalEnvironment() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end p-4 md:p-12 lg:pr-24">
      <div className="absolute right-[20%] top-[30%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[10%] bottom-[40%] w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-cyan-500/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 z-20 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        <motion.div
          className="w-full h-16 md:h-32 bg-gradient-to-b from-transparent via-blue-500/10 to-blue-400/20 border-b border-blue-400/50 absolute left-0 top-0 shadow-[0_4px_30px_rgba(59,130,246,0.15)]"
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="relative w-full h-[80%] md:h-[85%] max-w-2xl opacity-100 z-10 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image
          src="/azure-mockup.webp"
          alt="Azure Smiles Platform"
          fill
          className="object-contain md:object-right"
          priority
        />
      </div>
    </div>
  );
}
