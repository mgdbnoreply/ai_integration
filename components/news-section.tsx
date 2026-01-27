import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

export function NewsSection() {
  return (
    <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">News</h2>
          <Link href="/news" className="text-red-600 hover:text-red-800 font-medium flex items-center">
            View All News
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="group block">
            <div className="mb-4 overflow-hidden rounded-lg relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/032725_MM_Adriana_De_Souza_E_Silva_008.jpg-2-ZYoi1aCXZZbDq3CzkwwZefwjTXczRi.webp"
                alt="Northeastern University Launches Game Preservation Database"
                width={800}
                height={500}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar className="h-4 w-4" />
              <span>April 1, 2025</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">
              Northeastern University Launches Game Preservation Database
            </h3>
            <p className="text-gray-600">
              The Center for Transformative Media at Northeastern University has launched a comprehensive database
              dedicated to preserving the history of mobile gaming. This initiative aims to document and archive mobile
              games from 1975 to 2008, providing researchers, developers, and enthusiasts with a valuable resource for
              understanding the evolution of mobile gaming.
            </p>
            <div className="mt-3 inline-flex items-center text-red-600 font-medium">
              Read More
              <svg
                className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
