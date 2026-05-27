"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
    general?: string;
  }>({});
  const [touched, setTouched] = useState<{
    identifier?: boolean;
    password?: boolean;
  }>({});
  const [timestamp, setTimestamp] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      setTimestamp(now.toISOString().replace("T", " // ").slice(0, -5));
    };
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    setSessionId(Math.random().toString(36).substring(2, 10).toUpperCase());
    return () => clearInterval(interval);
  }, []);

  const validateIdentifier = (value: string) => {
    if (!value.trim()) return "FIELD REQUIRED";
    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "INVALID FORMAT";
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (!value) return "FIELD REQUIRED";
    if (value.length < 6) return "MIN 6 CHARACTERS";
    return undefined;
  };

  const handleInputChange = (field: "identifier" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = field === "identifier" 
        ? validateIdentifier(value) 
        : validatePassword(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
    
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleBlur = (field: "identifier" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field];
    const error = field === "identifier" 
      ? validateIdentifier(value) 
      : validatePassword(value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const identifierError = validateIdentifier(formData.identifier);
    const passwordError = validatePassword(formData.password);
    
    setTouched({ identifier: true, password: true });
    setErrors({ identifier: identifierError, password: passwordError });
    
    if (identifierError || passwordError) return;
    
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (formData.identifier === "test@test.com" && formData.password === "password") {
      setIsLoading(false);
      return;
    }
    
    setErrors({ general: "ACCESS DENIED // INVALID CREDENTIALS" });
    setIsLoading(false);
  };

  const isFormValid = !validateIdentifier(formData.identifier) && !validatePassword(formData.password);

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Grid lines background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(to right, #F5F5F5 1px, transparent 1px),
            linear-gradient(to bottom, #F5F5F5 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Scanline effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Terminal Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between text-[10px] text-text-muted font-mono tracking-wider mb-4">
            <span>SYS.AUTH.V2.4</span>
            <span>{timestamp}</span>
          </div>
          
          <Link href="/" className="block group">
            <div className="border border-border-soft p-6 bg-bg-secondary/50 relative overflow-hidden">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-text-muted/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-text-muted/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-text-muted/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-text-muted/30" />
              
              <h1 className="text-4xl font-bold tracking-[0.3em] text-text-primary uppercase text-center">
                PURE EVIL
              </h1>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="h-px flex-1 bg-border" />
                <p className="text-[10px] text-text-muted tracking-[0.2em] uppercase font-mono">
                  CLASSIFIED STREETWEAR SYSTEM
                </p>
                <div className="h-px flex-1 bg-border" />
              </div>
            </div>
          </Link>
        </div>

        {/* Main Terminal Card */}
        <div 
          className="border border-border bg-bg-secondary/80 animate-fade-in relative"
          style={{ animationDelay: "100ms" }}
        >
          {/* Terminal top bar */}
          <div className="border-b border-border-soft px-4 py-2 flex items-center justify-between bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-text-muted/50" />
              <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                ACCESS TERMINAL
              </span>
            </div>
            <span className="text-[10px] font-mono text-text-muted">
              SESSION: {sessionId}
            </span>
          </div>

          <div className="p-8">
            {/* Section header */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] font-mono text-text-muted">01</span>
                <h2 className="text-lg font-bold tracking-[0.15em] text-text-primary uppercase">
                  AUTHENTICATION
                </h2>
              </div>
              <div className="ml-7 mt-1 text-[10px] font-mono text-text-muted tracking-wider">
                ENTER CREDENTIALS TO PROCEED
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="flex items-center gap-3 p-4 border border-danger/40 bg-danger/5 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-danger" />
                  <AlertCircle className="w-4 h-4 text-danger-soft shrink-0" />
                  <p className="text-xs font-mono text-danger-soft tracking-wider">{errors.general}</p>
                </div>
              )}

              {/* Username/Email Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="identifier" 
                    className="text-[10px] font-mono tracking-[0.15em] text-text-secondary uppercase flex items-center gap-2"
                  >
                    <span className="text-text-muted">{">"}</span>
                    USER.ID
                  </label>
                  {touched.identifier && !errors.identifier && (
                    <span className="text-[9px] font-mono text-accent tracking-wider">VALID</span>
                  )}
                </div>
                <div className="relative group">
                  <input
                    id="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={(e) => handleInputChange("identifier", e.target.value)}
                    onBlur={() => handleBlur("identifier")}
                    placeholder="USERNAME OR EMAIL"
                    disabled={isLoading}
                    className={`
                      w-full px-4 py-4 bg-bg-primary border font-mono text-sm
                      text-text-primary placeholder:text-text-muted/50 placeholder:text-xs
                      transition-all duration-300 tracking-wider
                      focus:outline-none focus:border-text-secondary focus:bg-surface/20
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${errors.identifier && touched.identifier 
                        ? "border-danger/50" 
                        : "border-border hover:border-text-muted/30"
                      }
                    `}
                    autoComplete="username"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-mono text-text-muted/50 tracking-wider">
                    REQ
                  </div>
                </div>
                {errors.identifier && touched.identifier && (
                  <p className="text-[10px] font-mono text-danger-soft flex items-center gap-2 tracking-wider">
                    <span className="text-danger">!</span>
                    {errors.identifier}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="password" 
                    className="text-[10px] font-mono tracking-[0.15em] text-text-secondary uppercase flex items-center gap-2"
                  >
                    <span className="text-text-muted">{">"}</span>
                    PASS.KEY
                  </label>
                  <Link 
                    href="/forgot-password"
                    className="text-[10px] font-mono text-text-muted hover:text-text-secondary transition-colors duration-300 tracking-wider uppercase"
                  >
                    RECOVERY
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`
                      w-full px-4 py-4 pr-20 bg-bg-primary border font-mono text-sm
                      text-text-primary placeholder:text-text-muted/50
                      transition-all duration-300 tracking-[0.3em]
                      focus:outline-none focus:border-text-secondary focus:bg-surface/20
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${errors.password && touched.password 
                        ? "border-danger/50" 
                        : "border-border hover:border-text-muted/30"
                      }
                    `}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <span className="text-[8px] font-mono tracking-wider">
                      {showPassword ? "HIDE" : "SHOW"}
                    </span>
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-[10px] font-mono text-danger-soft flex items-center gap-2 tracking-wider">
                    <span className="text-danger">!</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className={`
                    w-full py-4 font-bold text-xs tracking-[0.2em] uppercase
                    transition-all duration-300 relative overflow-hidden group
                    border
                    ${isFormValid && !isLoading
                      ? "bg-text-primary text-bg-primary border-text-primary hover:bg-transparent hover:text-text-primary"
                      : "bg-transparent text-text-muted border-border cursor-not-allowed"
                    }
                    disabled:opacity-50
                  `}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-mono">AUTHENTICATING...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>[</span>
                      <span>ACCESS SYSTEM</span>
                      <span>]</span>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-soft" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-bg-secondary px-4 text-[9px] font-mono text-text-muted tracking-[0.2em] uppercase">
                  ALT PROTOCOL
                </span>
              </div>
            </div>

            {/* Social Login */}
            <button
              type="button"
              disabled={isLoading}
              className="w-full py-4 bg-transparent border border-border text-text-primary text-xs font-mono tracking-[0.15em] uppercase
                hover:bg-surface/30 hover:border-text-muted/30 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              GOOGLE AUTH
            </button>
          </div>

          {/* Terminal footer */}
          <div className="border-t border-border-soft px-4 py-3 flex items-center justify-between bg-surface/20">
            <div className="text-[9px] font-mono text-text-muted tracking-wider">
              SECURE CONN // TLS 1.3
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent animate-pulse" />
              <span className="text-[9px] font-mono text-text-muted tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Bottom registration link */}
        <div 
          className="mt-8 text-center animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div className="inline-flex items-center gap-4 text-[10px] font-mono text-text-muted tracking-wider">
            <span className="h-px w-8 bg-border" />
            <span>NEW OPERATIVE?</span>
            <Link 
              href="/register" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 uppercase border-b border-text-muted/30 hover:border-text-secondary pb-0.5"
            >
              REQUEST ACCESS
            </Link>
            <span className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* Decorative barcode */}
        <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-end gap-[2px] h-8 opacity-20">
            {[...Array(32)].map((_, i) => (
              <div 
                key={i} 
                className="bg-text-muted"
                style={{ 
                  width: Math.random() > 0.5 ? '2px' : '1px',
                  height: `${50 + Math.random() * 50}%`
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
