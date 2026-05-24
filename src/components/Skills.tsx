"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, Database, Globe, Cpu, Layout, Server, Zap, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "Artificial Intelligence", icon: BrainCircuit, color: "text-cyan-400" },
  { name: "Machine Learning (NLP/CV)", icon: Cpu, color: "text-purple-400" },
  { name: "Full-Stack Next.js/React", icon: Layout, color: "text-blue-400" },
  { name: "Backend Architecture", icon: Server, color: "text-emerald-400" },
  { name: "Supabase & Databases", icon: Database, color: "text-yellow-400" },
  { name: "Real-time Systems", icon: Zap, color: "text-orange-400" },
  { name: "API Integration", icon: Globe, color: "text-indigo-400" },
  { name: "System Design", icon: Shield, color: "text-rose-400" },
];

export default function Skills() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    const cards = gsap.utils.toArray(".skill-card");

    gsap.from(cards, {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-20">
        <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-white/90">
          Cognitive<br />
          <span className="text-cyan-400">Architecture</span>
        </h3>
        <p className="max-w-md text-white/50 text-sm md:text-base leading-relaxed">
          Bridging the gap between artificial intelligence and beautiful digital experiences. My tech stack is an optimized neural network of modern frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="skill-card hover-target relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group cursor-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className={`p-3 rounded-lg bg-black/50 border border-white/5 ${skill.color}`}>
                <skill.icon size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-display font-medium tracking-wide text-sm md:text-base">{skill.name}</h4>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-[50px] group-hover:bg-cyan-400/40 transition-colors duration-500 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
