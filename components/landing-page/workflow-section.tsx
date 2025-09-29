"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { Check, Brain, Target, BarChart3, Zap, BookOpen, Trophy } from "lucide-react"

export function WorkflowSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeStep, setActiveStep] = useState<string>("topic")
  const [activeFeature, setActiveFeature] = useState<string>("adaptive")

  const quizSteps = [
    { id: "topic", name: "Topic Selection", icon: <BookOpen className="h-5 w-5" /> },
    { id: "generate", name: "AI Generation", icon: <Brain className="h-5 w-5" /> },
    { id: "quiz", name: "Interactive Quiz", icon: <Target className="h-5 w-5" /> },
    { id: "feedback", name: "Smart Feedback", icon: <Trophy className="h-5 w-5" /> },
  ]

  const stepDetails = {
    topic: {
      title: "Choose Your Topic",
      description:
        "Select from diverse categories like Wellness, Tech Trends, Science, or create custom topics. Set your preferred difficulty level and question count.",
      features: [
        "Pre-defined topic categories",
        "Custom topic creation",
        "Difficulty level selection",
        "Question count preferences",
      ],
    },
    generate: {
      title: "AI Question Generation",
      description:
        "Watch as our AI creates 5 tailored multiple-choice questions with correct answers. Each question is contextually relevant and educationally valuable.",
      features: ["Smart question creation", "Multiple choice format", "Correct answer flagging", "Context awareness"],
    },
    quiz: {
      title: "Interactive Quiz Experience",
      description:
        "Navigate through questions with intuitive controls. Track progress with a visual progress bar and review answers before submission.",
      features: ["Question navigation", "Progress tracking", "Answer review", "Intuitive interface"],
    },
    feedback: {
      title: "Personalized Feedback",
      description:
        "Receive detailed AI-generated feedback based on your performance. Get insights into strengths and improvement areas with custom recommendations.",
      features: ["Performance analysis", "Personalized insights", "Learning recommendations", "Score breakdown"],
    },
  }

  const learningFeatures = [
    {
      id: "adaptive",
      title: "Adaptive Learning",
      description:
        "Our AI adapts to your learning style and pace, creating questions that challenge you appropriately while building confidence.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      id: "analytics",
      title: "Learning Analytics",
      description:
        "Track your progress across topics with detailed analytics. See improvement trends and identify knowledge gaps.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      id: "instant",
      title: "Instant Results",
      description: "Get immediate feedback after each quiz with explanations and suggestions for further learning.",
      icon: <Zap className="h-6 w-6" />,
    },
  ]

  const topicProgress = [
    { topic: "Wellness", progress: 85, questions: 45 },
    { topic: "Tech Trends", progress: 72, questions: 38 },
    { topic: "Science", progress: 91, questions: 52 },
    { topic: "History", progress: 64, questions: 29 },
    { topic: "Literature", progress: 78, questions: 41 },
    { topic: "Mathematics", progress: 88, questions: 47 },
  ]

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Smart Quiz Workflow</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Experience the complete learning journey from topic selection to personalized feedback.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4-Step Learning Process
              <br />
              Powered by AI
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Follow our streamlined process from topic selection to personalized feedback, designed for optimal
              learning outcomes.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {quizSteps.map((step) => (
                <motion.button
                  key={step.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(step.id)}
                  className={`bg-white dark:bg-gray-700 rounded-lg p-3 text-center shadow-sm transition-all duration-300 ${
                    activeStep === step.id
                      ? "ring-2 ring-violet-500 dark:ring-violet-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <div
                    className={`h-10 w-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                      activeStep === step.id
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      activeStep === step.id
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {step.name}
                  </p>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                {stepDetails[activeStep as keyof typeof stepDetails].title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {stepDetails[activeStep as keyof typeof stepDetails].description}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {stepDetails[activeStep as keyof typeof stepDetails].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Personalized Learning
              <br />
              Track Your Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Monitor your learning journey across different topics with detailed analytics and adaptive
              recommendations.
            </p>

            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm mb-6">
              <div className="space-y-3 mb-4">
                {topicProgress.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 text-xs font-bold">
                        {item.topic.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.topic}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.questions} questions completed
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-violet-600 dark:text-violet-400">{item.progress}%</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 mb-4">
                {learningFeatures.map((feature) => (
                  <motion.button
                    key={feature.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                      activeFeature === feature.id
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
                    }`}
                  >
                    <span className="w-4 h-4">{feature.icon}</span>
                    <span>{feature.title}</span>
                  </motion.button>
                ))}
              </div>

              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {learningFeatures.find((f) => f.id === activeFeature)?.description}
                </p>
              </motion.div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Unlimited quiz attempts</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Progress tracking</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Personalized recommendations</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
