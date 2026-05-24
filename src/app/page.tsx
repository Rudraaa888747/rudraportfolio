"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Architecture from "@/components/Architecture";
import Credibility from "@/components/Credibility";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen selection:bg-white/10 selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={loading ? "fixed inset-0 overflow-hidden pointer-events-none opacity-0" : "opacity-100 transition-opacity duration-1000 delay-500"}>
        <Hero />
        <Philosophy />
        <Architecture />
        <Credibility />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
