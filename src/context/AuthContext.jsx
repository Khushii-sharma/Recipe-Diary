"use client"

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // ⏳ Track initial check

  useEffect(() => {
    // Check for user session on mount
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse user session", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // ---------------- AUTH ACTIONS ----------------

  const login = (phone) => {
    const userData = { 
      phone,
      loginDate: new Date().toISOString() 
    }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    setShowLogin(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        showLogin,
        setShowLogin,
        isLoading, // Exposed to handle protected routes/UI flicker
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}