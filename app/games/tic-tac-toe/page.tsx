"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, History, Trophy } from "lucide-react"
import { TicTacToe } from "@/components/tic-tac-toe"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function TicTacToePage() {
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
                Tic-Tac-Toe
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-700 mb-6">
                  Tic-tac-toe is one of the oldest and most widely recognized games in the world. This simple
                  paper-and-pencil game has been played for centuries across different cultures. The game is played on a
                  3×3 grid, with players taking turns marking X or O. The player who succeeds in placing three of their
                  marks in a horizontal, vertical, or diagonal row wins the game.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <History className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Origin</div>
                      <div className="font-medium">Ancient (3000+ years old)</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <Trophy className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="font-medium">Easy to learn, strategic to master</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-black p-6 rounded-xl shadow-xl">
                <div className="flex justify-center">
                  <TicTacToe size={isMobile ? 300 : 400} />
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
                    <strong>Players:</strong> You (X) vs. AI opponent (O)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong>Objective:</strong> Place three of your marks (X) in a horizontal, vertical, or diagonal row
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong>Turns:</strong> Players take turns placing their mark in an empty square
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong>Strategy:</strong> Block your opponent from getting three in a row while trying to create
                    your own winning line
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">History of Tic-Tac-Toe</h2>
              <p className="text-gray-700 mb-4">
                The game of Tic-tac-toe has ancient roots, with variations played throughout history. Similar games have
                been found in ancient Egyptian ruins dating back to 1300 BCE. The modern grid and X/O markings became
                standardized in the 20th century.
              </p>
              <p className="text-gray-700 mb-4">
                In the UK and some other countries, the game is known as "Noughts and Crosses." It was one of the first
                games programmed for early computers in the 1950s, making it an important milestone in the history of
                artificial intelligence and game theory.
              </p>
              <p className="text-gray-700">
                Despite its simplicity, Tic-tac-toe has been the subject of mathematical analysis and is a perfect
                example of a zero-sum game. With perfect play from both sides, the game always ends in a draw, which
                makes it an excellent teaching tool for introducing concepts like game theory and strategic thinking.
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
              <Link href="/games/pong">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Play Pong
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
