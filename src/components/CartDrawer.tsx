'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { useCart } from '@/features/cart/context/CartContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet/sheet'
import { ShoppingBag, Trash2, Plus, Minus, X } from 'lucide-react'

export interface CartDrawerProps {
  mobile?: boolean
  onCloseMobileMenu?: () => void
}

export function CartDrawer({ mobile = false, onCloseMobileMenu }: CartDrawerProps): React.ReactElement {
  const { cart, updateQuantity, removeFromCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        {mobile ? (
          <button
            onClick={onCloseMobileMenu}
            className="text-lg font-mono tracking-wider text-muted border border-fg/10 px-6 py-2 hover:border-red transition-colors flex items-center gap-2 cursor-pointer w-fit"
          >
            <ShoppingBag size={16} /> Bag ({cart.totalQuantity})
          </button>
        ) : (
          <button className="nav__cart cursor-pointer flex items-center gap-1.5 hover:text-red transition-colors duration-300">
            <span>Bag</span>
            <span className="nav__cart-count text-red font-semibold font-mono">({cart.totalQuantity})</span>
          </button>
        )}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-black border-l border-line/20 text-fg p-0 flex flex-col h-full font-mono">
        <SheetHeader className="p-6 border-b border-line/10 flex flex-row items-center justify-between">
          <SheetTitle className="font-serif text-lg tracking-[0.2em] text-fg uppercase flex items-center gap-2">
            <ShoppingBag size={18} className="text-red" />
            <span>THE BAG</span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <span className="text-[3rem] font-serif opacity-10 text-faint">Ø</span>
              <p className="text-xs uppercase tracking-widest text-faint">YOUR BAG IS EMPTY</p>
              <p className="text-[10px] text-faint/60 max-w-[200px] leading-relaxed uppercase">
                THE VOID AWAITS. FILL IT WITH SACRED GARMENTS.
              </p>
              <SheetClose asChild>
                <Link
                  href="/collection"
                  className="mt-4 px-6 py-2 border border-fg/20 hover:border-red hover:text-red transition-colors duration-300 text-xs font-semibold uppercase tracking-wider"
                >
                  Return to Collection
                </Link>
              </SheetClose>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-line/5 items-start justify-between"
              >
                <div className="relative w-16 h-20 bg-panel-2 border border-line/10 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h4 className="font-serif text-xs uppercase tracking-wider text-fg truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[10px] text-faint tracking-widest mt-1">
                    SIZE: {item.selectedSize}
                  </p>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-red transition-colors text-faint cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-semibold px-2 w-6 text-center font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-red transition-colors text-faint cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between items-end h-full">
                  <span className="text-xs font-semibold text-fg">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-6 text-faint hover:text-red transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {cart.items.length > 0 && (
          <SheetFooter className="p-6 border-t border-line/10 bg-panel flex flex-col gap-4 mt-auto">
            {/* Free shipping threshold placeholder */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-faint">
                <span>Free Shipping Status</span>
                <span>
                  {cart.totalAmount >= 300
                    ? 'ELIGIBLE FOR FREE SHIPPING'
                    : `ADD $${(300 - cart.totalAmount).toFixed(2)} MORE`}
                </span>
              </div>
              <div className="w-full h-[2px] bg-line/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red transition-all duration-500"
                  style={{ width: `${Math.min((cart.totalAmount / 300) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-xs uppercase tracking-wider text-faint">TOTAL ESTIMATION</span>
              <span className="text-base font-bold text-fg">${cart.totalAmount.toFixed(2)}</span>
            </div>

            <SheetClose asChild>
              <Link
                href="/checkout"
                className="w-full py-4 bg-red hover:bg-red-bright text-white text-center text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase [box-shadow:0_0_20px_rgba(197,20,27,0.15)] hover:[box-shadow:0_0_30px_rgba(255,26,26,0.3)]"
              >
                PROCEED TO INITIATION
              </Link>
            </SheetClose>
            
            <SheetClose asChild>
              <button className="w-full text-center text-[10px] text-faint hover:text-fg uppercase tracking-widest transition-colors duration-300 py-1 cursor-pointer">
                CONTINUE WANDERING
              </button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
