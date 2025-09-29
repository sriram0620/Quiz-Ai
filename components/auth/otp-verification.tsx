"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, RefreshCw } from "lucide-react"
import { useTheme } from "next-themes"

interface OtpVerificationProps {
  email: string
  onVerify: (token: string) => Promise<void>
  onResend: () => Promise<void>
  isLoading: boolean
  isResending: boolean
}

export default function OtpVerification({ email, onVerify, onResend, isLoading, isResending }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)
    setError("")

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData)
    }
  }

  const handleVerify = async (token: string) => {
    try {
      await onVerify(token)
    } catch (error: any) {
      setError(error.message || "Invalid verification code")
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }
  }

  const handleManualSubmit = () => {
    const token = otp.join("")
    if (token.length === 6) {
      handleVerify(token)
    }
  }

  return (
    <motion.div
      className={`rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden ${
        theme === "dark" ? "bg-gray-900/70 border border-gray-800" : "bg-white border border-gray-200"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === "dark" ? "bg-gray-800" : "bg-violet-100"
            }`}
          >
            <Mail className={`w-8 h-8 ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`} />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            Check Your Email
          </h1>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>We sent a verification code to</p>
          <p className={`font-medium ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`}>{email}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium mb-4 text-center ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Enter 6-digit code
            </label>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-xl border-2 transition-all ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                      : "bg-white border-gray-300 text-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                  } ${error ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              ))}
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            onClick={handleManualSubmit}
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full relative py-3 rounded-xl font-medium text-white shadow-lg overflow-hidden disabled:opacity-50"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500"></div>
            <div className="relative flex items-center justify-center">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Verify Code"
              )}
            </div>
          </motion.button>

          <div className="text-center">
            <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Didn't receive the code?
            </p>
            <motion.button
              onClick={onResend}
              disabled={isResending}
              className={`text-sm font-medium flex items-center justify-center mx-auto gap-2 ${
                theme === "dark" ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"
              } disabled:opacity-50`}
              whileHover={{ scale: isResending ? 1 : 1.05 }}
              whileTap={{ scale: isResending ? 1 : 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`} />
              {isResending ? "Sending..." : "Resend Code"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
