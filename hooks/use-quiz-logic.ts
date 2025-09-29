"use client"

import { useCallback } from "react"
import { useQuiz } from "@/context/quiz-context"
import { aiService } from "@/lib/ai-service"

export function useQuizLogic() {
  const { state, dispatch } = useQuiz()

  const selectTopic = useCallback(
    async (topic: string, difficulty?: string, interests?: string[], keywords?: string[]) => {
      dispatch({ type: "SET_TOPIC", payload: topic })
      dispatch({ type: "SET_LOADING", payload: true })

      try {
        console.log("[v0] Starting quiz generation with:", { topic, difficulty, interests, keywords })

        // Create quiz session
        const sessionResponse = await fetch("/api/quiz/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            topic, 
            difficulty, 
            keywords: keywords || interests || [] 
          }),
        })

        if (!sessionResponse.ok) {
          const errorText = await sessionResponse.text()
          console.error("[v0] Session creation failed:", errorText)
          throw new Error("Failed to create quiz session")
        }

        const { session } = await sessionResponse.json()
        console.log("[v0] Quiz session created:", session.id)

        // Generate questions using API
        const response = await fetch("/api/quiz/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic,
            difficulty,
            keywords: keywords || interests || [],
            sessionId: session.id,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Quiz generation failed:", errorText)
          throw new Error("Failed to generate quiz questions")
        }

        const { questions } = await response.json()
        console.log("[v0] Received questions from API:", questions)

        if (Array.isArray(questions) && questions.length > 0) {
          // Convert API format to context format
          const convertedQuestions = questions.map((q: any, index: number) => ({
            id: `q_${index}`,
            question: q.question,
            options: [q.options.A, q.options.B, q.options.C, q.options.D],
            correctAnswer: q.options[q.correct_answer] ? ["A", "B", "C", "D"].indexOf(q.correct_answer) : 0,
            explanation: q.explanation,
          }))
          
          dispatch({ type: "SET_QUESTIONS", payload: convertedQuestions })
          console.log("[v0] Successfully converted and set quiz questions:", convertedQuestions.length)
        } else {
          throw new Error("Invalid questions format received")
        }
      } catch (error) {
        console.error("Error generating quiz questions:", error)
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Failed to generate questions",
        })
      }
    },
    [dispatch],
  )

  const answerQuestion = useCallback(
    (questionIndex: number, answer: number) => {
      dispatch({ type: "SET_ANSWER", payload: { questionIndex, answer } })
    },
    [dispatch],
  )

  const nextQuestion = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" })
  }, [dispatch])

  const previousQuestion = useCallback(() => {
    dispatch({ type: "PREVIOUS_QUESTION" })
  }, [dispatch])

  const finishQuiz = useCallback(async () => {
    if (!state.selectedTopic) return

    dispatch({ type: "SET_LOADING", payload: true })

    // Calculate score
    const score = state.userAnswers.reduce((acc, answer, index) => {
      if (answer !== null && answer === state.questions[index]?.correctAnswer) {
        return acc + 1
      }
      return acc
    }, 0)

    try {
      const feedback = await aiService.generateFeedback(score, state.questions.length, state.selectedTopic)
      dispatch({ type: "SET_FEEDBACK", payload: feedback })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to generate feedback" })
    }
  }, [state.selectedTopic, state.userAnswers, state.questions, dispatch])

  const resetQuiz = useCallback(() => {
    dispatch({ type: "RESET_QUIZ" })
  }, [dispatch])

  const getProgress = useCallback(() => {
    const answeredQuestions = state.userAnswers.filter((answer) => answer !== null).length
    return (answeredQuestions / state.questions.length) * 100
  }, [state.userAnswers, state.questions.length])

  return {
    state,
    selectTopic,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,
    getProgress,
  }
}
