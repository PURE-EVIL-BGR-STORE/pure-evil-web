'use client'

import React, { useState } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { useCart } from '@/features/cart/context/CartContext'
import { ShoppingBag, ArrowLeft, ShieldAlert, Check } from 'lucide-react'

export function CheckoutView(): React.ReactElement {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Minimal validation
    if (!formData.email || !formData.fullName || !formData.address) {
      setError('REQUIRED SACRIFICE FIELDS MISSING.')
      return
    }

    setLoading(true)
    setError('')

    // Theme-based checkout initiation delay
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      clearCart()
    }, 2800)
  }

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 font-mono">
        <div className="w-16 h-16 bg-red-glow border border-red/40 rounded-full flex items-center justify-center mb-8 animate-pulse">
          <Check size={28} className="text-red-bright" />
        </div>
        <h1 className="text-3xl font-serif tracking-[0.2em] text-fg uppercase mb-4">
          INITIATION COMPLETE
        </h1>
        <p className="text-xs text-faint tracking-widest max-w-md leading-relaxed uppercase mb-8">
          YOUR TRANSACTIONS HAVE BEEN SEALED. AN ORACLE EMAIL WILL REACH YOU SHORTLY WITH SHIPMENT RITUAL DETAILS.
        </p>
        <Link
          href="/collection"
          className="px-8 py-3 bg-red hover:bg-red-bright text-white text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase [box-shadow:0_0_20px_rgba(197,20,27,0.2)]"
        >
          CONTINUE TO ARCHIVES
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1480px] mx-auto py-12 font-mono">
      {/* Return link */}
      <div className="mb-8">
        <Link href="/collection" className="inline-flex items-center gap-2 text-xs text-faint hover:text-fg transition-colors duration-300 uppercase tracking-widest">
          <ArrowLeft size={14} />
          <span>Return to Collection</span>
        </Link>
      </div>

      <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-[0.15em] text-fg uppercase mb-12 text-center lg:text-left">
        ORDER <span className="text-red [text-shadow:0_0_20px_rgba(197,20,27,0.3)]">INITIATION</span>
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm uppercase tracking-widest text-faint">NO SACRIFICES IN CURRENT BAG.</p>
          <Link href="/collection" className="mt-6 inline-block px-6 py-2 border border-fg/20 hover:border-red hover:text-red transition-all duration-300 text-xs font-semibold uppercase tracking-wider">
            Fill the Bag
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Checkout forms */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            {error && (
              <div className="p-4 bg-red-deep/30 border border-red/40 text-red-bright text-xs tracking-wider flex items-center gap-3 uppercase">
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Covenant Identity */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.25em] text-red font-bold border-b border-line/10 pb-2">
                01. COVENANT DETAILS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-faint">Sacred Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="oracle@underworld.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-faint">Initiate Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Thanatos Greek"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Sanctuary */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.25em] text-red font-bold border-b border-line/10 pb-2">
                02. SHIPPING RITUAL PLACE
              </h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-faint">Sanctuary Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Underworld Gateway 11"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-faint">City / Realm</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Athens / Tartarus"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-faint">Sigil Zip / Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="666-000"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Transaction Sacrifice */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.25em] text-red font-bold border-b border-line/10 pb-2">
                03. TRANSACTION SACRIFICE
              </h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-faint">Credit Sigil Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-faint">Sealing Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="06/66"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-faint">Covenant Key (CVC)</label>
                  <input
                    type="password"
                    name="cardCvc"
                    placeholder="***"
                    maxLength={4}
                    value={formData.cardCvc}
                    onChange={handleChange}
                    className="w-full bg-panel border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300 placeholder:text-faint/30"
                  />
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-red hover:bg-red-bright text-white text-center text-xs font-bold tracking-[0.25em] transition-all duration-300 uppercase [box-shadow:0_0_20px_rgba(197,20,27,0.15)] hover:[box-shadow:0_0_30px_rgba(255,26,26,0.35)] cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>SEALING TRANSACTION...</span>
                </div>
              ) : (
                <span>CONFIRM INITIATION — ${(cart.totalAmount + 15).toFixed(2)}</span>
              )}
            </button>
          </form>

          {/* Checkout Order Summary Panel */}
          <div className="lg:col-span-5 bg-panel border border-line/10 p-6 space-y-6">
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-fg border-b border-line/10 pb-3 flex items-center gap-2">
              <ShoppingBag size={14} className="text-red" />
              <span>SACRIFICES SUMMARY</span>
            </h3>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-12 bg-panel-2 border border-line/5 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-serif text-[11px] text-fg uppercase truncate">{item.product.name}</p>
                      <p className="text-[9px] text-faint tracking-widest">SZ: {item.selectedSize} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-fg flex-shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-line/10 pt-4 space-y-2.5 text-xs text-faint">
              <div className="flex justify-between">
                <span>ESTIMATION</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SACRED POSTAL TAX</span>
                <span>$15.00</span>
              </div>
            </div>

            <div className="border-t border-line/10 pt-4 flex justify-between items-center text-sm font-bold text-fg">
              <span>TOTAL REQUIREMENT</span>
              <span className="text-base">${(cart.totalAmount + 15).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
