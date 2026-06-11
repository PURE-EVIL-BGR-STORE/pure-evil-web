const PHRASES = [
  "Controlled Insanity",
  "Aesthetic Violence",
  "Est. MMXXV",
  "Obsession Is A Gift",
  "Discipline Builds Freedom",
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
