import { AuthSigils } from "./AuthSigils";

type Props = {
  /** "login" shows the manifesto + return quote; "register" shows the initiation steps. */
  variant: "login" | "register";
};

export function AuthBrandPanel({ variant }: Props) {
  return (
    <aside className="auth-brand">
      <div className="auth-brand__glow" />
      <AuthSigils />

      <span className="auth-corner tl" />
      <span className="auth-corner br" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="auth-brand__logo" src="/PURE_EVIL_LOGO_3.png" alt="PURE EVIL" />
      <p className="auth-brand__tagline">Discipline · Builds · Freedom</p>

      {variant === "login" ? (
        <>
          <div className="auth-brand__manifesto">
            <p className="auth-brand__line">We are not</p>
            <p className="auth-brand__line">a clothing brand.</p>
            <p className="auth-brand__line dim">
              We are an <span className="red">identity—</span>
            </p>
            <p className="auth-brand__line dim">forged in obsession.</p>
          </div>
          <p className="auth-brand__quote">
            Return to the archive.
            <br />
            Your discipline awaits.
          </p>
        </>
      ) : (
        <>
          <div className="auth-brand__manifesto">
            <p className="auth-brand__line">Initiation</p>
            <p className="auth-brand__line">is permanent.</p>
            <p className="auth-brand__line dim">
              Become one of <span className="red">the obsessed.</span>
            </p>
          </div>
          <div className="auth-brand__steps">
            <div className="auth-brand__step">
              <span className="auth-brand__step-num">01</span>Create your identity
            </div>
            <div className="auth-brand__step">
              <span className="auth-brand__step-num">02</span>Join the inner circle
            </div>
            <div className="auth-brand__step">
              <span className="auth-brand__step-num">03</span>Access every drop first
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
