"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 border-t border-white/10 z-10 overflow-hidden comic-panel border-b-0 border-l-0 border-r-0">
      <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        
        {/* Brand Block */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-red-500/50 bg-black flex items-center justify-center shadow-[0_0_15px_rgba(255,0,0,0.3)]">
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v4h-2zm0 6h2v6h-2z" />
              </svg>
            </div>
            <span className="font-display font-black tracking-tighter text-2xl uppercase">
              Alchemax
            </span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Monitoring dimensional stability and tracking multiversal anomalies across the tangled web of life and destiny.
          </p>
          <div className="flex gap-4">
            {['Comms', 'Intel', 'Sectors'].map(social => (
              <a key={social} href={`#${social.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Dimension Links */}
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Active Sectors
          </h4>
          <ul className="space-y-4 font-mono text-sm">
            {['Earth-1610 (Miles Morales)', 'Earth-65 (Gwen Stacy)', 'Earth-928 (Nueva York)', 'Earth-42 (Prowler)', 'Earth-199999'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Database Links */}
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Society DB
          </h4>
          <ul className="space-y-4 text-sm font-medium tracking-wide">
            {['Anomaly Ledger', 'Timeline Viewer', 'Goober Tech', 'Watch Calibration', 'Council Directives'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                   <div className="w-1 h-1 bg-white/20 group-hover:bg-blue-500 transition-colors" /> {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Society Registration */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
           <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">Join The Society</h4>
           <p className="text-white/50 text-sm mb-4">
             Sign up for emergency multiversal alerts and anomaly tracking coordinates directly to your device.
           </p>
           <form className="relative" onSubmit={(e) => e.preventDefault()}>
             <input 
               type="email" 
               placeholder="Enter Dimension ID" 
               className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors font-mono"
             />
             <button 
               type="submit"
               className="absolute right-2 top-2 bottom-2 px-6 bg-red-600 text-white text-xs font-black tracking-[0.2em] uppercase hover:bg-red-500 transition-colors border-2 border-transparent hover:border-black shadow-[0_0_15px_rgba(255,0,0,0.5)]"
             >
               Submit
             </button>
           </form>
           
           <div className="mt-6 flex items-center gap-3 border border-white/5 bg-black/40 p-3 rounded-lg w-max">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-mono text-green-500">Multiverse: STABLE</span>
           </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs font-mono">
        <p>IDENTIFIER: E-1610-MM // © {new Date().getFullYear()} SPIDER-SOCIETY HQ.</p>
        <div className="flex gap-6">
          <a href="#canon" className="hover:text-red-400 transition-colors">Canon Event Policy</a>
          <a href="#anomalies" className="hover:text-red-400 transition-colors">Anomaly Protocol</a>
        </div>
      </div>

      {/* Huge Background Text */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center opacity-5 pointer-events-none whitespace-nowrap overflow-hidden">
        <motion.span 
          className="text-[18vw] font-black tracking-tighter mix-blend-overlay uppercase glitch-text"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          data-text="THE MULTIVERSE IS A WEB"
        >
          THE MULTIVERSE IS A WEB • THE MULTIVERSE IS A WEB • 
        </motion.span>
      </div>
    </footer>
  );
}
