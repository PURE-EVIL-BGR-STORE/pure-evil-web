'use client'

import React, { useRef, useState } from 'react'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export function CultSection(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = email.trim()
    if (!EMAIL_RE.test(val)) {
      inputRef.current?.focus()
      formRef.current?.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-7px)' },
          { transform: 'translateX(7px)' },
          { transform: 'translateX(0)' },
        ],
        { duration: 280, easing: 'ease-in-out' },
      )
      const form = formRef.current
      if (form) {
        form.classList.add('!border-blood')
        setTimeout(() => {
          form.classList.remove('!border-blood')
        }, 900)
      }
      return
    }
    setDone(true)
  }

  return (
    <section
      id="cult"
      className="border-t border-border bg-background min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-10 px-5 relative overflow-hidden bg-[radial-gradient(70%_90%_at_50%_120%,rgba(74,4,8,0.45),transparent_70%)]"
    >
      {/* Background Sigil */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/PURE_EVIL_LOGO_3.png"
        alt=""
        className="absolute bottom-[-18%] left-1/2 -translate-x-1/2 w-[min(90vw,51.25rem)] opacity-5 pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-[47.5rem] mx-auto text-center flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
          The Cult — Members Only
        </span>

        <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-[0.02em] text-bone uppercase mb-8">
          Join the <br />
          <span className="text-blood">Cult</span>
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[48ch] mx-auto mb-10">
          First access to every drop. Encrypted ritual updates. Exclusive sigils never sold to the
          masses. Initiation is permanent.
        </p>

        {!done ? (
          <form
            className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-0 border border-border focus-within:border-blood focus-within:shadow-[0_0_30px_rgba(197,20,27,0.12)] transition-all duration-300 bg-background/50 backdrop-blur-sm"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
          >
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-5 py-4 text-sm focus:outline-none placeholder:text-muted-foreground/60 font-mono tracking-wider text-bone text-center sm:text-left"
              required
            />
            <button
              type="submit"
              className="bg-bone text-background px-8 py-4 text-xs font-mono uppercase tracking-[0.3em] hover:bg-blood hover:text-bone transition-colors duration-300 font-bold cursor-pointer"
            >
              Initiate
            </button>
          </form>
        ) : (
          <p className="w-full max-w-md mx-auto text-blood font-mono text-sm uppercase tracking-[0.3em] py-4 border border-blood bg-blood/5 flex items-center justify-center gap-2">
            ✦ &nbsp;You have been initiated
          </p>
        )}

        <p className="mt-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-80">
          No mercy. No spam. Unsubscribe to renounce.
        </p>
      </div>
    </section>
  )
}
