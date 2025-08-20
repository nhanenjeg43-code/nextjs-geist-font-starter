"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2 } from "lucide-react"

interface AudioPlayerProps {
  url: string
  onPlay?: () => void
  onPause?: () => void
}

export function AudioPlayer({ url, onPlay, onPause }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audio = new Audio(url)
    audioRef.current = audio

    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e)
      setError('Failed to load audio file')
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
      setError(null)
    })

    audio.addEventListener('timeupdate', () => {
      setProgress(audio.currentTime)
    })

    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setProgress(0)
    })

    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ""
    }
  }, [url])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      onPause?.()
    } else {
      audioRef.current.play()
      onPlay?.()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return
    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setProgress(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return
    const newVolume = value[0]
    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      {error && (
        <div className="text-red-500 text-sm mb-2 text-center">
          {error}
        </div>
      )}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <div className="flex-1">
          <Slider
            value={[progress]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={handleProgressChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 min-w-[120px]">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  )
}
