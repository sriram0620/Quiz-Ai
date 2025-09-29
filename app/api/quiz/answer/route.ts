import { createClient } from "@/lib/supabase/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, questionId, userAnswer, isCorrect } = await request.json()

    if (!sessionId || !questionId || !userAnswer || typeof isCorrect !== "boolean") {
      return new Response("Missing required parameters", { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Save user answer
    const { error: answerError } = await supabase.from("quiz_answers").insert({
      session_id: sessionId,
      question_id: questionId,
      user_answer: userAnswer,
      is_correct: isCorrect,
    })

    if (answerError) {
      console.error("Error saving answer:", answerError)
      return new Response("Failed to save answer", { status: 500 })
    }

    // Update session statistics
    const { data: correctCount } = await supabase
      .from("quiz_answers")
      .select("*", { count: "exact" })
      .eq("session_id", sessionId)
      .eq("is_correct", true)

    const { error: updateError } = await supabase
      .from("quiz_sessions")
      .update({
        correct_answers: correctCount?.length || 0,
      })
      .eq("id", sessionId)
      .eq("user_id", user.id)

    if (updateError) {
      console.error("Error updating session:", updateError)
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error saving quiz answer:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
