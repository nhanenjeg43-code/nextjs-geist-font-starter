"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, ShoppingCart } from "lucide-react"

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState("albums")

  const albums = [
    {
      id: 1,
      title: "Midnight Reflections",
      type: "Album",
      price: 19.99,
      tracks: 12,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Hip Hop",
      releaseDate: "2024"
    },
    {
      id: 2,
      title: "Urban Stories",
      type: "Album",
      price: 24.99,
      tracks: 15,
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "R&B",
      releaseDate: "2024"
    }
  ]

  const eps = [
    {
      id: 3,
      title: "Late Night Vibes",
      type: "EP",
      price: 12.99,
      tracks: 6,
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Trap",
      releaseDate: "2024"
    },
    {
      id: 4,
      title: "Summer Sessions",
      type: "EP",
      price: 14.99,
      tracks: 7,
      image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Pop",
      releaseDate: "2024"
    }
  ]

  const mixtapes = [
    {
      id: 5,
      title: "Street Chronicles",
      type: "Mixtape",
      price: 9.99,
      tracks: 18,
      image: "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Hip Hop",
      releaseDate: "2024"
    },
    {
      id: 6,
      title: "Freestyle Friday",
      type: "Mixtape",
      price: 7.99,
      tracks: 10,
      image: "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      genre: "Rap",
      releaseDate: "2024"
    }
  ]

  const getCurrentData = () => {
    switch (activeTab) {
      case "albums": return albums
      case "eps": return eps
      case "mixtapes": return mixtapes
      default: return albums
    }
  }

  const MusicCard = ({ item }: { item: any }) => (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:bg-zinc-800 transition-colors">
      <div className="relative aspect-square">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="rounded-full w-12 h-12 p-0">
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-zinc-700 px-2 py-1 rounded">{item.type}</span>
          <span className="text-xs text-gray-400">{item.genre}</span>
        </div>
        
        <h3 className="font-semibold mb-1">{item.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{item.tracks} tracks • {item.releaseDate}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${item.price}</span>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
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
            <h1 className="text-4xl font-bold mb-4">Music Collection</h1>
            <p className="text-gray-400 text-lg">
              Explore my complete discography - Albums, EPs, and Mixtapes
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-zinc-900 rounded-lg p-1">
              {[
                { key: "albums", label: "Albums" },
                { key: "eps", label: "EPs" },
                { key: "mixtapes", label: "Mixtapes" }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    activeTab === key
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Music Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getCurrentData().map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
