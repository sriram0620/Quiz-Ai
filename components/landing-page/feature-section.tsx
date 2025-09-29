"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, Brain, Target, BarChart3, Zap } from "lucide-react"

export function FeatureSection() {
  const [ref1, inView1] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [ref2, inView2] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [ref3, inView3] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [ref4, inView4] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8,
      },
    },
  }

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/5 rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref1}
          variants={fadeInUp}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AI-Powered Learning
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Master Any{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
              Topic
            </span>
            <br />
            with Smart Quizzes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate personalized quizzes on any topic. Test your knowledge with AI-generated questions and get instant
            feedback. Learn smarter, not harder!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            ref={ref2}
            variants={fadeInUp}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-violet-500"></div>
                <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">Wellness</span>
                <div className="ml-2 px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs rounded-full">
                  Health & Fitness
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-violet-500"></div>
                <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">Tech Trends</span>
                <div className="ml-2 px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs rounded-full">
                  AI & Innovation
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-violet-500"></div>
                <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">Science</span>
                <div className="ml-2 px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs rounded-full">
                  Biology & Physics
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Topic Selection
              <br />
              Choose Your Focus
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Select from diverse topics or create custom categories. Our AI understands context and generates relevant
              questions that match your learning goals and difficulty preferences.
            </p>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Diverse topic categories</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Check className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Custom difficulty levels</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Check className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Personalized recommendations</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref3}
            variants={fadeInUp}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <div className="relative w-full h-32 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Brain className="h-8 w-8 text-violet-600 dark:text-violet-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">AI Generating Questions...</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Generation Progress</span>
                      <span className="text-sm font-medium text-violet-600 dark:text-violet-400">5/5 Questions</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-violet-500 to-violet-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView3 ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Multiple Choice Questions</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Correct Answer Flagging</span>
                </div>

                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Difficulty Assessment</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              Watch as AI creates 5 tailored multiple-choice questions with correct answers. Our smart system ensures
              each question is relevant, challenging, and educational.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
            }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interactive Quiz Experience</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Navigate through questions with intuitive controls. Track your progress with a visual progress bar and
              review your answers before submission.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">QUESTION 3 OF 5</div>
                <div className="text-xs text-violet-600 dark:text-violet-400">60% COMPLETE</div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
                <div className="bg-violet-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>

              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                What is the primary benefit of AI in education?
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400 p-2 bg-white dark:bg-gray-600 rounded">
                  A) Personalized learning experiences
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 p-2 bg-violet-100 dark:bg-violet-900/30 rounded border border-violet-300">
                  B) Automated grading systems ✓
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref4}
            initial={{ opacity: 0, y: 60 }}
            animate={inView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
            }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Feedback
              <br />
              Personalized Results
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Receive detailed, AI-generated feedback based on your performance. Get insights into your strengths and
              areas for improvement with personalized recommendations.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">QUIZ COMPLETED</div>
                <div className="text-xs text-green-600 dark:text-green-400">SCORE: 4/5 (80%)</div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Excellent Performance!</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Strong understanding of core concepts</div>
                </div>
              </div>

              <div className="mt-3 p-2 bg-white dark:bg-gray-600 rounded text-xs text-gray-600 dark:text-gray-300">
                "You demonstrated solid knowledge in AI applications. Consider reviewing machine learning fundamentals
                for even better results."
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
