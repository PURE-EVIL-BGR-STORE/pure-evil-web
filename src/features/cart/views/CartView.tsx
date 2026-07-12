'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { useCart } from '@/features/cart/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button/button'

export function CartView(): React.ReactElement {
  const { cart, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="w-full bg-background pt-6 pb-24 px-5 md:px-10 max-w-[1400px] mx-auto font-mono text-fg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 label mb-8">
        <Link href="/" className="hover:text-red transition-colors duration-300">Home</Link>
        <span>/</span>
        <span className="text-red">Bag</span>
      </div>

      <h1 className="text-3xl lg:text-4xl font-serif font-black tracking-[0.15em] uppercase mb-12 text-center lg:text-left">
        THE <span className="text-red [text-shadow:0_0_20px_var(--red-glow)]">BAG</span>
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-24 border border-line/10 bg-panel/30 flex flex-col items-center justify-center">
          <span className="text-[4rem] font-serif opacity-10 text-faint mb-4">Ø</span>
          <p className="text-sm uppercase tracking-[0.25em] text-faint mb-2">YOUR BAG IS ENTIRELY EMPTY</p>
          <p className="text-xs text-faint/60 max-w-sm leading-relaxed uppercase mb-8">
            The void calls, but holds no offerings. Populate it with curated artifacts.
          </p>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 px-8 py-3 border border-fg/20 hover:border-red hover:text-white hover:bg-red/10 transition-all duration-300 text-xs font-semibold uppercase tracking-[0.15em]"
          >
            <ArrowLeft size={14} />
            <span>Return to archives</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="hidden md:grid grid-cols-12 pb-4 border-b border-line/10 text-[10px] uppercase tracking-[0.2em] text-faint">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="divide-y divide-line/10">
              <AnimatePresence initial={false}>
                {cart.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, paddingBottom: 0, paddingTop: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-6 first:pt-0"
                  >
                    {/* Product Details */}
                    <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                      <div className="relative w-16 h-20 bg-panel-2 border border-line/10 overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/product/${item.product.id}`} className="font-serif text-sm uppercase tracking-wider hover:text-red transition-colors duration-300 truncate block">
                          {item.product.name}
                        </Link>
                        <p className="text-[10px] text-faint tracking-widest mt-1">
                          SIZE: {item.selectedSize}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="md:hidden flex items-center gap-1.5 mt-2 text-[10px] text-faint hover:text-red transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                          <span>REMOVE</span>
                        </button>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center items-center">
                      <div className="flex items-center border border-line/20 h-9 bg-panel">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-faint hover:text-red transition-colors cursor-pointer disabled:opacity-20"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-faint hover:text-red transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Total Price and Desktop Delete */}
                    <div className="col-span-1 md:col-span-3 flex md:flex-col justify-between md:justify-center items-center md:items-end gap-2">
                      <span className="text-xs font-semibold text-faint md:hidden uppercase tracking-widest">Total:</span>
                      <div className="text-right flex items-center gap-4">
                        <span className="text-sm font-bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hidden md:flex text-faint hover:text-red transition-colors duration-300 cursor-pointer p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Cart Summary Panel */}
          <div className="lg:col-span-4 bg-panel border border-line/25 p-6 md:p-8 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-red font-black border-b border-line/10 pb-3">
              Sacred Summary
            </h3>

            {/* Free shipping eligibility progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-faint">
                <span>Shipping Status</span>
                <span>
                  {cart.totalAmount >= 300
                    ? 'Eligible for Free Shipping'
                    : `Add $${(300 - cart.totalAmount).toFixed(2)} more`}
                </span>
              </div>
              <div className="w-full h-[3px] bg-line/20">
                <div
                  className="h-full bg-red transition-all duration-500 [box-shadow:0_0_8px_var(--red-glow)]"
                  style={{ width: `${Math.min((cart.totalAmount / 300) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-xs text-faint">
                <span>SUBTOTAL</span>
                <span className="font-semibold text-fg">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-faint">
                <span>SHIPPING RITUAL</span>
                <span className="font-semibold text-fg">
                  {cart.totalAmount >= 300 ? 'FREE' : '$15.00'}
                </span>
              </div>
              <div className="h-[1px] bg-line/10 w-full" />
              <div className="flex justify-between items-center py-2">
                <span className="text-xs uppercase tracking-wider font-bold">Estimated Total</span>
                <span className="text-lg font-black text-fg">
                  ${(cart.totalAmount + (cart.totalAmount >= 300 ? 0 : 15)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout & Continuation links */}
            <div className="space-y-4">
              <Button asChild variant="ritual" size="ritual" className="w-full">
                <Link href="/checkout">
                  Proceed to initiation
                </Link>
              </Button>
              
              <Link
                href="/collection"
                className="w-full py-3 border border-line/20 hover:border-fg text-center text-[10px] text-faint hover:text-fg uppercase tracking-[0.15em] transition-colors duration-300 block"
              >
                Continue wandering
              </Link>
            </div>

            {/* Extra assurance info */}
            <div className="pt-4 text-[9px] uppercase tracking-widest text-faint/50 leading-relaxed text-center">
              SECURED UNDERWORLD COVEN PROTOCOL · RETURNS ACCEPTED WITHIN 13 DAYS
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
