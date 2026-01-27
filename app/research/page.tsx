"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Video } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 px-4 md:px-12 lg:px-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research</h1>
            <p className="text-xl max-w-3xl text-gray-700">
              Explore academic research, publications, and resources related to the history and impact of mobile gaming.
            </p>
          </div>
        </section>

        {/* Academic Papers Section */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Academic Papers</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Software Presentation: The Retro Mobile Gaming Database
                      </h3>
                      <p className="text-gray-600 mb-4">
                        de Souza e Silva, A., & Glover-Rijkse, R. (2023). Mobile Media & Communication, 11(3), 566-571.
                      </p>
                      <p className="text-gray-700 mb-4">
                        This article presents the Retro Mobile Gaming Database as a significant contribution to the
                        field of mobile media studies, highlighting its methodology, scope, and potential applications
                        for researchers.
                      </p>
                      <a
                        href="https://journals.sagepub.com/doi/10.1177/20501579231155534"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                      >
                        Read Paper <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                         The Retro Mobile Gaming Database
                      </h3>
                      <p className="text-gray-600 mb-4">
                        de Souza e Silva, A., by Hannah Trammell.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Reviews in Digital Humanities presents an in-depth look at the Retro Mobile Gaming Database,
                      exploring its significance in preserving gaming history and its value as a research tool for
                      scholars studying the evolution of mobile gaming technologies.
                      </p>
                      <a
                        href="https://reviewsindh.pubpub.org/pub/the-retro-mobile-gaming-database/release/1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                      >
                        Read Paper <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Playful Urban Spaces: A Historical Approach to Mobile Games
                      </h3>
                      <p className="text-gray-600 mb-4">
                        de Souza e Silva, A., & Hjorth, L. (2009). Simulation & Gaming, 40(5), 602-625.
                      </p>
                      <p className="text-gray-700 mb-4">
                        This paper explores the history of mobile games and their relationship to urban spaces,
                        examining how mobile games transform our experience of physical spaces and create new forms of
                        social interaction.
                      </p>
                      <a
                        href="https://journals.sagepub.com/doi/10.1177/1046878109333723"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                      >
                        Read Paper <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Mobile Game Studies - A Reappraisal</h3>
                      <p className="text-gray-600 mb-4">
                        de Souza e Silva, A. (2014). In Routledge Companion to Mobile Media, 209-218.
                      </p>
                      <p className="text-gray-700 mb-4">
                        This chapter reexamines mobile game studies, tracing the evolution of the field and proposing
                        new frameworks for understanding mobile games in the context of broader media studies.
                      </p>
                      <a
                        href="https://www.routledge.com/The-Routledge-Companion-to-Mobile-Media/Goggin-Hjorth/p/book/9780415809474"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                      >
                        Read Paper <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full text-red-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        From Cyber to Hybrid: Mobile Technologies as Interfaces of Hybrid Spaces
                      </h3>
                      <p className="text-gray-600 mb-4">
                        de Souza e Silva, A. (2006). Space and Culture, 9(3), 261-278.
                      </p>
                      <p className="text-gray-700 mb-4">
                        This paper introduces the concept of hybrid spaces, examining how mobile technologies, including
                        mobile games, blur the boundaries between physical and digital spaces.
                      </p>
                      <a
                        href="https://journals.sagepub.com/doi/10.1177/1206331206289022"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                      >
                        Read Paper <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Series Section */}
            <h2 className="text-3xl font-bold mb-8">Explore More</h2>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <Link href="/research/what-is-mobile-game">
                <Card className="h-full hover:shadow-md transition-shadow duration-300 hover:border-red-200 cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-red-100 p-4 rounded-full text-red-600 mb-4">
                      <Video className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">What's a Mobile Game?</h3>
                    <p className="text-gray-700 mb-4">
                      Explore our video series and resources that define and explore the concept of mobile games and
                      their evolution.
                    </p>
                    <Button className="mt-auto bg-red-600 hover:bg-red-700 text-white">Watch Video Series</Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
