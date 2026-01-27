"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, X, Circle } from "lucide-react"

interface TicTacToeProps {
  size?: number
}

type Player = "X" | "O" | null
type Board = Player[]

export function TicTacToe({ size = 300 }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<Player | "draw" | null>(null)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [gameStarted, setGameStarted] = useState(false)
  const [message, setMessage] = useState("")
  const [aiThinking, setAiThinking] = useState(false)

  // Messages to display while playing
  const messages = [
    "Tic-tac-toe: The classic game of X's and O's!",
    "Did you know tic-tac-toe is over 3000 years old?",
    "The perfect tic-tac-toe player never loses!",
    "In the UK, this game is called 'Noughts and Crosses'",
    "Try to control the center square for an advantage!",
  ]

  // Start a new game
  const startGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setGameStarted(true)
    setMessage(messages[Math.floor(Math.random() * messages.length)])
  }

  // Reset the game and scores
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setScores({ X: 0, O: 0, draws: 0 })
    setGameStarted(false)
  }

  // Handle a square click
  const handleClick = (index: number) => {
    // Don't allow clicks if there's a winner, the square is filled, or it's the AI's turn
    if (winner || board[index] || (aiThinking && !isXNext)) return

    // Create a new board with the move
    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)

    // Check for a winner
    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      if (gameWinner !== "draw") {
        setScores({ ...scores, [gameWinner]: scores[gameWinner] + 1 })
      } else {
        setScores({ ...scores, draws: scores.draws + 1 })
      }
      return
    }

    // Switch turns
    setIsXNext(!isXNext)
  }

  // AI move
  useEffect(() => {
    // If it's the AI's turn (O) and the game is in progress
    if (gameStarted && !isXNext && !winner) {
      setAiThinking(true)

      // Add a small delay to make it seem like the AI is "thinking"
      const timeoutId = setTimeout(() => {
        makeAIMove()
        setAiThinking(false)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [isXNext, gameStarted, winner, board])

  // Make an AI move
  const makeAIMove = () => {
    // If there's a winner already, don't make a move
    if (winner) return

    // Check if the board is full
    if (board.every((square) => square !== null)) {
      setWinner("draw")
      setScores({ ...scores, draws: scores.draws + 1 })
      return
    }

    // Simple AI strategy:
    // 1. Try to win
    // 2. Block player from winning
    // 3. Take center if available
    // 4. Take a corner if available
    // 5. Take any available square

    // Check for winning move
    const winningMove = findWinningMove(board, "O")
    if (winningMove !== -1) {
      handleMove(winningMove)
      return
    }

    // Check for blocking move
    const blockingMove = findWinningMove(board, "X")
    if (blockingMove !== -1) {
      handleMove(blockingMove)
      return
    }

    // Take center if available
    if (board[4] === null) {
      handleMove(4)
      return
    }

    // Take a corner if available
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter((corner) => board[corner] === null)
    if (availableCorners.length > 0) {
      const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)]
      handleMove(randomCorner)
      return
    }

    // Take any available square
    const availableSquares = board
      .map((square, index) => (square === null ? index : -1))
      .filter((index) => index !== -1)
    if (availableSquares.length > 0) {
      const randomSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)]
      handleMove(randomSquare)
    }
  }

  // Helper function to make a move
  const handleMove = (index: number) => {
    const newBoard = [...board]
    newBoard[index] = "O"
    setBoard(newBoard)

    // Check for a winner
    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      if (gameWinner !== "draw") {
        setScores({ ...scores, [gameWinner]: scores[gameWinner] + 1 })
      } else {
        setScores({ ...scores, draws: scores.draws + 1 })
      }
      return
    }

    // Switch turns back to player
    setIsXNext(true)
  }

  // Find a winning move for the given player
  const findWinningMove = (board: Board, player: "X" | "O"): number => {
    // Check each empty square
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        // Try this move
        const newBoard = [...board]
        newBoard[i] = player
        // Check if this move would win
        if (calculateWinner(newBoard) === player) {
          return i
        }
      }
    }
    return -1
  }

  // Calculate the winner
  const calculateWinner = (board: Board): Player | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    // Check for a winner
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    // Check for a draw
    if (board.every((square) => square !== null)) {
      return "draw"
    }

    // Game still in progress
    return null
  }

  // Render a square
  const renderSquare = (index: number) => {
    const squareSize = size / 3
    const isWinningSquare = winner && winner !== "draw" && isPartOfWinningLine(index)

    return (
      <div
        key={index}
        className={`border border-gray-400 flex items-center justify-center cursor-pointer transition-colors ${
          isWinningSquare ? "bg-red-100" : "hover:bg-gray-100"
        }`}
        style={{ width: squareSize, height: squareSize }}
        onClick={() => handleClick(index)}
      >
        {board[index] === "X" && (
          <X className={`w-1/2 h-1/2 ${isWinningSquare ? "text-red-600" : "text-gray-800"}`} strokeWidth={3} />
        )}
        {board[index] === "O" && (
          <Circle className={`w-1/2 h-1/2 ${isWinningSquare ? "text-red-600" : "text-blue-600"}`} strokeWidth={3} />
        )}
      </div>
    )
  }

  // Check if a square is part of the winning line
  const isPartOfWinningLine = (index: number): boolean => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c] && (index === a || index === b || index === c)) {
        return true
      }
    }

    return false
  }

  // Get status message
  const getStatus = () => {
    if (winner === "X") {
      return "You win!"
    } else if (winner === "O") {
      return "AI wins!"
    } else if (winner === "draw") {
      return "It's a draw!"
    } else if (aiThinking) {
      return "AI is thinking..."
    } else {
      return isXNext ? "Your turn (X)" : "AI's turn (O)"
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">RMGD Tic-Tac-Toe</h3>
        <p className="text-white/70 text-sm mb-4">{message}</p>

        {!gameStarted ? (
          <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
            Start Game
          </Button>
        ) : (
          <div className="flex justify-center gap-8 mb-2">
            <div className="text-center">
              <div className="text-sm text-white/70">You (X)</div>
              <div className="text-xl font-bold text-red-500">{scores.X}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">Draws</div>
              <div className="text-xl font-bold text-white">{scores.draws}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">AI (O)</div>
              <div className="text-xl font-bold text-blue-500">{scores.O}</div>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.3)] bg-white">
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center">
              <div className="text-white text-lg mb-2">Ready to play?</div>
              <div className="text-white/70 text-sm mb-4">You'll be X, playing against our AI</div>
              <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                Start Game
              </Button>
            </div>
          </div>
        )}

        <div className="relative" style={{ width: size, height: size }}>
          <div className="grid grid-cols-3 grid-rows-3">
            {Array(9)
              .fill(null)
              .map((_, index) => renderSquare(index))}
          </div>

          {/* Status overlay */}
          {(winner || aiThinking) && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                winner ? "bg-black/50" : "bg-transparent"
              }`}
            >
              <div className={`text-center p-4 rounded-lg ${winner ? "bg-white shadow-lg" : "bg-transparent"}`}>
                <div
                  className={`text-2xl font-bold mb-4 ${
                    winner === "X"
                      ? "text-red-600"
                      : winner === "O"
                        ? "text-blue-600"
                        : winner === "draw"
                          ? "text-gray-700"
                          : "text-white"
                  }`}
                >
                  {getStatus()}
                </div>
                {winner && (
                  <div className="flex gap-4">
                    <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                      Play Again
                    </Button>
                    <Button onClick={resetGame} variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" /> Reset Scores
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center text-white/50 text-xs">{gameStarted && !winner ? getStatus() : ""}</div>
    </div>
  )
}
