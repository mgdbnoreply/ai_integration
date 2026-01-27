"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, History, Trophy } from "lucide-react"
import { PongGame } from "@/components/pong-game"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function PongGamePage() {
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
                Pong
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-700 mb-6">
                  Pong is one of the earliest arcade video games and the first sports arcade video game. It is a table
                  tennis sports game featuring simple two-dimensional graphics. The game was originally manufactured by
                  Atari and released in 1972, becoming the first commercially successful video game.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <History className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">First Released</div>
                      <div className="font-medium">1972</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <Trophy className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="font-medium">Easy to learn, challenging to master</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-black p-6 rounded-xl shadow-xl">
                <div className="flex justify-center">
                  <PongGame width={isMobile ? 320 : 600} height={isMobile ? 240 : 400} />
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
                    <strong>Controls:</strong> Move your mouse or finger up and down to control your paddle (left side)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong>Objective:</strong> Hit the ball with your paddle to return it to your opponent
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong>Scoring:</strong> You score a point when your opponent misses the ball
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong>Strategy:</strong> Hit the ball with different parts of your paddle to change its angle and
                    speed
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">History of Pong</h2>
              <p className="text-gray-700 mb-4">
                Pong was created by Allan Alcorn as a training exercise assigned to him by Atari co-founder Nolan
                Bushnell. Bushnell had just founded Atari and wanted Alcorn's first assignment to be a simple game.
              </p>
              <p className="text-gray-700 mb-4">
                The game was so successful that Atari couldn't keep up with demand. It's often credited with
                establishing the video game industry, as it proved that the video game market had commercial potential.
              </p>
              <p className="text-gray-700">
                Pong's influence extends beyond just being a popular game. It established many conventions still used in
                video games today and demonstrated that video games could be a viable commercial product, paving the way
                for the multi-billion dollar industry we know today.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Try Our Other Classic Games</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/games/snake">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Play Snake
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
