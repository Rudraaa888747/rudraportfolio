"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
  {
    title: "THE JOURNEY",
    text: "From writing my first line of code to building AI-powered systems, my journey has been driven by an obsession with understanding how things work - and then making them work better."
  },
  {
    title: "WHY AI?",
    text: "Most people use AI as a feature. I treat it as infrastructure - the invisible layer that makes every interaction smarter, faster, and more human."
  },
  {
    title: "WHY ENGINEERING?",
    text: "Anyone can write code that works today. I obsess over code that survives scale, survives teammates, and survives the version of myself six months from now."
  },
  {
    title: "WHY PROBLEM SOLVING?",
    text: "The best engineers I admire are problem solvers first. Technology is the tool, not the goal. Every project I build starts with a real problem and ends with a measurable solution."
  }
];

export default function BehindSystem() {
  const container = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useGSAP(() => {
    if (!container.current) return;
    const elements = gsap.utils.toArray(".reveal-text");

    gsap.fromTo(elements,
      { opacity: 0, y: 40, filter: isMobile ? "none" : "blur(10px)" },
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
  }, { scope: container });

  return (
    <section ref={container} id="behind-the-system" className="min-h-screen w-full flex items-center justify-center py-20 md:py-32 px-6 md:px-12 relative z-10 bg-black border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-24 w-full">

        {/* Header */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="reveal-text font-sans text-xs md:text-sm tracking-[0.2em] text-[#555] uppercase mb-2 md:mb-4">
            // Behind The System
          </div>
          <h2 className="reveal-text font-display text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#e0e0e0] leading-[1.1]">
            Engineering is more than writing code. It's about designing <span className="text-white font-medium italic">solutions</span>.
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {SECTIONS.map((section, idx) => (
            <div key={idx} className="reveal-text flex flex-col gap-4 md:gap-6">
              <h3 className="font-mono text-xs md:text-base tracking-[0.2em] uppercase text-[#e0e0e0] border-l-2 border-white/[0.2] pl-4">
                {section.title}
              </h3>
              <p className="text-[#888] font-light leading-relaxed text-sm md:text-lg pl-4 md:pl-5">
                {section.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
