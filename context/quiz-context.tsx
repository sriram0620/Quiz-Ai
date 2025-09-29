"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { QuizQuestion, FeedbackData } from "@/lib/ai-service"

export type QuizStep = "topic-selection" | "loading" | "quiz" | "results"

export interface QuizState {
  currentStep: QuizStep
  selectedTopic: string | null
  questions: QuizQuestion[]
  currentQuestionIndex: number
  userAnswers: (number | null)[]
  score: number
  feedback: FeedbackData | null
  isLoading: boolean
  error: string | null
}

type QuizAction =
  | { type: "SET_TOPIC"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_QUESTIONS"; payload: QuizQuestion[] }
  | { type: "SET_ANSWER"; payload: { questionIndex: number; answer: number } }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "SET_STEP"; payload: QuizStep }
  | { type: "SET_FEEDBACK"; payload: FeedbackData }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET_QUIZ" }

const initialState: QuizState = {
  currentStep: "topic-selection",
  selectedTopic: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  feedback: null,
  isLoading: false,
  error: null,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_TOPIC":
      return {
        ...state,
        selectedTopic: action.payload,
        currentStep: "loading",
        isLoading: true,
        error: null,
      }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        userAnswers: new Array(action.payload.length).fill(null),
        currentStep: "quiz",
        isLoading: false,
        error: null,
      }

    case "SET_ANSWER":
      const newAnswers = [...state.userAnswers]
      newAnswers[action.payload.questionIndex] = action.payload.answer
      return {
        ...state,
        userAnswers: newAnswers,
      }

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      }

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      }

    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }

    case "SET_FEEDBACK":
      return {
        ...state,
        feedback: action.payload,
        currentStep: "results",
        isLoading: false,
      }

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }

    case "RESET_QUIZ":
      return initialState

    default:
      return state
  }
}

const QuizContext = createContext<{
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
} | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
