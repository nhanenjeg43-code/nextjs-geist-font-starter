"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Music, Mic, Package, Image, Lock } from "lucide-react"

export default function UploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    price: "",
    genre: "",
    bpm: "",
    key: "",
    type: "beat", // beat, sample-pack, vocal-preset, stems
    tags: ""
  })
  const [files, setFiles] = useState({
    audio: null as File | null,
    image: null as File | null,
    stems: [] as File[]
  })
  const [isUploading, setIsUploading] = useState(false)

  // Simple admin authentication (in production, use proper auth)
  const ADMIN_PASSWORD = "admin123" // Change this to your secure password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password!")
    }
  }

  const handleFileChange = (type: string, files: FileList | null) => {
    if (!files) return
    
    if (type === "audio") {
      setFiles(prev => ({ ...prev, audio: files[0] }))
    } else if (type === "image") {
      setFiles(prev => ({ ...prev, image: files[0] }))
    } else if (type === "stems") {
      setFiles(prev => ({ ...prev, stems: Array.from(files) }))
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In a real app, you would upload files to your server/cloud storage
    console.log("Upload data:", uploadData)
    console.log("Files:", files)

    alert("Upload successful! Your content has been added to the store.")
    
    // Reset form
    setUploadData({
      title: "",
      description: "",
      price: "",
      genre: "",
      bpm: "",
      key: "",
      type: "beat",
      tags: ""
    })
    setFiles({ audio: null, image: null, stems: [] })
    setIsUploading(false)
  }

  if (!isAuthenticated) {
    return (
      <>
        <NavigationBar />
        <main className="min-h-screen bg-black pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="bg-zinc-900 border-zinc-800 p-8">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
                <p className="text-gray-400">Enter the admin password to upload content</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Card>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <NavigationBar />
      
      <main className="min-h-screen bg-black pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Upload Content</h1>
            <p className="text-gray-400 text-lg">
              Add beats, sample packs, vocal presets, and stems to your store
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-8">
            {/* Content Type Selection */}
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Content Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "beat", label: "Beat", icon: Music },
                  { value: "sample-pack", label: "Sample Pack", icon: Package },
                  { value: "vocal-preset", label: "Vocal Preset", icon: Mic },
                  { value: "stems", label: "Stems", icon: Upload }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setUploadData(prev => ({ ...prev, type: value }))}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      uploadData.type === value
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Basic Information */}
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Enter title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={uploadData.price}
                    onChange={(e) => setUploadData(prev => ({ ...prev, price: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="29.99"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={uploadData.genre} onValueChange={(value) => setUploadData(prev => ({ ...prev, genre: value }))}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                      <SelectItem value="Trap">Trap</SelectItem>
                      <SelectItem value="R&B">R&B</SelectItem>
                      <SelectItem value="Pop">Pop</SelectItem>
                      <SelectItem value="Electronic">Electronic</SelectItem>
                      <SelectItem value="Rock">Rock</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bpm">BPM</Label>
                  <Input
                    id="bpm"
                    type="number"
                    value={uploadData.bpm}
                    onChange={(e) => setUploadData(prev => ({ ...prev, bpm: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="140"
                  />
                </div>

                <div>
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    value={uploadData.key}
                    onChange={(e) => setUploadData(prev => ({ ...prev, key: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="C Minor"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={uploadData.tags}
                    onChange={(e) => setUploadData(prev => ({ ...prev, tags: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="melodic, dark, trap"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                  placeholder="Describe your content..."
                />
              </div>
            </Card>

            {/* File Uploads */}
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <h2 className="text-xl font-semibold mb-4">File Uploads</h2>
              
              <div className="space-y-6">
                {/* Audio File */}
                <div>
                  <Label htmlFor="audio">Audio File (MP3/WAV) *</Label>
                  <Input
                    id="audio"
                    type="file"
                    accept=".mp3,.wav"
                    onChange={(e) => handleFileChange("audio", e.target.files)}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                  {files.audio && (
                    <p className="text-sm text-green-400 mt-2">
                      Selected: {files.audio.name}
                    </p>
                  )}
                </div>

                {/* Cover Image */}
                <div>
                  <Label htmlFor="image">Cover Image (JPG/PNG) *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("image", e.target.files)}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                  {files.image && (
                    <p className="text-sm text-green-400 mt-2">
                      Selected: {files.image.name}
                    </p>
                  )}
                </div>

                {/* Stems (for beats and sample packs) */}
                {(uploadData.type === "beat" || uploadData.type === "stems" || uploadData.type === "sample-pack") && (
                  <div>
                    <Label htmlFor="stems">Stems/Additional Files (Optional)</Label>
                    <Input
                      id="stems"
                      type="file"
                      accept=".mp3,.wav"
                      multiple
                      onChange={(e) => handleFileChange("stems", e.target.files)}
                      className="bg-zinc-800 border-zinc-700"
                    />
                    {files.stems.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-green-400">
                          Selected {files.stems.length} files:
                        </p>
                        <ul className="text-xs text-gray-400 mt-1">
                          {files.stems.map((file, index) => (
                            <li key={index}>• {file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={isUploading}
                className="px-12"
              >
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Content
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
