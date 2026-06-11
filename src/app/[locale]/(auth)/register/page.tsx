import type { Metadata } from "next";
import { Atmosphere } from "@/features/home";
import { RegisterView } from "@/features/auth/register/RegisterView";

export const metadata: Metadata = {
  title: "Initiate Profile — PURE EVIL",
};

export default function RegisterPage() {
  return (
    <>
      <Atmosphere />
      <RegisterView />
    </>
  );
}
