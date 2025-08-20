"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  license: string
}

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0))
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-center text-gray-400 mt-8">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {items.map(item => (
                        <Card key={item.id} className="p-4 bg-zinc-800 border-zinc-700">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-gray-400">${item.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-zinc-800 pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
