"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, ShoppingCart, Mic, Download, Settings } from "lucide-react"

export default function VocalPresetsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const vocalPresets = [
    {
      id: 1,
      title: "Auto-Tune Melodic Pack",
      price: 24.99,
      presets: 15,
      image: "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Auto-Tune",
      description: "Perfect melodic auto-tune settings for modern vocals",
      compatibility: ["Antares Auto-Tune", "Waves Tune", "Melodyne"],
      tags: ["Melodic", "Modern", "Pop"]
    },
    {
      id: 2,
      title: "Trap Vocal Chain",
      price: 19.99,
      presets: 12,
      image: "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Effects Chain",
      description: "Complete vocal processing chain for trap vocals",
      compatibility: ["Pro Tools", "Logic Pro", "FL Studio"],
      tags: ["Trap", "Heavy", "Processed"]
    },
    {
      id: 3,
      title: "R&B Smooth Vocals",
      price: 27.99,
      presets: 18,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "EQ/Compression",
      description: "Warm and smooth vocal presets for R&B productions",
      compatibility: ["Waves", "FabFilter", "Universal Audio"],
      tags: ["Smooth", "Warm", "Professional"]
    },
    {
      id: 4,
      title: "Drill Vocal Effects",
      price: 22.99,
      presets: 10,
      image: "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Creative FX",
      description: "Aggressive vocal effects for drill and UK drill",
      compatibility: ["Ableton Live", "Cubase", "Studio One"],
      tags: ["Aggressive", "Dark", "UK Drill"]
    },
    {
      id: 5,
      title: "Pop Vocal Polish",
      price: 29.99,
      presets: 20,
      image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Mix Ready",
      description: "Radio-ready vocal presets for pop productions",
      compatibility: ["All Major DAWs", "Plugin Alliance", "iZotope"],
      tags: ["Radio Ready", "Polished", "Commercial"]
    },
    {
      id: 6,
      title: "Lo-Fi Vocal Texture",
      price: 18.99,
      presets: 8,
      image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Vintage",
      description: "Vintage-inspired vocal textures and warmth",
      compatibility: ["Tape plugins", "Vintage EQs", "Analog emulations"],
      tags: ["Vintage", "Lo-Fi", "Textured"]
    }
  ]

  const categories = ["all", "Auto-Tune", "Effects Chain", "EQ/Compression", "Creative FX", "Mix Ready", "Vintage"]

  const filteredPresets = selectedCategory === "all" 
    ? vocalPresets 
    : vocalPresets.filter(preset => preset.category === selectedCategory)

  const VocalPresetCard = ({ preset }: { preset: any }) => (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:bg-zinc-800 transition-colors">
      <div className="relative aspect-square">
        <img
          src={preset.image}
          alt={preset.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="rounded-full w-12 h-12 p-0">
            <Play className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
            {preset.presets} Presets
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Mic className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">{preset.category}</span>
        </div>
        
        <h3 className="font-semibold mb-2">{preset.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{preset.description}</p>
        
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
          <div className="flex flex-wrap gap-1">
            {preset.compatibility.slice(0, 2).map((comp: string) => (
              <span key={comp} className="text-xs bg-zinc-700 px-2 py-1 rounded">
                {comp}
              </span>
            ))}
            {preset.compatibility.length > 2 && (
              <span className="text-xs text-gray-400">
                +{preset.compatibility.length - 2} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {preset.tags.map((tag: string) => (
            <span key={tag} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${preset.price}</span>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Presets
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
            <h1 className="text-4xl font-bold mb-4">Vocal Presets</h1>
            <p className="text-gray-400 text-lg">
              Professional vocal processing presets for every genre
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>

          {/* Vocal Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPresets.map((preset) => (
              <VocalPresetCard key={preset.id} preset={preset} />
            ))}
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h2 className="text-xl font-bold mb-4">What You Get</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Settings className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold">Ready-to-Use Presets</h3>
                    <p className="text-sm text-gray-400">
                      Professionally crafted settings for instant results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold">Multiple Formats</h3>
                    <p className="text-sm text-gray-400">
                      Compatible with all major DAWs and plugins
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mic className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold">Installation Guide</h3>
                    <p className="text-sm text-gray-400">
                      Step-by-step instructions for easy setup
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h2 className="text-xl font-bold mb-4">System Requirements</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm">DAW Compatibility</h3>
                  <p className="text-sm text-gray-400">
                    Pro Tools, Logic Pro, FL Studio, Ableton Live, Cubase, Studio One
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Plugin Support</h3>
                  <p className="text-sm text-gray-400">
                    Waves, FabFilter, Universal Audio, iZotope, Plugin Alliance
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">File Formats</h3>
                  <p className="text-sm text-gray-400">
                    .fxp, .aupreset, .vstpreset, .adg, .cpr
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
