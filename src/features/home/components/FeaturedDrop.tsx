"use client";

import { useState } from "react";

const SIZES = [
  { label: "XS", out: false },
  { label: "S", out: false },
  { label: "M", out: false },
  { label: "L", out: false },
  { label: "XL", out: true },
];

export function FeaturedDrop() {
  const [active, setActive] = useState("S");

  return (
    <section className="section drop" id="drop" data-screen-label="featured-drop">
      <div className="shell">
        <div className="section__head">
          <div data-reveal>
            <span className="eyebrow">Featured Drop / 001</span>
          </div>
          <span className="section__index" data-reveal data-reveal-delay="1">
            Limited — 200 Units
          </span>
        </div>

        <div className="drop__grid">
          <div className="drop__visual" data-reveal>
            <span className="drop__stamp">New Arrival</span>
            <div className="ph">
              <span className="ph__cap">
                Void Hoodie — studio on-figure
                <b>product shot · 1200×1500</b>
              </span>
            </div>
          </div>

          <div className="drop__meta">
            <span className="eyebrow drop__eyebrow" data-reveal>
              Apparel — Heavyweight
            </span>
            <h2 className="drop__name" data-reveal data-reveal-delay="1">
              Void
              <br />
              Hoodie
            </h2>
            <p className="drop__price" data-reveal data-reveal-delay="1">
              <s>$240</s>$180 USD
            </p>
            <p className="drop__desc" data-reveal data-reveal-delay="2">
              600 GSM Japanese loopback fleece, garment-dyed in true obsidian. Raw-cut hem, oversized
              monastic hood, and the sigil screen-printed in matte oxblood across the spine. Cut for
              ritual, built for the obsessed.
            </p>

            <div className="drop__sizes" data-reveal data-reveal-delay="2">
              {SIZES.map((s) => (
                <button
                  key={s.label}
                  className={`drop__size${s.out ? " out" : ""}${active === s.label ? " active" : ""}`}
                  disabled={s.out}
                  onClick={() => !s.out && setActive(s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="drop__actions" data-reveal data-reveal-delay="3">
              <a className="btn btn--primary" href="#">
                <span>Add to Bag — $180</span>
              </a>
              <span className="drop__note">Free ritual shipping over $200</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
