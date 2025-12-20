"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateSize = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        canvas.width = heroSection.offsetWidth / 3
        canvas.height = heroSection.offsetHeight
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    const particleCount = 18
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: -(Math.random() * 0.5 + 0.3),
      radius: Math.random() * 4 + 2,
      opacity: Math.random() * 0.04 + 0.08,
    }))

    const handleScroll = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom > 0)
      }
    }
    window.addEventListener("scroll", handleScroll)

    const animate = () => {
      if (!isVisible) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = undefined
        }
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.y < -particle.radius) {
          particle.y = canvas.height + particle.radius
          particle.x = Math.random() * canvas.width
        }
        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 180, 255, ${particle.opacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isVisible) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("scroll", handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  if (!isVisible) return null

  return <canvas ref={canvasRef} className="absolute top-0 right-0 w-1/3 h-full pointer-events-none" />
}
