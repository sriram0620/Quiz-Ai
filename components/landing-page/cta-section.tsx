"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section id="contact" ref={ref} className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-50 via-white to-indigo-50 dark:from-violet-900/20 dark:via-gray-900 dark:to-indigo-900/20 opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-100 dark:bg-violet-900/30 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/30 rounded-full filter blur-[100px] opacity-30 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.8,
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-px rounded-full">
              <div className="bg-white dark:bg-gray-900 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-violet-600 dark:text-violet-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400"
          >
            Start Your Learning Journey Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-10"
          >
            Generate personalized quizzes, test your knowledge, and get AI-powered feedback to accelerate your learning
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/quiz">
                <Button className="premium-button text-white px-8 py-6 rounded-full font-medium transition-all duration-300 text-lg h-auto">
                  Start Learning Now
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/quiz">
                <Button
                  variant="outline"
                  className="border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 hover:bg-violet-600/5 dark:hover:bg-violet-400/10 px-8 py-6 rounded-full font-medium transition-all duration-300 text-lg h-auto bg-transparent"
                >
                  Try Sample Quiz
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-gray-500 dark:text-gray-400 mt-16 text-lg"
          >
            The smart way to learn and test your knowledge with AI-powered quizzes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
