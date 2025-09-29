"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Brain, Trophy, Target } from "lucide-react"

interface QuizQuestion {
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correct_answer: string
  explanation: string
}

interface QuizInterfaceProps {
  topic: string
  difficulty: string
  keywords: string[]
  onComplete: (score: number, total: number) => void
}

export function QuizInterface({ topic, difficulty, keywords, onComplete }: QuizInterfaceProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    generateQuiz()
  }, [])

  const generateQuiz = async () => {
    try {
      setIsLoading(true)
      setIsGenerating(true)

      console.log("[QUIZ-AI] Starting quiz generation with:", { topic, difficulty, keywords })

      // Create quiz session
      const sessionResponse = await fetch("/api/quiz/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, keywords }),
      })

      if (!sessionResponse.ok) {
        const errorText = await sessionResponse.text()
        console.error("[QUIZ-AI] Session creation failed:", errorText)
        throw new Error("Failed to create quiz session")
      }

      const { session } = await sessionResponse.json()
      console.log("[QUIZ-AI] Quiz session created:", session.id)
      setSessionId(session.id)

      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          keywords,
          sessionId: session.id,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[QUIZ-AI] Quiz generation failed:", errorText)
        throw new Error("Failed to generate quiz questions")
      }

      const { questions } = await response.json()
      console.log("[QUIZ-AI] Received questions from Grok:", questions)

      if (Array.isArray(questions) && questions.length > 0) {
        setQuestions(questions)
        console.log("[QUIZ-AI] Successfully set quiz questions:", questions.length)
      } else {
        throw new Error("Invalid questions format received")
      }
    } catch (error: unknown) {
      console.error("Error generating quiz questions:", error instanceof Error ? error.message : "Unknown error")
      
      // Show error message to user instead of hardcoded questions
      alert("Unable to generate personalized quiz questions at this time. Please try again. This ensures you get the best AI-generated content tailored to your needs.")
      
      // Optionally redirect back or reload
      window.location.reload()
    } finally {
      setIsLoading(false)
      setIsGenerating(false)
    }
  }

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer || !sessionId) return

    setSelectedAnswer(answer)
    const correct = answer === questions[currentQuestionIndex].correct_answer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
    }

    // Save answer to database
    try {
      await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          questionId: `q_${currentQuestionIndex}`, // Temporary ID
          userAnswer: answer,
          isCorrect: correct,
        }),
      })
    } catch (error) {
      console.error("Error saving answer:", error)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(null)
    } else {
      // Quiz completed
      onComplete(score, questions.length)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-violet-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <Brain className="w-full h-full text-violet-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isGenerating ? "Generating Your Personalized Quiz..." : "Loading Quiz..."}
            </h2>
            <p className="text-gray-600 mb-6">
              Grok AI is creating questions tailored to your selected topics and difficulty level.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-violet-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to Generate Quiz</h2>
            <p className="text-gray-600 mb-6">We encountered an issue generating your quiz. Please try again.</p>
            <Button onClick={generateQuiz} className="bg-gradient-to-r from-violet-500 to-blue-500">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-violet-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg">
                <Target className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{topic} Quiz</h1>
                <p className="text-gray-600">{difficulty} Level</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Question</p>
              <p className="text-xl font-bold text-gray-800">
                {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl mb-6">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">{currentQuestion.question}</h2>

                <div className="grid gap-4">
                  {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <motion.button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      disabled={selectedAnswer !== null}
                      whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl text-left transition-all duration-300 ${
                        selectedAnswer === key
                          ? isCorrect
                            ? "bg-green-100 border-2 border-green-500 text-green-800"
                            : "bg-red-100 border-2 border-red-500 text-red-800"
                          : selectedAnswer && key === currentQuestion.correct_answer
                            ? "bg-green-100 border-2 border-green-500 text-green-800"
                            : selectedAnswer
                              ? "bg-gray-100 border border-gray-300 text-gray-600"
                              : "bg-white border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 font-semibold flex items-center justify-center text-sm">
                          {key}
                        </span>
                        <span className="flex-1">{value}</span>
                        {selectedAnswer && (
                          <div className="ml-auto">
                            {(selectedAnswer === key && isCorrect) ||
                            (selectedAnswer !== key && key === currentQuestion.correct_answer) ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : selectedAnswer === key && !isCorrect ? (
                              <XCircle className="w-6 h-6 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Result Card */}
        <AnimatePresence>
          {showResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card
                className={`border-0 shadow-xl mb-6 ${
                  isCorrect ? "bg-gradient-to-r from-green-50 to-emerald-50" : "bg-gradient-to-r from-red-50 to-rose-50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Trophy className="w-5 h-5" />
                  <span>
                    Score: {score} / {currentQuestionIndex + 1}
                  </span>
                </div>
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
