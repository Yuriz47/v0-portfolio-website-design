"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  triggerOnHover?: boolean
  triggerOnScroll?: boolean
}

export function GlitchText({
  children,
  className = "",
  triggerOnHover = false,
  triggerOnScroll = true,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const triggerGlitch = () => {
    if (isGlitching) return

    setIsGlitching(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // 短暂的故障效果，200-400ms
    const duration = 200 + Math.random() * 200
    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
    }, duration)
  }

  useEffect(() => {
    if (!triggerOnScroll || !elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口时触发一次故障效果
            setTimeout(() => {
              triggerGlitch()
            }, Math.random() * 500)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [triggerOnScroll])

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      triggerGlitch()
    }
  }

  return (
    <div
      ref={elementRef}
      className={`glitch-container ${className}`}
      onMouseEnter={handleMouseEnter}
      data-glitch={isGlitching}
    >
      <span className={`glitch-text ${isGlitching ? "glitching" : ""}`}>{children}</span>
    </div>
  )
}
