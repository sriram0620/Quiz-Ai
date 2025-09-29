import { generateObject } from "ai"
import { createClient } from "@/lib/supabase/server"
import type { NextRequest } from "next/server"
import { z } from "zod"

const quizQuestionSchema = z.object({
  question: z.string().describe("The quiz question text"),
  options: z
    .object({
      A: z.string(),
      B: z.string(),
      C: z.string(),
      D: z.string(),
    })
    .describe("Four multiple choice options"),
  correct_answer: z.enum(["A", "B", "C", "D"]).describe("The correct answer option"),
  explanation: z.string().describe("Brief explanation of why the answer is correct"),
})

const quizResponseSchema = z.object({
  questions: z.array(quizQuestionSchema).length(5).describe("Array of exactly 5 quiz questions"),
})

export async function POST(request: NextRequest) {
  const { topic, difficulty, keywords, sessionId } = await request.json()

  console.log("[v0] Quiz generation request:", { topic, difficulty, keywords, sessionId })

  if (!topic || !difficulty || !keywords || !sessionId) {
    return new Response("Missing required parameters", { status: 400 })
  }

  // Verify user has access to this session
  const supabase = await createClient()
  const keywordsList = keywords.join(", ")

  try {
    // Handle mock sessions (when sessionId starts with "mock_session_")
    if (sessionId.startsWith("mock_session_")) {
      console.log("[v0] Processing mock session:", sessionId)
      // Skip database validation for mock sessions
    } else {
      // Handle real sessions with database validation
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return new Response("Unauthorized", { status: 401 })
      }

      const { data: session } = await supabase
        .from("quiz_sessions")
        .select("*")
        .eq("id", sessionId)
        .eq("user_id", user.id)
        .single()

      if (!session) {
        return new Response("Session not found", { status: 404 })
      }
    }

    console.log("[v0] Generating quiz with Grok AI...")

    // Enhanced prompting for better AI generation
    const difficultyGuidance: Record<string, string> = {
      "Beginner": "Focus on fundamental concepts, basic definitions, and simple applications. Use clear, straightforward language.",
      "Intermediate": "Include moderate complexity with analysis and practical applications. Mix conceptual and application questions.",
      "Advanced": "Create challenging questions requiring deep understanding, critical thinking, and complex problem-solving."
    }

    const guidanceText = difficultyGuidance[difficulty] || "Create questions appropriate for the specified level."

    const { object } = await generateObject({
      model: "xai/grok-beta",
      schema: quizResponseSchema,
      prompt: `You are an expert educational content creator. Generate exactly 5 high-quality multiple-choice quiz questions about "${topic}" at ${difficulty} level.

KEY FOCUS AREAS: ${keywordsList}

DIFFICULTY GUIDANCE: ${guidanceText}

REQUIREMENTS:
✓ All questions must be directly related to the topic: ${topic}
✓ Incorporate these specific keywords/concepts: ${keywordsList}
✓ Each question has exactly 4 options (A, B, C, D)
✓ Only one correct answer per question
✓ Provide clear, educational explanations for correct answers
✓ Questions should test genuine understanding, not memorization
✓ Use real-world examples and practical applications when possible
✓ Ensure questions are accurate, unbiased, and educational

Make each question unique and engaging while maintaining educational value.`,
      system: `You are an expert quiz generator specializing in creating educational assessments. Your questions should be:
- Pedagogically sound and well-structured
- Free from ambiguity and bias
- Appropriately challenging for the ${difficulty} level
- Focused on practical understanding rather than rote memorization
- Inclusive and accessible to diverse learners`,
    })

    console.log("[v0] Generated quiz questions:", object.questions.length)

    // Save questions to database (skip for mock sessions)
    if (sessionId.startsWith("mock_session_")) {
      console.log("[v0] Skipping database save for mock session")
    } else {
      const questionsToSave = object.questions.map((question, index) => ({
        session_id: sessionId,
        question_text: question.question,
        options: question.options,
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        question_order: index + 1,
      }))

      const { error: insertError } = await supabase.from("quiz_questions").insert(questionsToSave)

      if (insertError) {
        console.error("[v0] Error saving questions to database:", insertError)
        console.log("[v0] Continuing without database save due to error")
      } else {
        console.log("[v0] Successfully saved questions to database")
      }
    }

    return Response.json({ questions: object.questions })
  } catch (error: unknown) {
    console.error("Error generating quiz questions with AI:", error)
    console.error("[v0] Full error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : "Unknown",
    })

    // Try with a different model or approach before falling back
    try {
      console.log("[v0] Retrying with alternative AI model...")
      
      const { object: retryObject } = await generateObject({
        model: "xai/grok-4o-mini", // Fallback to a different model
        schema: quizResponseSchema,
        prompt: `Create 5 educational quiz questions about ${topic} (${difficulty} level). Focus on: ${keywordsList}. Each question needs 4 options (A,B,C,D) and explanation.`,
        system: "Generate clear, educational quiz questions with proper multiple choice format."
      })

      console.log("[v0] Successfully generated questions with fallback model")
      
      // Save retry questions to database (skip for mock sessions)
      if (!sessionId.startsWith("mock_session_")) {
        const questionsToSave = retryObject.questions.map((question, index) => ({
          session_id: sessionId,
          question_text: question.question,
          options: question.options,
          correct_answer: question.correct_answer,
          explanation: question.explanation,
          question_order: index + 1,
        }))

        const { error: insertError } = await supabase.from("quiz_questions").insert(questionsToSave)
        if (insertError) {
          console.error("[v0] Error saving retry questions:", insertError)
        }
      }

      return Response.json({ questions: retryObject.questions })
    } catch (retryError: unknown) {
      console.error("[v0] Retry with alternative model also failed:", retryError)
      
      // Only now use minimal fallback
      console.log("[v0] Using minimal fallback questions...")
      const fallbackQuestions = generateMinimalFallback(topic, difficulty, keywords)

      try {
        // Save fallback questions to database (skip for mock sessions)
        if (!sessionId.startsWith("mock_session_")) {
          const fallbackSupabase = await createClient()
          const questionsToSave = fallbackQuestions.map((question, index) => ({
            session_id: sessionId,
            question_text: question.question,
            options: question.options,
            correct_answer: question.correct_answer,
            explanation: question.explanation,
            question_order: index + 1,
          }))

          await fallbackSupabase.from("quiz_questions").insert(questionsToSave)
          console.log("[v0] Successfully saved minimal fallback questions")
        } else {
          console.log("[v0] Skipping database save for mock session fallback")
        }

        return Response.json({ questions: fallbackQuestions })
      } catch (fallbackError: unknown) {
        console.error("[v0] Error saving fallback questions:", fallbackError)
        console.log("[v0] Returning fallback questions without database save")
        return Response.json({ questions: fallbackQuestions })
      }
    }
  }
}

function generateMinimalFallback(topic: string, difficulty: string, keywords: string[]) {
  const difficultyMap: Record<string, string> = {
    "Beginner": "basic",
    "Intermediate": "moderate", 
    "Advanced": "advanced",
  }

  const levelDescription = difficultyMap[difficulty] || "general"
  const keywordList = keywords.length > 0 ? keywords : ["core concepts", "key principles", "fundamental aspects"]
  
  // Use actual keyword values, not array references
  const keyword1 = keywordList[0] || "core concepts"
  const keyword2 = keywordList[1] || "key principles"
  const keyword3 = keywordList[2] || "fundamental aspects"

  return [
    {
      question: `What is a fundamental concept in ${topic} related to ${keyword1}?`,
      options: {
        A: `Basic understanding of ${keyword1}`,
        B: `Advanced application of ${keyword1}`,
        C: `Theoretical framework of ${keyword1}`,
        D: `Practical implementation of ${keyword1}`,
      },
      correct_answer: "A" as const,
      explanation: `This ${levelDescription} question focuses on fundamental concepts in ${topic}, specifically relating to ${keyword1}.`,
    },
    {
      question: `How does ${keyword2} apply in the context of ${topic}?`,
      options: {
        A: "Through direct application only",
        B: "Through systematic analysis",
        C: "Through practical implementation and understanding",
        D: "Through theoretical study alone",
      },
      correct_answer: "C" as const,
      explanation: `In ${topic}, ${keyword2} is best understood through practical implementation combined with theoretical understanding at the ${levelDescription} level.`,
    },
    {
      question: `What is the relationship between ${keyword1} and ${keyword2} in ${topic}?`,
      options: {
        A: "They are completely independent concepts",
        B: "They work together synergistically",
        C: "They are opposing methodologies",
        D: "They represent identical approaches",
      },
      correct_answer: "B" as const,
      explanation: `In ${topic}, ${keyword1} and ${keyword2} typically complement each other to create comprehensive understanding.`,
    },
    {
      question: `Which approach is most effective for ${levelDescription} learning in ${topic}?`,
      options: {
        A: "Memorization of facts and definitions",
        B: "Practical application combined with analysis",
        C: "Theoretical study without application",
        D: "Casual observation and intuition",
      },
      correct_answer: "B" as const,
      explanation: `For ${levelDescription} understanding of ${topic}, combining practical application with analytical thinking provides the most effective learning approach.`,
    },
    {
      question: `What is a common challenge when working with ${keyword3} in ${topic}?`,
      options: {
        A: "Limited availability of learning resources",
        B: "Complexity of practical implementation",
        C: "Understanding underlying core principles",
        D: "All of the above factors",
      },
      correct_answer: "D" as const,
      explanation: `Working with ${keyword3} in ${topic} typically involves multiple challenges including resource availability, implementation complexity, and mastering core principles.`,
    },
  ]
}
