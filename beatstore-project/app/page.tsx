import { NavigationBar } from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Music, Package, Mic, Headphones } from "lucide-react"

export default function Home() {
  const featuredContent = [
    {
      id: 1,
      title: "Summer Vibes",
      price: 29.99,
      type: "Beat",
      genre: "Hip Hop",
      image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "Midnight Reflections",
      price: 19.99,
      type: "Album",
      genre: "R&B",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Trap Essentials Vol. 1",
      price: 34.99,
      type: "Sample Pack",
      genre: "Trap",
      image: "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ]

  const categories = [
    {
      title: "Music",
      description: "Albums, EPs & Mixtapes",
      icon: Music,
      href: "/music",
      color: "bg-blue-600"
    },
    {
      title: "Beat Store",
      description: "Premium Beats",
      icon: Headphones,
      href: "/beats",
      color: "bg-purple-600"
    },
    {
      title: "Sample Packs",
      description: "High-Quality Samples",
      icon: Package,
      href: "/sample-packs",
      color: "bg-green-600"
    },
    {
      title: "Vocal Presets",
      description: "Professional Processing",
      icon: Mic,
      href: "/vocal-presets",
      color: "bg-red-600"
    }
  ]

  return (
    <>
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/50" />
          <img 
            src="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Studio Setup"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Premium Music & Production Content
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover beats, albums, sample packs, and vocal presets. Everything you need for your next hit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/music">Explore Music</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/beats">Beat Store</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.title} href={category.href}>
                  <Card className="bg-zinc-900 border-zinc-800 p-6 hover:bg-zinc-800 transition-colors group cursor-pointer">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-gray-400">{category.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((item) => (
              <Card key={item.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:bg-zinc-800 transition-colors">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.genre}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${item.price}</span>
                    <Button variant="secondary">
                      Preview
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-gray-400">Premium Beats</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-gray-400">Albums & EPs</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">25+</h3>
              <p className="text-gray-400">Sample Packs</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">30+</h3>
              <p className="text-gray-400">Vocal Presets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Music?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of artists who trust our premium content for their productions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/music">Start Exploring</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/upload">Upload Content</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
