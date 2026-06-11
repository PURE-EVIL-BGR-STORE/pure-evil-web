export function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="hero">
      <div className="hero__embers" data-drift-x></div>
      <span className="hero__crosshair tl"></span>
      <span className="hero__crosshair tr"></span>
      <span className="hero__crosshair bl"></span>
      <span className="hero__crosshair br"></span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__logo" src="/PURE_EVIL_LOGO_3.png" alt="PURE EVIL" />
      <h1 className="hero__tagline">
        Discipline<span className="amp"> · </span>Builds<span className="amp"> · </span>Freedom
      </h1>
      <p className="hero__sub">Controlled Insanity — Forged for the Obsessed</p>

      <div className="hero__cta-row">
        <a className="btn btn--primary" href="#collections">
          <span>Enter the Void</span>
        </a>
        <a className="btn btn--ghost" href="#drop">
          <span>The Latest Drop</span>
        </a>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <i></i>
      </div>
    </section>
  );
}
