'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs/tabs'
import { ShoppingBag, Settings, User, Eye, History, Shield } from 'lucide-react'
import { PRODUCTS } from '@/shared/constants/products'
import { toast } from 'sonner'

export function ProfileView(): React.ReactElement {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  // Form profile state
  const [profileData, setProfileData] = useState({
    fullName: 'Thanatos Greek',
    email: 'oracle@underworld.com',
    address: 'Underworld Gateway 11',
    city: 'Athens',
    zipCode: '666-000',
  })

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser({ username: data.user.username, email: data.user.email })
          setProfileData((prev) => ({
            ...prev,
            fullName: data.user.name || data.user.username,
            email: data.user.email || '',
          }))
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch session', err)
        setLoading(false)
      })
  }, [])

  // Mock previous orders
  const mockOrders = [
    {
      id: 'PE-8902',
      date: '2026-06-18',
      total: 245.00,
      status: 'SHIPPED',
      items: [
        { product: PRODUCTS[0], quantity: 1, size: 'M' },
        { product: PRODUCTS[2], quantity: 1, size: 'S' }
      ]
    },
    {
      id: 'PE-7721',
      date: '2026-05-04',
      total: 160.00,
      status: 'SEALED',
      items: [
        { product: PRODUCTS[1], quantity: 1, size: 'L' }
      ]
    }
  ]

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('IDENTITY SEAL UPDATED.', {
      className: 'gothic-toast',
      duration: 3000
    })
  }

  if (loading) {
    return (
      <div className="w-full max-w-[1480px] mx-auto py-24 flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-2 border-red/20 border-t-red rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-faint">SEEKING IDENTITY...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1480px] mx-auto py-12 font-mono">
      {/* Header Panel */}
      <div className="border border-line/10 bg-panel p-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-glow/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 bg-panel-2 border border-line/20 flex items-center justify-center">
            <User size={24} className="text-red" />
          </div>
          <div>
            <span className="text-[10px] tracking-[0.3em] text-red font-bold uppercase font-mono">INITIATED MEMBER</span>
            <h2 className="text-xl font-serif text-fg uppercase tracking-widest mt-1">
              {user ? user.username : 'GUEST COVENANT'}
            </h2>
            <p className="text-xs text-faint tracking-wider mt-0.5">{profileData.email}</p>
          </div>
        </div>
        
        <div className="text-right text-[10px] tracking-widest text-faint/80 uppercase">
          <span className="text-red font-bold font-mono">SEAL STATUS //</span> TETHERED TO THE SHADOWS
        </div>
      </div>

      {/* Main Tabs Dashboard */}
      <Tabs defaultValue="orders" className="w-full space-y-8">
        <TabsList className="bg-panel border border-line/10 p-1 flex justify-start rounded-none h-auto w-full md:w-fit font-serif">
          <TabsTrigger
            value="orders"
            className="rounded-none border-0 data-[state=active]:bg-red data-[state=active]:text-white text-xs uppercase tracking-[0.2em] px-6 py-3 cursor-pointer"
          >
            <History size={12} className="mr-2" />
            INITIATION HISTORY
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none border-0 data-[state=active]:bg-red data-[state=active]:text-white text-xs uppercase tracking-[0.2em] px-6 py-3 cursor-pointer"
          >
            <Settings size={12} className="mr-2" />
            COVENANT DETAILS
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Orders list */}
        <TabsContent value="orders" className="space-y-6">
          {mockOrders.length === 0 ? (
            <div className="text-center py-20 border border-line/10 bg-panel/30">
              <p className="text-xs uppercase tracking-widest text-faint">NO RITUALS RECORDED.</p>
              <Link href="/collection" className="mt-4 inline-block px-6 py-2 border border-fg/20 hover:border-red hover:text-red transition-all duration-300 text-xs font-semibold uppercase tracking-wider">
                Initiate First Order
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-line/10 bg-panel p-6 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-line/10 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] tracking-wider text-faint uppercase font-mono">RITUAL ORDER ID</span>
                      <h4 className="text-sm font-bold text-fg uppercase tracking-widest">{order.id}</h4>
                    </div>
                    <div>
                      <span className="text-[10px] tracking-wider text-faint uppercase font-mono">SEALING DATE</span>
                      <p className="text-xs text-fg tracking-wider">{order.date}</p>
                    </div>
                    <div>
                      <span className="text-[10px] tracking-wider text-faint uppercase font-mono">TOTAL SACRIFICE</span>
                      <p className="text-xs font-bold text-fg tracking-wider">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] tracking-wider text-faint uppercase font-mono">SEAL STATUS</span>
                      <div className="mt-1">
                        <span className={`text-[9px] font-bold px-2 py-0.5 tracking-widest rounded-none uppercase ${
                          order.status === 'SHIPPED' 
                            ? 'bg-red text-white' 
                            : 'bg-panel-2 border border-red/40 text-red-bright'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-panel-2 border border-line/10 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.product.img}
                              alt={item.product.name}
                              className="w-full h-full object-cover grayscale"
                            />
                          </div>
                          <div>
                            <p className="font-serif text-[11px] text-fg uppercase tracking-wider">{item.product.name}</p>
                            <p className="text-[9px] text-faint tracking-widest">SIZE: {item.size} × {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-fg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Profile settings form */}
        <TabsContent value="details">
          <form onSubmit={handleUpdateProfile} className="border border-line/10 bg-panel p-8 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-red font-bold border-b border-line/10 pb-2">
              UPDATE IDENTITY SEAL
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-faint">Initiate Name</label>
                <input
                  type="text"
                  required
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="w-full bg-panel-2 border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-faint">Sacred Email</label>
                <input
                  type="email"
                  required
                  disabled
                  value={profileData.email}
                  className="w-full bg-panel-2 border border-line/20 px-4 py-3 text-xs text-faint/60 focus:outline-none cursor-not-allowed opacity-70"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-faint">Sanctuary Address</label>
              <input
                type="text"
                required
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                className="w-full bg-panel-2 border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-faint">City / Realm</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full bg-panel-2 border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-faint">Sigil Zip / Code</label>
                <input
                  type="text"
                  value={profileData.zipCode}
                  onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                  className="w-full bg-panel-2 border border-line/20 px-4 py-3 text-xs text-fg focus:border-red focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-red hover:bg-red-bright text-white text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase [box-shadow:0_0_20px_rgba(197,20,27,0.15)] hover:[box-shadow:0_0_30px_rgba(255,26,26,0.3)] cursor-pointer"
            >
              SAVE COVENANT SEAL
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
