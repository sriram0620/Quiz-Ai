"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useQuizLogic } from "@/hooks/use-quiz-logic"
import {
  Brain,
  Lightbulb,
  Heart,
  Zap,
  Globe,
  Code,
  Star,
  Sparkles,
  Trophy,
  Search,
  CheckCircle2,
  ArrowRight,
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  TrendingUp,
} from "lucide-react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

const topics = [
  {
    id: "wellness",
    title: "Wellness & Health",
    description: "Test your knowledge about mental health, fitness, and well-being",
    icon: Heart,
    gradient: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    keywords: [
      "mindfulness",
      "nutrition",
      "exercise",
      "mental health",
      "sleep",
      "stress management",
      "meditation",
      "yoga",
      "diet",
      "wellness",
      "therapy",
      "cardio",
      "strength training",
      "supplements",
      "recovery",
      "hydration",
      "vitamins",
      "protein",
      "flexibility",
      "endurance",
      "weight loss",
      "muscle building",
      "anxiety",
      "depression",
      "self-care",
      "breathing techniques",
      "pilates",
      "running",
      "cycling",
      "swimming",
      "hiking",
    ],
    interestAreas: [
      { id: "mental-health", name: "Mental Health", description: "Psychology, therapy, emotional wellness" },
      { id: "fitness", name: "Physical Fitness", description: "Exercise, strength training, cardio" },
      { id: "nutrition", name: "Nutrition & Diet", description: "Healthy eating, supplements, meal planning" },
      { id: "mindfulness", name: "Mindfulness", description: "Meditation, stress relief, mindful living" },
      { id: "sleep", name: "Sleep Health", description: "Sleep hygiene, rest, recovery" },
    ],
  },
  {
    id: "tech-trends",
    title: "Tech Trends",
    description: "Explore the latest in technology, AI, and digital innovation",
    icon: Zap,
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    keywords: [
      "artificial intelligence",
      "machine learning",
      "blockchain",
      "cloud computing",
      "cybersecurity",
      "IoT",
      "quantum computing",
      "5G",
      "AR/VR",
      "robotics",
      "neural networks",
      "cryptocurrency",
      "smart contracts",
      "edge computing",
      "automation",
      "big data",
      "data science",
      "DevOps",
      "microservices",
      "serverless",
      "containers",
      "kubernetes",
      "docker",
      "API",
      "REST",
      "GraphQL",
      "React",
      "Node.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "AWS",
      "Azure",
    ],
    interestAreas: [
      { id: "ai-ml", name: "AI & Machine Learning", description: "Neural networks, deep learning, algorithms" },
      { id: "blockchain", name: "Blockchain & Crypto", description: "Cryptocurrency, DeFi, smart contracts" },
      { id: "cloud", name: "Cloud Computing", description: "AWS, Azure, serverless, microservices" },
      { id: "cybersecurity", name: "Cybersecurity", description: "Data protection, ethical hacking, privacy" },
      { id: "emerging-tech", name: "Emerging Technologies", description: "Quantum computing, AR/VR, IoT" },
    ],
  },
  {
    id: "science",
    title: "Science & Discovery",
    description: "Dive into fascinating scientific facts and discoveries",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    keywords: [
      "physics",
      "chemistry",
      "biology",
      "astronomy",
      "genetics",
      "quantum mechanics",
      "neuroscience",
      "climate science",
      "space exploration",
      "biotechnology",
      "molecular biology",
      "particle physics",
      "cosmology",
      "evolution",
      "DNA",
      "RNA",
      "proteins",
      "cells",
      "atoms",
      "molecules",
      "photons",
      "electrons",
      "gravity",
      "relativity",
      "black holes",
      "galaxies",
      "planets",
      "stars",
      "microscopy",
      "laboratory",
      "experiments",
      "research",
    ],
    interestAreas: [
      { id: "physics", name: "Physics", description: "Quantum mechanics, relativity, particle physics" },
      { id: "biology", name: "Biology & Life Sciences", description: "Genetics, evolution, molecular biology" },
      { id: "chemistry", name: "Chemistry", description: "Organic, inorganic, biochemistry" },
      { id: "astronomy", name: "Astronomy & Space", description: "Cosmology, planets, space exploration" },
      { id: "neuroscience", name: "Neuroscience", description: "Brain science, cognition, consciousness" },
    ],
  },
  {
    id: "environment",
    title: "Environment & Sustainability",
    description: "Learn about climate change, conservation, and green living",
    icon: Globe,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    keywords: [
      "climate change",
      "renewable energy",
      "conservation",
      "sustainability",
      "biodiversity",
      "carbon footprint",
      "green technology",
      "environmental policy",
      "ecosystem",
      "pollution",
      "solar energy",
      "wind power",
      "recycling",
      "deforestation",
      "ocean conservation",
      "wildlife protection",
      "endangered species",
      "habitat preservation",
      "carbon neutral",
      "electric vehicles",
      "sustainable agriculture",
      "organic farming",
      "composting",
      "water conservation",
      "air quality",
      "greenhouse gases",
      "ozone layer",
      "coral reefs",
      "rainforests",
      "national parks",
      "environmental activism",
      "green building",
    ],
    interestAreas: [
      { id: "climate", name: "Climate Change", description: "Global warming, carbon cycle, climate policy" },
      { id: "renewable", name: "Renewable Energy", description: "Solar, wind, hydroelectric, green tech" },
      { id: "conservation", name: "Conservation", description: "Wildlife protection, habitat preservation" },
      { id: "sustainability", name: "Sustainable Living", description: "Eco-friendly practices, green lifestyle" },
      { id: "policy", name: "Environmental Policy", description: "Regulations, international agreements" },
    ],
  },
  {
    id: "programming",
    title: "Programming & Development",
    description: "Test your coding knowledge and software development skills",
    icon: Code,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    keywords: [
      "JavaScript",
      "React",
      "Python",
      "algorithms",
      "data structures",
      "web development",
      "mobile development",
      "DevOps",
      "databases",
      "API design",
      "TypeScript",
      "Node.js",
      "Docker",
      "Kubernetes",
      "Git",
      "HTML",
      "CSS",
      "SQL",
      "MongoDB",
      "PostgreSQL",
      "Redux",
      "Vue.js",
      "Angular",
      "Express.js",
      "Flask",
      "Django",
      "Spring Boot",
      "microservices",
      "REST API",
      "GraphQL",
      "testing",
      "debugging",
      "version control",
      "agile",
      "scrum",
      "CI/CD",
      "cloud deployment",
      "AWS",
      "Azure",
      "serverless",
    ],
    interestAreas: [
      { id: "frontend", name: "Frontend Development", description: "React, Vue, Angular, UI/UX" },
      { id: "backend", name: "Backend Development", description: "Node.js, Python, databases, APIs" },
      { id: "mobile", name: "Mobile Development", description: "React Native, Flutter, iOS, Android" },
      { id: "devops", name: "DevOps & Cloud", description: "CI/CD, Docker, Kubernetes, deployment" },
      {
        id: "algorithms",
        name: "Algorithms & Data Structures",
        description: "Problem solving, optimization, complexity",
      },
    ],
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "A mix of interesting facts from various fields and topics",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    keywords: [
      "history",
      "geography",
      "culture",
      "arts",
      "literature",
      "current events",
      "politics",
      "economics",
      "philosophy",
      "world affairs",
      "ancient civilizations",
      "world capitals",
      "famous authors",
      "classical music",
      "world religions",
      "mythology",
      "archaeology",
      "anthropology",
      "sociology",
      "psychology",
      "languages",
      "linguistics",
      "architecture",
      "painting",
      "sculpture",
      "theater",
      "cinema",
      "photography",
      "dance",
      "poetry",
      "novels",
      "biographies",
      "world wars",
      "renaissance",
      "industrial revolution",
    ],
    interestAreas: [
      { id: "history", name: "History", description: "World history, civilizations, historical events" },
      { id: "geography", name: "Geography", description: "Countries, capitals, physical geography" },
      { id: "culture", name: "Culture & Arts", description: "Literature, music, visual arts, traditions" },
      { id: "current-events", name: "Current Events", description: "News, politics, world affairs" },
      { id: "philosophy", name: "Philosophy", description: "Ethics, logic, philosophical thought" },
    ],
  },
]

const difficultyLevels = [
  {
    id: "easy",
    title: "Easy",
    description: "Perfect for beginners and casual learning",
    icon: Star,
    gradient: "from-green-400 to-emerald-400",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    questions: "5 questions • 2 minutes",
    level: "Beginner friendly",
    features: ["Basic concepts", "Multiple choice", "Helpful hints"],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Challenge yourself with moderate difficulty",
    icon: Sparkles,
    gradient: "from-yellow-400 to-orange-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    questions: "5 questions • 3 minutes",
    level: "Moderate challenge",
    features: ["Applied knowledge", "Mixed formats", "Real scenarios"],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Expert level questions for true knowledge seekers",
    icon: Trophy,
    gradient: "from-red-400 to-rose-400",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    questions: "5 questions • 4 minutes",
    level: "Expert level",
    features: ["Complex analysis", "Critical thinking", "Expert insights"],
  },
]

export function TopicSelection() {
  const { selectTopic, state } = useQuizLogic()
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [keywordFilter, setKeywordFilter] = useState("")
  const [step, setStep] = useState<"topic" | "difficulty" | "interests" | "confirm">("topic")
  const [expandedKeywords, setExpandedKeywords] = useState(false)

  // Animation refs
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 })

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId)
    setStep("difficulty")
  }

  const handleDifficultySelect = (difficultyId: string) => {
    setSelectedDifficulty(difficultyId)
    setStep("interests")
  }

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  const handleContinueToConfirm = () => {
    if (selectedInterests.length > 0) {
      setStep("confirm")
    }
  }

  const handleStartQuiz = () => {
    if (selectedTopic && selectedDifficulty && selectedInterests.length > 0) {
      const topic = topics.find((t) => t.id === selectedTopic)
      if (topic) {
        selectTopic(topic.title, selectedDifficulty, selectedInterests, selectedKeywords)
      }
    }
  }

  const selectedTopicData = topics.find((t) => t.id === selectedTopic)
  const selectedDifficultyData = difficultyLevels.find((d) => d.id === selectedDifficulty)

  // Filter keywords based on search and selected interests
  const filteredKeywords = useMemo(() => {
    if (!selectedTopicData) return []

    let keywords = selectedTopicData.keywords

    // Filter by search term
    if (keywordFilter) {
      keywords = keywords.filter((keyword) => keyword.toLowerCase().includes(keywordFilter.toLowerCase()))
    }

    return keywords
  }, [selectedTopicData, keywordFilter])

  const organizedKeywords = useMemo(() => {
    if (!selectedTopicData) return { trending: [], core: [], advanced: [] }

    const allKeywords = selectedTopicData.keywords
    const filtered = keywordFilter
      ? allKeywords.filter((keyword) => keyword.toLowerCase().includes(keywordFilter.toLowerCase()))
      : allKeywords

    // Organize keywords into categories for better UX
    const trending = filtered.slice(0, 8) // First 8 as trending
    const core = filtered.slice(8, 16) // Next 8 as core concepts
    const advanced = filtered.slice(16) // Rest as advanced

    return { trending, core, advanced }
  }, [selectedTopicData, keywordFilter])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animated-gradient relative">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-violet-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-white/5 rounded-full filter blur-[50px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 pt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20"
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              className="text-white dark:text-gray-100 text-5xl md:text-7xl font-bold mb-8 max-w-5xl mx-auto leading-tight tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Test Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 dark:from-violet-400 dark:to-indigo-500">
                Knowledge
              </span>{" "}
              with
              <br />
              AI-Powered Quizzes
            </motion.h1>
            <motion.p
              className="text-white dark:text-gray-200 text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {step === "topic" &&
                "Choose a topic that interests you and test your knowledge with AI-generated questions"}
              {step === "difficulty" && "Select your preferred difficulty level for the perfect challenge"}
              {step === "interests" && "Pick your specific areas of interest for personalized questions"}
              {step === "confirm" && "Ready to start your personalized quiz adventure!"}
            </motion.p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              {["topic", "difficulty", "interests", "confirm"].map((stepName, index) => (
                <div key={stepName} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      step === stepName
                        ? "bg-white text-violet-600 shadow-lg scale-110"
                        : index < ["topic", "difficulty", "interests", "confirm"].indexOf(step)
                          ? "bg-white/30 text-white"
                          : "bg-white/10 text-white/60"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index < ["topic", "difficulty", "interests", "confirm"].indexOf(step) ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  {index < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                        index < ["topic", "difficulty", "interests", "confirm"].indexOf(step)
                          ? "bg-white/30"
                          : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Error Display */}
          <AnimatePresence>
            {state.error && (
              <motion.div
                className="mb-8 p-4 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-lg text-red-100 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {state.error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1: Topic Selection */}
          <AnimatePresence mode="wait">
            {step === "topic" && (
              <motion.div
                key="topic-selection"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-base font-medium">
                    Step 1 of 4: Choose Your Topic
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {topics.map((topic, index) => {
                    const IconComponent = topic.icon
                    return (
                      <motion.div
                        key={topic.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          y: -8,
                          transition: { type: "spring", stiffness: 400, damping: 17 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className="group cursor-pointer transition-all duration-300 glass-card premium-shadow h-full overflow-hidden"
                          onClick={() => handleTopicSelect(topic.id)}
                        >
                          <CardHeader className="pb-4 relative">
                            <motion.div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <motion.div
                              className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${topic.gradient} mb-4 shadow-lg relative z-10`}
                              whileHover={{
                                scale: 1.1,
                                rotate: [0, -3, 3, 0],
                                transition: { duration: 0.4 },
                              }}
                            >
                              <IconComponent className="w-8 h-8 text-white" />
                            </motion.div>
                            <CardTitle className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors relative z-10">
                              {topic.title}
                            </CardTitle>
                            <CardDescription className="text-white/80 leading-relaxed text-base relative z-10">
                              {topic.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <motion.div
                              className="mb-6 p-4 bg-white/10 rounded-xl border border-white/20"
                              initial={{ opacity: 0.7 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-sm text-white/70 mb-3 font-medium flex items-center">
                                <Target className="w-4 h-4 mr-2" />
                                Popular Topics:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {topic.keywords.slice(0, 6).map((keyword, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <Badge className="bg-white/20 text-white border-white/30 text-xs px-2 py-1 hover:bg-white/30 transition-all cursor-pointer">
                                      {keyword}
                                    </Badge>
                                  </motion.div>
                                ))}
                                {topic.keywords.length > 6 && (
                                  <Badge className="bg-white/20 text-white border-white/30 text-xs px-2 py-1">
                                    +{topic.keywords.length - 6} more
                                  </Badge>
                                )}
                              </div>
                            </motion.div>
                            <Button
                              className={`w-full bg-gradient-to-r ${topic.gradient} hover:opacity-90 text-white font-semibold py-3 text-lg transition-all duration-300 group-hover:shadow-lg border-0`}
                              disabled={state.isLoading}
                            >
                              Select Topic
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Difficulty Selection */}
            {step === "difficulty" && selectedTopicData && (
              <motion.div
                key="difficulty-selection"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-base font-medium">
                    Step 2 of 4: Choose Difficulty Level
                  </Badge>
                </div>

                {/* Selected Topic Display */}
                <motion.div
                  className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${selectedTopicData.gradient} mb-4 shadow-lg`}
                  >
                    <selectedTopicData.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedTopicData.title}</h3>
                  <p className="text-white/80 mb-4">{selectedTopicData.description}</p>
                  <Button
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => setStep("topic")}
                  >
                    Change Topic
                  </Button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {difficultyLevels.map((difficulty, index) => {
                    const IconComponent = difficulty.icon
                    return (
                      <motion.div
                        key={difficulty.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.03,
                          y: -5,
                          transition: { type: "spring", stiffness: 400, damping: 17 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className="group cursor-pointer transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 h-full"
                          onClick={() => handleDifficultySelect(difficulty.id)}
                        >
                          <CardHeader className="pb-4 text-center">
                            <motion.div
                              className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${difficulty.gradient} mb-4 shadow-lg mx-auto`}
                              whileHover={{
                                scale: 1.1,
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.3 },
                              }}
                            >
                              <IconComponent className="w-8 h-8 text-white" />
                            </motion.div>
                            <CardTitle className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                              {difficulty.title}
                            </CardTitle>
                            <CardDescription className="text-white/80 leading-relaxed text-base">
                              {difficulty.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0 text-center space-y-4">
                            <div className="space-y-3">
                              <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1">
                                {difficulty.level}
                              </Badge>
                              <p className="text-white/70 text-sm font-medium">{difficulty.questions}</p>
                              <div className="space-y-2">
                                {difficulty.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center justify-center space-x-2">
                                    <CheckCircle2 className="w-4 h-4 text-white/60" />
                                    <span className="text-white/70 text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Button
                              className={`w-full bg-gradient-to-r ${difficulty.gradient} hover:opacity-90 text-white font-semibold py-3 text-lg transition-all duration-300 group-hover:shadow-lg border-0`}
                              disabled={state.isLoading}
                            >
                              Select {difficulty.title}
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Interest Areas Selection */}
            {step === "interests" && selectedTopicData && selectedDifficultyData && (
              <motion.div
                key="interests-selection"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-base font-medium">
                    Step 3 of 4: Select Your Interest Areas
                  </Badge>
                </div>

                {/* Current Selections */}
                <motion.div
                  className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center space-x-8 mb-4">
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${selectedTopicData.gradient} mb-2`}
                      >
                        <selectedTopicData.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white/70 text-sm">Topic</p>
                      <p className="text-white font-semibold">{selectedTopicData.title}</p>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${selectedDifficultyData.gradient} mb-2`}
                      >
                        <selectedDifficultyData.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white/70 text-sm">Difficulty</p>
                      <p className="text-white font-semibold capitalize">{selectedDifficulty}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => setStep("difficulty")}
                    >
                      Change Settings
                    </Button>
                  </div>
                </motion.div>

                {/* Interest Areas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedTopicData.interestAreas.map((interest, index) => {
                    const isSelected = selectedInterests.includes(interest.id)
                    return (
                      <motion.div
                        key={interest.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          y: -3,
                          transition: { type: "spring", stiffness: 400, damping: 17 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`group cursor-pointer transition-all duration-300 border-2 ${
                            isSelected
                              ? "glass-card border-white/40 shadow-lg"
                              : "glass-card border-white/20 hover:bg-white/15 hover:border-white/30"
                          }`}
                          onClick={() => handleInterestToggle(interest.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-semibold text-white">{interest.name}</CardTitle>
                              <motion.div
                                animate={{
                                  scale: isSelected ? 1.2 : 1,
                                  rotate: isSelected ? 360 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle2
                                  className={`w-6 h-6 ${isSelected ? "text-green-400" : "text-white/40"}`}
                                />
                              </motion.div>
                            </div>
                            <CardDescription className="text-white/70 text-sm leading-relaxed">
                              {interest.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                <motion.div
                  className="p-6 glass-card rounded-2xl border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Filter className="w-6 h-6 mr-3" />
                      Keyword Focus Areas
                    </h3>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                        {selectedKeywords.length} selected
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedKeywords(!expandedKeywords)}
                        className="text-white/70 hover:text-white hover:bg-white/10 p-2"
                      >
                        {expandedKeywords ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Keyword Search */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <Input
                        placeholder="Search keywords to focus your quiz..."
                        value={keywordFilter}
                        onChange={(e) => setKeywordFilter(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 text-base"
                      />
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {expandedKeywords && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {/* Trending Keywords */}
                        {organizedKeywords.trending.length > 0 && (
                          <div>
                            <div className="flex items-center mb-3">
                              <TrendingUp className="w-4 h-4 text-rose-400 mr-2" />
                              <h4 className="text-white font-semibold">Trending Topics</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {organizedKeywords.trending.map((keyword, idx) => {
                                const isSelected = selectedKeywords.includes(keyword)
                                return (
                                  <motion.div
                                    key={keyword}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.02 }}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                  >
                                    <Checkbox
                                      id={`trending-${keyword}`}
                                      checked={isSelected}
                                      onCheckedChange={() => handleKeywordToggle(keyword)}
                                      className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white"
                                    />
                                    <label
                                      htmlFor={`trending-${keyword}`}
                                      className="text-sm text-white/90 cursor-pointer flex-1 capitalize"
                                    >
                                      {keyword}
                                    </label>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Core Keywords */}
                        {organizedKeywords.core.length > 0 && (
                          <div>
                            <div className="flex items-center mb-3">
                              <Layers className="w-4 h-4 text-blue-400 mr-2" />
                              <h4 className="text-white font-semibold">Core Concepts</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {organizedKeywords.core.map((keyword, idx) => {
                                const isSelected = selectedKeywords.includes(keyword)
                                return (
                                  <motion.div
                                    key={keyword}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.02 }}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                  >
                                    <Checkbox
                                      id={`core-${keyword}`}
                                      checked={isSelected}
                                      onCheckedChange={() => handleKeywordToggle(keyword)}
                                      className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white"
                                    />
                                    <label
                                      htmlFor={`core-${keyword}`}
                                      className="text-sm text-white/90 cursor-pointer flex-1 capitalize"
                                    >
                                      {keyword}
                                    </label>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Advanced Keywords */}
                        {organizedKeywords.advanced.length > 0 && (
                          <div>
                            <div className="flex items-center mb-3">
                              <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
                              <h4 className="text-white font-semibold">Advanced Topics</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                              {organizedKeywords.advanced.map((keyword, idx) => {
                                const isSelected = selectedKeywords.includes(keyword)
                                return (
                                  <motion.div
                                    key={keyword}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.02 }}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                  >
                                    <Checkbox
                                      id={`advanced-${keyword}`}
                                      checked={isSelected}
                                      onCheckedChange={() => handleKeywordToggle(keyword)}
                                      className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white"
                                    />
                                    <label
                                      htmlFor={`advanced-${keyword}`}
                                      className="text-sm text-white/90 cursor-pointer flex-1 capitalize"
                                    >
                                      {keyword}
                                    </label>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {organizedKeywords.trending.length === 0 &&
                          organizedKeywords.core.length === 0 &&
                          organizedKeywords.advanced.length === 0 && (
                            <div className="text-center py-8">
                              <p className="text-white/60 text-base">No keywords found matching your search.</p>
                            </div>
                          )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Selected Keywords Display */}
                  {selectedKeywords.length > 0 && (
                    <motion.div
                      className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <p className="text-sm text-white/70 mb-3 font-medium flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Selected Keywords ({selectedKeywords.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedKeywords.map((keyword, idx) => (
                          <motion.div
                            key={keyword}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              className="bg-gradient-to-r from-white/30 to-white/20 text-white border-white/40 px-3 py-1 text-sm backdrop-blur-sm cursor-pointer hover:from-white/40 hover:to-white/30 transition-all"
                              onClick={() => handleKeywordToggle(keyword)}
                            >
                              {keyword}
                              <motion.span className="ml-2 text-white/70 hover:text-white" whileHover={{ scale: 1.2 }}>
                                ×
                              </motion.span>
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Continue Button */}
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      onClick={handleContinueToConfirm}
                      disabled={selectedInterests.length === 0}
                      className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white font-semibold px-8 py-3 text-lg border-0 disabled:opacity-50"
                      size="lg"
                    >
                      Continue ({selectedInterests.length} areas, {selectedKeywords.length} keywords)
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Final Confirmation */}
            {step === "confirm" && selectedTopicData && selectedDifficultyData && (
              <motion.div
                key="confirmation"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-8">
                  <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-base font-medium">
                    Step 4 of 4: Ready to Begin!
                  </Badge>
                </div>

                <motion.div
                  className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20"
                      variants={floatingVariants}
                      animate="animate"
                    >
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-4">Your Personalized Quiz is Ready!</h2>
                  </div>

                  {/* Quiz Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${selectedTopicData.gradient} mb-3`}
                      >
                        <selectedTopicData.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white/70 text-sm">Topic</p>
                      <p className="text-white font-semibold">{selectedTopicData.title}</p>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${selectedDifficultyData.gradient} mb-3`}
                      >
                        <selectedDifficultyData.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white/70 text-sm">Difficulty</p>
                      <p className="text-white font-semibold capitalize">{selectedDifficulty}</p>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 mb-3">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white/70 text-sm">Focus Areas</p>
                      <p className="text-white font-semibold">{selectedInterests.length} selected</p>
                    </div>
                  </div>

                  {/* Selected Interest Areas */}
                  <div className="mb-8 p-6 bg-white/10 rounded-xl border border-white/20">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Your Focus Areas:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedInterests.map((interestId) => {
                        const interest = selectedTopicData.interestAreas.find((i) => i.id === interestId)
                        return interest ? (
                          <motion.div
                            key={interestId}
                            className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: selectedInterests.indexOf(interestId) * 0.1 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium text-sm">{interest.name}</p>
                              <p className="text-white/70 text-xs">{interest.description}</p>
                            </div>
                          </motion.div>
                        ) : null
                      })}
                    </div>
                  </div>

                  {/* Selected Keywords */}
                  {selectedKeywords.length > 0 && (
                    <div className="mb-8 p-6 bg-white/10 rounded-xl border border-white/20">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <Filter className="w-5 h-5 mr-2" />
                        Your Keyword Focus:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedKeywords.map((keyword, idx) => (
                          <motion.div
                            key={keyword}
                            className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium text-sm capitalize">{keyword}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiz Features */}
                  <div className="mb-8 p-6 bg-white/10 rounded-xl border border-white/20">
                    <h3 className="text-white font-semibold mb-4">What to Expect:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-5 h-5 text-violet-400" />
                        <span className="text-white/80 text-sm">AI-generated questions tailored to your interests</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-white/80 text-sm">Instant feedback and explanations</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-white/80 text-sm">Personalized difficulty based on your level</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        <span className="text-white/80 text-sm">Detailed performance analytics</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => setStep("interests")}
                    >
                      Modify Selections
                    </Button>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleStartQuiz}
                        className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white font-semibold px-12 py-4 text-xl border-0 shadow-lg"
                        disabled={state.isLoading}
                        size="lg"
                      >
                        {state.isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="mr-3"
                            >
                              <Brain className="w-6 h-6" />
                            </motion.div>
                            Generating Your Quiz...
                          </>
                        ) : (
                          <>
                            Start My Personalized Quiz
                            <ArrowRight className="ml-3 w-6 h-6" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Section - Only show on topic selection */}
          {step === "topic" && (
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div className="text-center" variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-bold mb-3 text-white text-xl">AI-Generated Questions</h3>
                <p className="text-white/80 leading-relaxed">
                  Fresh, unique questions generated by AI for each quiz session, tailored to your specific interests
                </p>
              </motion.div>
              <motion.div className="text-center" variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-bold mb-3 text-white text-xl">Instant Feedback</h3>
                <p className="text-white/80 leading-relaxed">
                  Get personalized feedback and detailed explanations for each answer to enhance your learning
                </p>
              </motion.div>
              <motion.div className="text-center" variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Lightbulb className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-bold mb-3 text-white text-xl">Learn & Improve</h3>
                <p className="text-white/80 leading-relaxed">
                  Track your progress and discover new knowledge areas with intelligent recommendations
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
