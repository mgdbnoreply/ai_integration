import { ComingSoon } from "@/components/coming-soon"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ClassroomActivitiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ComingSoon pageName="Classroom Activities" />
      </main>
      <Footer />
    </div>
  )
}
