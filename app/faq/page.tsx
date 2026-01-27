"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function FAQPage() {
  const faqData = [
    {
      category: "About the Database & Scope",
      questions: [
        {
          question: "What time period does the database cover?",
          answer:
            "The Retro Mobile Gaming Database (RMGD) documents mobile games, devices, and related materials from 1975 to 2008. This timeframe allows us to focus on the formative years of mobile gaming before the rise of app stores and modern smartphone ecosystems.",
        },
        {
          question: "What types of games are included in the database?",
          answer:
            "Our collection includes games developed for handheld consoles, early mobile phones, and other portable electronic devices. We cover everything from simple built-in games like Snake to cartridge-based handheld titles, capturing the diversity of mobile gaming experiences.",
        },
        {
          question: "How do I search the database?",
          answer:
            "You can search by multiple criteria, such as title, year, platform, developer, or genre. The database is designed to help researchers find specific games or explore broader patterns in mobile game development and design.",
        },
        {
          question: "Do you include international mobile games?",
          answer:
            "Yes. Our scope is global, featuring mobile games and devices from multiple regions. We aim to represent the diverse cultural and technological contexts in which mobile games are developed.",
        },
        {
          question: "Will the project expand beyond 2008?",
          answer:
            "At this stage, RMGP is focused on the formative years of mobile gaming (1975–2008). Future expansions may include later eras, but our current goal is to fully document and preserve this early period.",
        },
        {
          question: 'What makes a game "mobile" for this project?',
          answer:
            "We define mobile games as titles designed for portable devices such as handheld consoles (e.g., Game Boy, PSP), early mobile phones, and other portable electronic devices. Our definition follows the work of leading scholars featured in our video series.",
        },
        {
          question: "What makes the RMGP different from other game archives?",
          answer:
            "Unlike general video game archives, the RMGP focuses exclusively on mobile and portable games (1975–2008). We combine a searchable database, physical collection, and educational resources to support both academic research and public engagement.",
        },
        {
          question: "How accurate is the information in the database?",
          answer:
            "All entries are reviewed by our team and based on archival research, scholarly publications, and verified sources. However, because of the niche nature of early mobile games, there may be gaps, and we welcome community input to improve accuracy.",
        },
      ],
    },
    {
      category: "Playability & Content",
      questions: [
        {
          question: "Are the classic games on the website the original versions?",
          answer:
            "The playable games on our site are recreations of classic titles (e.g., Snake, Tetris, Pong) that allow visitors to experience the feel of early mobile and arcade games. They are meant to demonstrate historical gameplay, not serve as exact emulations.",
        },
        {
          question: "Can I play the games from the database?",
          answer:
            "While the database itself is a catalog and research tool, we provide select recreations of historically significant games (like Snake and Tetris) so users can experience how these games were played.",
        },
        {
          question: "Are the video series interviews open access?",
          answer:
            "Yes. The “What’s a Mobile Game?” video series is freely available on the RMGP website. Each episode features a scholar or industry professional offering a unique perspective on mobile gaming.",
        },
      ],
    },
    {
      category: "Physical Collection",
      questions: [
        {
          question: "Where is the physical collection housed?",
          answer:
            "The Retro Mobile Gaming Collection is maintained at the Center for Transformative Media (Northeastern University). It includes handheld consoles, mobile phones, cartridges, manuals, and others from the 1975–2008 period.",
        },
        {
          question: "Can I access the physical collection in person?",
          answer:
            "At this time, the collection is primarily used for research and archival purposes. Access may be arranged for scholars or students working with the Center for Transformative Media. Please contact us in advance if you’re interested.",
        },
        {
          question: "How do you preserve donated items?",
          answer:
            "Donated devices and games are cataloged, stored in archival conditions, and digitized when possible. We take care to preserve not just the hardware but also manuals, packaging, and related ephemera.",
        },
      ],
    },
    {
      category: "Educational Resources",
      questions: [
        {
          question: "What educational resources are available?",
          answer:
            "We offer assignments, teaching guides, and archival research tips for instructors. These materials are designed to integrate mobile game history into media studies, digital culture, and game design courses.",
        },
        {
          question: "Can educators use your materials in their classrooms?",
          answer:
            "Absolutely! Our assignments, guides, and video series are designed for classroom use. Instructors are welcome to adapt them, with attribution, for teaching media history, game studies, and digital culture.",
        },
        {
          question: "Can I contribute educational resources or teaching materials?",
          answer:
            "Yes! We’re always looking to expand our teaching collection. If you have lesson plans, assignments, or research tools related to mobile game history, please contact us to contribute.",
        },
      ],
    },
    {
      category: "Contributions & Community",
      questions: [
        {
          question: "Who can contribute to the project?",
          answer:
            "Contributions are welcome from scholars, game developers, students, and enthusiasts. Whether it’s adding a missing game, sharing research, or donating materials, your input helps preserve mobile gaming history.",
        },
        {
          question: "Are the donated items tax-deductible?",
          answer:
            "No. Because the RMGP is a research project conducted across multiple institutions (not solely Northeastern University), donations are not tax-deductible.",
        },
        {
          question: "Can I suggest corrections or updates to existing entries?",
          answer:
            "Yes! If you notice missing details or inaccuracies in the database, please use the contact form to submit corrections. Our team reviews all submissions before updating entries.",
        },
        {
          question: "Can I submit my own research to be featured?",
          answer:
            "Yes. If you’ve written papers, created digital projects, or developed educational resources related to mobile gaming history, you can submit them for consideration. Our team reviews contributions before sharing them on the site.",
        },
      ],
    },
    {
      category: "Management & Updates",
      questions: [
        {
          question: "Who manages the project?",
          answer:
            "The RMGP is curated by the Center for Transformative Media at Northeastern University, in collaboration with faculty, research assistants, and contributors from multiple institutions.",
        },
        {
          question: "How do I stay updated on new entries and resources?",
          answer:
            "We announce major updates on social media and our website. You can also subscribe to our newsletter (coming soon) for direct updates on database additions, new video episodes, and calls for contributions.",
        },
      ],
    },
    {
      category: "Additional Questions",
      questions: [
        {
          question: "Do I need an account to use the database?",
          answer:
            "No account is required to browse or search the RMGP. Some contribution features may require you to share your name and contact information.",
        },
        {
          question: "Can I download materials from the database?",
          answer:
            "The database itself is for research and browsing. You can view entries, images, and metadata, but full downloads of scans or files may be restricted to protect copyright and archival agreements.",
        },
        {
          question: "What kinds of items can I donate?",
          answer:
            "We accept handheld consoles, mobile phones, game cartridges, manuals, packaging, and other related ephemera from 1975–2008. Please contact us before sending materials.",
        },
        {
          question: "Is the database open to the public?",
          answer:
            "Yes, the database is free to browse online. Certain in-person materials are restricted to scholars and students who arrange visits in advance.",
        },
        {
          question: "How can I get involved if I’m not a scholar or developer?",
          answer:
            "Enthusiasts are welcome to contribute knowledge, suggest corrections, donate items, or share memories of early mobile gaming. Every contribution helps build the archive.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 px-4 md:px-12 lg:px-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl max-w-3xl text-gray-700">
              Find answers to common questions about the Retro Mobile Gaming Project, our database, and how to get
              involved.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            {faqData.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                      <AccordionTrigger className="text-lg font-semibold text-left hover:text-red-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pt-2">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}