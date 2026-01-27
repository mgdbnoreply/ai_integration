"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Send, AlertCircle, CheckCircle2 } from "lucide-react"
import { submitContactForm, type ContactFormResponse } from "@/app/actions/contact-form"
import { useFormStatus } from "react-dom"

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 w-full md:w-auto"
      disabled={pending}
    >
      {pending ? (
        <>
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Sending...
        </>
      ) : (
        <>
          Send Message <Send className="h-4 w-4" />
        </>
      )}
    </Button>
  )
}

export default function ContactPage() {
  const [formState, setFormState] = useState<ContactFormResponse | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    const response = await submitContactForm(formData)
    setFormState(response)

    if (response.success && formRef.current) {
      formRef.current.reset()

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormState(null)
      }, 5000)
    }
  }

  // Social media link component with hover animation
  const SocialLink = ({ href, icon: Icon, color }: { href: string; icon: any; color: string }) => {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon size={20} />
      </motion.a>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white text-black py-16 px-4 md:px-12 lg:px-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl text-gray-700">
              Have questions about the Retro Mobile Gaming Project? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {/* Form status message */}
                {formState && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-md flex items-start gap-3 ${
                      formState.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {formState.success ? (
                      <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">{formState.message}</p>
                      {formState.errors && (
                        <ul className="mt-2 text-sm list-disc pl-5">
                          {Object.entries(formState.errors).map(([field, errors]) =>
                            errors.map((error, i) => <li key={`${field}-${i}`}>{error}</li>),
                          )}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}

                <form ref={formRef} action={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-[150px]"
                      placeholder="Your message here..."
                    />
                  </div>

                  <div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <SubmitButton />
                    </motion.div>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white p-3 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">TransformativeMedia@northeastern.edu</p>
                      <p className="text-gray-600 mt-1">jashu.s@northeastern.edu</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  <SocialLink href="/social/facebook" icon={Facebook} color="bg-[#1877F2] hover:bg-[#0E65D9]" />
                  <SocialLink href="/social/twitter" icon={Twitter} color="bg-[#1DA1F2] hover:bg-[#0C8BD9]" />
                  <SocialLink href="/social/instagram" icon={Instagram} color="bg-[#E4405F] hover:bg-[#D62E50]" />
                  <SocialLink href="/social/linkedin" icon={Linkedin} color="bg-[#0A66C2] hover:bg-[#0952A0]" />
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
