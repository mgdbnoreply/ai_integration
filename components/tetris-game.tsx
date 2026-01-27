"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Pause, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface TetrisGameProps {
  width?: number
  height?: number
}

// Define tetromino shapes
const TETROMINOES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00f0f0",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#0000f0",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#f0a000",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f0f000",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#00f000",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#a000f0",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "#f00000",
  },
}

// Game constants
const ROWS = 20
const COLS = 10
const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
}
const LEVEL_UP_LINES = 10

export function TetrisGame({ width = 300, height = 600 }: TetrisGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lines, setLines] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [message, setMessage] = useState("")
  const [nextPiece, setNextPiece] = useState<keyof typeof TETROMINOES | null>(null)

  // Game state stored in refs to avoid re-renders during game loop
  const gameStateRef = useRef({
    board: Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(0)),
    currentPiece: null as {
      shape: number[][]
      color: string
      x: number
      y: number
    } | null,
    nextPieceType: null as keyof typeof TETROMINOES | null,
    dropCounter: 0,
    dropInterval: 1000,
    lastTime: 0,
    score: 0,
    level: 1,
    lines: 0,
    messages: [
      "Tetris was created in 1984 by Alexey Pajitnov",
      "The name Tetris comes from 'tetra' (four) and 'tennis'",
      "Tetris has been released on over 65 platforms",
      "The longest possible Tetris game is 1,435 lines",
      "Tetris was the first video game played in space",
    ],
    currentMessageIndex: 0,
    messageTimer: 0,
  })

  // Get a random tetromino type
  const getRandomTetromino = useCallback((): keyof typeof TETROMINOES => {
    const types = Object.keys(TETROMINOES) as Array<keyof typeof TETROMINOES>
    return types[Math.floor(Math.random() * types.length)]
  }, [])

  // Create a new tetromino
  const createPiece = useCallback((type: keyof typeof TETROMINOES) => {
    const tetromino = TETROMINOES[type]
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      x: Math.floor(COLS / 2) - Math.floor(tetromino.shape[0].length / 2),
      y: 0,
    }
  }, [])

  // Reset the game
  const resetGame = useCallback(() => {
    const gameState = gameStateRef.current
    gameState.board = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(0))
    gameState.score = 0
    gameState.level = 1
    gameState.lines = 0
    gameState.dropInterval = 1000
    setScore(0)
    setLevel(1)
    setLines(0)
    setGameOver(false)
    setGamePaused(false)
  }, [])

  // Start the game
  const startGame = useCallback(() => {
    resetGame()
    const gameState = gameStateRef.current
    const firstPieceType = getRandomTetromino()
    const nextPieceType = getRandomTetromino()
    gameState.currentPiece = createPiece(firstPieceType)
    gameState.nextPieceType = nextPieceType
    setNextPiece(nextPieceType)
    setGameStarted(true)
    setMessage(gameState.messages[0])
    gameState.messageTimer = 0
    gameState.currentMessageIndex = 0
  }, [resetGame, getRandomTetromino, createPiece])

  // Pause/resume the game
  const togglePause = useCallback(() => {
    setGamePaused((prev) => !prev)
  }, [])

  // Check if a move is valid
  const isValidMove = useCallback((piece: typeof gameStateRef.current.currentPiece, board: number[][]) => {
    if (!piece) return false

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const boardX = piece.x + x
          const boardY = piece.y + y

          // Check if out of bounds
          if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
            return false
          }

          // Check if already filled
          if (boardY >= 0 && board[boardY][boardX] !== 0) {
            return false
          }
        }
      }
    }
    return true
  }, [])

  // Rotate a piece
  const rotatePiece = useCallback(() => {
    const gameState = gameStateRef.current
    if (!gameState.currentPiece || gamePaused || gameOver) return

    // Create a deep copy of the current piece
    const piece = {
      ...gameState.currentPiece,
      shape: JSON.parse(JSON.stringify(gameState.currentPiece.shape)),
    }

    // Rotate the piece (transpose and reverse rows)
    const rotated = piece.shape[0].map((_, index) => piece.shape.map((row) => row[index]))
    piece.shape = rotated.map((row) => [...row].reverse())

    // Check if the rotation is valid
    if (isValidMove(piece, gameState.board)) {
      gameState.currentPiece = piece
    }
  }, [gamePaused, gameOver, isValidMove])

  // Move piece horizontally
  const movePiece = useCallback(
    (direction: number) => {
      const gameState = gameStateRef.current
      if (!gameState.currentPiece || gamePaused || gameOver) return

      const piece = { ...gameState.currentPiece, x: gameState.currentPiece.x + direction }
      if (isValidMove(piece, gameState.board)) {
        gameState.currentPiece = piece
      }
    },
    [gamePaused, gameOver, isValidMove],
  )

  // Drop piece faster
  const dropPiece = useCallback(() => {
    const gameState = gameStateRef.current
    if (!gameState.currentPiece || gamePaused || gameOver) return

    const piece = { ...gameState.currentPiece, y: gameState.currentPiece.y + 1 }
    if (isValidMove(piece, gameState.board)) {
      gameState.currentPiece = piece
      gameState.score += POINTS.SOFT_DROP
      setScore(gameState.score)
    } else {
      // Piece has landed
      mergePiece()
    }
  }, [gamePaused, gameOver, isValidMove])

  // Hard drop - move piece all the way down
  const hardDrop = useCallback(() => {
    const gameState = gameStateRef.current
    if (!gameState.currentPiece || gamePaused || gameOver) return

    let dropDistance = 0
    while (
      isValidMove({ ...gameState.currentPiece, y: gameState.currentPiece.y + dropDistance + 1 }, gameState.board)
    ) {
      dropDistance++
    }

    if (dropDistance > 0) {
      gameState.currentPiece = { ...gameState.currentPiece, y: gameState.currentPiece.y + dropDistance }
      gameState.score += POINTS.HARD_DROP * dropDistance
      setScore(gameState.score)
      mergePiece()
    }
  }, [gamePaused, gameOver, isValidMove])

  // Merge the current piece with the board
  const mergePiece = useCallback(() => {
    const gameState = gameStateRef.current
    if (!gameState.currentPiece) return

    // Add the piece to the board
    for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
      for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
        if (gameState.currentPiece.shape[y][x] !== 0) {
          const boardY = gameState.currentPiece.y + y
          const boardX = gameState.currentPiece.x + x

          // Game over if piece is at the top
          if (boardY < 0) {
            setGameOver(true)
            if (gameState.score > highScore) {
              setHighScore(gameState.score)
            }
            return
          }

          gameState.board[boardY][boardX] = gameState.currentPiece.color
        }
      }
    }

    // Check for completed lines
    let linesCleared = 0
    for (let y = ROWS - 1; y >= 0; y--) {
      if (gameState.board[y].every((value) => value !== 0)) {
        // Remove the line
        gameState.board.splice(y, 1)
        // Add a new empty line at the top
        gameState.board.unshift(Array(COLS).fill(0))
        linesCleared++
        y++ // Check the same row again
      }
    }

    // Update score based on lines cleared
    if (linesCleared > 0) {
      switch (linesCleared) {
        case 1:
          gameState.score += POINTS.SINGLE * gameState.level
          break
        case 2:
          gameState.score += POINTS.DOUBLE * gameState.level
          break
        case 3:
          gameState.score += POINTS.TRIPLE * gameState.level
          break
        case 4:
          gameState.score += POINTS.TETRIS * gameState.level
          break
      }

      gameState.lines += linesCleared
      setScore(gameState.score)
      setLines(gameState.lines)

      // Level up every LEVEL_UP_LINES lines
      const newLevel = Math.floor(gameState.lines / LEVEL_UP_LINES) + 1
      if (newLevel > gameState.level) {
        gameState.level = newLevel
        gameState.dropInterval = Math.max(100, 1000 - (newLevel - 1) * 100) // Speed up as level increases
        setLevel(newLevel)
      }
    }

    // Create the next piece
    gameState.currentPiece = createPiece(gameState.nextPieceType!)
    const nextType = getRandomTetromino()
    gameState.nextPieceType = nextType
    setNextPiece(nextType)
  }, [highScore, createPiece, getRandomTetromino])

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gamePaused && e.key !== "p" && e.key !== "P") return

      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1)
          break
        case "ArrowRight":
          movePiece(1)
          break
        case "ArrowDown":
          dropPiece()
          break
        case "ArrowUp":
          rotatePiece()
          break
        case " ": // Space
          hardDrop()
          break
        case "p":
        case "P":
          togglePause()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gameStarted, gameOver, gamePaused, movePiece, dropPiece, rotatePiece, hardDrop, togglePause])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || gamePaused) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellWidth = width / COLS
    const cellHeight = height / ROWS

    let animationId: number

    const gameLoop = (timestamp: number) => {
      if (!gameStarted || gameOver || gamePaused) return

      const gameState = gameStateRef.current
      const deltaTime = timestamp - gameState.lastTime
      gameState.lastTime = timestamp

      // Update message every 5 seconds
      gameState.messageTimer += deltaTime
      if (gameState.messageTimer > 5000) {
        gameState.messageTimer = 0
        gameState.currentMessageIndex = (gameState.currentMessageIndex + 1) % gameState.messages.length
        setMessage(gameState.messages[gameState.currentMessageIndex])
      }

      // Drop piece at regular intervals
      gameState.dropCounter += deltaTime
      if (gameState.dropCounter > gameState.dropInterval) {
        gameState.dropCounter = 0
        dropPiece()
      }

      // Clear canvas
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)

      // Draw grid lines
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 0.5

      // Vertical grid lines
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath()
        ctx.moveTo(x * cellWidth, 0)
        ctx.lineTo(x * cellWidth, height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * cellHeight)
        ctx.lineTo(width, y * cellHeight)
        ctx.stroke()
      }

      // Draw the board
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (gameState.board[y][x] !== 0) {
            ctx.fillStyle = gameState.board[y][x] as string
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
            ctx.strokeStyle = "#000"
            ctx.lineWidth = 1
            ctx.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
          }
        }
      }

      // Draw the current piece
      if (gameState.currentPiece) {
        ctx.fillStyle = gameState.currentPiece.color
        for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
          for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
            if (gameState.currentPiece.shape[y][x] !== 0) {
              const boardX = gameState.currentPiece.x + x
              const boardY = gameState.currentPiece.y + y
              if (boardY >= 0) {
                // Only draw if on screen
                ctx.fillRect(boardX * cellWidth, boardY * cellHeight, cellWidth, cellHeight)
                ctx.strokeStyle = "#000"
                ctx.lineWidth = 1
                ctx.strokeRect(boardX * cellWidth, boardY * cellHeight, cellWidth, cellHeight)
              }
            }
          }
        }

        // Draw ghost piece (preview of where the piece will land)
        let ghostY = gameState.currentPiece.y
        while (isValidMove({ ...gameState.currentPiece, y: ghostY + 1 }, gameState.board)) {
          ghostY++
        }

        if (ghostY !== gameState.currentPiece.y) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
          for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
            for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
              if (gameState.currentPiece.shape[y][x] !== 0) {
                const boardX = gameState.currentPiece.x + x
                const boardY = ghostY + y
                if (boardY >= 0) {
                  ctx.fillRect(boardX * cellWidth, boardY * cellHeight, cellWidth, cellHeight)
                  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
                  ctx.lineWidth = 1
                  ctx.strokeRect(boardX * cellWidth, boardY * cellHeight, cellWidth, cellHeight)
                }
              }
            }
          }
        }
      }

      // Continue game loop
      animationId = requestAnimationFrame(gameLoop)
    }

    // Start game loop
    animationId = requestAnimationFrame(gameLoop)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [gameStarted, gameOver, gamePaused, width, height, dropPiece, isValidMove])

  // Draw the next piece preview
  useEffect(() => {
    if (!gameStarted || !nextPiece) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const previewSize = 80
    canvas.width = previewSize
    canvas.height = previewSize

    const tetromino = TETROMINOES[nextPiece]
    const blockSize = previewSize / 6

    // Clear canvas
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, previewSize, previewSize)

    // Draw the next piece
    ctx.fillStyle = tetromino.color
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x] !== 0) {
          const offsetX = (previewSize - tetromino.shape[0].length * blockSize) / 2
          const offsetY = (previewSize - tetromino.shape.length * blockSize) / 2
          ctx.fillRect(offsetX + x * blockSize, offsetY + y * blockSize, blockSize, blockSize)
          ctx.strokeStyle = "#000"
          ctx.lineWidth = 1
          ctx.strokeRect(offsetX + x * blockSize, offsetY + y * blockSize, blockSize, blockSize)
        }
      }
    }

    // Update the preview element
    const previewElement = document.getElementById("next-piece-preview")
    if (previewElement) {
      previewElement.innerHTML = ""
      previewElement.appendChild(canvas)
    }
  }, [gameStarted, nextPiece])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">RMGD Tetris</h3>
        <p className="text-white/70 text-sm mb-4">{message}</p>

        {!gameStarted ? (
          <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
            Start Game
          </Button>
        ) : (
          <div className="flex justify-center gap-8 mb-2">
            <div className="text-center">
              <div className="text-sm text-white/70">Score</div>
              <div className="text-xl font-bold text-red-500">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">Level</div>
              <div className="text-xl font-bold text-white">{level}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">Lines</div>
              <div className="text-xl font-bold text-blue-500">{lines}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="text-white text-lg mb-2">Ready to play?</div>
                <div className="text-white/70 text-sm mb-4">
                  <p>Use arrow keys to move and rotate</p>
                  <p>Space to hard drop, P to pause</p>
                </div>
                <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                  Start Game
                </Button>
              </div>
            </div>
          )}

          {gamePaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="text-white text-2xl mb-4">Game Paused</div>
                <Button onClick={togglePause} className="bg-red-600 hover:bg-red-700 text-white">
                  Resume Game
                </Button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="text-red-500 text-2xl mb-2">Game Over</div>
                <div className="text-white mb-4">Final Score: {score}</div>
                <div className="flex gap-4">
                  <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                    Play Again
                  </Button>
                  <Button onClick={resetGame} variant="outline" className="border-white text-white hover:bg-white/10">
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} width={width} height={height} className="bg-black" />
        </div>

        {gameStarted && (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-800">
              <div className="text-white text-sm mb-2">Next Piece</div>
              <div id="next-piece-preview" className="w-20 h-20 flex items-center justify-center"></div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-800">
              <div className="text-white text-sm mb-2">Controls</div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div></div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={rotatePiece}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <div></div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => movePiece(-1)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={dropPiece}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => movePiece(1)}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800 w-full"
                  onClick={hardDrop}
                >
                  Hard Drop
                </Button>
              </div>
              <div className="mt-2">
                <Button
                  size="sm"
                  variant={gamePaused ? "default" : "outline"}
                  className={`w-full ${
                    gamePaused
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "border-gray-700 text-white hover:bg-gray-800"
                  }`}
                  onClick={togglePause}
                >
                  {gamePaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                  {gamePaused ? "Resume" : "Pause"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-white/50 text-xs">
        {gameStarted && !gameOver && !gamePaused ? "Use arrow keys to move and rotate, space to hard drop" : ""}
      </div>
    </div>
  )
}
