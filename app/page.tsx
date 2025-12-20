import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectDetail } from "@/components/project-detail"
import { Navigation } from "@/components/navigation"
import { EnergyRing } from "@/components/energy-ring"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <EnergyRing />
      <Navigation />
      <Hero />
      <About />
      <ProjectsGrid />
      <ProjectDetail />
    </main>
  )
}
