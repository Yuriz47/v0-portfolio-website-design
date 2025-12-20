"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  angle: number
  radius: number
  baseRadius: number
  speed: number
  size: number
  opacity: number
  hue: number
  layer: number
}

export function EnergyRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const timeRef = useRef(0)
  const rafRef = useRef<number>()

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !dimensions.width) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // 初始化粒子环系统
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 200
      const layers = 3

      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < particleCount / layers; i++) {
          const angle = (Math.PI * 2 * i) / (particleCount / layers)
          const baseRadius = 280 + layer * 60
          const speed = 0.0003 + layer * 0.0002
          const size = 1.5 + Math.random() * 2 + layer * 0.5
          const hue = 180 + Math.random() * 40

          particlesRef.current.push({
            angle,
            radius: baseRadius,
            baseRadius,
            speed,
            size,
            opacity: 0.3 + Math.random() * 0.4 + layer * 0.1,
            hue,
            layer,
          })
        }
      }
    }

    initParticles()

    // 鼠标移动处理
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // 渲染循环
    const render = (timestamp: number) => {
      const deltaTime = timestamp - timeRef.current
      timeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // 绘制粒子
      particlesRef.current.forEach((particle) => {
        // 更新角度 - 基于时间的平滑循环
        particle.angle += particle.speed * deltaTime

        // 计算位置
        let x = centerX + Math.cos(particle.angle) * particle.radius
        let y = centerY + Math.sin(particle.angle) * particle.radius

        // 鼠标交互 - 轻微弯曲光场
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - x
          const dy = mouseRef.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.3
            x += dx * force * 0.1
            y += dy * force * 0.1
          }
        }

        // 有机运动 - 添加低频噪声
        const noiseX = Math.sin(particle.angle * 2 + timestamp * 0.0005) * 3
        const noiseY = Math.cos(particle.angle * 3 + timestamp * 0.0004) * 3
        x += noiseX
        y += noiseY

        // 绘制粒子核心
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 4)
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`)
        gradient.addColorStop(0.4, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.6})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // 绘制核心亮点
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${particle.opacity * 1.2})`
        ctx.beginPath()
        ctx.arc(x, y, particle.size * 0.8, 0, Math.PI * 2)
        ctx.fill()
      })

      // 绘制连接线 - 创造能量流动感
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < particlesRef.current.length; i += 3) {
        const p1 = particlesRef.current[i]
        const p2 = particlesRef.current[(i + 1) % particlesRef.current.length]

        if (p1.layer === p2.layer) {
          const x1 = centerX + Math.cos(p1.angle) * p1.radius
          const y1 = centerY + Math.sin(p1.angle) * p1.radius
          const x2 = centerX + Math.cos(p2.angle) * p2.radius
          const y2 = centerY + Math.sin(p2.angle) * p2.radius

          ctx.strokeStyle = `hsla(${p1.hue}, 100%, 60%, ${p1.opacity * 0.15})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }
      ctx.globalCompositeOperation = "source-over"

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: "screen",
        opacity: 0.6,
      }}
    />
  )
}
