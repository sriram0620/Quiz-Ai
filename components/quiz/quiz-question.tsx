"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { ChevronLeft, ChevronRight, CheckCircle, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuizQuestion() {
  const { state, answerQuestion, nextQuestion, previousQuestion, finishQuiz, getProgress } = useQuizLogic()

  const currentQuestion = state.questions[state.currentQuestionIndex]
  const userAnswer = state.userAnswers[state.currentQuestionIndex]
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1
  const canGoNext = state.currentQuestionIndex < state.questions.length - 1
  const canGoPrevious = state.currentQuestionIndex > 0
  const allQuestionsAnswered = state.userAnswers.every((answer) => answer !== null)

  if (!currentQuestion) {
    return null
  }

  const handleAnswerSelect = (optionIndex: number) => {
    answerQuestion(state.currentQuestionIndex, optionIndex)
  }

  const handleNext = () => {
    if (isLastQuestion && allQuestionsAnswered) {
      finishQuiz()
    } else if (canGoNext) {
      nextQuestion()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-violet-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animated-gradient relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-violet-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with Progress */}
          <div className="mb-8 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{state.selectedTopic}</h1>
                  <p className="text-sm text-white/70">
                    Question {state.currentQuestionIndex + 1} of {state.questions.length}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-white/70 mb-1">Progress</p>
                <p className="text-lg font-semibold text-white">{Math.round(getProgress())}%</p>
              </div>
            </div>

            <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
              <div
                className="bg-gradient-to-r from-white to-white/90 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="glass-card mb-8 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed text-white">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "w-full p-4 h-auto text-left justify-start transition-all duration-200 hover:scale-[1.01] border-white/30",
                    userAnswer === index
                      ? "border-white bg-white/20 text-white font-medium backdrop-blur-sm"
                      : "hover:border-white/50 hover:bg-white/10 text-white/90 hover:text-white bg-white/5",
                  )}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        userAnswer === index ? "border-white bg-white text-violet-600" : "border-white/50",
                      )}
                    >
                      {userAnswer === index ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="flex-1 text-balance">{option}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={previousQuestion}
              disabled={!canGoPrevious}
              className="flex items-center space-x-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-2">
              {state.userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    answer !== null ? "bg-white" : index === state.currentQuestionIndex ? "bg-white/50" : "bg-white/20",
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={userAnswer === null || state.isLoading}
              className={cn(
                "flex items-center space-x-2 border-0",
                isLastQuestion && allQuestionsAnswered
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  : "bg-white text-violet-600 hover:bg-white/90",
              )}
            >
              <span>{isLastQuestion && allQuestionsAnswered ? "Finish Quiz" : "Next"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Answer Status */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/70">
              {state.userAnswers.filter((answer) => answer !== null).length} of {state.questions.length} questions
              answered
            </p>
            {allQuestionsAnswered && (
              <p className="text-sm text-green-300 mt-2 font-medium">
                All questions completed! Click "Finish Quiz" to see your results.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
