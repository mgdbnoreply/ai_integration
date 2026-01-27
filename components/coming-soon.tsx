"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Construction, Gamepad2 } from "lucide-react"
import { PongGame } from "@/components/pong-game"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ComingSoonProps {
  pageName: string
}

export function ComingSoon({ pageName }: ComingSoonProps) {
  const [progress, setProgress] = useState(0)
  const [tetrisBlocks, setTetrisBlocks] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 2
        return newProgress > 100 ? 0 : newProgress
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Generate falling tetris blocks
  useEffect(() => {
    const colors = ["#dc2626", "#2563eb", "#16a34a", "#eab308", "#9333ea"]
    const interval = setInterval(() => {
      const newBlock = {
        id: Date.now(),
        x: Math.floor(Math.random() * 100),
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setTetrisBlocks((prev) => [...prev, newBlock])
    }, 2000)

    const animationInterval = setInterval(() => {
      setTetrisBlocks(
        (prev) => prev.map((block) => ({ ...block, y: block.y + 1 })).filter((block) => block.y < 110), // Remove blocks that have fallen off screen
      )
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(animationInterval)
    }
  }, [])

  return (
    <div className="relative overflow-hidden z-0 flex-1 flex flex-col">
      {/* Background tetris blocks */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {tetrisBlocks.map((block) => (
          <motion.div
            key={block.id}
            className="absolute w-12 h-12 opacity-20"
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              backgroundColor: block.color,
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90 z-10"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-600 text-white">
            <Construction className="w-12 h-12" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-white"
        >
          {pageName}
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500">Coming Soon</h2>
          <p className="text-lg text-white/80 mb-8">
            Our team of retro gaming enthusiasts is working hard to bring you an amazing experience. Check back soon for
            updates!
          </p>
        </motion.div>

        {/* Pixelated progress bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full max-w-md mb-12"
        >
          <div className="h-8 bg-black/50 border-2 border-white/20 rounded-md overflow-hidden relative">
            <div
              className="h-full bg-red-600 transition-all duration-1000 flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-white">LOADING... {Math.floor(progress)}%</span>
              </div>
            </div>

            {/* Pixelated overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-1 bg-black/10"
                  style={{
                    left: `${i * 5 + Math.random() * 5}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-6 py-3 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>

          <Link href="/about">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" /> Explore What's Ready
            </Button>
          </Link>
        </motion.div>

        {/* Pong Game Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 mb-8 w-full max-w-2xl"
        >
          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <span className="w-2 h-8 bg-red-600 mr-3"></span>
              While You Wait...
              <span className="w-2 h-8 bg-red-600 ml-3"></span>
            </h3>

            <div className="flex justify-center">
              <PongGame width={isMobile ? 320 : 480} height={isMobile ? 240 : 320} />
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/80 italic">
                "Pong was one of the earliest arcade video games that helped launch the gaming industry. We're
                preserving gaming history from arcade to mobile."
              </p>
              <p className="text-red-500 font-bold mt-2">— The RMGP Team</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
