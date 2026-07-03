import type { Metadata } from 'next'
import { AuthContainer } from '@/features/auth/AuthContainer'

export const metadata: Metadata = {
  title: 'Initiate Profile — PURE EVIL'
}

export default function RegisterPage() {
  return <AuthContainer initialIsLogin={false} />
}
