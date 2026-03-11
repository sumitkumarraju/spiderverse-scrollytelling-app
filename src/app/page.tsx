"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { characters } from "@/data/characters";
import type { Character } from "@/data/characters";
import HeroSequenceScroll from "@/components/HeroSequenceScroll";
import TextOverlays from "@/components/TextOverlays";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, filter: "blur(10px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 1.05, filter: "blur(20px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enteringPortal, setEnteringPortal] = useState(false);
  const character = characters[currentIndex];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const switchCharacter = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= characters.length || newIndex === currentIndex) return;
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const prevCharacter = useCallback(() => {
    const newIndex = currentIndex === 0 ? characters.length - 1 : currentIndex - 1;
    switchCharacter(newIndex);
  }, [currentIndex, switchCharacter]);

  const nextCharacter = useCallback(() => {
    const newIndex = currentIndex === characters.length - 1 ? 0 : currentIndex + 1;
    switchCharacter(newIndex);
  }, [currentIndex, switchCharacter]);

  // Reset scroll on character change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentIndex]);

  const nextChar = characters[(currentIndex + 1) % characters.length];

  const handlePortalEnter = () => {
    setEnteringPortal(true);
    setTimeout(() => {
      // Simulate dimensional jump
      setEnteringPortal(false);
      nextCharacter(); // Just jumps to next char for demo purposes
    }, 2000);
  };

  return (
    <main className="relative bg-spider-black min-h-screen">
      <Navbar />

      {/* Portal Overlay */}
      <AnimatePresence>
        {enteringPortal && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 50 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="fixed inset-0 z-[200] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${character.themeColor} 0%, transparent 60%)`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        )}
      </AnimatePresence>

      {/* Fixed left/right arrows */}
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50">
        <motion.button
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevCharacter}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white/50 hover:text-white hover:border-white transition-colors spider-web-bg"
          style={{ hover: { borderColor: character.themeColor } } as any}
          aria-label="Previous dimension"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      </div>

      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50">
        <motion.button
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextCharacter}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white/50 hover:text-white hover:border-white transition-colors spider-web-bg"
          style={{ hover: { borderColor: character.themeColor } } as any}
          aria-label="Next dimension"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Bottom character picker pills */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 p-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          {characters.map((char, i) => (
            <motion.button
              key={char.id}
              whileHover={{ scale: i === currentIndex ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchCharacter(i)}
              className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                i === currentIndex
                  ? "text-white shadow-lg"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
              style={{
                backgroundColor: i === currentIndex ? char.themeColor : "transparent",
                boxShadow: i === currentIndex ? `0 0 20px ${char.themeColor}88` : "none"
              }}
            >
              {char.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Animated content wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={character.id}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          ref={scrollContainerRef}
        >
          {/* Scroll Sequence + Text */}
          <div id="anomalies" className="relative">
             <HeroSequenceScroll character={character} />
             <TextOverlays character={character} />
          </div>

          {/* Dossier Section / Stats & Powers */}
          <section id="database" className="relative py-32 bg-black overflow-hidden z-10 comic-panel border-t-0">
            <div className="absolute inset-0 opacity-10 halftone-bg" style={{ background: character.gradient }} />
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="relative max-w-7xl mx-auto px-6"
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={fadeUp}>
                  <div className="text-sm font-black tracking-[0.3em] uppercase mb-4" style={{ color: character.themeColor }}>
                    Identity Confirmed
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                    <div 
                      className="w-24 h-24 p-2 rounded-full border border-white/20 bg-black/50 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-white flex-shrink-0 flex items-center justify-center transition-all duration-500 hover:scale-110"
                      style={{ color: character.themeColor }}
                      dangerouslySetInnerHTML={{ __html: character.logoSvg }} 
                    />
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none glitch-text" data-text={character.detailsSection.title}>
                      {character.detailsSection.title}
                    </h2>
                  </div>
                  <p className="text-xl font-bold text-white/80 mb-6 uppercase tracking-widest border-l-4 pl-4" style={{ borderColor: character.themeColor }}>
                    {character.alterEgo}
                  </p>
                  <p className="text-white/60 text-lg leading-relaxed mb-12">
                    {character.detailsSection.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {character.stats.map((stat, i) => (
                      <div key={i} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                        <div className="text-4xl font-black mb-2" style={{ color: character.themeColor }}>{stat.val}</div>
                        <div className="text-white/40 text-xs font-bold tracking-widest uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div variants={fadeUp} className="relative group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10 rounded-3xl" />
                   <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-xl overflow-hidden relative spider-web-bg h-[600px] flex flex-col justify-end transition-transform duration-500 group-hover:scale-[1.02] shadow-2xl shadow-black">
                     <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundImage: `url(${character.folderPath}/ezgif-frame-120.jpg)` }} />
                     
                     <div className="relative z-20">
                       <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest">
                         <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: character.themeColor }} />
                         Signature Abilities
                       </h3>
                       <div className="space-y-3">
                         {character.powers.map((power, i) => (
                           <motion.div 
                             key={i} 
                             whileHover={{ x: 10 }}
                             className="p-4 bg-black/60 rounded-xl border border-white/10 backdrop-blur-md font-bold text-white overflow-hidden relative group/power"
                           >
                             <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover/power:w-full" />
                             <span className="relative z-10">{power}</span>
                           </motion.div>
                         ))}
                       </div>
                     </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Interactive Timeline & Origin Section */}
          <section id="timeline" className="relative py-32 bg-zinc-950 z-10 border-t border-white/5">
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              className="max-w-5xl mx-auto px-6"
            >
              <div className="text-center mb-20">
                <motion.div variants={fadeUp}>
                  <div className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: character.themeColor }}>
                    Database Record
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
                    {character.originSection.title}
                  </h2>
                  <div className="w-24 h-2 mx-auto mb-8 rounded-full" style={{ backgroundColor: character.themeColor }} />
                  <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                    {character.originSection.description}
                  </p>
                </motion.div>
              </div>

              {/* Fictional Timeline Widget */}
              <motion.div variants={fadeUp} className="relative mt-16 pt-12 border-t border-white/10">
                <h3 className="text-2xl font-black mb-12 text-center tracking-widest uppercase">Temporal Anomalies Detected</h3>
                <div className="relative">
                  {/* Timeline track */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full hidden md:block" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {character.timeline.map((item, i) => (
                      <motion.div key={i} whileHover={{ y: -10 }} className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 cursor-pointer group mt-12 md:mt-0 shadow-lg shadow-black/50">
                        <div className="text-xs font-mono text-white/40 mb-3 text-center tracking-widest border border-white/10 rounded-full py-1 w-max mx-auto px-4 group-hover:bg-white/10 transition-colors uppercase">{item.year}</div>
                        <div 
                          className="w-4 h-4 rounded-full mx-auto mb-4 border-2 border-black group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                          style={{ backgroundColor: i === character.timeline.length - 1 ? "#fff" : character.themeColor }} 
                        />
                        <h4 className="font-bold text-center mb-2 uppercase tracking-wide text-white/90">{item.event}</h4>
                        <p className="text-sm text-white/50 text-center line-clamp-3">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Dimension Portal / Enterprise Multiverse Section */}
          <section id="societies" className="relative py-40 overflow-hidden z-10 flex items-center justify-center min-h-[80vh]">
            <div className="absolute inset-0" style={{ background: character.gradient, opacity: 0.15 }} />
            
            {/* Animated Portal Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-[800px] h-[800px] rounded-full border border-white/5 border-dashed" />
              <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[600px] h-[600px] rounded-full border border-white/10" style={{ borderColor: `${character.themeColor}55` }} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-4xl mx-auto px-6 text-center z-10"
            >
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 drop-shadow-2xl text-white uppercase glitch-text" data-text={character.universe}>
                {character.universe}
              </h2>
              <p className="text-white/80 text-xl font-medium tracking-widest uppercase mb-12">
                Status: {character.dimensionSection.status}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-16">
                 <span className="px-5 py-2 bg-black/40 backdrop-blur-md rounded-full text-sm font-bold border border-red-500/50 text-red-400">
                   THREAT: {character.dimensionSection.threatLevel}
                 </span>
                 <span className="px-5 py-2 bg-black/40 backdrop-blur-md rounded-full text-sm font-bold border border-blue-500/50 text-blue-400">
                   CLEARANCE: {character.dimensionSection.clearance}
                 </span>
              </div>

              {/* Enter Multiverse Button */}
              <motion.button
                onClick={handlePortalEnter}
                whileHover={{ scale: 1.05, boxShadow: `0 0 80px ${character.themeColor}` }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-14 py-6 bg-white text-black text-2xl font-black tracking-[0.3em] uppercase rounded-full transition-all overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Initialize Portal
                  <svg className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </motion.button>

              <div className="mt-16 space-y-2 text-white/50 text-sm font-mono bg-black/40 p-6 rounded-xl border border-white/5 backdrop-blur-sm max-w-xl mx-auto text-left">
                <p className="text-green-400">&gt; ALCHEMAX_SYS_OVERRIDE_ACCEPTED</p>
                <p>&gt; WARNING: {character.dimensionSection.travelWarning}</p>
                <p>&gt; DESTINATIONS CONFIRMED: {character.dimensionSection.keyLocations.join(" // ")}</p>
              </div>
            </motion.div>
          </section>

          {/* Next Dimension CTA */}
          <section className="relative py-24 bg-black z-10 border-t border-white/10">
             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto px-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Tracking Anomaly
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
                    {nextChar.name}
                  </h3>
                  <p className="text-white/60 mt-3 text-xl font-light tracking-widest uppercase">{nextChar.universe} • {nextChar.alterEgo}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextCharacter}
                  className="flex items-center gap-6 group"
                >
                  <span className="text-xl font-black tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
                    Track Target
                  </span>
                  <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    <svg className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </section>

          <Footer />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
