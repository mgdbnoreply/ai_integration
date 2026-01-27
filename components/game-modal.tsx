"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"
import type { GameData } from "@/lib/types"

interface GameModalProps {
  game: GameData | null
  isOpen: boolean
  onClose: () => void
}

export function GameModal({ game, isOpen, onClose }: GameModalProps) {
  if (!game) return null

  // Parse comma-separated values into arrays
  const parseList = (value: string | undefined) => {
    if (!value) return []
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  // Parse pictures
  const pictures = parseList(game.Pictures)

  // Parse documentation links
  const documentation = parseList(game.Documentation)

  // Parse articles
  const articles = parseList(game.Articles)

  // Format article titles - extract text between parentheses if available
  const formatArticleTitle = (url: string) => {
    const titleMatch = url.match(/$$(.*?)$$/)
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1]
    }
    // If no title in parentheses, use the URL but truncate it
    return url.length > 50 ? url.substring(0, 50) + "..." : url
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{game.Title}</DialogTitle>
            {/* <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-200 flex items-center justify-center">
              {/* <X className="h-4 w-4" /> */}
            {/* </DialogClose> */} 
          </div>
          <DialogDescription className="text-base text-gray-600">
            {game.Year && <span className="mr-2">Released: {game.Year}</span>}
            {game.Developers && <span>By {game.Developers}</span>}
            {game.Country && <span> • {game.Country}</span>}
          </DialogDescription>
        </DialogHeader>

        {/* Image Gallery */}
        {pictures.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pictures.map((pic, index) => (
                <div key={index} className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={pic || "/placeholder.svg"}
                    alt={`${game.Title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{game.Description}</p>
        </div>

        {/* Game Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {/* Left Column */}
          <div>
            {game.Genre && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Genre</h3>
                <p>{game.Genre}</p>
              </div>
            )}

            {game["# Players"] && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Players</h3>
                <p>{game["# Players"]}</p>
              </div>
            )}

            {game.Location && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Location</h3>
                <p>{game.Location}</p>
              </div>
            )}

            {game.Purpose && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Purpose</h3>
                <div className="flex flex-wrap gap-1">
                  {parseList(game.Purpose).map((purpose, index) => (
                    <span key={index} className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                      {purpose}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {game.Hardware && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Hardware</h3>
                <div className="flex flex-wrap gap-1">
                  {parseList(game.Hardware).map((hardware, index) => (
                    <span key={index} className="bg-gray-200 text-black text-xs px-2 py-1 rounded">
                      {hardware}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {game.Connectivity && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Connectivity</h3>
                <div className="flex flex-wrap gap-1">
                  {parseList(game.Connectivity).map((connectivity, index) => (
                    <span key={index} className="bg-gray-200 text-black text-xs px-2 py-1 rounded">
                      {connectivity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {game["Open Source"] && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">Open Source</h3>
                <p>{game["Open Source"] === "Y" ? "Yes" : "No"}</p>
              </div>
            )}

            {game.City && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500">City</h3>
                <p>{game.City}</p>
              </div>
            )}
          </div>
        </div>

        {/* Documentation */}
        {documentation.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <div className="flex flex-col gap-2">
              {documentation.map((doc, index) => (
                <a
                  key={index}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-800 text-sm"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {doc.includes("youtube.com") ? "Watch Video" : "View Documentation"} {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Articles */}
        {articles.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Articles</h3>
            <div className="flex flex-col gap-2">
              {articles.map((article, index) => (
                <a
                  key={index}
                  href={article.split(" (")[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-800 text-sm"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {formatArticleTitle(article)}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {game.Contact && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-700">{game.Contact}</p>
          </div>
        )}

        <DialogFooter>
          {game.URL && (
            <a
              href={game.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Visit Website
            </a>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
