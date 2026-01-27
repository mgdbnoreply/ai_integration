"use client"

import { ComingSoon } from "@/components/coming-soon"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ComingSoon pageName="Assignments" />
      </main>
      <Footer />
    </div>
  )
}
