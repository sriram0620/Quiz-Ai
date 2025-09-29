"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Brain } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-screen-xl box-border z-[1000] 
        bg-gradient-to-br from-[#0f0a1c] to-[#090637] dark:from-gray-900/95 dark:to-gray-800/95 
        backdrop-blur-lg rounded-full px-8 py-3 flex items-center justify-between 
        text-white dark:text-gray-100 shadow-[0_0_25px_#2e0a84] dark:shadow-[0_0_25px_rgba(59,130,246,0.3)]
        transition-all duration-300 hover:border-[#2e0a84] dark:hover:border-blue-500/50 
        ${isScrolled ? "border border-[#2e0a84] dark:border-blue-500/30" : "border border-transparent"}`}
    >
      <div className="flex items-center">
        <Brain className="w-8 h-8 text-violet-400 dark:text-blue-400 mr-2" />
        <span className="text-xl font-bold">QuizAI</span>
      </div>

      {/* Navigation */}
      <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
        <li>
          <Link
            href="/"
            className="text-yellow-400 dark:text-yellow-300 hover:text-yellow-300 dark:hover:text-yellow-200 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link href="/topics" className="hover:text-violet-300 dark:hover:text-blue-300 transition-colors">
            Topics
          </Link>
        </li>
        <li>
          <Link href="/quiz" className="hover:text-violet-300 dark:hover:text-blue-300 transition-colors">
            Take Quiz
          </Link>
        </li>
        <li>
          <Link href="/results" className="hover:text-violet-300 dark:hover:text-blue-300 transition-colors">
            Results
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-violet-300 dark:hover:text-blue-300 transition-colors">
            About
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/quiz"
          className="bg-black dark:bg-gray-700 px-5 py-2 rounded-full text-sm font-semibold 
            border border-white/20 dark:border-gray-600 
            shadow-[0_0_10px_rgba(255,255,255,0.1)] dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]
            hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
            hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300"
        >
          Start Quiz
        </Link>
      </div>
    </nav>
  )
}
