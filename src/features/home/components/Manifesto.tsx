export function Manifesto() {
  return (
    <section className="section manifesto" id="manifesto" data-screen-label="manifesto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="manifesto__sigil" src="/PURE_EVIL_LOGO_3.png" alt="" data-drift="0.04" />
      <div className="manifesto__grid">
        <div className="manifesto__label" data-reveal>
          <span>Manifesto</span>
          <b>/ 001</b>
        </div>
        <div className="manifesto__lines">
          <p className="manifesto__line" data-reveal>
            We are not
          </p>
          <p className="manifesto__line" data-reveal data-reveal-delay="1">
            a clothing brand.
          </p>
          <p className="manifesto__line dim" data-reveal data-reveal-delay="2">
            We are an <span className="red">identity</span>—
          </p>
          <p className="manifesto__line dim" data-reveal data-reveal-delay="3">
            a manifestation of obsession,
          </p>
          <p className="manifesto__line dim" data-reveal data-reveal-delay="4">
            discipline &amp; aesthetic violence.
          </p>
        </div>
        <div className="manifesto__foot" data-reveal data-reveal-delay="2">
          <div>
            <h4>The Doctrine</h4>
            <p>
              Every garment is a ritual. Cut sharp, dyed in obsidian, marked with the sigil. Worn by
              those who refuse the ordinary.
            </p>
          </div>
          <div>
            <h4>The Material</h4>
            <p>
              Heavyweight Japanese fleece, raw-edge construction, oxidised hardware. Built to outlast
              the trends that fear it.
            </p>
          </div>
          <div>
            <h4>The Code</h4>
            <p>
              Discipline builds freedom. Restraint becomes power. We do not chase the light — we
              master the dark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
