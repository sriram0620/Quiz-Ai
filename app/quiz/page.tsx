"use client"

import { QuizProvider } from "@/context/quiz-context"
import { QuizApp } from "@/components/quiz/quiz-app"

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  )
}
