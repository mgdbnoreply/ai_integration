"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FileText, Search } from "lucide-react"

export default function ResourcesPage() {
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
        <section className="bg-white text-black py-16 px-4 md:px-12 lg:px-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Educational Resources</h1>
            <p className="text-xl max-w-3xl opacity-90">
              Explore our collection of educational materials designed to help students, educators, and researchers
              engage with the history of mobile gaming.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Media History Assignment */}
              <motion.div variants={itemVariants}>
                <Link href="/education/assignments">
                  <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neu_ms37dx73n.jpg-otR4ogzOUFyxjnVu4opibT0wyJ3EZJ.jpeg"
                        alt="Tamagotchi virtual pet device"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <FileText className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                        Media History Assignment: Retro Mobile Gaming Database Entry
                      </h3>
                      <p className="text-gray-600 mb-4">
                        A comprehensive assignment for students to research and contribute to the Retro Mobile Gaming
                        Database.
                      </p>
                      <div className="flex items-center text-red-600 font-medium">
                        View Assignment
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
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* Guidelines for Internet Archival Research */}
              <motion.div variants={itemVariants}>
                <Link href="/education/research-techniques">
                  <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-10%20at%205.57.23%E2%80%AFPM-0MjoL6IWITZLAHfj93B51Ovt5ALL6i.png"
                        alt="Internet Archive Wayback Machine"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <Search className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                        Guidelines for Internet Archival Research
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Learn effective strategies for researching the history of mobile games using digital archives.
                      </p>
                      <div className="flex items-center text-red-600 font-medium">
                        View Guidelines
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
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Want to Contribute?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              We're always looking for new educational resources and materials to share with our community. If you have
              resources you'd like to contribute, please get in touch.
            </p>
            <Link href="/contact">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md">Contact Us</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
