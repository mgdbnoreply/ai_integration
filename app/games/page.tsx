"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, History, Info } from "lucide-react"
import { motion } from "framer-motion"

export default function GamesPage() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const games = [
    {
      id: "snake",
      title: "Snake",
      description:
        "The classic game where you control a snake, eating food to grow longer while avoiding walls and your own tail.",
      year: "1976",
      origin: "First appeared as Blockade, popularized on Nokia phones in the late 1990s",
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-green-500",
    },
    {
      id: "pong",
      title: "Pong",
      description: "One of the earliest arcade video games. Control a paddle to hit a ball back and forth.",
      year: "1972",
      origin: "Created by Atari, one of the first commercially successful video games",
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-blue-500",
    },
    {
      id: "tic-tac-toe",
      title: "Tic-Tac-Toe",
      description: "The paper-and-pencil game for two players who take turns marking X or O on a 3×3 grid.",
      year: "Ancient",
      origin: "Played throughout history in various forms across many cultures",
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-purple-500",
    },
    {
      id: "tetris",
      title: "Tetris",
      description: "Arrange falling blocks of different shapes to create complete rows that disappear, earning points.",
      year: "1984",
      origin: "Created by Russian software engineer Alexey Pajitnov",
      image: "/placeholder.svg?height=300&width=400",
      color: "bg-yellow-500",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Retro Mobile Games
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              Experience the nostalgia of classic games that shaped the history of mobile gaming. These simple yet
              addictive games were the foundation of what would become a global gaming phenomenon.
            </motion.p>
          </div>

          {/* Game History Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-20"></div>
                  <Gamepad2 className="w-24 h-24 text-red-500" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4 flex items-center">
                  <History className="mr-3 h-6 w-6 text-red-600" />
                  The Evolution of Mobile Gaming
                </h2>
                <p className="text-gray-700 mb-4">
                  Mobile gaming has come a long way from the simple games built into early mobile phones. Games like
                  Snake on Nokia phones introduced millions to mobile gaming, creating a foundation for what would
                  become a multi-billion dollar industry.
                </p>
                <p className="text-gray-700 mb-4">
                  These classic games represent important milestones in gaming history. Their simple mechanics and
                  addictive gameplay demonstrate why they've remained popular for decades, even as technology has
                  advanced dramatically.
                </p>
                <p className="text-gray-700">
                  Try these recreations of classic games and experience a piece of gaming history that influenced
                  generations of game developers and players alike.
                </p>
              </div>
            </div>
          </section>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {games.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <Link href={`/games/${game.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-red-500">
                    <div className={`relative h-48 ${game.color} flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                      <h3 className="text-4xl font-bold text-white relative z-10">{game.title}</h3>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {game.year}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{game.description}</p>
                      <div className="flex justify-between items-center">
                        <Button className="bg-red-600 hover:bg-red-700">Play Now</Button>
                        <Info
                          className={`h-5 w-5 text-gray-400 transition-colors duration-200 ${
                            hoveredGame === game.id ? "text-red-500" : ""
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Why These Games Matter Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Why These Games Matter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-red-600">Historical Significance</h3>
                <p className="text-gray-700">
                  These games represent important milestones in the evolution of video games. Pong helped launch the
                  video game industry, while Snake introduced millions to mobile gaming through Nokia phones. Tetris
                  became one of the most ported games in history, and Tic-Tac-Toe demonstrates how even the simplest
                  games can engage players for generations.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-red-600">Game Design Principles</h3>
                <p className="text-gray-700">
                  These classics embody core principles of good game design: easy to learn but difficult to master,
                  providing clear goals with immediate feedback, and creating a sense of progression. Their simple
                  mechanics demonstrate how constraints can lead to creativity, influencing countless games that
                  followed.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-red-600">Cultural Impact</h3>
                <p className="text-gray-700">
                  Beyond entertainment, these games became cultural touchstones. Tetris blocks, Snake gameplay, and Pong
                  paddles are instantly recognizable even to non-gamers. They've appeared in movies, television, art,
                  and fashion, demonstrating how games can transcend their medium to influence broader culture.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-red-600">Accessibility</h3>
                <p className="text-gray-700">
                  These games were revolutionary in making gaming accessible to everyone. Their simple controls and
                  straightforward objectives meant anyone could play them without extensive gaming experience. This
                  accessibility helped expand gaming beyond a niche hobby to the mainstream entertainment medium it is
                  today.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Choose one of the classic games above and experience a piece of gaming history. Challenge yourself or
              compete with friends to set high scores!
            </p>
            <Link href="/games/snake">
              <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3">
                <Gamepad2 className="mr-2 h-5 w-5" /> Start Playing
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
