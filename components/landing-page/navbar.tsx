"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Brain, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 30)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80 // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-screen-xl box-border z-[1000] 
        bg-gradient-to-br from-[#0f0a1c] to-[#090637] dark:from-gray-900/95 dark:to-gray-800/95 
        backdrop-blur-lg rounded-full px-8 py-3 flex items-center justify-between 
        text-white dark:text-gray-100 shadow-[0_0_25px_#2e0a84] dark:shadow-[0_0_25px_rgba(59,130,246,0.3)]
        transition-all duration-300 ease-out hover:border-[#2e0a84] dark:hover:border-blue-500/50 
        hover:shadow-[0_0_35px_#2e0a84] dark:hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]
        hover:scale-[1.02] hover:backdrop-blur-xl
        ${isScrolled ? "border border-[#2e0a84] dark:border-blue-500/30 shadow-[0_0_30px_#2e0a84] dark:shadow-[0_0_30px_rgba(59,130,246,0.4)]" : "border border-transparent"}
        ${isMobileMenuOpen ? "rounded-2xl" : "rounded-full"}
        navbar-light navbar-fixed`}
      style={{ position: 'fixed' }}
    >
      <div className="flex items-center group">
        <Brain className="w-8 h-8 text-gray-400 dark:text-gray-300 mr-2 transition-all duration-300 
          group-hover:text-violet-400 dark:group-hover:text-blue-400 group-hover:scale-110 
          group-hover:rotate-12 group-hover:drop-shadow-lg navbar-icon" />
        <span className="text-xl font-bold transition-all duration-300 group-hover:text-violet-300 dark:group-hover:text-blue-300
          text-white dark:text-gray-100">
          QuizAI
        </span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
        <li className="group">
          <button
            onClick={() => scrollToSection('home')}
            className="relative text-violet-300 dark:text-blue-300 hover:text-violet-200 dark:hover:text-blue-200 
              transition-all duration-300 hover:scale-105 group-hover:drop-shadow-lg
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
              before:bg-violet-300 dark:before:bg-blue-300 before:transition-all before:duration-300
              hover:before:w-full navbar-link cursor-pointer"
          >
            Home
          </button>
        </li>
        <li className="group">
          <button 
            onClick={() => scrollToSection('features')}
            className="relative hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
              hover:scale-105 group-hover:drop-shadow-lg
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
              before:bg-violet-300 dark:before:bg-blue-300 before:transition-all before:duration-300
              hover:before:w-full navbar-link cursor-pointer"
          >
            Features
          </button>
        </li>
        <li className="group">
          <Link 
            href="/quiz" 
            className="relative hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
              hover:scale-105 group-hover:drop-shadow-lg
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
              before:bg-violet-300 dark:before:bg-blue-300 before:transition-all before:duration-300
              hover:before:w-full navbar-link"
          >
            Take Quiz
          </Link>
        </li>
        <li className="group">
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="relative hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
              hover:scale-105 group-hover:drop-shadow-lg
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
              before:bg-violet-300 dark:before:bg-blue-300 before:transition-all before:duration-300
              hover:before:w-full navbar-link cursor-pointer"
          >
            Testimonials
          </button>
        </li>
        <li className="group">
          <button 
            onClick={() => scrollToSection('about')}
            className="relative hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
              hover:scale-105 group-hover:drop-shadow-lg
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
              before:bg-violet-300 dark:before:bg-blue-300 before:transition-all before:duration-300
              hover:before:w-full navbar-link cursor-pointer"
          >
            About
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="theme-toggle">
          <ThemeToggle />
        </div>
        <Link
          href="/quiz"
          className="group relative bg-black dark:bg-gray-700 px-5 py-2 rounded-full text-sm font-semibold 
            border border-white/20 dark:border-gray-600 
            shadow-[0_0_10px_rgba(255,255,255,0.1)] dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]
            hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
            hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300
            hover:scale-105 hover:border-violet-400 dark:hover:border-blue-400
            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
            before:from-violet-500/20 before:to-blue-500/20 before:opacity-0 
            before:transition-opacity before:duration-300 hover:before:opacity-100
            overflow-hidden navbar-button"
        >
          <span className="relative z-10">Start Quiz</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-400 dark:text-gray-300 navbar-icon" />
          ) : (
            <Menu className="w-6 h-6 text-gray-400 dark:text-gray-300 navbar-icon" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-[#0f0a1c] to-[#090637] 
          dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-lg rounded-2xl border border-white/20 
          dark:border-gray-600 shadow-lg animate-in slide-in-from-top-2 duration-300">
          <ul className="flex flex-col gap-4 p-6">
            <li>
              <button
                onClick={() => scrollToSection('home')}
                className="block text-violet-300 dark:text-blue-300 hover:text-violet-200 dark:hover:text-blue-200 
                  transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/10 navbar-link cursor-pointer w-full text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('features')}
                className="block hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
                  py-2 px-4 rounded-lg hover:bg-white/10 navbar-link cursor-pointer w-full text-left"
              >
                Features
              </button>
            </li>
            <li>
              <Link 
                href="/quiz" 
                className="block hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
                  py-2 px-4 rounded-lg hover:bg-white/10 navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Take Quiz
              </Link>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
                  py-2 px-4 rounded-lg hover:bg-white/10 navbar-link cursor-pointer w-full text-left"
              >
                Testimonials
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="block hover:text-violet-300 dark:hover:text-blue-300 transition-all duration-300 
                  py-2 px-4 rounded-lg hover:bg-white/10 navbar-link cursor-pointer w-full text-left"
              >
                About
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
