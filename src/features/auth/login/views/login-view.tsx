"use client";

import Link from "next/link";
import { useLoginMotion } from "../hooks/use-login-motion";
import { LoginForm } from "../components/login-form";
import { LoginShell } from "../components/login-shell";
import { AtmosphereBackground } from "../components/atmosphere-background";
import { FloatingSigils } from "../components/floating-sigils";
import { BrandMark } from "../components/brand-mark";
import { AuthCard } from "../components/auth-card";
import { Manifesto } from "../components/manifesto";

export function LoginView() {
  const { mountedClass } = useLoginMotion();

  return (
    <LoginShell>
      <AtmosphereBackground />
      <FloatingSigils mountedClass={mountedClass} />

      {/* Main content layer */}
      <div className="relative z-20 w-full max-w-md px-6 py-12" suppressHydrationWarning>
        <BrandMark mountedClass={mountedClass} />
        
        <AuthCard mountedClass={mountedClass}>
          <LoginForm />
        </AuthCard>

        {/* Registration link */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 login-fade-up ${mountedClass}`}>
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

        <Manifesto mountedClass={mountedClass} />
      </div>
    </LoginShell>
  );
}
