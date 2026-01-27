"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ExternalLink } from "lucide-react"

export default function NewsPage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 px-4 md:px-12 lg:px-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Publications</h1>
            <p className="text-xl max-w-3xl text-gray-700">
              Stay updated with the latest news, publications, and developments from the Retro Mobile Gaming Project.
            </p>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Latest News</h2>

            <Card className="overflow-hidden mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/032725_MM_Adriana_De_Souza_E_Silva_008.jpg-2-ZYoi1aCXZZbDq3CzkwwZefwjTXczRi.webp"
                    alt="Nintendo Game & Watch Donkey Kong Jr."
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>April 1, 2025</span>
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">Featured</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Northeastern University Launches Game Preservation Database
                  </h3>
                  <p className="text-gray-700 mb-6">
                    The Center for Transformative Media at Northeastern University has launched a comprehensive database
                    dedicated to preserving the history of mobile gaming. This initiative aims to document and archive
                    mobile games from 1975 to 2008, providing researchers, developers, and enthusiasts with a valuable
                    resource for understanding the evolution of mobile gaming.
                  </p>
                  <a
                    href="https://news.northeastern.edu/2025/04/01/game-preservation-database/?utm_source=News%40Northeastern&utm_campaign=5ca18ea199-EMAIL_CAMPAIGN_2022_09_22_11_00_COPY_01&utm_medium=email&utm_term=0_508ab516a3-5ca18ea199-279529680"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                  >
                    Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </div>
            </Card>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Publication 1
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/71677431362098-PlSWVBvQ2bJyVO1VuSW48gooPYN1du.png"
                      alt="Game Boy Advance SP"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>2023</span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">Publication</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">The Retro Mobile Gaming Database</h3>
                    <p className="text-gray-600 mb-4">
                      Reviews in Digital Humanities presents an in-depth look at the Retro Mobile Gaming Database,
                      exploring its significance in preserving gaming history and its value as a research tool for
                      scholars studying the evolution of mobile gaming technologies.
                    </p>
                    <div className="mt-4">
                      <a
                        href="https://reviewsindh.pubpub.org/pub/the-retro-mobile-gaming-database/release/1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                      >
                        Read Publication <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div> */}

              {/* Publication 2 */}
              <motion.div variants={itemVariants}>
                {/* <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.1177_20501579231155534-fig1.jpg-goFr5nwSIWMZxJGjSoJMdHeF3spRe3.jpeg"
                      alt="Retro Mobile Gaming Database Interface"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>2023</span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">Journal Article</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Software Presentation: The Retro Mobile Gaming Database</h3>
                    <p className="text-gray-600 mb-4">
                      Published in Mobile Media & Communication, this article by A. D. S. E. Silva and R. Glover-Rijkse
                      presents the Retro Mobile Gaming Database as a significant contribution to the field of mobile
                      media studies, highlighting its methodology, scope, and potential applications for researchers.
                    </p>
                    <div className="mt-4">
                      <a
                        href="https://journals.sagepub.com/doi/10.1177/20501579231155534"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                      >
                        Read Journal Article <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card> */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Back to Home Button */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <Link href="/">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-md">
                Back to Home
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
