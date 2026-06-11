type Shot = {
  size: "t" | "s" | "w" | "xt";
  caption: string;
  spec: string;
  name: string;
  idx: string;
  delay?: boolean;
};

const SHOTS: Shot[] = [
  { size: "t", caption: "Look 01 — full-figure obsidian", spec: "editorial · 900×1200", name: "Void Set", idx: "01 / 08" },
  { size: "s", caption: "Look 02 — hood detail", spec: "editorial · 1000×1000", name: "Monastic Hood", idx: "02 / 08" },
  { size: "xt", caption: "Look 03 — back sigil", spec: "editorial · 900×1350", name: "Spine Sigil", idx: "03 / 08", delay: true },
  { size: "w", caption: "Look 04 — layered fits", spec: "editorial · 1000×1250", name: "Ritual Layers", idx: "04 / 08" },
  { size: "t", caption: "Look 05 — motion blur", spec: "editorial · 900×1200", name: "Aesthetic Violence", idx: "05 / 08", delay: true },
  { size: "s", caption: "Look 06 — hardware macro", spec: "editorial · 1000×1000", name: "Oxidised Hardware", idx: "06 / 08" },
  { size: "w", caption: "Look 07 — group cult shot", spec: "editorial · 1000×1250", name: "The Congregation", idx: "07 / 08", delay: true },
  { size: "xt", caption: "Look 08 — silhouette", spec: "editorial · 900×1350", name: "Obsidian Silhouette", idx: "08 / 08" },
];

export function Lookbook() {
  return (
    <section className="section lookbook" id="lookbook" data-screen-label="lookbook">
      <div className="shell">
        <div className="section__head">
          <div data-reveal>
            <span className="eyebrow">Lookbook / FW25</span>
            <h2 className="h-section" style={{ marginTop: 22 }}>
              The
              <br />
              Devoted
            </h2>
          </div>
          <a className="link-arrow" href="#" data-reveal data-reveal-delay="1">
            View Full Editorial <i></i>
          </a>
        </div>

        <div className="masonry">
          {SHOTS.map((shot, i) => (
            <figure
              className={`shot shot--${shot.size}`}
              key={i}
              data-reveal
              data-reveal-delay={shot.delay ? "1" : undefined}
            >
              <div className="ph">
                <span className="ph__cap">
                  {shot.caption}
                  <b>{shot.spec}</b>
                </span>
              </div>
              <figcaption className="shot__cap">
                <b>{shot.name}</b>
                <span>{shot.idx}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
