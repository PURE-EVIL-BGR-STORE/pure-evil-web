"use client";

import { useMemo, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { AuthBrandPanel } from "../components/AuthBrandPanel";
import { EyeIcon } from "../components/EyeIcon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"firstName" | "lastName" | "username" | "email" | "password", string>>;

function scorePassword(v: string): number {
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[0-9!@#$%^&*_\-]/.test(v)) score++;
  return score;
}

const STRENGTH_LABEL = ["", "Weak", "Fair", "Strong"];

export function RegisterView() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const cardRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const score = useMemo(() => scorePassword(form.password), [form.password]);

  const segClass = (i: number) => {
    if (i === 0 && score >= 1) return score === 1 ? "w" : score === 2 ? "m" : "s";
    if (i === 1 && score >= 2) return score === 2 ? "m" : "s";
    if (i === 2 && score >= 3) return "s";
    return "";
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (form.username.trim().length < 3) next.username = "Min 3 characters";
    if (!EMAIL_RE.test(form.email)) next.email = "Valid email required";
    if (form.password.length < 8) next.password = "Min 8 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate();
    if (!ok) {
      cardRef.current?.classList.add("auth-shake");
      setTimeout(() => cardRef.current?.classList.remove("auth-shake"), 400);
      return;
    }
    if (!terms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setStatus("submitting");
    // TODO: wire to authService.register({ ...form })
    setTimeout(() => setStatus("done"), 1600);
  };

  return (
    <main className="auth-page">
      <AuthBrandPanel variant="register" />

      <section className="auth-right">
        <Link className="auth-right__back" href="/">
          <i /> Back
        </Link>

        <div className="auth-card auth-card--wide" ref={cardRef}>
          <div className="auth-card__deco auth-card__deco--top" />
          <div className="auth-card__glow" />

          <div className="auth-card__inner">
            <header className="auth-card__head">
              <span className="auth-card__eyebrow">New Member</span>
              <h1 className="auth-card__title">Initiate Profile</h1>
              <div className="auth-card__rule" />
            </header>

            <form onSubmit={onSubmit} noValidate>
              <div className="auth-fields">
                <div className="auth-fields-row">
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        className={`auth-input${errors.firstName ? " is-error" : ""}`}
                        id="firstName"
                        type="text"
                        placeholder="John"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={set("firstName")}
                      />
                    </div>
                    <span className={`auth-err${errors.firstName ? " on" : ""}`}>{errors.firstName}</span>
                  </div>
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        className={`auth-input${errors.lastName ? " is-error" : ""}`}
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={set("lastName")}
                      />
                    </div>
                    <span className={`auth-err${errors.lastName ? " on" : ""}`}>{errors.lastName}</span>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="username">
                    Username
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      className={`auth-input${errors.username ? " is-error" : ""}`}
                      id="username"
                      type="text"
                      placeholder="Your handle"
                      autoComplete="username"
                      value={form.username}
                      onChange={set("username")}
                    />
                  </div>
                  <span className={`auth-err${errors.username ? " on" : ""}`}>{errors.username}</span>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="email">
                    Email
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      className={`auth-input${errors.email ? " is-error" : ""}`}
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                  <span className={`auth-err${errors.email ? " on" : ""}`}>{errors.email}</span>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="password">
                    Passcode
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      className={`auth-input has-right${errors.password ? " is-error" : ""}`}
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="Create passcode"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={set("password")}
                    />
                    <button
                      className="auth-pw-btn"
                      type="button"
                      aria-label="Toggle password"
                      onClick={() => setShowPw((v) => !v)}
                    >
                      <EyeIcon open={!showPw} />
                    </button>
                  </div>
                  <div className="auth-strength">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`auth-strength__seg ${segClass(i)}`} />
                    ))}
                  </div>
                  {form.password.length > 0 && (
                    <span className="auth-strength__label">{STRENGTH_LABEL[score]}</span>
                  )}
                  <span className={`auth-err${errors.password ? " on" : ""}`}>{errors.password}</span>
                </div>

                <div className={`auth-consent${termsError ? " is-error" : ""}`}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={terms}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      if (e.target.checked) setTermsError(false);
                    }}
                  />
                  <label htmlFor="terms">
                    I accept the <a href="#">terms of initiation</a> and confirm I am ready to be
                    consumed.
                  </label>
                </div>
              </div>

              <button
                className="auth-submit"
                type="submit"
                disabled={status !== "idle"}
                style={status === "done" ? { background: "var(--red)", borderColor: "var(--red)", color: "var(--fg)" } : undefined}
              >
                <span>
                  {status === "submitting"
                    ? "Initiating…"
                    : status === "done"
                      ? "✦ Initiation Complete"
                      : "Create Access"}
                </span>
              </button>
            </form>
          </div>
          <div className="auth-card__deco auth-card__deco--bottom" />
        </div>

        <p className="auth-foot">
          Already initiated? <Link href="/login">Return to login</Link>
        </p>
      </section>
    </main>
  );
}
