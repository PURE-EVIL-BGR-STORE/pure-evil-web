export interface SigilProps {
  className?: string;
  variant?: "berserk" | "celestial" | "gothic-cross" | "eclipse";
}

export function Sigil({ className = "", variant = "celestial" }: SigilProps) {
  if (variant === "berserk") {
    // Brand of Sacrifice / Gothic Jagged Runic style
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Runic outer guide circles */}
        <circle cx="50" cy="50" r="45" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
        
        {/* Runic cross bars */}
        <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.8" />
        <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.8" />
        
        {/* Berserk-inspired Brand mark */}
        <path d="M50,15 L50,85" strokeWidth="2.5" />
        <path d="M50,30 L25,43 L50,56 L50,30" strokeWidth="2.2" fill="none" />
        <path d="M50,30 L75,43 L50,56 L50,30" strokeWidth="2.2" fill="none" />
        
        {/* Upper diagonal thorn prongs */}
        <path d="M50,43 L32,20" strokeWidth="2" />
        <path d="M50,43 L68,20" strokeWidth="2" />
        
        {/* Lower crossbar and horns */}
        <path d="M22,70 L78,70" strokeWidth="1.8" />
        <path d="M30,70 L50,58 L70,70" strokeWidth="1.8" />
        
        {/* Intricate binding crescent */}
        <path d="M32,50 A18,18 0 0,0 68,50" strokeWidth="1.2" />
        
        {/* Outer mini-nodes */}
        <circle cx="50" cy="95" r="1.5" fill="currentColor" />
        <circle cx="50" cy="5" r="1.5" fill="currentColor" />
        <circle cx="5" cy="50" r="1.5" fill="currentColor" />
        <circle cx="95" cy="50" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "gothic-cross") {
    // Gothic Cathedral architecture & Thorn Inverted Cross
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer ring */}
        <circle cx="50" cy="50" r="45" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="32" strokeWidth="0.5" strokeDasharray="4 2" />
        
        {/* Vertical spear (Inverted Cross core) */}
        <path d="M50,6 L50,94" strokeWidth="2" />
        
        {/* Pointy double horizontal crossbars */}
        <path d="M12,42 L88,42" strokeWidth="1.5" />
        <path d="M12,52 L88,52" strokeWidth="1.5" />
        
        {/* Central diamond core */}
        <polygon points="50,28 66,47 50,66 34,47" strokeWidth="1.5" />
        
        {/* Halo rays */}
        <path d="M20,20 L80,80" strokeWidth="0.8" />
        <path d="M80,20 L20,80" strokeWidth="0.8" />
        
        {/* Thorn-like arcs (cathedral tracery) */}
        <path d="M28,28 A25,25 0 0,1 50,12" strokeWidth="1" />
        <path d="M72,28 A25,25 0 0,0 50,12" strokeWidth="1" />
        <path d="M28,72 A25,25 0 0,0 50,88" strokeWidth="1" />
        <path d="M72,72 A25,25 0 0,1 50,88" strokeWidth="1" />
        
        {/* Small teardrop sharp accents */}
        <path d="M50,6 L45,18 L55,18 Z" strokeWidth="1" fill="none" />
        <path d="M50,94 L45,82 L55,82 Z" strokeWidth="1" fill="none" />
      </svg>
    );
  }

  if (variant === "eclipse") {
    // Eclipse & Spiked Thorn Halo (Solomon / Berserk Eclipse theme)
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Concentric rings */}
        <circle cx="50" cy="50" r="45" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="36" strokeWidth="0.6" strokeDasharray="3 1.5" />
        
        {/* Eclipse solid core */}
        <circle cx="50" cy="50" r="18" strokeWidth="2.5" />
        
        {/* Spiked thorn rays */}
        <path d="M36,36 L18,18 L39,32 Z" strokeWidth="1" />
        <path d="M64,36 L82,18 L61,32 Z" strokeWidth="1" />
        <path d="M36,66 L18,82 L39,68 Z" strokeWidth="1" />
        <path d="M64,66 L82,82 L61,68 Z" strokeWidth="1" />
        
        {/* Top/bottom dominant prongs */}
        <path d="M50,28 L50,3" strokeWidth="1.8" />
        <path d="M50,72 L50,97" strokeWidth="1.8" />
        
        {/* Crescent moon crossing */}
        <path d="M12,50 A38,38 0 0,1 88,50" strokeWidth="1.2" />
        <path d="M12,50 A38,38 0 0,0 88,50" strokeWidth="0.8" strokeDasharray="4 2" />
        
        {/* Crosshair lines */}
        <line x1="4" y1="50" x2="96" y2="50" strokeWidth="0.6" />
        
        {/* Sigil nodes */}
        <circle cx="18" cy="18" r="2.5" strokeWidth="1" />
        <circle cx="82" cy="18" r="2.5" strokeWidth="1" />
        <circle cx="18" cy="82" r="2.5" strokeWidth="1" />
        <circle cx="82" cy="82" r="2.5" strokeWidth="1" />
      </svg>
    );
  }

  // default: "celestial" (Solomon Grimoire / Breathdivinity complex seal)
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Heavy concentric geometry */}
      <circle cx="50" cy="50" r="46" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="42" strokeWidth="0.6" strokeDasharray="2 1.5" />
      <circle cx="50" cy="50" r="30" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="10" strokeWidth="1.2" />

      {/* Axis crosslines with extended points */}
      <line x1="50" y1="1" x2="50" y2="99" strokeWidth="0.8" />
      <line x1="1" y1="50" x2="99" y2="50" strokeWidth="0.8" />
      <line x1="15" y1="15" x2="85" y2="85" strokeWidth="0.6" />
      <line x1="85" y1="15" x2="15" y2="85" strokeWidth="0.6" />

      {/* Primary Hexagram star */}
      <polygon points="50,16 21,66 79,66" strokeWidth="1" />
      <polygon points="50,84 21,34 79,34" strokeWidth="1" />

      {/* Node circles at vertices */}
      <circle cx="50" cy="16" r="2.2" strokeWidth="1" fill="var(--bg-primary)" />
      <circle cx="50" cy="84" r="2.2" strokeWidth="1" fill="var(--bg-primary)" />
      <circle cx="21" cy="34" r="2.2" strokeWidth="1" fill="var(--bg-primary)" />
      <circle cx="79" cy="34" r="2.2" strokeWidth="1" fill="var(--bg-primary)" />
      <circle cx="21" cy="66" r="2.2" strokeWidth="1" fill="var(--bg-primary)" />
      <circle cx="79" cy="66" r="2.2" strokeWidth="1" fill="var(--bg-primary)" />

      {/* Tiny outer crescent loops */}
      <path d="M5,50 A45,45 0 0,1 95,50" strokeWidth="0.5" />
      
      {/* Celestial boundary dashes */}
      <circle cx="50" cy="50" r="24" strokeWidth="0.5" strokeDasharray="1 3" />
    </svg>
  );
}
