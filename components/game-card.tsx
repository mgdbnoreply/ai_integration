import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GameCardProps {
  title: string
  image: string
  category: string
  rating: number
}

export function GameCard({ title, image, category, rating }: GameCardProps) {
  return (
    <Link href="#" className="group">
      <Card className="overflow-hidden bg-black border-purple-900/50 transition-all duration-300 group-hover:border-pink-500/50 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge className="absolute top-2 right-2 bg-pink-600">{category}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-pink-400 transition-colors">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-gray-300 text-sm">{rating.toFixed(1)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
