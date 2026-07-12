const PHRASES = [
  "Elysian Fields",
  "Tartarus Systems",
  "Underworld Doctrine",
  "Obsession Is A Gift",
  "Pride And Punishment",
  "Mortal Soil",
  "Est. MMXXV",
];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      {/* doubled content gives the marquee a seamless -50% loop */}
      <div className="ticker__track">
        {[...PHRASES, ...PHRASES].map((phrase, i) => (
          <span key={i}>{phrase}</span>
        ))}
      </div>
    </div>
  );
}
