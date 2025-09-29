"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizNavbar } from "./quiz-navbar"
import { TopicSelection } from "./topic-selection"
import { LoadingScreen } from "./loading-screen"
import { QuizQuestion } from "./quiz-question"
import { ResultsScreen } from "./results-screen"

export function QuizApp() {
  const { state } = useQuizLogic()

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case "topic-selection":
        return <TopicSelection />
      case "loading":
        return <LoadingScreen />
      case "quiz":
        return <QuizQuestion />
      case "results":
        return <ResultsScreen />
      default:
        return <TopicSelection />
    }
  }

  return (
    <div className="min-h-screen">
      <QuizNavbar />
      <div className="pt-20">{renderCurrentStep()}</div>
    </div>
  )
}
