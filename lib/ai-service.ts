import { generateObject, generateText } from "ai"
import { z } from "zod"

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizData {
  questions: QuizQuestion[]
}

export interface FeedbackData {
  message: string
  score: number
  totalQuestions: number
  encouragement: string
}

export class AIService {
  private static instance: AIService

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  async generateQuizQuestions(topic: string, difficulty?: string): Promise<QuizData> {
    try {
      console.log("[QUIZ-AI] Starting quiz generation with Grok AI", { topic, difficulty })

      const difficultyInstruction = difficulty
        ? `at ${difficulty} difficulty level`
        : "at an appropriate difficulty level"

      const difficultyGuidance = {
        easy: "Focus on basic concepts, definitions, and straightforward applications. Use clear, simple language.",
        intermediate:
          "Include moderate complexity with some analysis and application of concepts. Mix factual and conceptual questions.",
        advanced:
          "Create challenging questions requiring deep understanding, critical thinking, and complex problem-solving.",
      }

      const guidance = difficulty ? difficultyGuidance[difficulty as keyof typeof difficultyGuidance] || "" : ""

      console.log("[QUIZ-AI] Calling generateObject with Grok model")

      const quizSchema = z.object({
        questions: z.array(
          z.object({
            id: z.string(),
            question: z.string(),
            options: z.array(z.string()).length(4),
            correctAnswer: z.number().min(0).max(3),
            explanation: z.string(),
          })
        ).length(5),
      })

      const result = await generateObject({
        model: "xai/grok-4",
        prompt: `Generate 5 multiple choice questions about ${topic} ${difficultyInstruction}. ${guidance}
        
        Each question should have 4 options with only one correct answer. Make the questions engaging, educational, and relevant to real-world applications. Include brief but informative explanations for the correct answers that help users learn.
        
        Ensure questions are:
        - Diverse in scope within the topic
        - Clear and unambiguous
        - Educational and thought-provoking
        - Free from bias or controversial content`,
        schema: quizSchema,
      })

      console.log("[QUIZ-AI] Successfully generated quiz questions", result.object)
      return result.object
    } catch (error) {
      console.error("[QUIZ-AI] Error generating quiz questions:", error)

      console.log("[QUIZ-AI] No fallback questions - returning error to ensure AI generation")
      throw new Error("AI service unavailable. Please ensure you have a stable internet connection and try again.")
    }
  }


  async generateFeedback(score: number, totalQuestions: number, topic: string): Promise<FeedbackData> {
    try {
      console.log("[QUIZ-AI] Generating feedback with Grok AI", { score, totalQuestions, topic })

      const percentage = Math.round((score / totalQuestions) * 100)

      const result = await generateText({
        model: "xai/grok-4",
        prompt: `Generate personalized feedback for a quiz about ${topic}. The user scored ${score} out of ${totalQuestions} questions (${percentage}%). 
        
        Provide:
        1. A congratulatory or encouraging message based on their performance
        2. Specific encouragement for improvement or continued learning
        3. Brief insights about their knowledge level in this topic
        
        Keep it positive, motivating, and personalized to their score level. Use a friendly, supportive tone. Limit to 2-3 sentences.`,
      })

      console.log("[QUIZ-AI] Successfully generated feedback")

      return {
        message: result.text,
        score,
        totalQuestions,
        encouragement: percentage >= 80 ? "Excellent work!" : percentage >= 60 ? "Good job!" : "Keep learning!",
      }
    } catch (error) {
      console.error("[QUIZ-AI] Error generating feedback:", error)
      return {
        message: `You scored ${score} out of ${totalQuestions} questions! Keep up the great work and continue learning.`,
        score,
        totalQuestions,
        encouragement: "Great effort!",
      }
    }
  }
}

export const aiService = AIService.getInstance()
