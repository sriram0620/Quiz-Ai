"use client"

import Link from "next/link"
import { ArrowLeft, Home, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuizLogic } from "@/hooks/use-quiz-logic"

export function QuizNavbar() {
  const { state, resetQuiz } = useQuizLogic()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="h-6 w-px bg-white/20" />

          <div className="flex items-center space-x-2">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">AI Knowledge Quiz</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {state.currentStep !== "topic-selection" && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetQuiz}
              className="flex items-center space-x-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              <Home className="w-4 h-4" />
              <span>New Quiz</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
