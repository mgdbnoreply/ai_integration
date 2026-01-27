"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Gamepad2, Play, RotateCcw } from "lucide-react"

interface SnakeGameProps {
  width?: number
  height?: number
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

export function SnakeGame({ width = 400, height = 400 }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("")
  const [highScore, setHighScore] = useState(0)

  // Game state stored in refs to avoid re-renders during game loop
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }] as Position[],
    food: { x: 15, y: 15 } as Position,
    direction: "RIGHT" as Direction,
    nextDirection: "RIGHT" as Direction,
    gridSize: 20,
    speed: 100, // ms per move
    lastTime: 0,
    messages: [
      "While you wait, enjoy this classic game!",
      "The RMGD team is working hard on this page.",
      "Can you beat the high score?",
      "Snake was a staple of early mobile gaming!",
      "Thanks for visiting our retro gaming database!",
    ],
    currentMessageIndex: 0,
    messageTimer: 0,
  })

  // Touch/click position tracking for mobile controls
  const touchStartRef = useRef<Position | null>(null)

  // Start the game
  const startGame = () => {
    const gameState = gameStateRef.current

    // Reset game state
    gameState.snake = [{ x: 10, y: 10 }]
    gameState.direction = "RIGHT"
    gameState.nextDirection = "RIGHT"
    gameState.speed = 100
    placeFood()

    setGameStarted(true)
    setGameOver(false)
    setScore(0)

    // Set initial message
    setMessage(gameState.messages[0])
    gameState.messageTimer = 0
    gameState.currentMessageIndex = 0
  }

  // Reset the game
  const resetGame = () => {
    setGameOver(false)
    setGameStarted(false)
  }

  // Place food in a random position not occupied by the snake
  const placeFood = () => {
    const gameState = gameStateRef.current
    const gridWidth = Math.floor(width / gameState.gridSize)
    const gridHeight = Math.floor(height / gameState.gridSize)

    let newFood: Position
    let foodOnSnake = true

    // Keep generating positions until we find one not on the snake
    while (foodOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight),
      }

      foodOnSnake = gameState.snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)

      if (!foodOnSnake) {
        gameState.food = newFood
      }
    }
  }

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const gameState = gameStateRef.current

      // Prevent reversing direction directly
      switch (e.key) {
        case "ArrowUp":
          if (gameState.direction !== "DOWN") {
            gameState.nextDirection = "UP"
          }
          break
        case "ArrowDown":
          if (gameState.direction !== "UP") {
            gameState.nextDirection = "DOWN"
          }
          break
        case "ArrowLeft":
          if (gameState.direction !== "RIGHT") {
            gameState.nextDirection = "LEFT"
          }
          break
        case "ArrowRight":
          if (gameState.direction !== "LEFT") {
            gameState.nextDirection = "RIGHT"
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gameStarted])

  // Handle touch/mouse input for mobile
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return

    const handleTouchStart = (e: TouchEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect()

      if ("touches" in e) {
        // Touch event
        touchStartRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      } else {
        // Mouse event
        touchStartRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
      if (!touchStartRef.current) return

      const rect = canvas.getBoundingClientRect()
      let touchEnd: Position

      if ("changedTouches" in e) {
        // Touch event
        touchEnd = {
          x: e.changedTouches[0].clientX - rect.left,
          y: e.changedTouches[0].clientY - rect.top,
        }
      } else {
        // Mouse event
        touchEnd = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }

      const gameState = gameStateRef.current

      // Calculate swipe direction
      const dx = touchEnd.x - touchStartRef.current.x
      const dy = touchEnd.y - touchStartRef.current.y

      // Determine if horizontal or vertical swipe based on which is greater
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && gameState.direction !== "LEFT") {
          gameState.nextDirection = "RIGHT"
        } else if (dx < 0 && gameState.direction !== "RIGHT") {
          gameState.nextDirection = "LEFT"
        }
      } else {
        // Vertical swipe
        if (dy > 0 && gameState.direction !== "UP") {
          gameState.nextDirection = "DOWN"
        } else if (dy < 0 && gameState.direction !== "DOWN") {
          gameState.nextDirection = "UP"
        }
      }

      touchStartRef.current = null
    }

    canvas.addEventListener("mousedown", handleTouchStart)
    canvas.addEventListener("mouseup", handleTouchEnd)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    // Prevent scrolling when touching the canvas
    canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false })

    return () => {
      canvas.removeEventListener("mousedown", handleTouchStart)
      canvas.removeEventListener("mouseup", handleTouchEnd)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [gameStarted, gameOver])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let lastMoveTime = 0

    const gameLoop = (timestamp: number) => {
      if (!gameStarted || gameOver) return

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

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(0, 0, width, height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      const gridSize = gameState.gridSize

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Move snake at fixed intervals
      if (timestamp - lastMoveTime > gameState.speed) {
        lastMoveTime = timestamp

        // Update direction
        gameState.direction = gameState.nextDirection

        // Get current head position
        const head = { ...gameState.snake[0] }

        // Move head based on direction
        switch (gameState.direction) {
          case "UP":
            head.y -= 1
            break
          case "DOWN":
            head.y += 1
            break
          case "LEFT":
            head.x -= 1
            break
          case "RIGHT":
            head.x += 1
            break
        }

        // Check for collisions with walls
        const gridWidth = Math.floor(width / gridSize)
        const gridHeight = Math.floor(height / gridSize)

        if (head.x < 0 || head.y < 0 || head.x >= gridWidth || head.y >= gridHeight) {
          setGameOver(true)
          if (score > highScore) {
            setHighScore(score)
          }
          return
        }

        // Check for collisions with self
        if (gameState.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          if (score > highScore) {
            setHighScore(score)
          }
          return
        }

        // Add new head to snake
        gameState.snake.unshift(head)

        // Check if snake ate food
        if (head.x === gameState.food.x && head.y === gameState.food.y) {
          // Increase score
          setScore((prevScore) => {
            const newScore = prevScore + 1

            // Increase speed every 5 points
            if (newScore % 5 === 0 && gameState.speed > 50) {
              gameState.speed -= 5
            }

            return newScore
          })

          // Place new food
          placeFood()
        } else {
          // Remove tail if no food was eaten
          gameState.snake.pop()
        }
      }

      // Draw food with glow effect
      ctx.shadowColor = "#dc2626"
      ctx.shadowBlur = 15
      ctx.fillStyle = "#dc2626"
      ctx.fillRect(gameState.food.x * gridSize, gameState.food.y * gridSize, gridSize, gridSize)
      ctx.shadowBlur = 0

      // Draw snake
      gameState.snake.forEach((segment, index) => {
        // Head is red, body segments gradually fade to darker red
        const alpha = Math.max(0.4, 1 - index * 0.03)

        if (index === 0) {
          // Snake head
          ctx.fillStyle = "#dc2626"
        } else {
          // Snake body with gradient
          ctx.fillStyle = `rgba(220, 38, 38, ${alpha})`
        }

        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize)

        // Add eyes to the head
        if (index === 0) {
          ctx.fillStyle = "white"

          // Position eyes based on direction
          const eyeSize = gridSize / 5
          const eyeOffset = gridSize / 3

          let leftEyeX, leftEyeY, rightEyeX, rightEyeY

          switch (gameState.direction) {
            case "UP":
              leftEyeX = segment.x * gridSize + eyeOffset
              leftEyeY = segment.y * gridSize + eyeOffset
              rightEyeX = segment.x * gridSize + gridSize - eyeOffset - eyeSize
              rightEyeY = segment.y * gridSize + eyeOffset
              break
            case "DOWN":
              leftEyeX = segment.x * gridSize + eyeOffset
              leftEyeY = segment.y * gridSize + gridSize - eyeOffset - eyeSize
              rightEyeX = segment.x * gridSize + gridSize - eyeOffset - eyeSize
              rightEyeY = segment.y * gridSize + gridSize - eyeOffset - eyeSize
              break
            case "LEFT":
              leftEyeX = segment.x * gridSize + eyeOffset
              leftEyeY = segment.y * gridSize + eyeOffset
              rightEyeX = segment.x * gridSize + eyeOffset
              rightEyeY = segment.y * gridSize + gridSize - eyeOffset - eyeSize
              break
            case "RIGHT":
              leftEyeX = segment.x * gridSize + gridSize - eyeOffset - eyeSize
              leftEyeY = segment.y * gridSize + eyeOffset
              rightEyeX = segment.x * gridSize + gridSize - eyeOffset - eyeSize
              rightEyeY = segment.y * gridSize + gridSize - eyeOffset - eyeSize
              break
          }

          ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize)
          ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize)
        }
      })

      // Draw score
      ctx.fillStyle = "#ffffff"
      ctx.font = '20px "PixelFont", monospace'
      ctx.textAlign = "left"
      ctx.fillText(`Score: ${score}`, 10, 25)

      // Draw high score
      if (highScore > 0) {
        ctx.textAlign = "right"
        ctx.fillText(`High: ${highScore}`, width - 10, 25)
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
  }, [gameStarted, gameOver, width, height, score, highScore])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">RMGD Snake Game</h3>
        <p className="text-white/70 text-sm mb-4">{message}</p>

        {!gameStarted && !gameOver ? (
          <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
            <Gamepad2 className="mr-2 h-4 w-4" /> Play Snake
          </Button>
        ) : gameOver ? (
          <div className="space-y-4">
            <div className="text-xl font-bold text-red-500">Game Over!</div>
            <div className="text-white">Final Score: {score}</div>
            <div className="flex gap-4 justify-center">
              <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                <Play className="mr-2 h-4 w-4" /> Play Again
              </Button>
              <Button onClick={resetGame} variant="outline" className="border-white text-white hover:bg-white/10">
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-8 mb-2">
            <div className="text-center">
              <div className="text-sm text-white/70">Score</div>
              <div className="text-xl font-bold text-red-500">{score}</div>
            </div>
            {highScore > 0 && (
              <div className="text-center">
                <div className="text-sm text-white/70">High Score</div>
                <div className="text-xl font-bold text-white">{highScore}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.3)]">
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center">
              <div className="text-white text-lg mb-2">Ready to play?</div>
              <div className="text-white/70 text-sm mb-4">
                <p>Use arrow keys to move on desktop</p>
                <p>Swipe to change direction on mobile</p>
              </div>
              <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                <Gamepad2 className="mr-2 h-4 w-4" /> Start Game
              </Button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} width={width} height={height} className="bg-black" />
      </div>

      <div className="mt-4 text-center text-white/50 text-xs">
        {gameStarted && !gameOver ? "Swipe or use arrow keys to change direction" : ""}
      </div>
    </div>
  )
}
