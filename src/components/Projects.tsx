"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code, X } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "SWITCH",
    subtitle: "AI-Powered Online Clothing Store",
    problem: "Integrating complex machine learning models, computer vision for image analysis, and intelligent feature implementation into a scalable web architecture.",
    solution: "Developed an end-to-end e-commerce ecosystem featuring an AI shopping assistant chatbot, computer vision-based style analysis, outfit matching, and predictive inventory insights.",
    tech: ["Next.js", "Computer Vision", "Machine Learning", "System Design"],
    number: "01",
    type: "switch",
    liveLink: "https://switch-iota-jet.vercel.app/",
    githubLink: "https://github.com/Rudraaa888747/switch"
  },
  {
    title: "TRAVEL_GUIDE",
    subtitle: "Dynamic Location-Based Routing",
    problem: "Structuring complex relational databases and server-side logic to handle dynamic, location-based content without compromising frontend usability.",
    solution: "Designed a dynamic web application architecture using PHP and MySQL, managing database structure design, secure form handling, and seamless user interaction.",
    tech: ["PHP", "MySQL", "Server-Side Logic", "Backend Design"],
    number: "02",
    type: "travel",
    githubLink: "https://github.com/Rudraaa888747/travelguide"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;
    
    let mm = gsap.matchMedia();

    // Cinematic Horizontal Scroll ONLY on Desktop
    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray(".project-panel");
      const totalPanels = panels.length;
      
      gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 2,
          end: () => `+=${(sectionRef.current?.offsetWidth || 1000) * 2.5}`
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="work" className="relative z-20 bg-black overflow-hidden md:h-screen">
      <div className="absolute top-8 left-6 md:left-12 z-50 mix-blend-difference pointer-events-none">
        <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-[#888]">Classified Systems</h2>
      </div>

      <div ref={containerRef} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[200vw]">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="project-panel w-full md:w-screen h-[100svh] md:h-screen relative flex items-center justify-center overflow-hidden bg-black flex-shrink-0">
      
      {/* Dynamic Right Side / Background Environment */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none flex items-start lg:items-center justify-center overflow-hidden hover-target-scan pt-32 lg:pt-0 opacity-50 lg:opacity-100">
        {project.type === "switch" ? (
          <SwitchEnvironment />
        ) : (
          <TravelEnvironment />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col justify-end lg:justify-center h-full pb-20 lg:pb-0 pointer-events-none">
        <div className="max-w-2xl bg-gradient-to-t from-black via-black/90 to-transparent lg:bg-none pt-40 p-6 lg:p-0 rounded-lg pointer-events-auto mt-auto lg:mt-0">
          <div className="font-mono text-[#555] mb-4 md:mb-6 text-xs md:text-sm tracking-widest">SYS_ID: {project.number}</div>
          
          <h3 className="font-display text-3xl md:text-6xl font-medium tracking-tight mb-2 md:mb-4 text-[#e0e0e0]">
            {project.title}
          </h3>
          <p className="text-sm md:text-xl text-[#888] mb-6 md:mb-12 font-light tracking-wide">
            {project.subtitle}
          </p>
          
          <div className="space-y-4 md:space-y-8 mb-6 md:mb-12 border-l border-white/[0.1] pl-4 md:pl-6">
            <div>
              <h4 className="font-mono text-[9px] md:text-[10px] text-[#666] tracking-[0.2em] uppercase mb-1 md:mb-2">Problem Statement</h4>
              <p className="text-[#a0a0a0] text-xs md:text-base leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[9px] md:text-[10px] text-[#666] tracking-[0.2em] uppercase mb-1 md:mb-2">Architectural Solution</h4>
              <p className="text-[#a0a0a0] text-xs md:text-base leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Mobile Read More Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            suppressHydrationWarning
            className="md:hidden flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400 mb-8 hover:text-white transition-colors"
          >
            [+ Decrypt Details]
          </button>
          
          <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
            {project.tech.map((t, i) => (
              <span key={i} className="px-2 py-1 md:px-3 rounded bg-white/[0.03] border border-white/[0.05] text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#888]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 md:gap-8">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover-target flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-[#e0e0e0] group transition-colors">
                Access Interface
                <ExternalLink size={14} className="text-[#666] group-hover:text-white transition-colors" />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover-target flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-[#888] hover:text-[#e0e0e0] transition-colors group">
                View Repository
                <Code size={14} className="text-[#555] group-hover:text-white transition-colors" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Glass Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl md:hidden flex flex-col p-6 pointer-events-auto overflow-y-auto"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#888] hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="mt-20 font-mono text-[#555] mb-2 text-xs tracking-widest">SYS_ID: {project.number}</div>
            <h3 className="font-display text-3xl font-medium tracking-tight mb-2 text-[#e0e0e0]">
              {project.title}
            </h3>
            <p className="text-sm text-[#888] mb-10 font-light tracking-wide">
              {project.subtitle}
            </p>
            
            <div className="space-y-8 border-l border-cyan-500/30 pl-4">
              <div>
                <h4 className="font-mono text-[10px] text-cyan-400 tracking-[0.2em] uppercase mb-3">Problem Statement</h4>
                <p className="text-[#e0e0e0] text-sm leading-relaxed font-light">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] text-cyan-400 tracking-[0.2em] uppercase mb-3">Architectural Solution</h4>
                <p className="text-[#e0e0e0] text-sm leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-2 pb-12">
              {project.tech.map((t, i) => (
                <span key={i} className="px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-[9px] font-mono tracking-widest uppercase text-[#a0a0a0]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// CINEMATIC ENVIRONMENTS
// ----------------------------------------------------

function SwitchEnvironment() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end p-8 md:p-12 lg:pr-24">
      {/* Luxury Ambient Lighting */}
      <div className="absolute right-[20%] top-[40%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[10%] bottom-[30%] w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* AI Computer Vision Scan Lines & Bounding Boxes */}
      <div className="absolute inset-0 z-20 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        <motion.div 
          className="w-full h-[1px] bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,1)]"
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
        <div className="absolute right-[20%] top-[30%] w-32 h-40 border border-cyan-400/40 bg-cyan-500/[0.02]">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-300" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-300" />
          <span className="absolute -top-4 left-0 font-mono text-[8px] text-cyan-300/80 tracking-widest">OBJ: JACKET [98.4%]</span>
        </div>
        <div className="absolute right-[40%] top-[60%] w-24 h-24 border border-cyan-400/30 bg-cyan-500/[0.02]">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-300" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-300" />
          <span className="absolute -top-4 left-0 font-mono text-[8px] text-cyan-300/80 tracking-widest">OBJ: BAG [92.1%]</span>
        </div>
      </div>

      <div className="relative w-full h-[85%] max-w-2xl opacity-100 z-10 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image 
          src="/switch-mockup.jpg" 
          alt="SWITCH Architecture" 
          fill 
          className="object-contain object-right"
          priority
        />
      </div>
    </div>
  );
}

function TravelEnvironment() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end p-8 md:p-12 lg:pr-24">
      {/* Luxury Ambient Lighting for Travel Environment */}
      <div className="absolute right-[15%] top-[50%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[25%] bottom-[20%] w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative w-full h-[85%] max-w-2xl opacity-100 z-10 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image 
          src="/travel-mockup.jpg" 
          alt="TRAVEL GUIDE Platform" 
          fill 
          className="object-contain object-right"
        />
      </div>
    </div>
  );
}
