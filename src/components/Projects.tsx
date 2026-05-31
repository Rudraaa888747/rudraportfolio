"use client";

import { useRef, useState, useEffect } from "react";
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
  },
  {
    title: "AZURE SMILES",
    subtitle: "AI-Powered Dental ERP Platform",
    problem: "Disconnected systems for appointments, records, and billing created inefficiencies and poor patient experience in dental clinics.",
    solution: "Developed a full-stack ecosystem combining a luxury patient website with a real-time clinic ERP platform for centralized management.",
    tech: ["React 19", "Node.js", "MongoDB", "ERP Design"],
    number: "03",
    type: "dental",
    liveLink: "https://dental-clinic-liard-seven.vercel.app",
    githubLink: "https://github.com/Rudraaa888747/Dental-Clinic"
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
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          end: () => `+=${(sectionRef.current?.offsetWidth || 1000) * 2.5}`
        }
      });

      // Smooth cinematic entry: pause, scroll, pause
      tl.to({}, { duration: 0.2 })
        .to(panels, {
          xPercent: -100 * (totalPanels - 1),
          ease: "none",
          duration: 1
        })
        .to({}, { duration: 0.2 });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section id="work" className="relative z-20 bg-black w-full border-t border-white/[0.05]">
      {/* Spacer to ensure smooth transition from previous section before pinning */}
      <div className="w-full h-24 md:h-40 bg-black relative z-20"></div>

      <div ref={sectionRef} className="relative overflow-hidden md:h-screen w-full bg-black">
        <div className="absolute top-8 left-6 md:left-12 z-50 mix-blend-difference pointer-events-none">
          <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-[#888]">Classified Systems</h2>
        </div>

        <div ref={containerRef} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[200vw]">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLockedOn, setIsLockedOn] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;
    
    let timeout: NodeJS.Timeout;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timeout = setTimeout(() => setIsLockedOn(true), 800);
      } else {
        clearTimeout(timeout);
        setIsLockedOn(false);
      }
    }, { threshold: 0.6 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('projectModalState', { detail: isModalOpen }));
    
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      if (isModalOpen) {
        document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('projectModalState', { detail: false }));
      }
    };
  }, [isModalOpen]);

  return (
    <div ref={cardRef} className="project-panel w-full md:w-screen h-[100svh] md:h-screen relative flex items-center justify-center overflow-hidden bg-black flex-shrink-0">
      
      {/* Mobile Deep Atmosphere Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none md:hidden mix-blend-screen opacity-40 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black" />

      {/* Dynamic Right Side / Background Environment */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none flex items-start lg:items-center justify-center overflow-hidden hover-target-scan pt-32 lg:pt-0 opacity-40 lg:opacity-100">
        {project.type === "switch" ? (
          <SwitchEnvironment />
        ) : project.type === "travel" ? (
          <TravelEnvironment />
        ) : (
          <DentalEnvironment />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col justify-end lg:justify-center h-full pb-20 lg:pb-0 pointer-events-none">
        <div className="w-full lg:w-[45%] bg-gradient-to-t from-black via-black/95 to-transparent lg:bg-none pt-40 p-6 lg:p-0 rounded-lg pointer-events-auto mt-auto lg:mt-0 relative">
          <div className="font-mono text-[#555] mb-4 md:mb-6 text-[10px] md:text-sm tracking-widest">SYS_ID: {project.number}</div>
          
          <h3 className="font-display text-5xl md:text-6xl font-medium tracking-tight mb-2 md:mb-4 text-[#e0e0e0]">
            {project.title}
          </h3>
          <p className="text-xs md:text-xl text-[#888] mb-6 md:mb-12 font-light tracking-wide">
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
          <motion.button 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsModalOpen(true)}
            suppressHydrationWarning
            className="md:hidden flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400 mb-8 hover:text-white transition-colors"
          >
            [+ Decrypt Details]
          </motion.button>
          
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

      {/* Mobile Lock-On Ping */}
      <AnimatePresence>
        {isLockedOn && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="md:hidden absolute bottom-6 right-6 z-40 pointer-events-none flex flex-col items-end gap-1"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-cyan-500/80 tracking-widest uppercase">
                TARGET_LOCK
              </span>
              <div className="relative flex h-1.5 w-1.5 items-center justify-center">
                <motion.span 
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"
                />
                <span className="relative inline-flex rounded-full h-1 w-1 bg-cyan-400" />
              </div>
            </div>
            <div className="w-12 h-[1px] bg-cyan-500/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Glass Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col p-6 pointer-events-auto overflow-y-auto"
          >
            <motion.button 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#888] hover:text-white"
            >
              <X size={24} />
            </motion.button>
            
            <div className="mt-20 font-mono text-[#555] mb-2 text-[10px] tracking-widest">SYS_ID: {project.number}</div>
            <h3 className="font-display text-4xl font-medium tracking-tight mb-2 text-[#e0e0e0]">
              {project.title}
            </h3>
            <p className="text-xs text-[#888] mb-10 font-light tracking-wide">
              {project.subtitle}
            </p>
            
            <div className="space-y-8 border-l border-cyan-500/30 pl-4">
              <div>
                <h4 className="font-mono text-[9px] text-cyan-400 tracking-[0.2em] uppercase mb-3">Problem Statement</h4>
                <p className="text-[#e0e0e0] text-[11px] leading-relaxed font-light">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[9px] text-cyan-400 tracking-[0.2em] uppercase mb-3">Architectural Solution</h4>
                <p className="text-[#e0e0e0] text-[11px] leading-relaxed font-light">
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
          className="w-full h-40 bg-gradient-to-b from-transparent to-cyan-500/10 border-b border-cyan-400/60 shadow-[0_4px_30px_rgba(34,211,238,0.2)]"
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        />
        <motion.div 
          className="absolute right-[20%] top-[30%] w-32 h-40 border border-cyan-400/40 bg-cyan-500/[0.02]"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-300" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-300" />
          <span className="absolute -top-4 left-0 font-mono text-[8px] text-cyan-300/80 tracking-widest">OBJ: JACKET [98.4%]</span>
        </motion.div>
        <motion.div 
          className="absolute right-[40%] top-[60%] w-24 h-24 border border-cyan-400/30 bg-cyan-500/[0.02]"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-300" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-300" />
          <span className="absolute -top-4 left-0 font-mono text-[8px] text-cyan-300/80 tracking-widest">OBJ: BAG [92.1%]</span>
        </motion.div>
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
      
      {/* GPS Location Scan Lines & Coordinates */}
      <div className="absolute inset-0 z-20 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        {/* Horizontal Scan Radar */}
        <motion.div 
          className="h-full w-48 bg-gradient-to-r from-transparent via-cyan-500/5 to-cyan-400/20 border-r border-cyan-400/50 absolute left-0 top-0 shadow-[4px_0_30px_rgba(34,211,238,0.15)]"
          animate={{ x: ["-20vw", "120vw"] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
        
        {/* Location Targeting Reticle */}
        <motion.div 
          className="absolute left-[60%] top-[40%] w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)]" />
          <div className="absolute w-full h-[1px] bg-cyan-500/20" />
          <div className="absolute h-full w-[1px] bg-cyan-500/20" />
          <div className="absolute -top-6 -right-16 flex flex-col gap-0.5">
            <span className="font-mono text-[8px] text-cyan-300/80 tracking-widest">LAT: 34.0522</span>
            <span className="font-mono text-[8px] text-cyan-300/80 tracking-widest">LNG: -118.2437</span>
          </div>
        </motion.div>
        
        {/* Secondary Coordinate Ping */}
        <motion.div 
          className="absolute left-[30%] top-[70%] w-8 h-8 rounded-full border border-cyan-400/20 flex items-center justify-center"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
        >
          <div className="w-1 h-1 bg-cyan-300/80 rounded-full" />
          <span className="absolute -bottom-4 right-0 font-mono text-[6px] text-cyan-300/60 tracking-widest">TRG_LOCKED</span>
        </motion.div>
      </div>
      
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

function DentalEnvironment() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end p-8 md:p-12 lg:pr-24">
      {/* Luxury Ambient Lighting for Dental Environment */}
      <div className="absolute right-[20%] top-[30%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[10%] bottom-[40%] w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* 3D Digital Blue Scanning System */}
      <div className="absolute inset-0 z-20 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        {/* Vertical Scan Radar */}
        <motion.div 
          className="w-full h-32 bg-gradient-to-b from-transparent via-blue-500/10 to-blue-400/20 border-b border-blue-400/50 absolute left-0 top-0 shadow-[0_4px_30px_rgba(59,130,246,0.15)]"
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
        
        {/* Dental Diagnostics Reticle */}
        <motion.div 
          className="absolute right-[30%] top-[45%] w-24 h-24 rounded-full border border-blue-500/30 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]" />
          <div className="absolute w-full h-[1px] bg-blue-500/20" />
          <div className="absolute h-full w-[1px] bg-blue-500/20" />
          
          <div className="absolute inset-0 border border-blue-400/20 scale-125" />
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-400" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-400" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-400" />
        </motion.div>
        
        {/* Secondary Coordinate Ping */}
        <motion.div 
          className="absolute right-[50%] top-[65%] w-12 h-12 rounded-full border border-blue-400/20 flex items-center justify-center"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
        >
          <div className="w-1.5 h-1.5 bg-blue-300/80 rounded-full" />
        </motion.div>
      </div>
      
      <div className="relative w-full h-[85%] max-w-2xl opacity-100 z-10 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image 
          src="/azure-mockup.png" 
          alt="Azure Smiles Platform" 
          fill 
          className="object-contain object-right"
          priority
        />
      </div>
    </div>
  );
}
