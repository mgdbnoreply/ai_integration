"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Smartphone, Gamepad, Info, Gift, Loader2 } from "lucide-react"
import type { CollectionData } from "@/lib/types"

// Define types for our data
interface Device {
  id: string
  name: string
  maker: string
  year: string
  description: string
  image: string
  category: string
}

export default function CollectionAndExperiencePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([])
  const [allDevices, setAllDevices] = useState<Device[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch collections from API on mount
  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log("🔄 Fetching collections from /api/collections...")
      const response = await fetch("/api/collections")
      
      if (!response.ok) {
        throw new Error(`Failed to fetch collections: ${response.status}`)
      }

      const data: CollectionData[] = await response.json()
      console.log(`✅ Loaded ${data.length} collections from API`)

      // Transform API data to Device format
      const devices: Device[] = data.map((item) => ({
        id: item.id || item.ProductID,
        name: item.name,
        maker: item.maker,
        year: item.year,
        description: item.description,
        image: item.image,
        category: item.category,
      }))

      setAllDevices(devices)
      setFilteredDevices(devices) // Show all devices initially
      setIsLoading(false)
    } catch (err) {
      console.error("❌ Error fetching collections:", err)
      setError(err instanceof Error ? err.message : "Failed to load collections")
      setIsLoading(false)
    }
  }

  // Update filtered devices when active category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredDevices(allDevices)
    } else {
      setFilteredDevices(
        allDevices.filter((device) => {
          return device.category === activeCategory
        }),
      )
    }
  }, [activeCategory, allDevices])

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Collection and Experience</h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              Explore our comprehensive collection of retro mobile gaming devices from 1975 to 2008, including handheld
              consoles, proprietary systems, games, and mobile phones that shaped the history of mobile gaming.
            </p>
            {/* Search Bar */}
            <div className="mt-6 mb-8">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search devices..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase()
                    if (searchTerm === "") {
                      // If search is empty, just filter by category
                      if (activeCategory === "all") {
                        setFilteredDevices(allDevices)
                      } else {
                        setFilteredDevices(allDevices.filter((device) => device.category === activeCategory))
                      }
                    } else {
                      // Filter by both search term and active category
                      const filtered = allDevices.filter((device) => {
                        const matchesSearch =
                          device.name.toLowerCase().includes(searchTerm) ||
                          device.maker.toLowerCase().includes(searchTerm) ||
                          device.description.toLowerCase().includes(searchTerm)

                        return activeCategory === "all"
                          ? matchesSearch
                          : matchesSearch && device.category === activeCategory
                      })
                      setFilteredDevices(filtered)
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`py-2 px-4 rounded-md transition-colors ${
                  activeCategory === "all" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Devices
              </button>
              <button
                onClick={() => handleCategoryChange("console")}
                className={`py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                  activeCategory === "console" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Gamepad className="h-4 w-4 mr-2" />
                Consoles
              </button>
              <button
                onClick={() => handleCategoryChange("proprietary")}
                className={`py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                  activeCategory === "proprietary"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Info className="h-4 w-4 mr-2" />
                Proprietary
              </button>
              <button
                onClick={() => handleCategoryChange("game")}
                className={`py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                  activeCategory === "game" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Gamepad className="h-4 w-4 mr-2" />
                Games
              </button>
              <button
                onClick={() => handleCategoryChange("phone")}
                className={`py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                  activeCategory === "phone" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Phones
              </button>
            </div>
          </div>

          {/* Device Grid */}
          <div className="mb-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
                <p className="text-gray-600">Loading collections...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <div className="flex items-center">
                  <Info className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-1">Error Loading Collections</h3>
                    <p className="text-red-700">{error}</p>
                    <button
                      onClick={fetchCollections}
                      className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            ) : filteredDevices.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No devices found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevices.map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </div>
            )}
          </div>

          {/* Featured Devices Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Featured Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Card className="overflow-hidden h-full">
                  <div className="relative h-80 bg-gray-100">
                    <img
                      src="/images/game-watch-multiscreen.jpeg"
                      alt="Nintendo Game & Watch Multiscreen"
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.src = "/images/gameboy-color-green.jpeg"
                      }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>1982</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Nintendo Game & Watch Multiscreen</h3>
                    <p className="text-gray-700 mb-4">
                      The Nintendo Game & Watch Multiscreen series featured an innovative dual-screen clamshell design
                      that was a precursor to the Nintendo DS. This Donkey Kong II model showcases Nintendo's early
                      experimentation with multi-screen gameplay, allowing for more complex game mechanics and visual
                      storytelling.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src="/images/tamagotchi.jpeg"
                      alt="Tamagotchi"
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Tamagotchi (1996)</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      The original virtual pet that became a worldwide phenomenon
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src="/images/mattel-football.jpeg"
                      alt="Mattel Football"
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Mattel Football (1977)</h3>
                    <p className="text-sm text-gray-600 mb-2">One of the earliest handheld electronic games</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Timeline Teaser */}
          <section className="mt-16 bg-gray-50 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Explore Our Timeline</h2>
                <p className="text-gray-700 mb-6 max-w-2xl">
                  Discover the evolution of mobile gaming from 1975 to 2008. Our interactive timeline showcases the key
                  milestones and technological advancements that shaped the industry.
                </p>
                <Link href="/timeline">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">View Timeline</Button>
                </Link>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">1975</span>
                  </div>
                  <p className="text-sm">Early Era</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">1990</span>
                  </div>
                  <p className="text-sm">Golden Age</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">2008</span>
                  </div>
                  <p className="text-sm">Modern Era</p>
                </div>
              </div>
            </div>
          </section>

          {/* Donation Information Section */}
          <div id="donate" className="mt-16 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex items-start">
              <Gift className="h-8 w-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-red-800">Help Preserve the History of Mobile Gaming!</h2>
                <p className="mb-4">
                  The Retro Mobile Gaming Collection, soon to be hosted at Northeastern University, is now accepting
                  donations!!!
                </p>
                <p className="font-semibold mb-2">We're seeking donations of:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Vintage handheld gaming devices (Game Boy, Game Gear, PSP, etc.)</li>
                  <li>Early mobile phones with gaming capabilities</li>
                  <li>Cartridges, memory cards, and gaming accessories</li>
                  <li>Original packaging, manuals, and promotional materials</li>
                  <li>Development documentation and design materials</li>
                </ul>
                <p className="mb-4">
                  Your contributions will support our mission to document, preserve, and showcase the technological
                  innovation, artistic design, and cultural significance of mobile gaming. Donated items will be
                  cataloged, maintained, and featured in future exhibitions exploring the history of mobile gaming.
                </p>
                <p className="mb-4">
                  Should you have any questions or you would like to connect about donating items. Please contact us at{" "}
                  <a href="mailto:TransformativeMedia@northeastern.edu" className="text-red-600 hover:underline">
                    TransformativeMedia@northeastern.edu
                  </a>
                  . Thank you for helping us build this collection for future generations of researchers, students, and
                  gaming enthusiasts!
                </p>
                <p className="text-sm italic">
                  Please note that these donations are NOT tax-deductible as the items are being donated to a research
                  project that is conducted across several institutions and not Northeastern University itself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Device Card Component
function DeviceCard({ device }: { device: Device }) {
  // Function to render the appropriate category badge
  const renderCategoryBadge = () => {
    // Create a local variable with a default value to avoid undefined
    const category = device.category || "unknown"

    switch (category) {
      case "console":
        return <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Console</span>
      case "proprietary":
        return <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Proprietary</span>
      case "game":
        return <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Game</span>
      case "phone":
        return <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Phone</span>
      default:
        return <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">Unknown</span>
    }
  }

  // Function to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg?height=300&width=200"
  }

  return (
    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 bg-gray-100">
        <img
          src={device.image || "/placeholder.svg?height=300&width=200"}
          alt={device.name || "Unknown Device"}
          className="w-full h-full object-contain p-4"
          onError={handleImageError}
        />
        {device.year && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {device.year}
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {renderCategoryBadge()}
          {device.maker && <span className="text-gray-500 text-xs">{device.maker}</span>}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
          {device.name || "Unknown Device"}
        </h3>
        {device.description && <p className="text-gray-700 text-sm mb-4">{device.description}</p>}
      </CardContent>
    </Card>
  )
}
