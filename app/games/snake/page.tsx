"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, History, Trophy } from "lucide-react"
import { SnakeGame } from "@/components/snake-game"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function SnakeGamePage() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 md:px-12 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Link href="/games" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Snake
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-700 mb-6">
                  Snake is one of the most iconic mobile games of all time. First popularized on Nokia phones in the
                  late 1990s, this simple yet addictive game has been captivating players for decades. Control the
                  snake, collect food to grow longer, and avoid crashing into walls or your own tail!
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <History className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">First Appeared</div>
                      <div className="font-medium">1976 (as Blockade)</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <Trophy className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="font-medium">Easy to learn, hard to master</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-black p-6 rounded-xl shadow-xl">
                <div className="flex justify-center">
                  <SnakeGame width={isMobile ? 320 : 600} height={isMobile ? 320 : 600} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How to Play</h2>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </span>
                  <span>
                    <strong>Controls:</strong> Use arrow keys on desktop or swipe on mobile to change direction
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong>Objective:</strong> Eat the red food to grow your snake and increase your score
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong>Avoid:</strong> Don't hit the walls or your own tail, or the game will end
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong>Strategy:</strong> Plan your moves carefully as your snake grows longer and space becomes
                    limited
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">History of Snake</h2>
              <p className="text-gray-700 mb-4">
                The concept of Snake originated in the 1976 arcade game Blockade. The gameplay involved maneuvering a
                continuously growing line without running into obstacles or yourself.
              </p>
              <p className="text-gray-700 mb-4">
                Snake gained massive popularity when it was pre-installed on Nokia phones in the late 1990s, becoming
                one of the most played mobile games of all time. The Nokia version was programmed by Taneli Armanto and
                introduced millions of people to mobile gaming.
              </p>
              <p className="text-gray-700">
                Since then, countless versions of Snake have been created across virtually every gaming platform,
                cementing its status as a classic game that has stood the test of time.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Try Our Other Classic Games</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/games/pong">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Play Pong
                </Button>
              </Link>
              <Link href="/games/tic-tac-toe">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Play Tic-Tac-Toe
                </Button>
              </Link>
              <Link href="/games/tetris">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Play Tetris
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
