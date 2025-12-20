"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  z: number
  baseX: number
  baseY: number
  vx: number // velocity X
  vy: number // velocity Y
  radius: number
  opacity: number
  baseOpacity: number
  color: { r: number; g: number; b: number }
  phase: number
  cycleSpeed: number
  noiseOffsetX: number
  noiseOffsetY: number
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

function simpleNoise(x: number, y: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const u = fade(xf)
  const v = fade(yf)

  const a = (X + Y * 57) % 256
  const b = (X + 1 + Y * 57) % 256
  const c = (X + (Y + 1) * 57) % 256
  const d = (X + 1 + (Y + 1) * 57) % 256

  const grad = (hash: number) => (hash % 2 === 0 ? 1 : -1) * ((hash % 4) / 4)

  return lerp(v, lerp(u, grad(a), grad(b)), lerp(u, grad(c), grad(d)))
}

export function NeonParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const mouseRef = useRef({ x: 0, y: 0, isInHero: false })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    const particleCount = 60
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const baseX = Math.random() * canvas.width
      const baseY = Math.random() * canvas.height

      const isCyan = Math.random() > 0.5
      const color = isCyan
        ? { r: 120, g: 220, b: 255 } // 更亮的青色
        : { r: 200, g: 160, b: 255 } // 更亮的紫色

      return {
        x: baseX,
        y: baseY,
        z: Math.random() * 500 + 100,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        radius: Math.random() * 3 + 2, // 稍大的基础半径
        opacity: 0,
        baseOpacity: Math.random() * 0.2 + 0.15, // 降低基础透明度但会有更强bloom
        color,
        phase: Math.random() * Math.PI * 2,
        cycleSpeed: 0.00002 + Math.random() * 0.00001,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        mouseRef.current.isInHero = e.clientY <= rect.bottom && e.clientY >= rect.top
        mouseRef.current.x = e.clientX
        mouseRef.current.y = e.clientY
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

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

      const now = Date.now()
      const deltaTime = (now - lastTimeRef.current) / 1000 // 转换为秒
      lastTimeRef.current = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      timeRef.current += deltaTime * 1000 // 保持时间累计

      particlesRef.current.forEach((particle) => {
        const time = timeRef.current * particle.cycleSpeed + particle.phase

        // 低频噪声运动（有机漂移）
        const noiseTime = timeRef.current * 0.00008
        const noiseX = simpleNoise(particle.noiseOffsetX + noiseTime, particle.noiseOffsetY) * 60
        const noiseY = simpleNoise(particle.noiseOffsetY + noiseTime, particle.noiseOffsetX) * 60

        // 长周期循环运动
        const cyclePosX = Math.sin(time) * 100
        const cyclePosY = Math.cos(time * 0.8) * 100

        // 目标位置
        const targetX = particle.baseX + cyclePosX + noiseX
        const targetY = particle.baseY + cyclePosY + noiseY

        if (mouseRef.current.isInHero) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // 吸引半径：200px，力度随距离递减
          const attractionRadius = 200
          if (distance < attractionRadius && distance > 0) {
            const force = (1 - distance / attractionRadius) * 0.15 // 非常温和的力度
            const forceX = (dx / distance) * force
            const forceY = (dy / distance) * force

            // 施加力到速度
            particle.vx += forceX
            particle.vy += forceY
          }
        }

        const damping = 0.92
        particle.vx *= damping
        particle.vy *= damping

        const lerpFactor = 0.03 // 非常慢的插值速度
        particle.x = lerp(particle.x, targetX, lerpFactor) + particle.vx
        particle.y = lerp(particle.y, targetY, lerpFactor) + particle.vy

        // Z轴循环
        particle.z = 300 + Math.sin(time * 0.5) * 200

        // 透明度循环（无缝淡入淡出）
        const fadeTime = timeRef.current * particle.cycleSpeed * 2 + particle.phase
        const fadeCycle = (Math.sin(fadeTime) + 1) / 2
        particle.opacity = particle.baseOpacity * fadeCycle

        // 边界处理：平滑循环
        if (particle.x < -100) particle.baseX += canvas.width + 200
        if (particle.x > canvas.width + 100) particle.baseX -= canvas.width + 200
        if (particle.y < -100) particle.baseY += canvas.height + 200
        if (particle.y > canvas.height + 100) particle.baseY -= canvas.height + 200

        // 3D深度缩放
        const scale = 1000 / (1000 + particle.z)
        const displayRadius = particle.radius * scale
        // 根据深度调整透明度：前景粒子(z小)更亮，背景粒子更弥散
        const depthFactor = particle.z < 300 ? 1.3 : 0.9
        const displayOpacity = particle.opacity * scale * depthFactor

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, displayRadius * 12)

        gradient.addColorStop(
          0,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${displayOpacity * 1.0})`,
        )
        gradient.addColorStop(
          0.2,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${displayOpacity * 0.7})`,
        )
        gradient.addColorStop(
          0.5,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${displayOpacity * 0.3})`,
        )
        gradient.addColorStop(
          0.8,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${displayOpacity * 0.1})`,
        )
        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, displayRadius * 12, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        const coreGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          displayRadius * 3.5,
        )

        // 白色核心更强，模拟HDR发光
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${displayOpacity * 1.2})`)
        coreGradient.addColorStop(
          0.3,
          `rgba(${particle.color.r + 30}, ${particle.color.g + 30}, ${particle.color.b}, ${displayOpacity * 0.9})`,
        )
        coreGradient.addColorStop(
          0.7,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${displayOpacity * 0.5})`,
        )
        coreGradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, displayRadius * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = coreGradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isVisible) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
