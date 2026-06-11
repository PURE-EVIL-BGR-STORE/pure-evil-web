import type { Metadata } from "next";
import { Atmosphere } from "@/features/home";
import { LoginView } from "@/features/auth/login/LoginView";

export const metadata: Metadata = {
  title: "Sign In — PURE EVIL",
};

export default function LoginPage() {
  return (
    <>
      <Atmosphere />
      <LoginView />
    </>
  );
}
