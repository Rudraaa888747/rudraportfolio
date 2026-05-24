"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL PATHWAYS...",
  "ESTABLISHING UPLINK...",
  "DECRYPTING ARCHIVES...",
  "ACCESS GRANTED.",
  "WELCOME, USER.",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runSequence = () => {
      if (currentLine < BOOT_SEQUENCE.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, Math.random() * 400 + 200);
      } else {
        setTimeout(onComplete, 800);
      }
    };

    runSequence();

    return () => clearTimeout(timeoutId);
  }, [currentLine, onComplete]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black font-mono text-[#e0e0e0]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-full max-w-2xl px-6">
        <div className="mb-8 text-[10px] tracking-widest text-[#555]">SYSTEM_BOOT_SEQUENCE_v10.0</div>
        
        <div className="h-40 flex flex-col justify-end space-y-2 mb-8 overflow-hidden">
          <AnimatePresence>
            {BOOT_SEQUENCE.slice(0, currentLine + 1).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${index === currentLine ? "text-[#e0e0e0]" : "text-[#555]"} text-xs md:text-sm uppercase tracking-wider`}
              >
                &gt; {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="w-full h-[1px] bg-white/[0.05] relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#c0c0c0]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] text-[#555] tracking-widest">
          <span>LOADING MODULES</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
