"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { Navbar } from "@/components/landing-page/navbar"
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
    <div className="min-h-screen bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animated-gradient relative
      light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-100">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-violet-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>
      <Navbar />
      <div className="pt-24 relative z-10">{renderCurrentStep()}</div>
    </div>
  )
}
