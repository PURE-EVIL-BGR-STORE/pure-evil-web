/* The six occult sigils that drift behind the auth brand panel. */
export function AuthSigils() {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 100 100",
  };

  return (
    <>
      {/* 1: pentagram */}
      <svg className="auth-sigil auth-sigil--1" {...common}>
        <circle cx="50" cy="50" r="46" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="37" strokeWidth="0.4" strokeDasharray="3 2" />
        <path d="M50,13 L72,80 L15,39 L85,39 L28,80 Z" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="8" strokeWidth="1.2" />
        <circle cx="50" cy="13" r="2" fill="currentColor" />
        <circle cx="72" cy="80" r="2" fill="currentColor" />
        <circle cx="15" cy="39" r="2" fill="currentColor" />
        <circle cx="85" cy="39" r="2" fill="currentColor" />
        <circle cx="28" cy="80" r="2" fill="currentColor" />
      </svg>

      {/* 2: chaos star */}
      <svg className="auth-sigil auth-sigil--2" {...common}>
        <circle cx="50" cy="50" r="44" strokeWidth="0.6" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="10" strokeWidth="1.8" />
        <path d="M50,40 L50,6 M46,12 L50,6 L54,12" strokeWidth="1.6" />
        <path d="M57,43 L81,19 M73,17 L81,19 L79,27" strokeWidth="1.6" />
        <path d="M60,50 L94,50 M88,46 L94,50 L88,54" strokeWidth="1.6" />
        <path d="M57,57 L81,81 M79,73 L81,81 L73,83" strokeWidth="1.6" />
        <path d="M50,60 L50,94 M46,88 L50,94 L54,88" strokeWidth="1.6" />
        <path d="M43,57 L19,81 M21,73 L19,81 L27,83" strokeWidth="1.6" />
        <path d="M40,50 L6,50 M12,46 L6,50 L12,54" strokeWidth="1.6" />
        <path d="M43,43 L19,19 M27,17 L19,19 L21,27" strokeWidth="1.6" />
      </svg>

      {/* 3: eye of providence */}
      <svg className="auth-sigil auth-sigil--3" {...common}>
        <polygon points="50,5 96,88 4,88" strokeWidth="1.5" />
        <polygon points="50,20 83,77 17,77" strokeWidth="0.6" strokeDasharray="3 2" />
        <path d="M22,68 Q50,44 78,68" strokeWidth="1.3" />
        <path d="M22,68 Q50,86 78,68" strokeWidth="1.3" />
        <circle cx="50" cy="67" r="10" strokeWidth="1.2" />
        <circle cx="50" cy="67" r="4" fill="currentColor" />
        <circle cx="50" cy="5" r="2.2" fill="currentColor" />
        <circle cx="96" cy="88" r="2.2" fill="currentColor" />
        <circle cx="4" cy="88" r="2.2" fill="currentColor" />
      </svg>

      {/* 4: hexagram */}
      <svg className="auth-sigil auth-sigil--4" {...common}>
        <circle cx="50" cy="50" r="46" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="38" strokeWidth="0.4" strokeDasharray="3 2" />
        <polygon points="50,12 83,69 17,69" strokeWidth="1.3" />
        <polygon points="50,88 17,31 83,31" strokeWidth="1.3" />
        <circle cx="50" cy="50" r="9" strokeWidth="1.2" />
        <circle cx="50" cy="12" r="2" fill="currentColor" />
        <circle cx="83" cy="69" r="2" fill="currentColor" />
        <circle cx="17" cy="69" r="2" fill="currentColor" />
        <circle cx="50" cy="88" r="2" fill="currentColor" />
        <circle cx="17" cy="31" r="2" fill="currentColor" />
        <circle cx="83" cy="31" r="2" fill="currentColor" />
      </svg>

      {/* 5: vegvisir compass */}
      <svg className="auth-sigil auth-sigil--5" {...common}>
        <circle cx="50" cy="50" r="44" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="30" strokeWidth="0.4" strokeDasharray="4 3" />
        <circle cx="50" cy="50" r="7" strokeWidth="1.8" />
        <path d="M50,43 L50,7 M45,12 L50,7 L55,12 M47,10 L53,10" strokeWidth="1.4" />
        <path d="M50,57 L50,93 M45,88 L50,93 L55,88 M47,90 L53,90" strokeWidth="1.4" />
        <path d="M57,50 L93,50 M88,45 L93,50 L88,55 M90,47 L90,53" strokeWidth="1.4" />
        <path d="M43,50 L7,50 M12,45 L7,50 L12,55 M10,47 L10,53" strokeWidth="1.4" />
        <path d="M55,45 L80,20 M73,18 L80,20 L78,27" strokeWidth="1.1" />
        <path d="M55,55 L80,80 M78,73 L80,80 L73,78" strokeWidth="1.1" />
        <path d="M45,55 L20,80 M22,73 L20,80 L27,78" strokeWidth="1.1" />
        <path d="M45,45 L20,20 M27,18 L20,20 L22,27" strokeWidth="1.1" />
      </svg>

      {/* 6: wheel cross */}
      <svg className="auth-sigil auth-sigil--6" {...common}>
        <circle cx="50" cy="50" r="45" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="34" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="20" strokeWidth="0.9" />
        <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1.5" />
        <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1.5" />
        <line x1="18" y1="18" x2="82" y2="82" strokeWidth="0.7" />
        <line x1="82" y1="18" x2="18" y2="82" strokeWidth="0.7" />
        <circle cx="50" cy="50" r="6" strokeWidth="1.6" />
        <circle cx="50" cy="5" r="2.2" fill="currentColor" />
        <circle cx="50" cy="95" r="2.2" fill="currentColor" />
        <circle cx="5" cy="50" r="2.2" fill="currentColor" />
        <circle cx="95" cy="50" r="2.2" fill="currentColor" />
      </svg>
    </>
  );
}
