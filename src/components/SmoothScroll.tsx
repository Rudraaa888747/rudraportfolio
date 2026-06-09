"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    const handleModalState = (e: any) => {
      if (lenisRef.current?.lenis) {
        if (e.detail) {
          lenisRef.current.lenis.stop();
        } else {
          lenisRef.current.lenis.start();
        }
      }
    };

    gsap.ticker.add(update);
    window.addEventListener('projectModalState', handleModalState);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('projectModalState', handleModalState);
    };
  }, []);

  return (
    <ReactLenis 
      ref={lenisRef} 
      root 
      autoRaf={false} 
      options={{ 
        lerp: 0.05, 
        duration: 1.5, 
        smoothWheel: true
      }}
    >
      {children}
    </ReactLenis>
  );
}
