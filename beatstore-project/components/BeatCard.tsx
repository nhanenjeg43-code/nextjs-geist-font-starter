"use client"

import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Play, Pause, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BeatCardProps {
  id: number
  title: string
  price: number
  genre: string
  image: string
  dropboxLink?: string
  onPlay?: () => void
}

export function BeatCard({ id, title, price, genre, image, dropboxLink, onPlay }: BeatCardProps) {
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleCardClick = () => {
    router.push(`/beats/${id}`)
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group">
      <div 
        className="relative cursor-pointer"
        onClick={handleCardClick}
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        <Button
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              togglePlay()
              if (onPlay) onPlay()
            }}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      </div>
      
      <div className="p-6">
        <div 
          className="flex items-start justify-between mb-4 cursor-pointer"
          onClick={handleCardClick}
        >
          <div>
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-gray-400">{genre}</p>
          </div>
          <span className="text-2xl font-bold">${price}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            className="flex-1"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              togglePlay()
              if (onPlay) onPlay()
            }}
          >
            {isPlaying ? "Pause" : "Preview"}
          </Button>
          <Link href={`/beats/${id}`} className="flex-1">
            <Button className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
      {dropboxLink && (
        <audio ref={audioRef} src={dropboxLink} preload="none" onEnded={() => setIsPlaying(false)} />
      )}
    </Card>
  )
}
