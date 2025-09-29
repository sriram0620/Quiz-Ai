"use client"

import type { ReactNode } from "react"

// Simple placeholder provider for now
export function SupabaseProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
