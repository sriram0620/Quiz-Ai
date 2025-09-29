"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const topics = [
  { name: "Wellness", icon: "🧘" },
  { name: "Tech Trends", icon: "💻" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "📚" },
  { name: "Mathematics", icon: "🔢" },
  { name: "Literature", icon: "📖" },
  { name: "Geography", icon: "🌍" },
  { name: "Psychology", icon: "🧠" },
  { name: "Business", icon: "💼" },
  { name: "Art & Culture", icon: "🎨" },
]

export function BrandCarousel() {
  useTheme()

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {/* First set of topics */}
        {topics.map((topic, index) => (
          <div
            key={`topic-1-${index}`}
            className="flex items-center justify-center min-w-[140px] h-10 glass-card rounded-md px-4 py-2 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{topic.icon}</span>
              <span className="text-white text-sm font-medium">{topic.name}</span>
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless looping */}
        {topics.map((topic, index) => (
          <div
            key={`topic-2-${index}`}
            className="flex items-center justify-center min-w-[140px] h-10 glass-card rounded-md px-4 py-2 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{topic.icon}</span>
              <span className="text-white text-sm font-medium">{topic.name}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
