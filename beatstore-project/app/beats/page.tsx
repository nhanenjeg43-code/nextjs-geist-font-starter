"use client"

import { NavigationBar } from "../../components/NavigationBar"
import { BeatCard } from "../../components/BeatCard"
import { useState } from "react"

export default function BeatsPage() {
  const [activeGenre, setActiveGenre] = useState<string>("all")
  // This would typically come from an API or database
  const beats = [
    {
      id: 1,
      title: "Summer Vibes",
      price: 29.99,
      genre: "Hip Hop",
      image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      dropboxLink: "https://www.dropbox.com/s/example/summer-vibes-preview.mp3?raw=1"
    },
    {
      id: 2,
      title: "Night Rider",
      price: 34.99,
      genre: "Trap",
      image: "https://images.pexels.com/photos/1537638/pexels-photo-1537638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Urban Dreams",
      price: 39.99,
      genre: "R&B",
      image: "https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      title: "Midnight Flow",
      price: 44.99,
      genre: "Hip Hop",
      image: "https://images.pexels.com/photos/2426085/pexels-photo-2426085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      title: "City Lights",
      price: 32.99,
      genre: "Trap",
      image: "https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 6,
      title: "Dream State",
      price: 36.99,
      genre: "R&B",
      image: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ]

  return (
    <>
      <NavigationBar />
      
      <main className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Beats</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our collection of high-quality beats. Preview and purchase the perfect beat for your next track.
            </p>
          </div>

          {/* Filters Section */}
          <div className="flex justify-center gap-4 mb-12">
            {["all", "Hip Hop", "Trap", "R&B"].map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeGenre === genre 
                    ? "bg-white text-black" 
                    : "bg-zinc-900 hover:bg-zinc-800 text-white"
                }`}
              >
                {genre === "all" ? "All Beats" : genre}
              </button>
            ))}
          </div>

          {/* Beats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {beats
              .filter(beat => activeGenre === "all" || beat.genre === activeGenre)
              .map((beat) => (
              <BeatCard
                key={beat.id}
                id={beat.id}
                title={beat.title}
                price={beat.price}
                genre={beat.genre}
                image={beat.image}
                onPlay={() => console.log(`Playing beat: ${beat.title}`)}
                dropboxLink={beat.dropboxLink}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
