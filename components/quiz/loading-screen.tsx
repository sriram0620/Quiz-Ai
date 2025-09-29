"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sparkles } from "lucide-react"
import { useQuizLogic } from "@/hooks/use-quiz-logic"

export function LoadingScreen() {
  const { state } = useQuizLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-violet-500 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animated-gradient relative flex items-center justify-center
      light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-violet-600/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-blue-500/10 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4">
        <Card className="w-full max-w-md glass-card bg-white/10 backdrop-blur-md border border-white/20">
          <CardContent className="p-8 text-center">
            <div className="relative mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-white/20 to-white/10 animate-pulse backdrop-blur-sm border border-white/20">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-white animate-bounce" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white dark:text-white light:text-gray-800">Generating Your Quiz</h2>

            <p className="text-white/80 dark:text-white/80 light:text-gray-600 mb-6 leading-relaxed">
              AI is creating personalized questions about{" "}
              <span className="font-semibold text-white dark:text-white light:text-gray-800">{state.selectedTopic}</span>
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>

              <p className="text-sm text-white/70">This may take a few moments...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
