"use client"

import { ArrowDown } from "lucide-react"
import { NeonParticles } from "./neon-particles"
import { MagneticButton } from "./magnetic-button"

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#0D0F1A] to-[#0A0A0F]" />
      <div className="wireframe-grid" />

      <div className="absolute inset-0 overflow-hidden">
        <NeonParticles />
      </div>

      <div className="diffused-circles" />

      <div
        className="geometric-accent"
        style={{ width: "400px", height: "400px", top: "10%", right: "5%", opacity: 0.1 }}
      />
      <div
        className="geometric-accent"
        style={{ width: "300px", height: "300px", bottom: "15%", left: "8%", opacity: 0.08 }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] font-light" style={{ color: "rgb(100, 180, 255)" }}>
              UI/UX Designer
            </p>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-balance bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-100 to-gray-400">
              Yuriz
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-wide text-gray-400 max-w-2xl mx-auto text-pretty leading-relaxed">
              专注于界面设计与用户体验
              <br />
              用简洁的设计语言讲述品牌故事
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <MagneticButton onClick={scrollToProjects} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="w-6 h-6" style={{ color: "rgb(160, 170, 185)" }} />
      </div>
    </section>
  )
}
