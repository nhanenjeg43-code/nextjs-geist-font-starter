"use client"

import { useState } from "react"

type Product = {
  id: number
  title: string
  price: number
  image: string
  dropboxLink: string
  productType: string
  genre: string
}

const productTypes = ["Beat", "Vocal Preset", "Sample Pack", "Music"]
const genres = ["Hip Hop", "Trap", "R&B", "Pop", "Electronic", "Other"]

export default function AdminUploadPage() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [dropboxLink, setDropboxLink] = useState("")
  const [productType, setProductType] = useState(productTypes[0])
  const [genre, setGenre] = useState(genres[0])
  const [products, setProducts] = useState<Product[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !price || !image || !dropboxLink) {
      alert("Please fill in all fields")
      return
    }
    const newProduct: Product = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      image,
      dropboxLink,
      productType,
      genre,
    }
    setProducts([...products, newProduct])
    alert("Product added successfully")
    setTitle("")
    setPrice("")
    setImage("")
    setDropboxLink("")
    setProductType(productTypes[0])
    setGenre(genres[0])
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Upload Page</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block mb-1">Product Type</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          >
            {productTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price (USD)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Dropbox Link</label>
          <input
            type="url"
            value={dropboxLink}
            onChange={(e) => setDropboxLink(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Add Product
        </button>
      </form>

      {products.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Products</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="border border-zinc-700 p-4 rounded">
                <h3 className="font-semibold">{product.title}</h3>
                <p>Type: {product.productType}</p>
                <p>Genre: {product.genre}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <a href={product.dropboxLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Download Link
                </a>
                <div>
                  <img src={product.image} alt={product.title} className="mt-2 max-w-xs rounded" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
