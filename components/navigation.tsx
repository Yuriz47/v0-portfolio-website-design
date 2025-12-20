"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "联系", href: "#contact" },
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
          scrolled ? "glass-card" : "bg-transparent"
        } transition-all duration-300 border-b border-[rgba(100,180,255,0.1)]`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-wider text-white">Portfolio</div>

          <div className="hidden md:flex items-center gap-10">
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

          <Button
            className="bg-gradient-to-r from-[rgb(100,180,255)] to-[rgb(160,120,255)] hover:shadow-lg hover:shadow-[rgba(100,180,255,0.4)] text-white transition-all duration-300 font-medium tracking-wide"
            size="sm"
          >
            联系我
          </Button>
        </div>
      </div>
    </nav>
  )
}
