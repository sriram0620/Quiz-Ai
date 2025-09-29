"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Shield, Upload, Sun, Moon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "next-themes"
import OtpVerification from "@/components/auth/otp-verification"
import UserDetailsForm from "@/components/auth/user-details-form"

export default function LoginPage() {
  const { user, signInWithOtp, verifyOtp, updateUserDetails, authError, clearAuthError } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [step, setStep] = useState<"email" | "otp" | "details">("email")
  const [isNewUser, setIsNewUser] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Check for redirectTo parameter in the URL
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get("redirectTo")

      // Redirect to the originally requested page or upload-resume as default
      if (redirectTo && !redirectTo.includes("/api/") && !redirectTo.includes("/auth/")) {
        // Decode the URL if it's encoded (e.g., %2F to /)
        const decodedRedirectTo = decodeURIComponent(redirectTo)
        router.push(decodedRedirectTo)
      } else {
        router.push("/upload-resume")
      }
    }
  }, [user, router])

  // Show toast if there's an auth error
  useEffect(() => {
    if (authError) {
      toast({
        title: "Error",
        description: authError,
        variant: "destructive",
      })
      clearAuthError()
    }
  }, [authError, toast, clearAuthError])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signInWithOtp(email)

      if (!result.success) {
        throw new Error(result.error || "Failed to send verification code")
      }

      setStep("otp")
      toast({
        title: "Verification Code Sent",
        description: "Check your email for the verification code.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (token: string) => {
    setIsLoading(true)

    try {
      const result = await verifyOtp(email, token)

      if (!result.success) {
        throw new Error(result.error || "Invalid verification code")
      }

      if (result.isNewUser) {
        // If this is a new user, collect additional details
        setIsNewUser(true)
        setStep("details")
      } else {
        // Existing user, redirect to dashboard
        toast({
          title: "Success",
          description: "You have been successfully signed in!",
        })
        
        // Force refresh the user state to trigger the redirect in useEffect
        setTimeout(() => {
          // Check for redirectTo parameter in the URL
          const params = new URLSearchParams(window.location.search)
          const redirectTo = params.get("redirectTo")

          // Redirect to the originally requested page or upload-resume as default
          if (redirectTo && !redirectTo.includes("/api/") && !redirectTo.includes("/auth/")) {
            const decodedRedirectTo = decodeURIComponent(redirectTo)
            router.push(decodedRedirectTo)
          } else {
            router.push("/upload-resume")
          }
        }, 500) // Short delay to ensure authentication state is properly updated
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      const result = await signInWithOtp(email)

      if (!result.success) {
        throw new Error(result.error || "Failed to resend verification code")
      }

      toast({
        title: "Verification Code Sent",
        description: "A new verification code has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleUpdateUserDetails = async (details: { name: string }) => {
    setIsLoading(true)
    try {
      const result = await updateUserDetails(details)

      if (!result.success) {
        throw new Error(result.error || "Failed to update user details")
      }

      toast({
        title: "Success",
        description: "Your account has been set up successfully!",
      })
      
      // Force redirect to upload-resume or the requested page
      setTimeout(() => {
        // Check for redirectTo parameter in the URL
        const params = new URLSearchParams(window.location.search)
        const redirectTo = params.get("redirectTo")

        // Redirect to the originally requested page or upload-resume as default
        if (redirectTo && !redirectTo.includes("/api/") && !redirectTo.includes("/auth/")) {
          const decodedRedirectTo = decodeURIComponent(redirectTo)
          router.push(decodedRedirectTo)
        } else {
          router.push("/upload-resume")
        }
      }, 500) // Short delay to ensure authentication state is properly updated
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // If loading, show loading state
  if (isLoading && user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full bg-violet-500 opacity-30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-foreground mt-6 text-lg">Signing you in...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        {theme === "dark" ? (
          <>
            {/* Dark mode background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-[-1]"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-violet-600/10 to-transparent rounded-full filter blur-[80px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-[80px]"></div>
            <div className="absolute inset-0 dot-pattern opacity-[0.03]"></div>
          </>
        ) : (
          <>
            {/* Light mode background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 z-[-1]"></div>
            <div className="absolute inset-0 dot-pattern opacity-10"></div>
          </>
        )}
      </div>

      {/* Header with theme toggle and back button */}
      <header className="w-full py-4 px-6 flex justify-between items-center relative z-10">
        <Link
          href="/"
          className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-800"} hover:opacity-80 transition-opacity`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {mounted && (
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white shadow-md hover:bg-gray-50"
            } backdrop-blur-sm transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>
        )}
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* Logo */}
              <motion.div
                className="text-center mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="inline-flex items-center gap-3">
                  <div
                    className={`w-14 h-14 ${theme === "dark" ? "bg-gray-800" : "bg-violet-600"} rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <Upload className={`w-7 h-7 ${theme === "dark" ? "text-violet-400" : "text-white"}`} />
                  </div>
                  <span className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    HireNexa
                  </span>
                </Link>
              </motion.div>

              {step === "email" && (
                <motion.div
                  className={`rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden ${
                    theme === "dark" ? "bg-gray-900/70 border border-gray-800" : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h1 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                        Welcome Back
                      </h1>
                      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        Sign in to access your account
                      </p>
                    </div>

                    <form onSubmit={handleSendOtp} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl pl-12 ${
                              theme === "dark"
                                ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                                : "bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                            } transition-colors`}
                            placeholder="john@example.com"
                            required
                          />
                          <Mail
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === "dark" ? "text-violet-400" : "text-violet-500"}`}
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full relative py-3 rounded-xl font-medium text-white shadow-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Button background with animated gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500"></div>

                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["0%", "100%"],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            repeatDelay: 1,
                          }}
                        />

                        {/* Button content */}
                        <div className="relative flex items-center justify-center">
                          {isLoading ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-center"
                            >
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </motion.div>
                          ) : (
                            <span className="flex items-center justify-center">
                              Continue with Email
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                              >
                                <ArrowRight className="ml-2 w-5 h-5" />
                              </motion.div>
                            </span>
                          )}
                        </div>
                      </motion.button>
                    </form>
                  </div>

                  <div
                    className={`px-8 py-4 ${theme === "dark" ? "bg-gray-800/70 border-t border-gray-700" : "bg-gray-50 border-t border-gray-200"}`}
                  >
                    <div className="flex items-center justify-center text-sm">
                      <Shield className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-violet-400" : "text-violet-500"}`} />
                      <span className={`${theme === "dark" ? "text-white/80" : "text-gray-600"}`}>
                        Secure authentication
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "otp" && (
                <OtpVerification
                  email={email}
                  onVerify={handleVerifyOtp}
                  onResend={handleResendOtp}
                  isLoading={isLoading}
                  isResending={isResending}
                />
              )}

              {step === "details" && isNewUser && (
                <UserDetailsForm onSubmit={handleUpdateUserDetails} isLoading={isLoading} />
              )}

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={`text-sm ${theme === "dark" ? "text-white/80" : "text-gray-600"}`}>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className={`font-medium ${theme === "dark" ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                  >
                    Create one
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
