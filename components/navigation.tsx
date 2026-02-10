"use client"

import { useState, useEffect } from "react"

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isInHero, setIsInHero] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const heroEl = document.getElementById("hero")
      if (heroEl) {
        setIsInHero(window.scrollY < heroEl.offsetHeight - 100)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(8, 10, 20, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(60, 100, 255, 0.12)"
            : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="text-xl font-bold tracking-wider transition-colors duration-500"
            style={{ color: "#ffffff" }}
          >
            Yuriz
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light tracking-wider transition-colors duration-500"
                style={{ color: "rgba(160, 180, 220, 0.7)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(100, 160, 255, 1)" }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(160, 180, 220, 0.7)" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="w-20" />
        </div>
      </div>
    </nav>
  )
}
