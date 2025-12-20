"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

interface MagneticButtonProps {
  onClick: () => void
}

export function MagneticButton({ onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const animationRef = useRef<number>()
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      life: number
      maxLife: number
      color: string
    }>
  >([])

  // 磁吸效果
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // 磁吸距离限制为按钮尺寸的20%
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = rect.width * 0.2
    const strength = Math.min(distance / maxDistance, 1)

    const moveX = (x / rect.width) * maxDistance * strength
    const moveY = (y / rect.height) * maxDistance * strength

    buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = "translate(0, 0)"
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  // 粒子系统
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isHovered) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2
      const distance = 80 + Math.random() * 40
      const x = canvas.width / 2 + Math.cos(angle) * distance
      const y = canvas.height / 2 + Math.sin(angle) * distance

      particlesRef.current.push({
        x,
        y,
        size: 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 60 + Math.random() * 60,
        color: Math.random() > 0.5 ? "rgba(100, 180, 255," : "rgba(160, 120, 255,",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 每帧创建新粒子
      if (Math.random() < 0.1 && particlesRef.current.length < 15) {
        createParticle()
      }

      // 更新和绘制粒子
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.life++

        // 粒子向中心微弱吸引
        const dx = canvas.width / 2 - particle.x
        const dy = canvas.height / 2 - particle.y
        particle.speedX += dx * 0.0001
        particle.speedY += dy * 0.0001

        const lifeProgress = particle.life / particle.maxLife
        const opacity = Math.sin(lifeProgress * Math.PI) * 0.4

        // 绘制发光效果
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `${particle.color}${opacity})`)
        gradient.addColorStop(0.5, `${particle.color}${opacity * 0.3})`)
        gradient.addColorStop(1, `${particle.color}0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        return particle.life < particle.maxLife
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      particlesRef.current = []
    }
  }, [isHovered])

  return (
    <div className="relative inline-block">
      {/* 粒子Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: "200%",
          height: "200%",
          left: "-50%",
          top: "-50%",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* 按钮 */}
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="relative group px-10 py-4 rounded-full text-base font-medium tracking-wide overflow-hidden"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(100, 180, 255, 0.2), rgba(160, 120, 255, 0.2))"
            : "rgba(20, 20, 30, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: isHovered ? "rgba(100, 180, 255, 0.4)" : "rgba(100, 180, 255, 0.2)",
          boxShadow: isHovered
            ? "0 0 40px rgba(100, 180, 255, 0.3), 0 0 80px rgba(160, 120, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
            : "0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
          transform: isPressed ? "scale(0.96)" : "scale(1)",
          transition:
            "background 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          color: "white",
        }}
      >
        {/* 内部发光层 */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(100, 180, 255, 0.15), transparent 70%)",
          }}
        />

        {/* 文字和图标 */}
        <span className="relative z-10 flex items-center gap-3">
          <span
            className="transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? "translateX(-2px)" : "translateX(0)",
            }}
          >
            查看作品
          </span>
          <ArrowRight
            className="w-5 h-5 transition-all duration-300 ease-out"
            style={{
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
              opacity: isHovered ? 1 : 0.7,
            }}
          />
        </span>

        {/* 流动光效 */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            transform: "translateX(-100%)",
            animation: isHovered ? "shimmer 2s ease-in-out infinite" : "none",
          }}
        />
      </button>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  )
}
