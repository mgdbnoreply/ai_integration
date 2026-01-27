"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Play, Calendar, User, ArrowUpRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"


// Video data structure
interface VideoData {
  id: string
  title: string
  speaker: string
  date: string
  description: string
  youtubeId: string
}

export default function WhatIsMobileGamePage() {
  const [activeVideo, setActiveVideo] = useState<string>("7_DWInO_nZE") // Default to first video

  // Video data
  const videos: VideoData[] = [
    {
      id: "jordan-frith",
      title: "What is a Mobile Game?",
      speaker: "Jordan Frith",
      date: "October 1, 2022",
      description:
        "Clemson University professor Jordan Frith elaborates the difference between passive and active mobile games and explains why mobile game studies are so relevant today.",
      youtubeId: "7_DWInO_nZE",
    },
    {
      id: "davide-spallazzo",
      title: "Mobile Games and Connection",
      speaker: "Davide Spallazzo",
      date: "September 1, 2022",
      description:
        "Davide Spallazzo at Polytechnic University of Milan shares his take on mobile games as opportunities to connect with the world around us as well as other people.",
      youtubeId: "Nl9hivirkKk",
    },
    {
      id: "ilaria-mariani",
      title: "Virtual and Actual Reality",
      speaker: "Ilaria Mariani",
      date: "May 1, 2022",
      description:
        "Ilaria Mariani at Polytechnic University of Milan shares her thoughts on how mobile games combine virtual and actual reality.",
      youtubeId: "bOEWv9STMWU",
    },
    {
      id: "alex-custodio",
      title: "Seamless Gaming",
      speaker: "Alex Custodio",
      date: "April 1, 2022",
      description:
        "PhD student at Concordia University Alex Custodio shares how mobile games are capable of seamless transfer between playing a game and everyday activities.",
      youtubeId: "CXxPej4dKZM",
    },
    {
      id: "shira-chess",
      title: "Beyond Old-School Constraints",
      speaker: "Shira Chess",
      date: "March 1, 2022",
      description:
        "University of Georgia professor Shira Chess shares her thoughts on how the invention of mobile games represents the point where we stop being held by old-school constraints.",
      youtubeId: "CXxPej4dKZM",
    },
    {
      id: "nick-taylor",
      title: "Games as Technocultural Platforms",
      speaker: "Nick Taylor",
      date: "February 1, 2022",
      description:
        "Associate professor at North Carolina State University, Nick Taylor shares his thoughts on how games are technocultural platforms for connectivity that play a big role in culture and cultural inequalities.",
      youtubeId: "q0Ddkp1RkwE",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />

      <main className="flex-1">
        {/* Hero Section with White Background */}
        <section className="bg-white py-20 px-4 md:px-12 lg:px-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/research"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Research
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">What's a Mobile Game?</h1>
              <p className="text-xl max-w-3xl text-gray-700 mb-8">
                Explore our video series featuring interviews with leading scholars who discuss the definition and
                evolution of mobile gaming.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Understanding Mobile Games</h2>
              <p className="text-gray-700 mb-4">
                The Retro Mobile Gaming Project (RMGP) defines mobile games as games that are played on portable
                devices, including handheld consoles, mobile phones, and other portable electronic devices.
              </p>
              <p className="text-gray-700 mb-6">
                This video series features interviews with leading scholars who explore different aspects of mobile
                gaming and its evolution over time. Each scholar brings a unique perspective on what constitutes a
                mobile game and how these games have shaped our culture and society.
              </p>
            </div>
          </div>
        </section>

        {/* Simplified Video Series Section */}
        <section id="video-series" className="py-16 px-4 md:px-12 lg:px-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Series: What's a Mobile Game?</h2>
              <div className="h-1 w-20 bg-red-600 rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl">
                This series explores the definition of mobile games through interviews with scholars and industry
                professionals. Each video offers a unique perspective on the history, design, and cultural impact of
                mobile games.
              </p>
            </div>

            {/* Main Video Player */}
            <div className="mb-12">
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[500px]"
                ></iframe>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2">{videos.find((v) => v.youtubeId === activeVideo)?.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{videos.find((v) => v.youtubeId === activeVideo)?.speaker}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{videos.find((v) => v.youtubeId === activeVideo)?.date}</span>
                  </div>
                </div>
                <p className="text-gray-700">{videos.find((v) => v.youtubeId === activeVideo)?.description}</p>
              </div>
            </div>

            {/* Simple Video List */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">All Episodes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer hover:shadow-md transition-all ${activeVideo === video.youtubeId ? "border-red-500" : "border-gray-200"}`}
                    onClick={() => setActiveVideo(video.youtubeId)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${activeVideo === video.youtubeId ? "bg-red-600" : "bg-gray-200"}`}
                        >
                          <Play
                            className={`h-4 w-4 ${activeVideo === video.youtubeId ? "text-white" : "text-gray-700"}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-base mb-1">{video.title}</h4>
                          <p className="text-sm text-gray-500">{video.speaker}</p>
                          <p className="text-xs text-gray-400 mt-1">{video.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Research Papers Section */}
        <section id="research-papers" className="py-16 px-4 md:px-12 lg:px-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Papers</h2>
              <div className="h-1 w-20 bg-red-600 rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl">
                The following research papers explore the definition and evolution of mobile games, providing academic
                context to our video series.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg text-red-600 flex-shrink-0">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Playful Urban Spaces: A Historical Approach to Mobile Games
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">de Souza e Silva, A., & Hjorth, L. (2009)</p>
                    <p className="text-gray-700 mb-4">
                      This paper explores the history of mobile games and their relationship to urban spaces, examining
                      how mobile games transform our experience of physical spaces.
                    </p>
                    <a
                      href="https://journals.sagepub.com/doi/10.1177/1046878109333723"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-800 font-medium group"
                    >
                      Read Paper{" "}
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg text-red-600 flex-shrink-0">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Software Presentation: The Retro Mobile Gaming Database</h3>
                    <p className="text-gray-500 text-sm mb-3">de Souza e Silva, A., & Glover-Rijkse, R. (2023)</p>
                    <p className="text-gray-700 mb-4">
                      This paper presents the Retro Mobile Gaming Database and its contribution to the study of mobile
                      game history and preservation.
                    </p>
                    <a
                      href="https://journals.sagepub.com/doi/10.1177/20501579231155534"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-800 font-medium group"
                    >
                      Read Paper{" "}
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 p-8 md:p-12 rounded-2xl shadow-sm border border-red-100 relative overflow-hidden">
              <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Join the Conversation</h3>
                <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                  We invite scholars, game developers, and enthusiasts to contribute to the ongoing discussion about the
                  definition and evolution of mobile games. Share your perspectives and research to help expand our
                  understanding of this important field.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/contact">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8">Contact Us</Button>
                  </Link>
                  <Link href="/research">
                    <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-50 px-8">
                      Explore More Research
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
