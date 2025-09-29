"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { Trophy, RotateCcw, CheckCircle, XCircle, Brain, Sparkles, Star, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

function KeywordMatcher({
  userAnswers,
  questions,
  selectedTopic,
}: {
  userAnswers: (number | null)[]
  questions: any[]
  selectedTopic: string | null
}) {
  const [expandedKeywords, setExpandedKeywords] = useState(false)

  // Extract keywords from correct and incorrect answers
  const extractKeywords = () => {
    const correctKeywords: string[] = []
    const missedKeywords: string[] = []

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index]
      const isCorrect = userAnswer === question.correctAnswer

      // Extract keywords from question and correct answer
      const questionText = question.question.toLowerCase()
      const correctAnswerText = question.options[question.correctAnswer].toLowerCase()

      // Simple keyword extraction (in real app, this would be more sophisticated)
      const keywords = [
        ...questionText.split(" ").filter((word) => word.length > 4),
        ...correctAnswerText.split(" ").filter((word) => word.length > 4),
      ].slice(0, 3) // Limit to 3 keywords per question

      if (isCorrect) {
        correctKeywords.push(...keywords)
      } else {
        missedKeywords.push(...keywords)
      }
    })

    return {
      mastered: [...new Set(correctKeywords)].slice(0, 8),
      needsWork: [...new Set(missedKeywords)].slice(0, 6),
    }
  }

  const { mastered, needsWork } = extractKeywords()

  return (
    <Card className="glass-card mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-violet-500" />
          <span>Knowledge Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mastered Keywords */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-4 h-4 text-green-500" />
            <h4 className="font-semibold text-green-600 dark:text-green-400">Mastered Concepts</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {mastered.map((keyword, idx) => (
              <Badge
                key={idx}
                className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 px-3 py-1 text-sm font-medium"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        {needsWork.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-amber-600 dark:text-amber-400">Areas to Explore</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {needsWork.slice(0, expandedKeywords ? needsWork.length : 4).map((keyword, idx) => (
                <Badge
                  key={idx}
                  className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 px-3 py-1 text-sm font-medium"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {keyword}
                </Badge>
              ))}
              {needsWork.length > 4 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400"
                  onClick={() => setExpandedKeywords(!expandedKeywords)}
                >
                  {expandedKeywords ? "Show less" : `+${needsWork.length - 4} more`}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Learning Recommendations */}
        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg border border-violet-200 dark:border-violet-800">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-violet-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">Personalized Learning Path</h4>
              <p className="text-sm text-violet-600 dark:text-violet-400">
                Based on your performance, we recommend focusing on {needsWork.slice(0, 2).join(" and ")}
                {needsWork.length > 2 ? " among other areas" : ""}. Your strong understanding of{" "}
                {mastered.slice(0, 2).join(" and ")} shows great potential!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResultsScreen() {
  const { state, resetQuiz } = useQuizLogic()

  if (!state.feedback) {
    return null
  }

  const { score, totalQuestions, message, encouragement } = state.feedback
  const percentage = Math.round((score / totalQuestions) * 100)

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "from-green-500 to-emerald-500"
    if (percentage >= 60) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-rose-500"
  }

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return "default"
    if (percentage >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-violet-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animated-gradient relative
      light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-violet-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div
              className={cn(
                "inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r mb-6",
                getScoreColor(percentage),
              )}
            >
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Quiz Complete!</h1>
            <p className="text-xl text-white/90">{state.selectedTopic}</p>
          </div>

          {/* Score Card */}
          <Card className="glass-card mb-8 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div
                  className={cn(
                    "text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                    getScoreColor(percentage),
                  )}
                >
                  {percentage}%
                </div>
                <div className="text-left">
                  <p className="text-2xl font-semibold text-white">
                    {score}/{totalQuestions}
                  </p>
                  <p className="text-white/70">Correct</p>
                </div>
              </div>
              <Badge variant={getScoreBadgeVariant(percentage)} className="text-lg px-4 py-2">
                {encouragement}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className={cn("w-full h-4 bg-white/20 rounded-full overflow-hidden mb-6")}>
                <div
                  className={cn(
                    "h-full bg-gradient-to-r transition-all duration-1000 ease-out",
                    getScoreColor(percentage),
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* AI Feedback */}
              <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-white">AI Feedback</h3>
                    <p className="text-white/80 leading-relaxed text-balance">{message}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <KeywordMatcher
            userAnswers={state.userAnswers}
            questions={state.questions}
            selectedTopic={state.selectedTopic}
          />

          {/* Question Review */}
          <Card className="glass-card mb-8 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Brain className="w-5 h-5" />
                <span>Question Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.questions.map((question, index) => {
                const userAnswer = state.userAnswers[index]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div
                    key={question.id}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-colors",
                      isCorrect ? "border-green-400/50 bg-green-500/10" : "border-red-400/50 bg-red-500/10",
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={cn(
                          "inline-flex items-center justify-center w-6 h-6 rounded-full mt-1",
                          isCorrect ? "bg-green-500" : "bg-red-500",
                        )}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2 text-balance text-white">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-white/90">
                            <span className="font-medium">Your answer:</span>{" "}
                            <span className={isCorrect ? "text-green-300" : "text-red-300"}>
                              {userAnswer !== null ? question.options[userAnswer] : "No answer"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-white/90">
                              <span className="font-medium">Correct answer:</span>{" "}
                              <span className="text-green-300">{question.options[question.correctAnswer]}</span>
                            </p>
                          )}
                          {question.explanation && <p className="text-white/70 italic">{question.explanation}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={resetQuiz}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 border-0"
              size="lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Quiz</span>
            </Button>
          </div>

          {/* Performance Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-2xl font-bold text-white mb-2">{score}</div>
              <p className="text-sm text-white/70">Questions Correct</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-2xl font-bold text-white mb-2">{percentage}%</div>
              <p className="text-sm text-white/70">Accuracy Rate</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-2xl font-bold text-white mb-2">{totalQuestions}</div>
              <p className="text-sm text-white/70">Total Questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
