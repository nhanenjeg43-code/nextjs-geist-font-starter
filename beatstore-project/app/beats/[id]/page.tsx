"use client"

import { NavigationBar } from "@/components/NavigationBar"
import { AudioPlayer } from "@/components/AudioPlayer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Download } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BeatDetails() {
  const params = useParams()
  const router = useRouter()
  const [beat, setBeat] = useState({
    id: 1,
    title: "Summer Vibes",
    price: 29.99,
    genre: "Hip Hop",
    bpm: 140,
    key: "C Minor",
    description: "A smooth hip-hop beat with melodic elements and hard-hitting drums. Perfect for modern rap and R&B tracks.",
    image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav", // Using a sample audio file
    tags: ["Hip Hop", "Trap", "Melodic", "140 BPM"]
  })

  useEffect(() => {
    // In a real app, you would fetch the beat data here using the ID
    console.log('Beat ID:', params.id)
  }, [params.id])

  return (
    <>
      <NavigationBar />
      
      <main className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image and Audio Player */}
            <div>
              <div className="relative aspect-square mb-6">
                <img 
                  src={beat.image}
                  alt={beat.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <AudioPlayer url={beat.audioUrl} />
            </div>

            {/* Right Column - Beat Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{beat.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">${beat.price}</span>
                <div className="flex gap-2">
                  {beat.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-zinc-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Card className="bg-zinc-900 border-zinc-800 p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 mb-1">Genre</p>
                    <p className="font-semibold">{beat.genre}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">BPM</p>
                    <p className="font-semibold">{beat.bpm}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Key</p>
                    <p className="font-semibold">{beat.key}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  {beat.description}
                </p>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={() => router.push(`/checkout?beatId=${beat.id}`)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Buy Now ${beat.price}
                  </Button>
                  <Button variant="outline" size="lg">
                    Add to Cart
                  </Button>
                </div>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 p-6">
                <h3 className="text-xl font-semibold mb-4">Licensing Terms</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Download className="h-5 w-5 mt-0.5" />
                    <span>Instant download after purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="h-5 w-5 mt-0.5" />
                    <span>High quality WAV & MP3 files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="h-5 w-5 mt-0.5" />
                    <span>Unlimited commercial use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="h-5 w-5 mt-0.5" />
                    <span>Full ownership rights</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
