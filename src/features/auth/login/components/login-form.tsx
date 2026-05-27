// CSR component that manages the login form state and interactions, including input handling, validation, and submission logic. 
// It also provides UI feedback for loading states and errors.
"use client";

// This is the login form component for the authentication feature. 
// It uses the useLoginForm hook to manage form state and validation...
// and renders input fields for username/email and password, along with a submit button and social login option.
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLoginForm } from "../hooks/use-login-form";
import { Input } from "@/shared/ui/input/Input";

export function LoginForm() {
  const {
    formData,
    showPassword,
    setShowPassword,
    isLoading,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  } = useLoginForm();

  return (
    <div className="p-8 md:p-10">

      {/* Section title */}
      <div className="text-center mb-10">
        <h2 className="text-xs tracking-[0.3em] text-text-secondary uppercase mb-2">
          Enter the Archive
        </h2>
        <div className="w-8 h-px bg-text-muted/20 mx-auto" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* General Error Exception */}
        {errors.general && (
          <div className="flex items-center justify-center gap-3 py-4 text-center">
            <AlertCircle className="w-4 h-4 text-danger-soft" />
            <p className="text-xs text-danger-soft tracking-wider uppercase">{errors.general}</p>
          </div>
        )}

        {/* Username/Email Field */}
        <Input
          id="identifier"
          type="text"
          label="Identity"
          value={formData.identifier}
          onChange={(e) => handleInputChange("identifier", e.target.value)}
          onBlur={() => handleBlur("identifier")}
          placeholder="Username or email"
          disabled={isLoading}
          error={touched.identifier ? errors.identifier : undefined}
          autoComplete="username"
        />

        {/* Password Field */}
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Passcode"
          labelRightElement={
            <Link
              href="/forgot-password"
              className="text-[10px] text-text-muted/60 hover:text-text-secondary transition-colors duration-500 tracking-wider"
            >
              Forgotten?
            </Link>
          }
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          placeholder="Enter passcode"
          disabled={isLoading}
          error={touched.password ? errors.password : undefined}
          autoComplete="current-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="p-2 text-text-muted/50 hover:text-text-secondary transition-colors duration-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />

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
      <div className="relative my-10 flex items-center">
        <div className="flex-1 border-t border-border-soft/50" />

        {/* Or Divider */}
        <span className="px-4 text-[9px] uppercase tracking-[0.3em] text-text-muted/40 bg-bg-secondary relative z-10">
          Or
        </span>

        <div className="flex-1 border-t border-border-soft/50" />
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
  );
}
