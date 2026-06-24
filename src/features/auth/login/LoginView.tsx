"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import { AuthBrandPanel } from "../components/AuthBrandPanel";
import { EyeIcon } from "../components/EyeIcon";
import { GoogleIcon } from "../components/GoogleIcon";
import { authService } from "../services/auth.service";
import { toast } from "sonner";

export function LoginView() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => identifier.trim().length > 0 && password.trim().length > 0,
    [identifier, password],
  );

  const validate = () => {
    const next: typeof errors = {};
    if (!identifier.trim()) next.identifier = "Required";
    if (!password.trim()) next.password = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await authService.login({ identifier, password });
      toast.success("Welcome back!");
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err: any) {
      console.error("Login Error:", err);
      toast.error(err?.response?.data?.error || err?.message || "Invalid credentials.");
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <AuthBrandPanel variant="login" />

      <section className="auth-right">
        <Link className="auth-right__back" href="/">
          <i /> Back
        </Link>

        <div className="auth-card">
          <div className="auth-card__deco auth-card__deco--top" />
          <div className="auth-card__glow" />

          <div className="auth-card__inner">
            <header className="auth-card__head">
              <span className="auth-card__eyebrow">Enter the Archive</span>
              <div className="auth-card__rule" />
            </header>

            <form onSubmit={onSubmit} noValidate>
              <div className="auth-fields">
                <div className="auth-field">
                  <label className="auth-label" htmlFor="identifier">
                    Identity
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      className={`auth-input${errors.identifier ? " is-error" : ""}`}
                      id="identifier"
                      type="text"
                      placeholder="Username or email"
                      autoComplete="username"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      onBlur={validate}
                    />
                  </div>
                  <span className={`auth-err${errors.identifier ? " on" : ""}`}>{errors.identifier}</span>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="password">
                    Passcode
                    <a href="#">Forgotten?</a>
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      className={`auth-input has-right${errors.password ? " is-error" : ""}`}
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="Enter passcode"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={validate}
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
                  <span className={`auth-err${errors.password ? " on" : ""}`}>{errors.password}</span>
                </div>
              </div>

              <button className="auth-submit" type="submit" disabled={!canSubmit || submitting}>
                <span>{submitting ? "Verifying…" : "Proceed"}</span>
              </button>
            </form>

            <div className="auth-divider">
              <span className="auth-divider__line" />
              <span className="auth-divider__label">Or</span>
              <span className="auth-divider__line" />
            </div>

            <button className="auth-google" type="button">
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
          <div className="auth-card__deco auth-card__deco--bottom" />
        </div>

        <p className="auth-foot">
          Not initiated? <Link href="/register">Create Access</Link>
        </p>
      </section>
    </main>
  );
}
