"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NavigationBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            xaudi
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/music" className="text-sm hover:text-gray-300 transition-colors">
              Music
            </Link>
            <Link href="/beats" className="text-sm hover:text-gray-300 transition-colors">
              Beat Store
            </Link>
            <Link href="/sample-packs" className="text-sm hover:text-gray-300 transition-colors">
              Sample Packs
            </Link>
            <Link href="/vocal-presets" className="text-sm hover:text-gray-300 transition-colors">
              Vocal Presets
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/signin">
                Sign In
              </Link>
            </Button>
            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
