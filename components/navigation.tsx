"use client"

import { useState, useEffect } from "react"

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`${
          scrolled ? "bg-[rgba(10,10,15,0.95)]" : "bg-[rgba(10,10,15,0.8)]"
        } backdrop-blur-xl transition-all duration-300 border-b border-[rgba(100,180,255,0.1)]`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-wider text-white">Portfolio</div>

          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light tracking-wider text-gray-400 hover:text-[rgb(100,180,255)] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
