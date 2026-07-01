type Collection = {
  idx: string;
  count: string;
  name: string;
  tag: string;
  caption: string;
  img: string;
};

const COLLECTIONS: Collection[] = [
  { 
    idx: "01 / 04", 
    count: "18 Pieces", 
    name: "Void", 
    tag: "Embrace the emptiness", 
    caption: "Void editorial — full-bleed",
    img: "/look_obsidian.png"
  },
  { 
    idx: "02 / 04", 
    count: "12 Pieces", 
    name: "Ascension", 
    tag: "Rise beyond mortality", 
    caption: "Ascension editorial — full-bleed",
    img: "/look_ascension.png"
  },
  { 
    idx: "03 / 04", 
    count: "9 Pieces", 
    name: "Ritual", 
    tag: "Sacred darkness", 
    caption: "Ritual editorial — full-bleed",
    img: "/look_ritual.png"
  },
  { 
    idx: "04 / 04", 
    count: "14 Pieces", 
    name: "Eclipse", 
    tag: "Mark of the devoted", 
    caption: "Eclipse editorial — full-bleed",
    img: "/look_eclipse.png"
  },
];

export function Collections() {
  return (
    <section className="section collections" id="collections" data-screen-label="collections">
      <div className="shell">
        <div className="section__head">
          <div data-reveal>
            <span className="eyebrow">Collections / FW25</span>
            <h2 className="h-section" style={{ marginTop: 22 }}>
              Enter
              <br />
              the Void
            </h2>
          </div>
          <a className="link-arrow" href="#" data-reveal data-reveal-delay="1">
            All Collections <i></i>
          </a>
        </div>

        <div className="col-grid">
          {COLLECTIONS.map((c, i) => (
            <a className="col-card" href="#" key={c.name} data-reveal data-reveal-delay={i % 2 === 1 ? "1" : undefined}>
              <div className="col-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={c.img} 
                  alt={c.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-card__shade"></div>
              <div className="col-card__body">
                <div className="col-card__top">
                  <span className="col-card__idx">{c.idx}</span>
                  <span className="col-card__count">{c.count}</span>
                </div>
                <div>
                  <h3 className="col-card__name">{c.name}</h3>
                  <span className="col-card__tag">
                    <i></i>
                    {c.tag}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
