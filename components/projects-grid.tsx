"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GlitchText } from "./glitch-text"

const projects = [
  {
    id: "puppy-go",
    title: "PUPPY GO",
    category: "Mobile App · AI Design",
    description: "AI智能规划+情感激励型运动辅助APP,已落地项目",
    images: ["/puppy-go-cover.png", "/puppy-go-app-interface-design.jpg"],
  },
  {
    id: "xingwuai",
    title: "行无碍",
    category: "Platform Design · AI",
    description: "AI赋能的全民无障碍出行平台",
    images: ["/xingwuai-cover.png", "/accessible-transportation-platform-app.jpg"],
  },
  {
    id: "tmus",
    title: "Tmus",
    category: "Web Design · Desktop",
    description: "Windows桌面应用时长可视化网页",
    images: ["/tmus-cover.png", "/time-tracking-visualization-dashboard-interface.jpg"],
  },
]

export function ProjectsGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({
    "puppy-go": 0,
    xingwuai: 0,
    tmus: 0,
  })

  const handlePrevImage = (e: React.MouseEvent, projectId: string, totalImages: number) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: prev[projectId] > 0 ? prev[projectId] - 1 : totalImages - 1,
    }))
  }

  const handleNextImage = (e: React.MouseEvent, projectId: string, totalImages: number) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages,
    }))
  }

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#10121A] to-[#0A0A0F]" />
      <div className="wireframe-grid opacity-40" />
      <div className="diffused-circles" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] font-light" style={{ color: "rgb(100, 180, 255)" }}>
              精选项目
            </p>
            <GlitchText triggerOnScroll triggerOnHover>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">我的作品集</h2>
            </GlitchText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`#project-${project.id}`}
                className="group cursor-pointer block glitch-card"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 relative ${
                    hoveredId === project.id ? "gradient-border" : ""
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden group/carousel">
                    <Image
                      src={project.images[currentImageIndex[project.id]] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-[rgb(100,180,255)]/30 via-transparent to-[rgb(160,120,255)]/20 transition-opacity duration-500 ${
                        hoveredId === project.id ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(e, project.id, project.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, project.id, project.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {project.images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex[project.id] ? "w-6 bg-white" : "w-1.5 bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-8 space-y-4">
                    <p
                      className="text-xs uppercase tracking-[0.25em] font-light"
                      style={{ color: "rgb(100, 180, 255)" }}
                    >
                      {project.category}
                    </p>
                    <GlitchText triggerOnHover>
                      <h3 className="text-2xl font-bold tracking-tight text-white">{project.title}</h3>
                    </GlitchText>
                    <p className="text-sm font-light text-gray-400 leading-loose tracking-wide">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
