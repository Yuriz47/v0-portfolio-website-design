"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { ArrowDown } from "lucide-react"

function FloatingOrb({ size, color, initialX, initialY, speed }: {
  size: number
  color: string
  initialX: string
  initialY: string
  speed: number
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: initialX,
        top: initialY,
        animation: `heroFloat ${speed}s ease-in-out infinite`,
        boxShadow: color === "#ffffff"
          ? "0 0 20px rgba(255,255,255,0.3)"
          : "0 0 30px rgba(30,60,255,0.4)",
      }}
    />
  )
}

function DiagonalLine({ x, y, rotation, length }: {
  x: string
  y: string
  rotation: number
  length: number
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: length,
        height: 3,
        background: "#1A3CFF",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        borderRadius: 2,
      }}
    />
  )
}

export function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!titleRef.current) return
    const rect = titleRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  // Generate 3D stacked text layers
  const layers = 8
  const layerElements = Array.from({ length: layers }, (_, i) => {
    const offset = (layers - i) * 2.5
    const progress = i / layers
    // gradient: top is blue, bottom fades to white/transparent
    const opacity = 0.12 + progress * 0.08
    return (
      <span
        key={i}
        className="absolute inset-0 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          transform: `translate(${offset}px, ${offset}px)`,
          WebkitTextStroke: "1.5px rgba(20, 30, 80, " + opacity + ")",
          color: "transparent",
        }}
      >
        PORTFOLIO
      </span>
    )
  })

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient: blue corners fading to white center */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(30, 60, 255, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(30, 60, 255, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 0%, rgba(80, 120, 255, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 0% 100%, rgba(80, 120, 255, 0.15) 0%, transparent 40%),
            linear-gradient(180deg, #e8ecff 0%, #ffffff 50%, #dce3ff 100%)
          `,
        }}
      />

      {/* Perspective grid */}
      <div className="hero-perspective-grid" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Floating geometric orbs */}
      <FloatingOrb size={40} color="#1A3CFF" initialX="12%" initialY="25%" speed={14} />
      <FloatingOrb size={24} color="#ffffff" initialX="28%" initialY="12%" speed={18} />
      <FloatingOrb size={50} color="#1A3CFF" initialX="82%" initialY="18%" speed={16} />
      <FloatingOrb size={18} color="#ffffff" initialX="75%" initialY="38%" speed={20} />
      <FloatingOrb size={36} color="#1A3CFF" initialX="8%" initialY="78%" speed={15} />
      <FloatingOrb size={22} color="#ffffff" initialX="88%" initialY="72%" speed={19} />
      <FloatingOrb size={14} color="rgba(30,60,255,0.5)" initialX="60%" initialY="8%" speed={22} />

      {/* Crosshair decorations */}
      <div className="absolute pointer-events-none" style={{ right: "15%", top: "15%" }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="rgba(30,60,255,0.3)" strokeWidth="1" />
          <line x1="16" y1="2" x2="16" y2="8" stroke="rgba(30,60,255,0.3)" strokeWidth="1" />
          <line x1="16" y1="24" x2="16" y2="30" stroke="rgba(30,60,255,0.3)" strokeWidth="1" />
          <line x1="2" y1="16" x2="8" y2="16" stroke="rgba(30,60,255,0.3)" strokeWidth="1" />
          <line x1="24" y1="16" x2="30" y2="16" stroke="rgba(30,60,255,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* Diagonal lines */}
      <DiagonalLine x="22%" y="10%" rotation={-45} length={60} />
      <DiagonalLine x="78%" y="15%" rotation={-45} length={45} />
      <DiagonalLine x="5%" y="72%" rotation={-45} length={55} />

      {/* Faint arc in top left */}
      <div className="absolute pointer-events-none" style={{ left: "15%", top: "20%" }}>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.08 }}>
          <circle cx="100" cy="100" r="90" stroke="#1A3CFF" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center w-full px-6">
        <div className="max-w-6xl mx-auto">
          {/* 3D Stacked PORTFOLIO title */}
          <div
            ref={titleRef}
            className="relative inline-block cursor-default mb-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: isHovered
                ? `perspective(1000px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
          >
            <h1
              className="hero-title-3d relative font-black leading-none select-none"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 10rem)",
                letterSpacing: "-0.02em",
                background: "linear-gradient(180deg, #0a0f2e 0%, #1A3CFF 40%, #8ea0ff 70%, #e0e6ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {/* Stacked outline layers behind */}
              {layerElements}
              {/* Front text */}
              <span className="relative z-10">PORTFOLIO</span>
            </h1>

            {/* Hover glitch flash */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 30%, rgba(30,60,255,0.05) 50%, transparent 70%)",
                  animation: "heroGlitchFlash 0.15s ease-out",
                }}
              />
            )}
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-2xl tracking-[0.15em] font-light mb-16"
            style={{ color: "#2a2a3a" }}
          >
            UI DESIGN & IP DESIGN & BRAND DESIGN
          </p>

          {/* Scroll button */}
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider transition-all duration-300"
            style={{
              background: "rgba(30, 60, 255, 0.08)",
              border: "1px solid rgba(30, 60, 255, 0.2)",
              color: "#1A3CFF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(30, 60, 255, 0.15)"
              e.currentTarget.style.borderColor = "rgba(30, 60, 255, 0.4)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(30, 60, 255, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(30, 60, 255, 0.08)"
              e.currentTarget.style.borderColor = "rgba(30, 60, 255, 0.2)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <span>EXPLORE WORKS</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          {/* Contact info at bottom */}
          <div className="mt-20 flex items-center justify-center gap-12 text-sm tracking-wider" style={{ color: "#5a5a7a" }}>
            <span className="font-light">{'Wechat: Yuriz0410'}</span>
            <span className="font-light">{'Email: u202410465@hust.edu.cn'}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#1A3CFF] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
