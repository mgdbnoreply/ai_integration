"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-section"
import { GameSearch } from "@/components/game-search"
import { Gift } from "lucide-react"

export default function Home() {
  // Function to scroll to the game search section
  const scrollToGames = () => {
    const gameSearchSection = document.getElementById("game-search")
    if (gameSearchSection) {
      gameSearchSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-6">Retro Mobile Gaming Project.</h1>
              <p className="text-gray-700 mb-4">
                The RMGP serves as a valuable resource for studying the history and impact of mobile games over several
                decades. It provides insights into the evolution of mobile gaming technology, design principles, and
                cultural significance. To facilitate research and education about the history of mobile games, the RGMP
                features multiple experiences. Central to this project is an online, searchable database that provides
                detailed information about games from 1975-2008. In addition to the database, the project includes a
                robust collection of educational resources tailored for instructors. These materials are designed to
                integrate learning about media history, game history, and digital cultures. The RGMP also boasts a
                collection of mobile gaming materials, housed at the Center for Transformative Media, which include
                gaming devices, carteridges, and similar memorabilia.
              </p>

              {/* Donation Link */}
              <Link
                href="/collection-and-experience#donate"
                className="inline-flex items-center text-red-600 hover:text-red-800 font-medium mb-6"
              >
                <Gift className="mr-2 h-4 w-4" />
                Donate to the Retro Mobile Gaming Collection
                <svg
                  className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Action Button */}
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neu_ms37dz02w.jpg-48xAokXYj15MVJ0ZeSwK18G5TRTgez.jpeg"
                alt="Nintendo Game & Watch: Donkey Kong II (1982)"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-3 right-10 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                Nintendo Game & Watch (1982)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Search Section */}
      <div id="game-search">
        <GameSearch />
      </div>

      {/* FAQ Section (moved from contact page) */}
      <section className="py-16 px-4 md:px-12 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-red-600 mr-2">Q:</span>
                How can I contribute to the project?
              </h3>
              <p className="text-gray-700">
                We welcome contributions from researchers and enthusiasts. Please contact us through the form with
                details about the games you'd like to add or corrections to existing entries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-red-600 mr-2">Q:</span>
                Can I use the project for my research?
              </h3>
              <p className="text-gray-700">
                Yes, the RMGD is available for academic and research purposes. Please cite the project appropriately in
                your work and contact us if you need specific data sets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-red-600 mr-2">Q:</span>
                Do you accept game donations?
              </h3>
              <p className="text-gray-700">
                We do accept donations of retro mobile gaming hardware and software for our archive. Please contact us
                with details about what you'd like to donate.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-red-600 mr-2">Q:</span>
                How often is the project updated?
              </h3>
              <p className="text-gray-700">
                We update the project quarterly with new entries and corrections. Major updates are announced on our
                social media channels and website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      <Footer />
    </div>
  )
}
