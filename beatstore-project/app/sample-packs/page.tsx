"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, ShoppingCart, Package, Download } from "lucide-react"

export default function SamplePacksPage() {
  const [selectedGenre, setSelectedGenre] = useState("all")

  const samplePacks = [
    {
      id: 1,
      title: "Trap Essentials Vol. 1",
      price: 34.99,
      samples: 50,
      image: "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Trap",
      description: "Hard-hitting 808s, crisp snares, and melodic loops",
      tags: ["808s", "Snares", "Hi-Hats", "Melodies"]
    },
    {
      id: 2,
      title: "Lo-Fi Hip Hop Collection",
      price: 29.99,
      samples: 40,
      image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Lo-Fi",
      description: "Chill vibes with vinyl textures and warm sounds",
      tags: ["Vinyl", "Chords", "Bass", "Textures"]
    },
    {
      id: 3,
      title: "R&B Soul Pack",
      price: 39.99,
      samples: 35,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "R&B",
      description: "Smooth vocals, lush chords, and groovy basslines",
      tags: ["Vocals", "Chords", "Bass", "Drums"]
    },
    {
      id: 4,
      title: "Drill Starter Kit",
      price: 32.99,
      samples: 45,
      image: "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Drill",
      description: "Dark melodies and aggressive drum patterns",
      tags: ["Melodies", "808s", "Percs", "FX"]
    },
    {
      id: 5,
      title: "Afrobeat Rhythms",
      price: 36.99,
      samples: 38,
      image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Afrobeat",
      description: "Authentic African percussion and melodic elements",
      tags: ["Percussion", "Melodies", "Vocals", "Bass"]
    },
    {
      id: 6,
      title: "Electronic Fusion",
      price: 41.99,
      samples: 55,
      image: "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Electronic",
      description: "Futuristic synths and electronic textures",
      tags: ["Synths", "Arps", "Pads", "FX"]
    }
  ]

  const genres = ["all", "Trap", "Lo-Fi", "R&B", "Drill", "Afrobeat", "Electronic"]

  const filteredPacks = selectedGenre === "all" 
    ? samplePacks 
    : samplePacks.filter(pack => pack.genre === selectedGenre)

  const SamplePackCard = ({ pack }: { pack: any }) => (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:bg-zinc-800 transition-colors">
      <div className="relative aspect-square">
        <img
          src={pack.image}
          alt={pack.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="rounded-full w-12 h-12 p-0">
            <Play className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
            {pack.samples} Samples
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">{pack.genre}</span>
        </div>
        
        <h3 className="font-semibold mb-2">{pack.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{pack.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {pack.tags.map((tag: string) => (
            <span key={tag} className="text-xs bg-zinc-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${pack.price}</span>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Pack
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <>
      <NavigationBar />
      
      <main className="min-h-screen bg-black pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sample Packs</h1>
            <p className="text-gray-400 text-lg">
              High-quality sample packs to elevate your productions
            </p>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedGenre === genre
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                {genre === "all" ? "All Genres" : genre}
              </button>
            ))}
          </div>

          {/* Sample Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPacks.map((pack) => (
              <SamplePackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {/* Info Section */}
          <Card className="bg-zinc-900 border-zinc-800 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Download className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <h3 className="font-semibold mb-2">Instant Download</h3>
                <p className="text-sm text-gray-400">
                  Get immediate access to all samples after purchase
                </p>
              </div>
              <div className="text-center">
                <Package className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <h3 className="font-semibold mb-2">Multiple Formats</h3>
                <p className="text-sm text-gray-400">
                  WAV, AIFF, and REX files included for maximum compatibility
                </p>
              </div>
              <div className="text-center">
                <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <h3 className="font-semibold mb-2">Commercial License</h3>
                <p className="text-sm text-gray-400">
                  Full rights to use in your commercial releases
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
