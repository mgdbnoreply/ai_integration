"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"

interface PongGameProps {
  width?: number
  height?: number
}

export function PongGame({ width = 480, height = 320 }: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [playerScore, setPlayerScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [message, setMessage] = useState("")

  // Game state stored in refs to avoid re-renders during game loop
  const gameStateRef = useRef({
    playerY: height / 2 - 40,
    aiY: height / 2 - 40,
    ballX: width / 2,
    ballY: height / 2,
    ballSpeedX: 5,
    ballSpeedY: 3,
    paddleWidth: 10,
    paddleHeight: 80,
    paddleSpeed: 8,
    ballSize: 10,
    playerScore: 0,
    aiScore: 0,
    lastTime: 0,
    messages: [
      "While you wait, enjoy this classic game!",
      "The RMGD team is working hard on this page.",
      "Can you beat our AI opponent?",
      "High scores coming in a future update!",
      "Thanks for visiting our retro gaming database!",
    ],
    currentMessageIndex: 0,
    messageTimer: 0,
  })

  // Mouse/touch position tracking
  const mouseYRef = useRef<number | null>(null)

  // Handle mouse/touch movement
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()

    if ("touches" in e) {
      // Touch event
      if (e.touches.length > 0) {
        mouseYRef.current = e.touches[0].clientY - rect.top
      }
    } else {
      // Mouse event
      mouseYRef.current = e.clientY - rect.top
    }
  }

  // Start the game
  const startGame = () => {
    setGameStarted(true)
    setPlayerScore(0)
    setAiScore(0)

    const gameState = gameStateRef.current
    gameState.ballX = width / 2
    gameState.ballY = height / 2
    gameState.ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1)
    gameState.ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1)
    gameState.playerScore = 0
    gameState.aiScore = 0

    // Set initial message
    setMessage(gameState.messages[0])
    gameState.messageTimer = 0
    gameState.currentMessageIndex = 0
  }

  // Game loop
  useEffect(() => {
    if (!gameStarted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up event listeners
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleMouseMove, { passive: false })

    // Prevent scrolling when touching the canvas
    canvas.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault()
      },
      { passive: false },
    )

    // Game loop
    let animationId: number

    const gameLoop = (timestamp: number) => {
      if (!gameStarted) return

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

      // Draw center line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.setLineDash([10, 10])
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.lineTo(width / 2, height)
      ctx.stroke()
      ctx.setLineDash([])

      // Update player paddle position based on mouse/touch
      if (mouseYRef.current !== null) {
        const targetY = mouseYRef.current - gameState.paddleHeight / 2
        gameState.playerY = Math.max(0, Math.min(height - gameState.paddleHeight, targetY))
      }

      // Update AI paddle position
      const aiTargetY = gameState.ballY - gameState.paddleHeight / 2
      const aiSpeed = gameState.paddleSpeed * 0.7 // Make AI slightly slower than player

      if (gameState.aiY + gameState.paddleHeight / 2 < aiTargetY) {
        gameState.aiY += aiSpeed
      } else if (gameState.aiY + gameState.paddleHeight / 2 > aiTargetY) {
        gameState.aiY -= aiSpeed
      }

      gameState.aiY = Math.max(0, Math.min(height - gameState.paddleHeight, gameState.aiY))

      // Update ball position
      gameState.ballX += gameState.ballSpeedX
      gameState.ballY += gameState.ballSpeedY

      // Ball collision with top and bottom
      if (gameState.ballY <= 0 || gameState.ballY >= height - gameState.ballSize) {
        gameState.ballSpeedY = -gameState.ballSpeedY

        // Add slight randomness to bounce
        gameState.ballSpeedY += (Math.random() * 2 - 1) * 0.5
      }

      // Ball collision with paddles
      // Player paddle
      if (
        gameState.ballX <= gameState.paddleWidth &&
        gameState.ballY + gameState.ballSize >= gameState.playerY &&
        gameState.ballY <= gameState.playerY + gameState.paddleHeight
      ) {
        gameState.ballSpeedX = -gameState.ballSpeedX

        // Add angle based on where the ball hits the paddle
        const hitPosition = (gameState.ballY - gameState.playerY) / gameState.paddleHeight
        gameState.ballSpeedY = (hitPosition - 0.5) * 10

        // Increase speed slightly
        gameState.ballSpeedX *= 1.05
      }

      // AI paddle
      if (
        gameState.ballX >= width - gameState.paddleWidth - gameState.ballSize &&
        gameState.ballY + gameState.ballSize >= gameState.aiY &&
        gameState.ballY <= gameState.aiY + gameState.paddleHeight
      ) {
        gameState.ballSpeedX = -gameState.ballSpeedX

        // Add angle based on where the ball hits the paddle
        const hitPosition = (gameState.ballY - gameState.aiY) / gameState.paddleHeight
        gameState.ballSpeedY = (hitPosition - 0.5) * 10

        // Increase speed slightly
        gameState.ballSpeedX *= 1.05
      }

      // Ball out of bounds - scoring
      if (gameState.ballX < 0) {
        // AI scores
        gameState.aiScore++
        setAiScore(gameState.aiScore)
        resetBall(gameState)
      } else if (gameState.ballX > width) {
        // Player scores
        gameState.playerScore++
        setPlayerScore(gameState.playerScore)
        resetBall(gameState)
      }

      // Draw paddles
      ctx.fillStyle = "#dc2626" // Red color for player
      ctx.fillRect(0, gameState.playerY, gameState.paddleWidth, gameState.paddleHeight)

      ctx.fillStyle = "#ffffff" // White color for AI
      ctx.fillRect(width - gameState.paddleWidth, gameState.aiY, gameState.paddleWidth, gameState.paddleHeight)

      // Draw ball with glow effect
      ctx.shadowColor = "#dc2626"
      ctx.shadowBlur = 10
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(gameState.ballX, gameState.ballY, gameState.ballSize / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw score
      ctx.fillStyle = "#ffffff"
      ctx.font = '24px "PixelFont", monospace'
      ctx.textAlign = "center"
      ctx.fillText(`${gameState.playerScore}`, width / 4, 30)
      ctx.fillText(`${gameState.aiScore}`, (width / 4) * 3, 30)

      // Continue game loop
      animationId = requestAnimationFrame(gameLoop)
    }

    // Start game loop
    animationId = requestAnimationFrame(gameLoop)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleMouseMove)
    }
  }, [gameStarted, width, height])

  // Reset ball after scoring
  const resetBall = (gameState: typeof gameStateRef.current) => {
    gameState.ballX = width / 2
    gameState.ballY = height / 2
    gameState.ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1)
    gameState.ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">RMGD Pong Challenge</h3>
        <p className="text-white/70 text-sm mb-4">{message}</p>

        {!gameStarted ? (
          <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
            <Gamepad2 className="mr-2 h-4 w-4" /> Play Pong
          </Button>
        ) : (
          <div className="flex justify-center gap-8 mb-2">
            <div className="text-center">
              <div className="text-sm text-white/70">You</div>
              <div className="text-xl font-bold text-red-500">{playerScore}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">AI</div>
              <div className="text-xl font-bold text-white">{aiScore}</div>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.3)]">
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center">
              <div className="text-white text-lg mb-2">Ready to play?</div>
              <div className="text-white/70 text-sm mb-4">Use your mouse or touch to move the paddle</div>
              <Button onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white">
                <Gamepad2 className="mr-2 h-4 w-4" /> Start Game
              </Button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} width={width} height={height} className="bg-black" />
      </div>

      <div className="mt-4 text-center text-white/50 text-xs">Move your paddle with mouse or touch to play</div>
    </div>
  )
}
