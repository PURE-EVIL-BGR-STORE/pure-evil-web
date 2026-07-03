import type { Metadata } from 'next'
import { AuthContainer } from '@/features/auth/AuthContainer'

export const metadata: Metadata = {
  title: 'Sign In — PURE EVIL'
}

export default function LoginPage() {
  return <AuthContainer initialIsLogin={true} />
}
