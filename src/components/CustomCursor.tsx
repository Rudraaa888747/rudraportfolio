"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "interactive" | "text" | "scan">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollY } = useScroll();
  const spotlightScrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Smooth springs for fluid cinematic interpolation
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  const outerSpringX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.8 });
  const outerSpringY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.8 });

  // Slower, larger spring for cinematic spotlight inertia
  const spotlightSpringX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 1 });
  const spotlightSpringY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 1 });

  useEffect(() => {
    // Keep default cursor visible so the custom cursor acts as a "follower"
    document.body.style.cursor = 'auto';

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target") ||
        target.closest(".hover-target");

      const isText = 
        target.tagName.toLowerCase() === "p" ||
        target.tagName.toLowerCase() === "h1" ||
        target.tagName.toLowerCase() === "h2" ||
        target.tagName.toLowerCase() === "h3" ||
        target.tagName.toLowerCase() === "h4" ||
        target.tagName.toLowerCase() === "span";

      const isScan = 
        target.classList.contains("hover-target-scan") ||
        target.closest(".hover-target-scan");

      if (isInteractive) {
        setCursorState("interactive");
      } else if (isScan) {
        setCursorState("scan");
      } else if (isText) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  // Visual state variants
  const innerVariants = {
    default: { height: 12, width: 12, borderRadius: "50%", opacity: 1 },
    interactive: { height: 4, width: 4, borderRadius: "50%", opacity: 0 }, 
    text: { height: 32, width: 2, borderRadius: "0%", opacity: 0.5 },
    scan: { height: 4, width: 4, borderRadius: "50%", opacity: 1 }
  };

  const outerVariants = {
    default: { height: 40, width: 40, borderRadius: "50%", opacity: 1, scale: 1 },
    interactive: { height: 48, width: 48, borderRadius: "10%", opacity: 1, scale: 1.2 },
    text: { height: 40, width: 40, borderRadius: "50%", opacity: 0, scale: 0.5 },
    scan: { height: 60, width: 60, borderRadius: "50%", opacity: 1, scale: 1 }
  };

  return (
    <>
      {/* Cinematic Spotlight Effect (BACKGROUND LAYER) */}
      <motion.div
        style={{ opacity: spotlightScrollOpacity, willChange: "opacity" }}
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      >
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] transform-gpu"
          style={{
            x: spotlightSpringX,
            y: spotlightSpringY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
          animate={{ opacity: cursorState === "interactive" ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none z-[9999] hidden md:block"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        variants={innerVariants}
        animate={cursorState}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-white/50 bg-white/5 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
        style={{ x: outerSpringX, y: outerSpringY, translateX: "-50%", translateY: "-50%" }}
        variants={outerVariants}
        animate={cursorState}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {/* Cinematic Brackets for Interactive State */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorState === "interactive" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
        </motion.div>

        {/* Crosshair for Scanning State */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorState === "scan" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute top-0 w-[1px] h-3 bg-white" />
          <div className="absolute bottom-0 w-[1px] h-3 bg-white" />
          <div className="absolute left-0 w-3 h-[1px] bg-white" />
          <div className="absolute right-0 w-3 h-[1px] bg-white" />
        </motion.div>
      </motion.div>
    </>
  );
}
