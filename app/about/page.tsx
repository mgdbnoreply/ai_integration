"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { useState } from "react"

// Team member component with hover animation
const TeamMember = ({
  image,
  name,
  title,
  description,
  link = null,
  isResearchAssistant = false,
}: {
  image: string
  name: string
  title: string
  description: string
  link?: string | null
  isResearchAssistant?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`bg-white rounded-xl overflow-hidden shadow-lg ${isResearchAssistant ? "md:max-w-xs mx-auto" : ""}`}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex flex-col items-center">
        <motion.div
          className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-red-600"
          animate={isHovered ? { scale: 1.05, borderColor: "#000" } : { scale: 1, borderColor: "#dc2626" }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=200&width=200"
            }}
          />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2 text-center">{name}</h3>
        <p className="font-medium mb-4 text-center">{title}</p>
        <p className="text-gray-700 text-center">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-red-600 hover:text-red-800 font-medium"
          >
            Learn more →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Tetris Background */}
        <section className="relative py-20 px-4 md:px-12 lg:px-16 overflow-hidden bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">About The Project</h1>
            <p className="text-xl max-w-3xl text-gray-700">
              The Retro Mobile Gaming Project (RMGP) contains a collection of mobile games from 1975 to 2008.
            </p>
          </div>
        </section>

        {/* About the Project */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  To preserve the history of mobile gaming and provide researchers, developers, and enthusiasts with a
                  comprehensive resource for understanding the evolution of mobile games from 1975 to 2008.
                </p>
                <p className="text-gray-700">
                  The Retro Mobile Gaming Project (RMGP) allows users to search games by multiple search criteria
                  including title, year developed, type of game, and more. This robust search system helps researchers
                  not only to find games but also to create new correlations among historical types of mobile games.
                </p>
              </div>
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/rmgd-tetris.webp" alt="Retro Gaming Collection" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Project Directors Section */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Meet the scholars leading this initiative </h2>
            {/*<p className="text-xl text-gray-600 mb-12 text-center">Meet the leadership behind this initiative</p>*/}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Project Director 1 */}
              <TeamMember
                image="/images/adriana-de-souza.webp"
                name="Adriana de Souza e Silva"
                title="Project Director"
                description="Adriana de Souza e Silva is a Professor of Communication Studies Director of the Center for Transformative Media at Northeastern University. Dr. de Souza e Silva's research investigates how engagement with mobile and locative media technologies shape urban mobility and interactions with public spaces, primarily in the developing world."
                link="https://camd.northeastern.edu/people/adriana-de-souza-e-silva/"
              />

              {/* Project Director 2 */}
              <TeamMember
                image="/images/ragan-glover.jpeg"
                name="Ragan Glover"
                title="Project Director"
                description="Ragan Glover is the director of the Michigan Research and Discovery Scholars at the University of Michigan. Her work focuses on the sociocultural impact of mobile and immersive media."
                link="https://lsa.umich.edu/mrads/people/Leadership-Team/ragan-glover.html"
              />

              {/* Historian */}
              <TeamMember
                image="/images/logan-brown.jpeg"
                name="Logan Brown"
                title="Historian and Preservation Specialist"
                description="Logan Brown is a media historian and educator whose work focuses on issues of power and capital in the history of video games, including the early American mobile games industry."
                link="https://www.loganbrown.info"
              />
            </div>
          </div>
        </section>

        {/* Research Assistants Section */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Research Assistants</h2>

            {/*<p className="text-xl text-gray-600 mb-12 text-center">The talented team bringing the project to life</p>*/}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Research Assistant 1 */}
              <TeamMember
                image="/images/arslan-parkar.webp"
                name="Arslan Parkar"
                title="MS in Information Systems"
                description="Arslan is pursuing an MS in information systems at Northeastern. He has experience in leading an AI-driven startup and has done impactful research projects focusing on innovative, user-centric solutions."
                isResearchAssistant={true}
              />

              {/* Research Assistant 2 */}
              <TeamMember
                image="/images/kannan-karthikeyan.jpeg"
                name="Kannan Karthikeyan"
                title="Software Engineering Graduate Student"
                description="Kannan is a software engineering graduate student at Northeastern who blends his lifelong passion for gaming with technical expertise to advance the RMGP initiative."
                isResearchAssistant={true}
              />

              {/* Research Assistant 3 */}
              <TeamMember
                image="/images/fiona-wu.png"
                name="Yahan (Fiona) Wu"
                title="Dean's Honors Fellow"
                description="Fiona is a Dean's Honors Fellow pursuing a BS in Computer Science and Media Arts, contributing her technical and creative skills to the RMGP project."
                isResearchAssistant={true}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
