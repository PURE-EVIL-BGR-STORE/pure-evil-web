"use client";

import { useState } from "react";
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

  const validateIdentifier = (value: string) => {
    if (!value.trim()) return "Username or email is required";
    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email";
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
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
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // For demo purposes, show error on specific credentials
    if (formData.identifier === "test@test.com" && formData.password === "password") {
      setIsLoading(false);
      // Success - redirect would happen here
      return;
    }
    
    setErrors({ general: "Invalid credentials. Please try again." });
    setIsLoading(false);
  };

  const isFormValid = !validateIdentifier(formData.identifier) && !validatePassword(formData.password);

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      {/* Background subtle gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-soft via-bg-primary to-bg-primary pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-12 animate-fade-in">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-[0.2em] text-text-primary uppercase">
              PURE EVIL
            </h1>
          </Link>
          <p className="mt-3 text-text-secondary text-sm tracking-[0.15em] uppercase">
            Enter the void
          </p>
        </div>

        {/* Login Card */}
        <div 
          className="bg-surface border border-border rounded-sm p-8 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-xl font-semibold tracking-[0.1em] text-text-primary uppercase mb-8">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="flex items-center gap-3 p-4 bg-danger/10 border border-danger/30 rounded-sm">
                <AlertCircle className="w-5 h-5 text-danger-soft shrink-0" />
                <p className="text-sm text-danger-soft">{errors.general}</p>
              </div>
            )}

            {/* Username/Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="identifier" 
                className="block text-xs font-medium tracking-[0.1em] text-text-secondary uppercase"
              >
                Username or Email
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => handleInputChange("identifier", e.target.value)}
                  onBlur={() => handleBlur("identifier")}
                  placeholder="Enter username or email"
                  disabled={isLoading}
                  className={`
                    w-full px-4 py-3.5 bg-surface-soft border rounded-sm
                    text-text-primary placeholder:text-text-muted
                    transition-all duration-300
                    focus:outline-none focus:border-accent/50 focus:bg-surface
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.identifier && touched.identifier 
                      ? "border-danger-soft" 
                      : "border-border hover:border-border/80"
                    }
                  `}
                  autoComplete="username"
                />
              </div>
              {errors.identifier && touched.identifier && (
                <p className="text-xs text-danger-soft flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-medium tracking-[0.1em] text-text-secondary uppercase"
                >
                  Password
                </label>
                <Link 
                  href="/forgot-password"
                  className="text-xs text-text-muted hover:text-accent transition-colors duration-300 tracking-wide"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter password"
                  disabled={isLoading}
                  className={`
                    w-full px-4 py-3.5 pr-12 bg-surface-soft border rounded-sm
                    text-text-primary placeholder:text-text-muted
                    transition-all duration-300
                    focus:outline-none focus:border-accent/50 focus:bg-surface
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.password && touched.password 
                      ? "border-danger-soft" 
                      : "border-border hover:border-border/80"
                    }
                  `}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors duration-300 disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-xs text-danger-soft flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`
                w-full py-4 rounded-sm font-bold text-sm tracking-[0.1em] uppercase
                transition-all duration-300
                ${isFormValid && !isLoading
                  ? "bg-text-primary text-bg-primary hover:opacity-90 animate-pulse-glow"
                  : "bg-surface-soft text-text-muted cursor-not-allowed"
                }
                disabled:opacity-70
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-soft" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-4 text-xs text-text-muted tracking-wider uppercase">
                or
              </span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            <button
              type="button"
              disabled={isLoading}
              className="w-full py-3.5 bg-transparent border border-border rounded-sm text-text-primary text-sm font-medium tracking-wide
                hover:bg-surface-soft hover:border-border/80 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p 
          className="text-center mt-8 text-sm text-text-secondary animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Don&apos;t have an account?{" "}
          <Link 
            href="/register" 
            className="text-accent hover:text-accent-dark transition-colors duration-300 font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
