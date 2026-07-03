'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CartItem, CartState } from '@/shared/types/cart'
import type { Product } from '@/shared/constants/products'
import { toast } from 'sonner'

interface CartContextType {
  cart: CartState
  addToCart: (product: Product, quantity: number, size: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'pure_evil_bag'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        setCart(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
    }
  }, [])

  // Save cart to localStorage and compute totals whenever it changes
  const updateCartState = (newItems: CartItem[]) => {
    const totalQuantity = newItems.reduce((acc, item) => acc + item.quantity, 0)
    const totalAmount = newItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    
    const newState = {
      items: newItems,
      totalQuantity,
      totalAmount,
    }
    
    setCart(newState)
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }

  const addToCart = (product: Product, quantity: number, size: string) => {
    const existingIndex = cart.items.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    )

    let newItems = [...cart.items]

    if (existingIndex > -1) {
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + quantity,
      }
    } else {
      newItems.push({
        id: `${product.id}-${size}`,
        product,
        quantity,
        selectedSize: size,
      })
    }

    updateCartState(newItems)
    toast.success(`ADDED TO BAG: ${product.name} (SIZE ${size})`, {
      className: 'gothic-toast',
      duration: 2500,
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    const newItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    )
    updateCartState(newItems)
  }

  const removeFromCart = (itemId: string) => {
    const item = cart.items.find((i) => i.id === itemId)
    const newItems = cart.items.filter((item) => item.id !== itemId)
    updateCartState(newItems)
    
    if (item) {
      toast.error(`REMOVED: ${item.product.name} (SIZE ${item.selectedSize})`, {
        className: 'gothic-toast',
        duration: 2500,
      })
    }
  }

  const clearCart = () => {
    updateCartState([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
