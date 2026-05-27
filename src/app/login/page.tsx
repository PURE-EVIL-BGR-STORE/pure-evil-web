"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

// Sigil SVG Component
function Sigil({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      stroke="currentColor" 
      strokeWidth="0.5"
    >
      <circle cx="50" cy="50" r="45" />
      <circle cx="50" cy="50" r="35" />
      <circle cx="50" cy="50" r="20" />
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="5" y1="50" x2="95" y2="50" />
      <line x1="15" y1="15" x2="85" y2="85" />
      <line x1="85" y1="15" x2="15" y2="85" />
      <polygon points="50,10 55,25 70,25 58,35 63,50 50,40 37,50 42,35 30,25 45,25" />
    </svg>
  );
}

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateIdentifier = (value: string) => {
    if (!value.trim()) return "Required";
    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid format";
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Required";
    if (value.length < 6) return "Minimum 6 characters";
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
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setErrors({ general: "Access denied" });
    setIsLoading(false);
  };

  const isFormValid = !validateIdentifier(formData.identifier) && !validatePassword(formData.password);

  return (
    <main className="min-h-screen bg-bg-primary relative overflow-hidden flex items-center justify-center">
      {/* Atmospheric noise texture */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fog/gradient atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-text-muted/[0.02] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating sigils - slow drift animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Sigil 
          className={`absolute top-[10%] left-[5%] w-32 h-32 text-text-muted/[0.03] transition-all duration-[3000ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />
        <Sigil 
          className={`absolute top-[20%] right-[8%] w-48 h-48 text-text-muted/[0.02] transition-all duration-[3500ms] delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />
        <Sigil 
          className={`absolute bottom-[15%] left-[10%] w-40 h-40 text-text-muted/[0.025] transition-all duration-[4000ms] delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />
        <Sigil 
          className={`absolute bottom-[25%] right-[5%] w-24 h-24 text-text-muted/[0.035] transition-all duration-[3200ms] delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-md px-6 py-12">
        
        {/* Brand mark */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Link href="/" className="inline-block group">
            <h1 className="text-5xl md:text-6xl font-bold tracking-[0.25em] text-text-primary uppercase mb-4 transition-all duration-500 group-hover:tracking-[0.3em]">
              PURE EVIL
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase font-light">
              For the forgotten
            </p>
          </Link>
        </div>

        {/* Central sigil behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Sigil className="w-[500px] h-[500px] text-text-muted/[0.015]" />
        </div>

        {/* Login form card */}
        <div 
          className={`relative transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Subtle border glow on hover */}
          <div className="absolute -inset-px bg-gradient-to-b from-text-muted/10 via-transparent to-text-muted/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative border border-border-soft bg-bg-secondary/60 backdrop-blur-sm">
            {/* Top decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-text-muted/30 to-transparent" />
            
            <div className="p-8 md:p-10">
              {/* Section title */}
              <div className="text-center mb-10">
                <h2 className="text-xs tracking-[0.3em] text-text-secondary uppercase mb-2">
                  Enter the Archive
                </h2>
                <div className="w-8 h-px bg-text-muted/20 mx-auto" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Error */}
                {errors.general && (
                  <div className="flex items-center justify-center gap-3 py-4 text-center">
                    <AlertCircle className="w-4 h-4 text-danger-soft" />
                    <p className="text-xs text-danger-soft tracking-wider uppercase">{errors.general}</p>
                  </div>
                )}

                {/* Username/Email Field */}
                <div className="space-y-3">
                  <label 
                    htmlFor="identifier" 
                    className="block text-[10px] tracking-[0.2em] text-text-muted uppercase"
                  >
                    Identity
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={(e) => handleInputChange("identifier", e.target.value)}
                    onBlur={() => handleBlur("identifier")}
                    placeholder="Username or email"
                    disabled={isLoading}
                    className={`
                      w-full px-0 py-4 bg-transparent border-0 border-b text-sm
                      text-text-primary placeholder:text-text-muted/30 placeholder:text-xs placeholder:tracking-wider
                      transition-all duration-500 tracking-wide
                      focus:outline-none focus:border-text-secondary
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${errors.identifier && touched.identifier 
                        ? "border-danger/40" 
                        : "border-border-soft hover:border-text-muted/30"
                      }
                    `}
                    autoComplete="username"
                  />
                  {errors.identifier && touched.identifier && (
                    <p className="text-[10px] text-danger-soft tracking-wider">{errors.identifier}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label 
                      htmlFor="password" 
                      className="text-[10px] tracking-[0.2em] text-text-muted uppercase"
                    >
                      Passcode
                    </label>
                    <Link 
                      href="/forgot-password"
                      className="text-[10px] text-text-muted/60 hover:text-text-secondary transition-colors duration-500 tracking-wider"
                    >
                      Forgotten?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      onBlur={() => handleBlur("password")}
                      placeholder="Enter passcode"
                      disabled={isLoading}
                      className={`
                        w-full px-0 py-4 pr-12 bg-transparent border-0 border-b text-sm
                        text-text-primary placeholder:text-text-muted/30 placeholder:text-xs placeholder:tracking-wider
                        transition-all duration-500 tracking-wide
                        focus:outline-none focus:border-text-secondary
                        disabled:opacity-40 disabled:cursor-not-allowed
                        ${errors.password && touched.password 
                          ? "border-danger/40" 
                          : "border-border-soft hover:border-text-muted/30"
                        }
                      `}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-muted/50 hover:text-text-secondary transition-colors duration-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-[10px] text-danger-soft tracking-wider">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className={`
                      w-full py-5 text-xs tracking-[0.25em] uppercase relative overflow-hidden
                      transition-all duration-500 border
                      ${isFormValid && !isLoading
                        ? "bg-text-primary text-bg-primary border-text-primary hover:bg-transparent hover:text-text-primary"
                        : "bg-transparent text-text-muted/50 border-border-soft cursor-not-allowed"
                      }
                    `}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </span>
                    ) : (
                      <span>Proceed</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-soft/50" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-bg-secondary px-6 text-[9px] text-text-muted/40 tracking-[0.3em] uppercase">
                    Or
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <button
                type="button"
                disabled={isLoading}
                className="w-full py-4 bg-transparent border border-border-soft text-text-secondary text-[10px] tracking-[0.2em] uppercase
                  hover:border-text-muted/30 hover:text-text-primary transition-all duration-500
                  disabled:opacity-40 disabled:cursor-not-allowed
                  flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-text-muted/30 to-transparent" />
          </div>
        </div>

        {/* Registration link */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-[10px] text-text-muted/50 tracking-[0.2em] uppercase">
            Not yet initiated?{" "}
            <Link 
              href="/register" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-500 border-b border-text-muted/20 hover:border-text-secondary pb-0.5"
            >
              Request access
            </Link>
          </p>
        </div>

        {/* Bottom manifesto text */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-[9px] text-text-muted/20 tracking-[0.5em] uppercase">
            We wear the curse
          </p>
        </div>
      </div>
    </main>
  );
}
