'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Link, useRouter, usePathname } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon } from './components/EyeIcon'
import { GoogleIcon } from './components/GoogleIcon'
import { authService } from './services/auth.service'
import { toast } from 'sonner'

// Import existing UI components from the project's design system
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = Partial<Record<'firstName' | 'lastName' | 'username' | 'email' | 'password' | 'confirmPassword' | 'identifier', string>>

function scorePassword(v: string): number {
  let score = 0
  if (v.length >= 8) score++
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++
  if (/[0-9!@#$%^&*_\-]/.test(v)) score++
  return score
}

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Strong']

export interface AuthContainerProps {
  initialIsLogin: boolean
}

export function AuthContainer({ initialIsLogin }: AuthContainerProps): React.ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const [isLogin, setIsLogin] = useState(initialIsLogin)

  // Sync state with URL path for back/forward navigation
  useEffect(() => {
    setIsLogin(pathname.includes('/login'))
  }, [pathname])

  // --- LOGIN STATE & LOGIC ---
  const [loginIdentifier, setLoginIdentifier] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPw, setShowLoginPw] = useState(false)
  const [loginErrors, setLoginErrors] = useState<Errors>({})
  const [loginSubmitting, setLoginSubmitting] = useState(false)

  const canSubmitLogin = useMemo(
    () => loginIdentifier.trim().length > 0 && loginPassword.trim().length > 0,
    [loginIdentifier, loginPassword]
  )

  const validateLogin = () => {
    const next: Errors = {}
    if (!loginIdentifier.trim()) next.identifier = 'Required'
    if (!loginPassword.trim()) next.password = 'Required'
    setLoginErrors(next)
    return Object.keys(next).length === 0
  }

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLogin()) return
    setLoginSubmitting(true)
    try {
      const res = await authService.login({ identifier: loginIdentifier, password: loginPassword })
      toast.success('Welcome back!')
      setTimeout(() => {
        if (res.isAuthorized) {
          const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001/dashboard'
          window.location.href = dashboardUrl
        } else {
          window.location.href = '/'
        }
      }, 800)
    } catch (err: any) {
      console.error('Login Error:', err)
      toast.error(err?.response?.data?.error || err?.message || 'Invalid credentials.')
      setLoginSubmitting(false)
    }
  }

  // --- REGISTER STATE & LOGIC ---
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  })
  const [showRegisterPw, setShowRegisterPw] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [registerTerms, setRegisterTerms] = useState(false)
  const [registerTermsError, setRegisterTermsError] = useState(false)
  const [registerErrors, setRegisterErrors] = useState<Errors>({})
  const [registerStatus, setRegisterStatus] = useState<'idle' | 'submitting' | 'done'>('idle')

  // OTP dialog state
  const [showOtp, setShowOtp] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [otpSubmitting, setOtpSubmitting] = useState(false)
  const [otpError, setOtpError] = useState('')

  const setRegisterField = (key: keyof typeof registerForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterForm((f) => ({ ...f, [key]: e.target.value }))

  const registerPwScore = useMemo(() => scorePassword(registerForm.password), [registerForm.password])

  const regPwSegClass = (i: number) => {
    if (i === 0 && registerPwScore >= 1) return registerPwScore === 1 ? 'w' : registerPwScore === 2 ? 'm' : 's'
    if (i === 1 && registerPwScore >= 2) return registerPwScore === 2 ? 'm' : 's'
    if (i === 2 && registerPwScore >= 3) return 's'
    return ''
  }

  const validateRegister = (): boolean => {
    const next: Errors = {}
    if (!registerForm.firstName.trim()) next.firstName = 'Required'
    if (!registerForm.lastName.trim()) next.lastName = 'Required'
    if (registerForm.username.trim().length < 3) next.username = 'Min 3 characters'
    if (!EMAIL_RE.test(registerForm.email)) next.email = 'Valid email required'
    if (registerForm.password.length < 8) next.password = 'Min 8 characters'
    if (confirmPassword !== registerForm.password) next.confirmPassword = 'Passcodes do not match'
    setRegisterErrors(next)
    return Object.keys(next).length === 0
  }

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = validateRegister()
    if (!ok) return
    if (!registerTerms) {
      setRegisterTermsError(true)
      return
    }
    setRegisterTermsError(false)
    // Open OTP dialog — register call happens after OTP is verified
    setOtpValue('')
    setOtpError('')
    setShowOtp(true)
  }

  const onOtpVerify = async () => {
    if (otpValue.length < 6) {
      setOtpError('Enter the 6-digit code')
      return
    }
    setOtpSubmitting(true)
    setOtpError('')
    try {
      await authService.register(registerForm)
      setShowOtp(false)
      setRegisterStatus('done')
      toast.success('Profile initiated successfully!')
      setTimeout(() => {
        setIsLogin(true)
        router.push('/login', { scroll: false })
      }, 1500)
    } catch (err: any) {
      console.error('Register Error:', err)
      setOtpError(err?.response?.data?.message || err?.message || 'Verification failed. Try again.')
      setOtpSubmitting(false)
    }
  }

  return (
    <main className="w-full h-screen bg-[#020202] text-fg relative overflow-hidden flex flex-col md:flex-row font-sans">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,20,27,0.03),transparent_75%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* MOBILE: Top banner image (10vh, no text overlay) */}
      <div className="block md:hidden relative w-full flex-none overflow-hidden" style={{ height: '10vh' }}>
        <img
          src="/images/auth.png"
          alt="PURE EVIL"
          className="w-full h-full object-cover object-center select-none brightness-[0.7] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        {/* Small logo in mobile banner */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <img src="/PURE_EVIL_LOGO_4.png" alt="Emblem" className="w-6 h-6 filter drop-shadow-[0_0_6px_rgba(197,20,27,0.5)]" />
          <span className="font-serif uppercase tracking-[0.3em] text-[10px] text-white font-semibold">Pure Evil</span>
        </div>
      </div>

      {/* DESKTOP: Sliding image panel */}
      <motion.div
        initial={false}
        animate={{
          x: isLogin ? '0%' : '100%',
          borderTopRightRadius: isLogin ? '32px' : '0px',
          borderBottomRightRadius: isLogin ? '32px' : '0px',
          borderTopLeftRadius: isLogin ? '0px' : '32px',
          borderBottomLeftRadius: isLogin ? '0px' : '32px'
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="absolute top-0 bottom-0 left-0 w-1/2 h-full hidden md:block z-30 overflow-hidden border-r md:border-l border-fg/10"
      >
        <img
          src="/images/auth.png"
          alt="PURE EVIL Archive"
          className="w-full h-full object-cover select-none filter brightness-[0.75] contrast-[1.05]"
        />

        {/* Obsidian Glassmorphism Overlay - Text Centered */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10 flex flex-col justify-center items-center text-center p-12 md:p-16">
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center justify-center"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] text-red uppercase mb-4 font-bold">
                    [ ACCESS LEVEL 01 ]
                  </p>
                  <h2 className="text-3xl font-serif tracking-wider leading-tight text-white uppercase font-bold mb-6 text-center">
                    Enter the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-red-500 [text-shadow:0_0_20px_rgba(197,20,27,0.3)]">Archive</span>
                  </h2>
                  <p className="text-sm text-faint tracking-wide leading-relaxed font-light font-sans uppercase text-center">
                    Return to the inner circle. Validate your passcode to retrieve your obsidian garments and drop archive history.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="register-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center justify-center"
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] text-red uppercase mb-4 font-bold">
                    [ INITIATION STATE ]
                  </p>
                  <h2 className="text-3xl font-serif tracking-wider leading-tight text-white uppercase font-bold mb-6 text-center">
                    Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-red-500 [text-shadow:0_0_20px_rgba(197,20,27,0.3)]">Obsessed</span>
                  </h2>
                  <p className="text-sm text-faint tracking-wide leading-relaxed font-light font-sans uppercase text-center">
                    Initiation is permanent. Create your unique identity, join the inner circle, and acquire first access rights to future drop runs.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-faint uppercase whitespace-nowrap">
            Discipline · Builds · Freedom
          </div>
        </div>
      </motion.div>

      {/* MOBILE: Single animated form (float out / float in) */}
      <div className="block md:hidden flex-1 relative overflow-hidden bg-[#050505]">
        <Link href="/" className="absolute top-4 left-6 flex items-center gap-2 text-faint hover:text-fg text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 z-20">
          <span className="text-red">←</span> BACK
        </Link>
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="mobile-login"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              className="absolute inset-0 flex flex-col justify-start items-center overflow-y-auto py-12 px-6 pt-14"
            >
              <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-6 select-none">
                  <img src="/PURE_EVIL_LOGO_4.png" alt="PURE EVIL emblem" className="w-10 h-10 filter drop-shadow-[0_0_10px_rgba(197,20,27,0.4)] mb-1.5" />
                  <span className="font-serif uppercase tracking-[0.2em] text-[10px] text-faint font-semibold">Pure Evil</span>
                </div>
                <header className="mb-6 text-center">
                  <span className="font-mono text-[10px] tracking-widest text-red uppercase block mb-1.5">Enter the Archive</span>
                  <h1 className="text-2xl font-serif font-semibold tracking-wider text-fg uppercase">Sign In</h1>
                  <div className="w-10 h-[2px] bg-red mt-3 mx-auto" />
                </header>
                <MobileLoginForm
                  loginIdentifier={loginIdentifier}
                  setLoginIdentifier={setLoginIdentifier}
                  loginPassword={loginPassword}
                  setLoginPassword={setLoginPassword}
                  showLoginPw={showLoginPw}
                  setShowLoginPw={setShowLoginPw}
                  loginErrors={loginErrors}
                  loginSubmitting={loginSubmitting}
                  canSubmitLogin={canSubmitLogin}
                  validateLogin={validateLogin}
                  onLoginSubmit={onLoginSubmit}
                  onSwitchToRegister={() => { setIsLogin(false); router.push('/register', { scroll: false }) }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mobile-register"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              className="absolute inset-0 flex flex-col justify-start items-center overflow-y-auto py-12 px-6 pt-14"
            >
              <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-6 select-none">
                  <img src="/PURE_EVIL_LOGO_4.png" alt="PURE EVIL emblem" className="w-10 h-10 filter drop-shadow-[0_0_10px_rgba(197,20,27,0.4)] mb-1.5" />
                  <span className="font-serif uppercase tracking-[0.2em] text-[10px] text-faint font-semibold">Pure Evil</span>
                </div>
                <header className="mb-6 text-center">
                  <span className="font-mono text-[10px] tracking-widest text-red uppercase block mb-1.5">New Member</span>
                  <h1 className="text-2xl font-serif font-semibold tracking-wider text-fg uppercase">Initiate Profile</h1>
                  <div className="w-10 h-[2px] bg-red mt-3 mx-auto" />
                </header>
                <MobileRegisterForm
                  registerForm={registerForm}
                  setRegisterField={setRegisterField}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  showRegisterPw={showRegisterPw}
                  setShowRegisterPw={setShowRegisterPw}
                  showConfirmPw={showConfirmPw}
                  setShowConfirmPw={setShowConfirmPw}
                  registerErrors={registerErrors}
                  registerTerms={registerTerms}
                  setRegisterTerms={setRegisterTerms}
                  registerTermsError={registerTermsError}
                  setRegisterTermsError={setRegisterTermsError}
                  registerStatus={registerStatus}
                  registerPwScore={registerPwScore}
                  regPwSegClass={regPwSegClass}
                  onRegisterSubmit={onRegisterSubmit}
                  onSwitchToLogin={() => { setIsLogin(true); router.push('/login', { scroll: false }) }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DESKTOP: Two-column form area */}
      <div className="hidden md:flex w-full h-full z-10 relative">
        {/* LEFT COLUMN: REGISTER FORM */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-[#050505] overflow-y-auto py-16 px-6 sm:px-12 lg:px-20 border-r border-fg/5 relative z-10">
          <Link href="/" className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-faint hover:text-fg text-xs font-mono tracking-widest uppercase transition-colors duration-300">
            <span className="text-red">←</span> BACK
          </Link>

          <div className="w-full max-w-sm mt-6">
            {/* Center Logo brought above the Register form */}
            <div className="flex flex-col items-center mb-8 select-none">
              <img
                src="/PURE_EVIL_LOGO_4.png"
                alt="PURE EVIL emblem"
                className="w-12 h-12 filter drop-shadow-[0_0_10px_rgba(197,20,27,0.4)] mb-2"
              />
              <span className="font-serif uppercase tracking-[0.2em] text-[10px] text-faint font-semibold">
                Pure Evil
              </span>
            </div>

            <header className="mb-8 text-center">
              <span className="font-mono text-[10px] tracking-widest text-red uppercase block mb-2">
                New Member
              </span>
              <h1 className="text-3xl font-serif font-semibold tracking-wider text-fg uppercase">
                Initiate Profile
              </h1>
              <div className="w-12 h-[2px] bg-red mt-4 mx-auto" />
            </header>

            <form onSubmit={onRegisterSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="firstName">
                    First Name
                  </Label>
                  <Input
                    className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 px-4 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${registerErrors.firstName ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                      }`}
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={registerForm.firstName}
                    onChange={setRegisterField('firstName')}
                  />
                  {registerErrors.firstName && (
                    <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{registerErrors.firstName}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="lastName">
                    Last Name
                  </Label>
                  <Input
                    className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 px-4 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${registerErrors.lastName ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                      }`}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={registerForm.lastName}
                    onChange={setRegisterField('lastName')}
                  />
                  {registerErrors.lastName && (
                    <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{registerErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="username">
                  Username
                </Label>
                <Input
                  className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 px-4 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${registerErrors.username ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                    }`}
                  id="username"
                  type="text"
                  placeholder="Your handle"
                  value={registerForm.username}
                  onChange={setRegisterField('username')}
                />
                {registerErrors.username && (
                  <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{registerErrors.username}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 px-4 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${registerErrors.email ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                    }`}
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerForm.email}
                  onChange={setRegisterField('email')}
                />
                {registerErrors.email && (
                  <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{registerErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="register-password">
                  Passcode
                </Label>
                <div className="relative">
                  <Input
                    className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 pl-4 pr-12 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${registerErrors.password ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                      }`}
                    id="register-password"
                    type={showRegisterPw ? 'text' : 'password'}
                    placeholder="Create passcode"
                    value={registerForm.password}
                    onChange={setRegisterField('password')}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-fg transition-colors duration-200"
                    type="button"
                    onClick={() => setShowRegisterPw((v) => !v)}
                  >
                    <EyeIcon open={!showRegisterPw} />
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {registerForm.password.length > 0 && (
                  <div className="mt-1 flex flex-col gap-1">
                    <div className="flex gap-1 h-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className={`flex-1 h-full bg-[#121212] transition-colors duration-300 ${regPwSegClass(i) === 'w' ? 'bg-red/50' : regPwSegClass(i) === 'm' ? 'bg-yellow-600/50' : regPwSegClass(i) === 's' ? 'bg-green-600/50' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-muted uppercase tracking-wider text-right">
                      Strength: {STRENGTH_LABEL[registerPwScore]}
                    </span>
                  </div>
                )}

                {registerErrors.password && (
                  <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{registerErrors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="register-confirm-password">
                  Confirm Passcode
                </Label>
                <div className="relative">
                  <Input
                    className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 pl-4 pr-12 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${registerErrors.confirmPassword ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                      }`}
                    id="register-confirm-password"
                    type={showConfirmPw ? 'text' : 'password'}
                    placeholder="Repeat passcode"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-fg transition-colors duration-200"
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                  >
                    <EyeIcon open={!showConfirmPw} />
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{registerErrors.confirmPassword}</span>
                )}
              </div>

              {/* Consent check */}
              <div className="flex gap-3 items-start mt-2">
                <Checkbox
                  id="terms"
                  checked={registerTerms}
                  onCheckedChange={(checked) => {
                    setRegisterTerms(!!checked)
                    if (checked) setRegisterTermsError(false)
                  }}
                  className={`mt-1 border-fg/15 data-[state=checked]:bg-red data-[state=checked]:border-red rounded-none w-4 h-4 cursor-pointer ${registerTermsError ? 'border-red' : ''
                    }`}
                />
                <Label htmlFor="terms" className={`text-[10px] font-mono tracking-wide leading-relaxed uppercase select-none cursor-pointer ${registerTermsError ? 'text-red' : 'text-muted hover:text-fg'}`}>
                  I accept the <a href="#" className="underline text-red hover:text-white">terms of initiation</a> and confirm my devotion.
                </Label>
              </div>

              <Button
                variant="ritual"
                size="ritual"
                className="w-full mt-4"
                type="submit"
                disabled={registerStatus === 'submitting'}
              >
                <span>
                  {registerStatus === 'submitting' ? 'INITIATING...' : registerStatus === 'done' ? 'DONE' : 'Create Access'}
                </span>
              </Button>
            </form>

            {/* OTP Verification Dialog */}
            <Dialog open={showOtp} onOpenChange={(open) => { if (!otpSubmitting) setShowOtp(open) }}>
              <DialogContent
                className="bg-[#0a0a0a] border border-fg/10 rounded-none max-w-sm p-8 text-center"
                showCloseButton={!otpSubmitting}
              >
                <DialogHeader className="items-center">
                  <div className="flex items-center justify-center w-12 h-12 border border-red/30 bg-red/5 mb-4 mx-auto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <DialogTitle className="font-serif uppercase tracking-widest text-fg text-xl">
                    Verify Identity
                  </DialogTitle>
                  <DialogDescription className="font-mono text-[10px] tracking-widest text-faint uppercase mt-1">
                    A 6-digit code has been dispatched to<br />
                    <span className="text-fg font-semibold">{registerForm.email}</span>
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 mt-6">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(val) => { setOtpValue(val); setOtpError('') }}
                    containerClassName="gap-2 justify-center"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="w-11 h-14 text-lg font-mono border-fg/15 bg-[#050505] text-fg data-[active=true]:border-red data-[active=true]:ring-red/20 rounded-none"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-11 h-14 text-lg font-mono border-fg/15 bg-[#050505] text-fg data-[active=true]:border-red data-[active=true]:ring-red/20 rounded-none"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-11 h-14 text-lg font-mono border-fg/15 bg-[#050505] text-fg data-[active=true]:border-red data-[active=true]:ring-red/20 rounded-none"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-faint" />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="w-11 h-14 text-lg font-mono border-fg/15 bg-[#050505] text-fg data-[active=true]:border-red data-[active=true]:ring-red/20 rounded-none"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-11 h-14 text-lg font-mono border-fg/15 bg-[#050505] text-fg data-[active=true]:border-red data-[active=true]:ring-red/20 rounded-none"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-11 h-14 text-lg font-mono border-fg/15 bg-[#050505] text-fg data-[active=true]:border-red data-[active=true]:ring-red/20 rounded-none"
                      />
                    </InputOTPGroup>
                  </InputOTP>

                  {otpError && (
                    <p className="text-[9px] font-mono tracking-widest text-red uppercase">{otpError}</p>
                  )}

                  <Button
                    variant="ritual"
                    size="ritual"
                    className="w-full"
                    onClick={onOtpVerify}
                    disabled={otpSubmitting || otpValue.length < 6}
                  >
                    {otpSubmitting ? 'Verifying...' : 'Confirm Initiation'}
                  </Button>

                  <button
                    type="button"
                    className="text-[9px] font-mono tracking-widest text-faint uppercase hover:text-red transition-colors cursor-pointer"
                    onClick={() => toast.info('Resend code coming soon.')}
                  >
                    Didn&#39;t receive a code? Resend
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="mt-8 text-center">
              <p className="text-[10px] font-mono tracking-widest text-faint uppercase">
                ALREADY INITIATED?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true)
                    router.push('/login', { scroll: false })
                  }}
                  className="text-red font-bold hover:underline cursor-pointer"
                >
                  Return to login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM (Revealed when isLogin = true) */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-[#050505] overflow-y-auto py-16 px-6 sm:px-12 lg:px-20 relative z-10">
          <Link href="/" className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-faint hover:text-fg text-xs font-mono tracking-widest uppercase transition-colors duration-300">
            <span className="text-red">←</span> BACK
          </Link>

          <div className="w-full max-w-sm mt-6">
            {/* Center Logo brought above the Login form */}
            <div className="flex flex-col items-center mb-8 select-none">
              <img
                src="/PURE_EVIL_LOGO_4.png"
                alt="PURE EVIL emblem"
                className="w-12 h-12 filter drop-shadow-[0_0_10px_rgba(197,20,27,0.4)] mb-2"
              />
              <span className="font-serif uppercase tracking-[0.2em] text-[10px] text-faint font-semibold">
                Pure Evil
              </span>
            </div>

            <header className="mb-8 text-center">
              <span className="font-mono text-[10px] tracking-widest text-red uppercase block mb-2">
                Enter the Archive
              </span>
              <h1 className="text-3xl font-serif font-semibold tracking-wider text-fg uppercase">
                Sign In
              </h1>
              <div className="w-12 h-[2px] bg-red mt-4 mx-auto" />
            </header>

            <form onSubmit={onLoginSubmit} noValidate className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="identifier">
                  Identity
                </Label>
                <Input
                  className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 px-4 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${loginErrors.identifier ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                    }`}
                  id="identifier"
                  type="text"
                  placeholder="Username or email"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  onBlur={validateLogin}
                />
                {loginErrors.identifier && (
                  <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{loginErrors.identifier}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline">
                  <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="login-password">
                    Passcode
                  </Label>
                  <a href="#" className="text-[9px] font-mono tracking-widest text-red hover:underline uppercase">
                    Forgotten?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-6 pl-4 pr-12 focus:outline-none transition-all duration-300 rounded-none uppercase placeholder:text-faint/30 ${loginErrors.password ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
                      }`}
                    id="login-password"
                    type={showLoginPw ? 'text' : 'password'}
                    placeholder="Enter passcode"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onBlur={validateLogin}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-fg transition-colors duration-200"
                    type="button"
                    onClick={() => setShowLoginPw((v) => !v)}
                  >
                    <EyeIcon open={!showLoginPw} />
                  </button>
                </div>
                {loginErrors.password && (
                  <span className="text-[9px] font-mono tracking-widest text-red uppercase mt-0.5">{loginErrors.password}</span>
                )}
              </div>

              <Button
                variant="ritual"
                size="ritual"
                className="w-full mt-4"
                type="submit"
                disabled={!canSubmitLogin || loginSubmitting}
              >
                <span>
                  {loginSubmitting ? 'VERIFYING...' : 'Proceed'}
                </span>
              </Button>
            </form>

            {/* Social Divider */}
            <div className="my-8 flex items-center justify-between gap-4">
              <span className="h-[1px] bg-fg/10 flex-grow" />
              <span className="text-[10px] font-mono tracking-widest text-faint uppercase select-none">Or</span>
              <span className="h-[1px] bg-fg/10 flex-grow" />
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full py-6 font-mono text-xs tracking-widest uppercase rounded-none border-fg/15 hover:border-red/60 hover:bg-red/5"
              type="button"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </Button>

            <div className="mt-8 text-center">
              <p className="text-[10px] font-mono tracking-widest text-faint uppercase">
                NOT INITIATED?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false)
                    router.push('/register', { scroll: false })
                  }}
                  className="text-red font-bold hover:underline cursor-pointer"
                >
                  Create Access
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ----------- MOBILE FORM HELPERS -----------


interface MobileLoginFormProps {
  loginIdentifier: string
  setLoginIdentifier: (v: string) => void
  loginPassword: string
  setLoginPassword: (v: string) => void
  showLoginPw: boolean
  setShowLoginPw: (fn: (v: boolean) => boolean) => void
  loginErrors: Partial<Record<string, string>>
  loginSubmitting: boolean
  canSubmitLogin: boolean
  validateLogin: () => boolean
  onLoginSubmit: (e: React.FormEvent) => void
  onSwitchToRegister: () => void
}

function MobileLoginForm({
  loginIdentifier, setLoginIdentifier,
  loginPassword, setLoginPassword,
  showLoginPw, setShowLoginPw,
  loginErrors, loginSubmitting, canSubmitLogin,
  validateLogin, onLoginSubmit, onSwitchToRegister
}: MobileLoginFormProps): React.ReactElement {
  return (
    <form onSubmit={onLoginSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-identifier">Identity</Label>
        <Input
          className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-5 px-4 focus:outline-none rounded-none uppercase placeholder:text-faint/30 transition-all ${
            loginErrors.identifier ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
          }`}
          id="m-identifier" type="text" placeholder="Username or email"
          value={loginIdentifier} onChange={(e) => setLoginIdentifier(e.target.value)} onBlur={validateLogin}
        />
        {loginErrors.identifier && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{loginErrors.identifier}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-baseline">
          <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-login-pw">Passcode</Label>
          <a href="#" className="text-[9px] font-mono tracking-widest text-red hover:underline uppercase">Forgotten?</a>
        </div>
        <div className="relative">
          <Input
            className={`w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-5 pl-4 pr-12 focus:outline-none rounded-none uppercase placeholder:text-faint/30 transition-all ${
              loginErrors.password ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
            }`}
            id="m-login-pw" type={showLoginPw ? 'text' : 'password'} placeholder="Enter passcode"
            value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} onBlur={validateLogin}
          />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-fg transition-colors" onClick={() => setShowLoginPw((v) => !v)}>
            <EyeIcon open={!showLoginPw} />
          </button>
        </div>
        {loginErrors.password && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{loginErrors.password}</span>}
      </div>

      <Button variant="ritual" size="ritual" className="w-full mt-2" type="submit" disabled={!canSubmitLogin || loginSubmitting}>
        {loginSubmitting ? 'VERIFYING...' : 'Proceed'}
      </Button>

      <p className="text-center text-[10px] font-mono tracking-widest text-faint uppercase mt-2">
        NOT INITIATED?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-red font-bold hover:underline cursor-pointer">Create Access</button>
      </p>
    </form>
  )
}

interface MobileRegisterFormProps {
  registerForm: { firstName: string; lastName: string; username: string; email: string; password: string }
  setRegisterField: (key: 'firstName' | 'lastName' | 'username' | 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => void
  confirmPassword: string
  setConfirmPassword: (v: string) => void
  showRegisterPw: boolean
  setShowRegisterPw: (fn: (v: boolean) => boolean) => void
  showConfirmPw: boolean
  setShowConfirmPw: (fn: (v: boolean) => boolean) => void
  registerErrors: Partial<Record<string, string>>
  registerTerms: boolean
  setRegisterTerms: (v: boolean) => void
  registerTermsError: boolean
  setRegisterTermsError: (v: boolean) => void
  registerStatus: 'idle' | 'submitting' | 'done'
  registerPwScore: number
  regPwSegClass: (i: number) => string
  onRegisterSubmit: (e: React.FormEvent) => void
  onSwitchToLogin: () => void
}

const STRENGTH_LABEL_M = ['', 'Weak', 'Fair', 'Strong']

function MobileRegisterForm({
  registerForm, setRegisterField,
  confirmPassword, setConfirmPassword,
  showRegisterPw, setShowRegisterPw,
  showConfirmPw, setShowConfirmPw,
  registerErrors, registerTerms, setRegisterTerms,
  registerTermsError, setRegisterTermsError,
  registerStatus, registerPwScore, regPwSegClass,
  onRegisterSubmit, onSwitchToLogin
}: MobileRegisterFormProps): React.ReactElement {
  const inputCls = (err?: string) =>
    `w-full bg-[#0a0a0a] border text-fg font-mono text-xs tracking-widest py-5 px-4 focus:outline-none rounded-none uppercase placeholder:text-faint/30 transition-all ${
      err ? 'border-red/60 focus-visible:border-red' : 'border-fg/10 focus-visible:border-red/40'
    }`

  return (
    <form onSubmit={onRegisterSubmit} noValidate className="flex flex-col gap-4 pb-8">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-firstName">First Name</Label>
          <Input className={inputCls(registerErrors.firstName)} id="m-firstName" type="text" placeholder="John"
            value={registerForm.firstName} onChange={setRegisterField('firstName')} />
          {registerErrors.firstName && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{registerErrors.firstName}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-lastName">Last Name</Label>
          <Input className={inputCls(registerErrors.lastName)} id="m-lastName" type="text" placeholder="Doe"
            value={registerForm.lastName} onChange={setRegisterField('lastName')} />
          {registerErrors.lastName && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{registerErrors.lastName}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-username">Username</Label>
        <Input className={inputCls(registerErrors.username)} id="m-username" type="text" placeholder="Your handle"
          value={registerForm.username} onChange={setRegisterField('username')} />
        {registerErrors.username && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{registerErrors.username}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-email">Email Address</Label>
        <Input className={inputCls(registerErrors.email)} id="m-email" type="email" placeholder="your@email.com"
          value={registerForm.email} onChange={setRegisterField('email')} />
        {registerErrors.email && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{registerErrors.email}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-password">Passcode</Label>
        <div className="relative">
          <Input className={inputCls(registerErrors.password) + ' pr-12'} id="m-password"
            type={showRegisterPw ? 'text' : 'password'} placeholder="Create passcode"
            value={registerForm.password} onChange={setRegisterField('password')} />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-fg transition-colors" onClick={() => setShowRegisterPw((v) => !v)}>
            <EyeIcon open={!showRegisterPw} />
          </button>
        </div>
        {registerForm.password.length > 0 && (
          <div className="flex gap-1 h-0.5 mt-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`flex-1 h-full transition-colors duration-300 ${
                regPwSegClass(i) === 'w' ? 'bg-red/50' : regPwSegClass(i) === 'm' ? 'bg-yellow-600/50' : regPwSegClass(i) === 's' ? 'bg-green-600/50' : 'bg-[#121212]'
              }`} />
            ))}
          </div>
        )}
        {registerForm.password.length > 0 && <span className="text-[9px] font-mono text-muted uppercase tracking-wider text-right">Strength: {STRENGTH_LABEL_M[registerPwScore]}</span>}
        {registerErrors.password && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{registerErrors.password}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-mono tracking-widest text-muted uppercase" htmlFor="m-confirm-pw">Confirm Passcode</Label>
        <div className="relative">
          <Input className={inputCls(registerErrors.confirmPassword) + ' pr-12'} id="m-confirm-pw"
            type={showConfirmPw ? 'text' : 'password'} placeholder="Repeat passcode"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-fg transition-colors" onClick={() => setShowConfirmPw((v) => !v)}>
            <EyeIcon open={!showConfirmPw} />
          </button>
        </div>
        {registerErrors.confirmPassword && <span className="text-[9px] font-mono text-red uppercase tracking-widest">{registerErrors.confirmPassword}</span>}
      </div>

      <div className="flex gap-3 items-start mt-1">
        <Checkbox
          id="m-terms" checked={registerTerms}
          onCheckedChange={(checked) => { setRegisterTerms(!!checked); if (checked) setRegisterTermsError(false) }}
          className={`mt-1 border-fg/15 data-[state=checked]:bg-red data-[state=checked]:border-red rounded-none cursor-pointer ${registerTermsError ? 'border-red' : ''}`}
        />
        <Label htmlFor="m-terms" className={`text-[10px] font-mono tracking-wide leading-relaxed uppercase select-none cursor-pointer ${registerTermsError ? 'text-red' : 'text-muted'}`}>
          I accept the <a href="#" className="underline text-red hover:text-white">terms of initiation</a> and confirm my devotion.
        </Label>
      </div>

      <Button variant="ritual" size="ritual" className="w-full mt-2" type="submit" disabled={registerStatus === 'submitting'}>
        {registerStatus === 'submitting' ? 'INITIATING...' : registerStatus === 'done' ? 'DONE' : 'Create Access'}
      </Button>

      <p className="text-center text-[10px] font-mono tracking-widest text-faint uppercase">
        ALREADY INITIATED?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-red font-bold hover:underline cursor-pointer">Return to login</button>
      </p>
    </form>
  )
}

