"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [accessing, setAccessing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAccessHQ = () => {
    setAccessing(true);
    setTimeout(() => setAccessing(false), 4000); // Overlay auto dismisses after 4s
  };

  return (
    <>
    <AnimatePresence>
      {accessing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center font-mono pointer-events-none"
        >
          <div className="max-w-xl w-full px-6">
            <p className="text-red-500 mb-4 text-sm md:text-xl font-bold tracking-widest uppercase animate-pulse">
              &gt; ESTABLISHING NEURAL LINK TO ALCHEMAX DB...
            </p>
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
              className="h-1 bg-red-500 shadow-[0_0_20px_#ef4444] mb-4"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-green-500 text-sm md:text-xl font-bold tracking-widest uppercase"
            >
              &gt; ACCESS GRANTED
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-4 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-red-500/20 shadow-[0_0_30px_rgba(255,0,0,0.1)] py-3"
          : "bg-transparent border-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand & Wordmark */}
      <div className="flex items-center gap-4 group cursor-pointer">
        {/* Red Spider Logo */}
        <div className="w-12 h-12 flex items-center justify-center text-red-600 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all duration-300">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-10 h-10">
            <path d="M50 15c-5 0-10 6-10 12v15l-15-5-5-10-5 5 10 10 5 15-15 10-5-5-5 5 20 10h10v10h10v-10h10l20-10-5-5-5 5-15-10 5-15 10-10-5-5-5 10-15 5V27c0-6-5-12-10-12z" />
          </svg>
        </div>
        
        {/* Multiverse Wordmark */}
        <div className="hidden md:flex flex-col">
          <span className="font-display font-black text-4xl tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
            SPIDER-VERSE
          </span>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400">
            Multiverse Tracker
          </span>
        </div>
      </div>

      {/* Main Nav Links (Desktop) */}
      <div className="hidden lg:flex items-center gap-8">
        {['Anomalies', 'Timeline', 'Societies', 'Database'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors relative group"
          >
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full" />
            <span className="absolute -top-1 right-0 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
          </a>
        ))}
      </div>

      {/* Enter Multiverse CTA */}
      <motion.button
        onClick={handleAccessHQ}
        className="relative overflow-hidden group px-8 py-3 bg-white/5 border border-white/20 text-white font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]"
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Access HQ
        </span>
      </motion.button>
    </motion.nav>
    </>
  );
}
