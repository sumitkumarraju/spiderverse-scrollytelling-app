export interface Character {
  id: string;
  name: string;
  alterEgo: string;
  universe: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  logoSvg: string;
  powers: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  originSection: { title: string; description: string };
  timeline: { year: string; event: string; description: string }[];
  dimensionSection: {
    status: string;
    threatLevel: string;
    keyLocations: string[];
    travelWarning: string;
    clearance: string;
  };
}

export const characters: Character[] = [
  {
    id: "miles",
    name: "Spider-Man",
    alterEgo: "Miles Morales",
    universe: "Earth-1610",
    description: "Brooklyn's one and only Spider-Man. Master of bio-electronics and camouflage.",
    folderPath: "/frames",
    themeColor: "#FF2A2A",
    gradient: "linear-gradient(135deg, #FF2A2A 0%, #900000 50%, #010101 100%)",
    // Specifically styled spray-painted/graffiti style spider SVG for Miles
    logoSvg: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 15c-5 0-10 6-10 12v15l-15-5-5-10-5 5 10 10 5 15-15 10-5-5-5 5 20 10h10v10h10v-10h10l20-10-5-5-5 5-15-10 5-15 10-10-5-5-5 10-15 5V27c0-6-5-12-10-12z" /></svg>`,
    powers: ["Venom Strike (Bio-electricity)", "Active Camouflage", "Enhanced Agility", "Spider-Sense"],
    stats: [
      { label: "Agility", val: "9.5" },
      { label: "Strength", val: "8.0" },
      { label: "Tech Aura", val: "High" },
      { label: "Origin", val: "Brooklyn" }
    ],
    section1: { title: "ANYONE CAN WEAR THE MASK", subtitle: "It's not about how you got the powers. It's about what you do with them. A leap of faith." },
    section2: { title: "VENOM STRIKE", subtitle: "Bio-electric energy channeling. A bio-kinetic shockwave that disrupts technology and stuns opponents." },
    section3: { title: "ACTIVE CAMOUFLAGE", subtitle: "Near-perfect invisibility. Bending light and sound to disappear into the urban background." },
    section4: { title: "EARTH-1610", subtitle: "The epicenter of the collider explosion. A dimension where the legacy of Spider-Man lives on in a teenager from Brooklyn." },
    detailsSection: { title: "THE MILES MORALES ANOMALY", description: "Bitten by an Alchemax genetically modified spider (Specimen 42). His abilities deviate significantly from the baseline Peter Parker genome, offering unprecedented tactical advantages.", imageAlt: "Miles Morales suit details" },
    originSection: { title: "A LEAP OF FAITH", description: "Taking the mantle after a tragedy. Learning to control the chaos. Discovering that being Spider-Man is about getting back up." },
    timeline: [
      { year: "2018 (E-1610)", event: "Bite Incident", description: "Bitten by Alchemax Specimen 42 spider in the abandoned subway." },
      { year: "2018 (E-1610)", event: "The Collider", description: "Witnessed the demise of Earth-1610's Peter Parker. Kingpin's collider bridges universes." },
      { year: "2019 (E-1610)", event: "Taking the Mantle", description: "Mastered Venom Strike and destroyed the Alchemax collider, sending the Spider-Gang home." }
    ],
    dimensionSection: {
      status: "Stable (Post-Collider)",
      threatLevel: "Moderate",
      keyLocations: ["Brooklyn Visions Academy", "Alchemax Facility Ruins", "Aunt May's House"],
      travelWarning: "Beware of residual dimensional tearing in the subway systems.",
      clearance: "Level 4 Authorized Only"
    }
  },
  {
    id: "gwen",
    name: "Spider-Woman",
    alterEgo: "Gwen Stacy",
    universe: "Earth-65",
    description: "Grace, precision, and a killer sense of rhythm. The ghost of Earth-65.",
    folderPath: "/frames",
    themeColor: "#00F0FF",
    gradient: "linear-gradient(135deg, #FF45B5 0%, #00F0FF 50%, #010101 100%)",
    // Sleek, ghostly/neon spider SVG for Gwen
    logoSvg: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 8l-6 18H32l8 12-10 24 12-8 8 20 8-20 12 8-10-24 8-12H56L50 8z" /></svg>`,
    powers: ["Acrobatic Mastery", "Dimensional Travel (Via Watch)", "Web-Shooters (Mary Janes)", "Precognitive Spider-Sense"],
    stats: [
      { label: "Agility", val: "10.0" },
      { label: "Strength", val: "7.5" },
      { label: "Rhythm", val: "Perfect" },
      { label: "Origin", val: "Chelsea" }
    ],
    section1: { title: "IN ANOTHER UNIVERSE", subtitle: "A world where Gwen Stacy was bitten. A world painted in neon and watercolor emotions." },
    section2: { title: "BALLET & BRAWL", subtitle: "Fighting style derived from contemporary dance. Fluid, unpredictable, and devastatingly precise." },
    section3: { title: "THE SPIDER-SOCIETY", subtitle: "Recruited across dimensions. Wearing a watch that defies the laws of quantum mechanics." },
    section4: { title: "WATERCOLOR REALITY", subtitle: "Earth-65's atmosphere bleeds color based on intense emotional resonance." },
    detailsSection: { title: "THE GHOST-SPIDER PROTOCOL", description: "Utilizing a custom-built dimensional travel watch. Her suit is woven from advanced unstable molecules, offering high-tensile strength while remaining incredibly lightweight for maximum aerodynamic efficiency.", imageAlt: "Gwen Stacy suit details" },
    originSection: { title: "THE DRUMMER'S BEAT", description: "Balancing the life of a superhero with the rhythm of a band. Carrying the weight of a friend's loss, turning grief into action." },
    timeline: [
      { year: "2014 (E-65)", event: "The Spider's Bite", description: "Bitten by a radioactive spider, gaining extraordinary abilities." },
      { year: "2015 (E-65)", event: "Tragedy of Peter", description: "Failed to save her universe's Peter Parker. Became a fugitive hunted by Captain Stacy." },
      { year: "2018 (Multiverse)", event: "Dimensional Breach", description: "Pulled into Earth-1610. Fought alongside Miles Morales to stop the Collider." }
    ],
    dimensionSection: {
      status: "Emotionally Resonant",
      threatLevel: "Low to Moderate",
      keyLocations: ["The Chelsea Pier", "Oscorp Towers", "The Mary Janes Rehearsal Space"],
      travelWarning: "Visual palette shifts dramatically based on local emotional events. Disorienting for first-time travelers.",
      clearance: "Level 3 Authorized Only"
    }
  },
  {
    id: "miguel",
    name: "Spider-Man 2099",
    alterEgo: "Miguel O'Hara",
    universe: "Earth-928",
    description: "The ninja of tomorrow. A genetically spliced warrior fighting to preserve the canon.",
    folderPath: "/frames",
    themeColor: "#FF0000",
    gradient: "linear-gradient(135deg, #FF0000 0%, #0F00B5 50%, #010101 100%)",
    // Aggressive, skull-like futuristic spider for Miguel
    logoSvg: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50 10l-15 15v10l-15-5-10 15 15 10-10 20 15-15 10 10h10l10-10 15 15-10-20 15-10-10-15-15 5V25L50 10zm0 30c5 0 8 5 8 10s-3 10-8 10-8-5-8-10 3-10 8-10z" /></svg>`,
    powers: ["Organic Web-Spinning", "Talons & Fangs", "Accelerated Vision", "Paralytic Venom"],
    stats: [
      { label: "Agility", val: "9.0" },
      { label: "Strength", val: "10.0" },
      { label: "Tech Level", val: "Future" },
      { label: "Origin", val: "Nueva York" }
    ],
    section1: { title: "THE CANON MUST SURVIVE", subtitle: "Carrying the burden of the multiverse. Making the hard choices to prevent timeline collapse." },
    section2: { title: "GENETICALLY ENGINEERED", subtitle: "50% Spider DNA. No radioactive bite. Claws, fangs, and organic webbing. A predator." },
    section3: { title: "THE SPIDER-SOCIETY HQ", subtitle: "Commanding an army of anomalies. Overseeing the web of life and destiny from Nueva York." },
    section4: { title: "NUEVA YORK", subtitle: "A cyberpunk metropolis built on the ruins of the old world. Corporate controlled, hero defended." },
    detailsSection: { title: "THE ALCHEMAX SPLICING", description: "An attempted genetic rewrite gone wrong (or right). His biometry includes retractable talons on fingers and toes, elongated canine teeth capable of secreting a paralyzing agent, and enhanced visual acuity.", imageAlt: "Miguel O'Hara suit details" },
    originSection: { title: "A WORLD OF TOMORROW", description: "Trapped in a future ruled by mega-corporations. Accidentally altering his genetic code to escape addiction, creating a new kind of Spider-Man." },
    timeline: [
      { year: "2099 (E-928)", event: "The Alchemax Splice", description: "DNA spliced with a spider to purge Rapture addiction. Gained organic webs and talons." },
      { year: "???? (Multiverse)", event: "The Timeline Collapse", description: "Replaced another Miguel in a parallel universe. Resulted in the destruction of that entire reality." },
      { year: "???? (Multiverse)", event: "Founding the Society", description: "Established the Spider-Society in Nueva York (Earth-928) to protect the Canon Events." }
    ],
    dimensionSection: {
      status: "Technologically Advanced",
      threatLevel: "High (Corporate Surveillance)",
      keyLocations: ["Alchemax Global HQ", "Spider-Society Citadel", "Downtown Slums"],
      travelWarning: "Extreme verticality and strict Alchemax patrols. Unauthorized dimensional insertion highly discouraged.",
      clearance: "Level 5 (HQ Level) Required"
    }
  }
];
