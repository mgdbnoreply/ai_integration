"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, History, Trophy } from "lucide-react"
import { TetrisGame } from "@/components/tetris-game"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function TetrisGamePage() {
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
                Tetris
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-700 mb-6">
                  Tetris is one of the most iconic video games of all time. Created by Russian software engineer Alexey
                  Pajitnov in 1984, this puzzle game challenges players to arrange falling blocks (tetrominoes) to
                  create complete rows that disappear, earning points and preventing the play area from filling up.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <History className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Created</div>
                      <div className="font-medium">1984</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <Trophy className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="font-medium">Easy to learn, difficult to master</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-black p-6 rounded-xl shadow-xl">
                <div className="flex justify-center">
                  <TetrisGame width={isMobile ? 240 : 300} height={isMobile ? 480 : 600} />
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
                    <strong>Controls:</strong> Use arrow keys to move (left/right) and rotate (up) the falling pieces
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong>Objective:</strong> Arrange the falling tetrominoes to create complete horizontal lines
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong>Scoring:</strong> Clearing lines earns points; clearing multiple lines at once earns bonus
                    points
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong>Game Over:</strong> The game ends when the stack of tetrominoes reaches the top of the
                    playing field
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">History of Tetris</h2>
              <p className="text-gray-700 mb-4">
                Tetris was created in 1984 by Alexey Pajitnov while working at the Soviet Academy of Sciences. The name
                comes from the Greek prefix "tetra-" (meaning "four") and "tennis," Pajitnov's favorite sport. Each
                tetromino is made up of four squares, reflecting this naming origin.
              </p>
              <p className="text-gray-700 mb-4">
                The game gained worldwide popularity when it was bundled with Nintendo's Game Boy in 1989. This
                partnership helped sell millions of Game Boy units and established Tetris as one of the most
                recognizable video games in history.
              </p>
              <p className="text-gray-700">
                Tetris has been released on more than 65 platforms, making it one of the most ported video games ever
                created. The game's simple yet addictive gameplay has made it a staple of mobile gaming, and it
                continues to be popular decades after its creation. In 2007, Tetris was ranked as the second most
                influential game of all time, behind only Super Mario Bros.
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
              <Link href="/games/tic-tac-toe">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Play Tic-Tac-Toe
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
