import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { SupabaseProvider } from "@/components/providers/supabase-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "ATS Resume Tracker",
  description: "ATS Resume Tracker",
  generator: "ats.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={``}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
