"use client";

import { useLoginMotion } from "../../login/hooks/use-login-motion";
import { RegisterForm } from "../components/register-form";
import { LoginShell } from "../../login/components/login-shell";
import { AtmosphereBackground } from "../../login/components/atmosphere-background";
import { FloatingSigils } from "../../login/components/floating-sigils";
import { BrandMark } from "../../login/components/brand-mark";
import { AuthCard } from "../../login/components/auth-card";
import { Manifesto } from "../../login/components/manifesto";

export function RegisterView() {
  // motion hook
  const { mountedClass } = useLoginMotion();

  return (
    <LoginShell>
      <AtmosphereBackground />
      <FloatingSigils mountedClass={mountedClass} />

      {/* Main content layer */}
      <div className="relative z-20 w-full max-w-md px-6 py-12" suppressHydrationWarning>
        <BrandMark mountedClass={mountedClass} />

        <AuthCard mountedClass={mountedClass}>
          <RegisterForm />
        </AuthCard>

        <Manifesto mountedClass={mountedClass} />
      </div>
    </LoginShell>
  );
}
