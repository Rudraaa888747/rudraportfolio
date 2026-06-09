"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "ERR_CODE: IDENTITY_REQUIRED";
      isValid = false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "ERR_CODE: INVALID_RETURN_PATH";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "ERR_CODE: PAYLOAD_EMPTY";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error('Transmission Error:', data.error);
        setErrors({ ...errors, message: "ERR_CODE: UPLINK_FAILED" });
      }
    } catch (error) {
      console.error('Network Error:', error);
      setErrors({ ...errors, message: "ERR_CODE: NETWORK_FAILURE" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={container} id="contact" className="relative py-16 lg:py-32 px-6 md:px-12 w-full bg-black z-20 border-t border-white/[0.05]">
      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-20"
      >
        {/* Left Side: System Coordinates */}
        <div className="w-full lg:w-1/3 flex flex-col gap-12 lg:gap-16">
          <div>
            <h3 className="font-sans text-xs lg:text-sm tracking-[0.2em] text-[#555] uppercase mb-6 lg:mb-8">
              // System Coordinates
            </h3>
            <h2 className="font-display text-4xl font-light tracking-tight text-[#e0e0e0] leading-tight mb-4">
              Initiate <br />Communication
            </h2>
            <p className="text-[#888] font-light leading-relaxed max-w-sm text-sm lg:text-base">
              Available for architectural roles, engineering integrations, and visionary system builds.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <Coordinate label="EMAIL_PROTOCOL" value="rudrachokshi441@gmail.com" link="mailto:rudrachokshi441@gmail.com" />
            <Coordinate label="CONTACT NOW" value="+91 8511259549" link="tel:+918511259549" />
            <div className="flex gap-6 lg:gap-8 pt-2 lg:pt-4">
              <SocialLink label="LINKEDIN" url="https://www.linkedin.com/in/rudra-chokshi-630004374" />
              <SocialLink label="GITHUB" url="https://github.com/Rudraaa888747" />
            </div>
          </div>
        </div>

        {/* Right Side: The Interface */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="vision-glass p-6 md:p-12 rounded-lg border border-white/[0.05] flex flex-col gap-8 lg:gap-12 relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10">
              <Input
                id="name"
                label="OPERATOR_NAME"
                type="text"
                value={formData.name}
                error={errors.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                focused={focusedInput === 'name'}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div className="relative z-10">
              <Input
                id="email"
                label="RETURN_ADDRESS"
                type="email"
                value={formData.email}
                error={errors.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                focused={focusedInput === 'email'}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div className="relative z-10">
              <Input
                id="message"
                label="TRANSMISSION_DATA"
                type="textarea"
                value={formData.message}
                error={errors.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: "" });
                }}
                focused={focusedInput === 'message'}
                onFocus={() => setFocusedInput('message')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              suppressHydrationWarning
              className="relative z-10 mt-4 w-full py-4 border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden group/btn disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className={`font-mono text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${isSuccess ? 'text-green-400' : 'text-[#e0e0e0]'}`}>
                {isSubmitting ? "TRANSMITTING..." : isSuccess ? "SIGNAL RECEIVED" : "DISPATCH SIGNAL"}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Coordinate({ label, value, link }: { label: string, value: string, link: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] text-[#555] uppercase tracking-widest">{label}</span>
      <a href={link} className="hover-target font-mono text-sm text-[#e0e0e0] hover:text-white transition-colors">
        {value}
      </a>
    </div>
  );
}

function SocialLink({ label, url }: { label: string, url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="hover-target font-mono text-xs text-[#888] hover:text-[#e0e0e0] transition-colors uppercase tracking-[0.2em] relative group">
      {label}
      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white/[0.3] group-hover:w-full transition-all duration-300" />
    </a>
  );
}

function Input({
  id, label, type, value, error, focused, onChange, onFocus, onBlur
}: {
  id: string, label: string, type: string, value: string, error?: string, focused: boolean, onChange: (e: any) => void, onFocus: () => void, onBlur: () => void
}) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className={`absolute left-0 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 pointer-events-none ${focused || value.length > 0
          ? "-top-5 text-[#888]"
          : "top-2 text-[#555]"
          }`}
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={onChange}
          suppressHydrationWarning
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full bg-transparent border-b py-2 text-[#e0e0e0] font-sans text-lg focus:outline-none resize-none transition-colors ${error ? 'border-red-500/50' : 'border-white/[0.1] focus:border-transparent'}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          suppressHydrationWarning
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full bg-transparent border-b py-2 text-[#e0e0e0] font-sans text-lg focus:outline-none transition-colors ${error ? 'border-red-500/50' : 'border-white/[0.1] focus:border-transparent'}`}
        />
      )}

      {/* Animated Focus Line (GPU Accelerated) */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] ${error ? 'bg-red-500/20' : 'bg-white/[0.1]'}`}>
        <motion.div
          className={`h-full w-full origin-center transform-gpu ${error ? 'bg-red-500' : 'bg-gradient-to-r from-[#888] to-[#e0e0e0]'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -bottom-5 right-0 font-mono text-[9px] text-red-400 tracking-widest uppercase"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}