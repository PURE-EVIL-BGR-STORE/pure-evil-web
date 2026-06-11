"use client";

import { useRef, useState } from "react";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function Cult() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim();
    if (!EMAIL_RE.test(val)) {
      inputRef.current?.focus();
      formRef.current?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-7px)" },
          { transform: "translateX(7px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 280, easing: "ease-in-out" },
      );
      const form = formRef.current;
      if (form) {
        form.style.borderColor = "var(--red-bright)";
        setTimeout(() => (form.style.borderColor = ""), 900);
      }
      return;
    }
    setDone(true);
  };

  return (
    <section className="cult" id="cult" data-screen-label="newsletter">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cult__sigil" src="/PURE_EVIL_LOGO_4.png" alt="" />
      <div className="cult__inner">
        <span className="eyebrow eyebrow--plain" data-reveal style={{ justifyContent: "center", width: "100%" }}>
          The Cult — Members Only
        </span>
        <h2 className="cult__h" data-reveal data-reveal-delay="1">
          Join the <em>Cult</em>
        </h2>
        <p className="cult__sub" data-reveal data-reveal-delay="2">
          First access to every drop. Encrypted ritual updates. Exclusive sigils never sold to the
          masses. Initiation is permanent.
        </p>

        {!done ? (
          <form className="cult__form" ref={formRef} onSubmit={onSubmit} data-reveal data-reveal-delay="2" noValidate>
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Initiate</button>
          </form>
        ) : (
          <p className="cult__ok">✦ &nbsp;You have been initiated</p>
        )}

        <p className="cult__fine" data-reveal data-reveal-delay="3">
          No mercy. No spam. Unsubscribe to renounce.
        </p>
      </div>
    </section>
  );
}
