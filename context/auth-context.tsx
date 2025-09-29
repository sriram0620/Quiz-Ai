"use client"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"

export interface User {
  id: string
  email: string
  name?: string
  created_at?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  authError: string | null
}

type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_ERROR" }

const initialState: AuthState = {
  user: null,
  isLoading: true,
  authError: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        authError: null,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        authError: action.payload,
        isLoading: false,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        authError: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext<{
  user: User | null
  isLoading: boolean
  authError: string | null
  signInWithOtp: (email: string) => Promise<{ success: boolean; error?: string }>
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>
  updateUserDetails: (details: { name: string }) => Promise<{ success: boolean; error?: string }>
  clearAuthError: () => void
  signOut: () => Promise<void>
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Mock authentication functions for now
  const signInWithOtp = async (email: string) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, always return success
      dispatch({ type: "SET_LOADING", payload: false })
      return { success: true }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to send OTP" })
      return { success: false, error: "Failed to send OTP" }
    }
  }

  const verifyOtp = async (email: string, token: string) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, create a mock user
      const mockUser: User = {
        id: "1",
        email: email,
        name: "Demo User",
        created_at: new Date().toISOString(),
      }

      dispatch({ type: "SET_USER", payload: mockUser })
      return { success: true, isNewUser: false }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Invalid OTP" })
      return { success: false, error: "Invalid OTP" }
    }
  }

  const updateUserDetails = async (details: { name: string }) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user with new details
      if (state.user) {
        const updatedUser = { ...state.user, ...details }
        dispatch({ type: "SET_USER", payload: updatedUser })
      }

      return { success: true }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update user details" })
      return { success: false, error: "Failed to update user details" }
    }
  }

  const clearAuthError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  const signOut = async () => {
    dispatch({ type: "SET_USER", payload: null })
  }

  // Initialize auth state
  useEffect(() => {
    // For demo purposes, set loading to false after a short delay
    const timer = setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: false })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        authError: state.authError,
        signInWithOtp,
        verifyOtp,
        updateUserDetails,
        clearAuthError,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
