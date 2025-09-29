"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"

interface UserDetailsFormProps {
  onSubmit: (details: { name: string }) => Promise<void>
  isLoading: boolean
}

export default function UserDetailsForm({ onSubmit, isLoading }: UserDetailsFormProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long")
      return
    }

    try {
      setError("")
      await onSubmit({ name: name.trim() })
    } catch (error: any) {
      setError(error.message || "Failed to update user details")
    }
  }

  return (
    <motion.div
      className={`rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden ${
        theme === "dark" ? "bg-gray-900/70 border border-gray-800" : "bg-white border border-gray-200"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === "dark" ? "bg-gray-800" : "bg-violet-100"
            }`}
          >
            <User className={`w-8 h-8 ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`} />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            Complete Your Profile
          </h1>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Tell us a bit about yourself to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                className={`w-full px-4 py-3 rounded-xl pl-12 ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                    : "bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                } transition-colors ${error ? "border-red-500" : ""}`}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
                autoFocus
              />
              <User
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === "dark" ? "text-violet-400" : "text-violet-500"
                }`}
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="w-full relative py-3 rounded-xl font-medium text-white shadow-lg overflow-hidden disabled:opacity-50"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {/* Button background with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500"></div>

            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
              }}
            />

            {/* Button content */}
            <div className="relative flex items-center justify-center">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </motion.div>
              ) : (
                <span className="flex items-center justify-center">
                  Complete Setup
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </span>
              )}
            </div>
          </motion.button>
        </form>
      </div>

      <div
        className={`px-8 py-4 ${theme === "dark" ? "bg-gray-800/70 border-t border-gray-700" : "bg-gray-50 border-t border-gray-200"}`}
      >
        <p className={`text-xs text-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          This information helps us personalize your experience
        </p>
      </div>
    </motion.div>
  )
}
