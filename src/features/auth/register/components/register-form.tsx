"use client";

import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRegisterForm } from "../hooks/use-register-form";
import { Input } from "@/shared/ui/input/Input";

export function RegisterForm() {
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
  } = useRegisterForm();

  return (
    <div className="p-8 md:p-10">
      {/* Section title */}
      <div className="text-center mb-10">
        <h2 className="text-xs tracking-[0.3em] text-text-secondary uppercase mb-2">
          Initiate Profile
        </h2>
        <div className="w-8 h-px bg-text-muted/20 mx-auto" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Exception */}
        {errors.general && (
          <div className="flex items-center justify-center gap-3 py-4 text-center">
            <AlertCircle className="w-4 h-4 text-danger-soft" />
            <p className="text-xs text-danger-soft tracking-wider uppercase">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            type="text"
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            placeholder="John"
            disabled={isLoading}
            error={touched.firstName ? errors.firstName : undefined}
          />
          <Input
            id="lastName"
            type="text"
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            placeholder="Doe"
            disabled={isLoading}
            error={touched.lastName ? errors.lastName : undefined}
          />
        </div>

        <Input
          id="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          onBlur={() => handleBlur("username")}
          placeholder="johndoe123"
          disabled={isLoading}
          error={touched.username ? errors.username : undefined}
          autoComplete="username"
        />

        <Input
          id="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="john@example.com"
          disabled={isLoading}
          error={touched.email ? errors.email : undefined}
          autoComplete="email"
        />

        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Passcode"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          placeholder="Create passcode"
          disabled={isLoading}
          error={touched.password ? errors.password : undefined}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="p-2 text-text-muted/50 hover:text-text-secondary transition-colors duration-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              ${
                isFormValid && !isLoading
                  ? "bg-text-primary text-bg-primary border-text-primary hover:bg-transparent hover:text-text-primary"
                  : "bg-transparent text-text-muted/50 border-border-soft cursor-not-allowed"
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              <span>Create Access</span>
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-border-soft/50" />
        <span className="px-4 text-[9px] uppercase tracking-[0.3em] text-text-muted/40 bg-bg-secondary relative z-10">
          Or
        </span>
        <div className="flex-1 border-t border-border-soft/50" />
      </div>

      <div className="text-center transition-all duration-1000">
        <p className="text-[10px] text-text-muted/50 tracking-[0.2em] uppercase">
          Already initiated?{" "}
          <Link
            href="/login"
            className="text-text-secondary hover:text-text-primary transition-colors duration-500 border-b border-text-muted/20 hover:border-text-secondary pb-0.5"
          >
            Return to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
