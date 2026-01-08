"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }) {
  const { user, isLoading, setShowLogin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If loading is finished and there is no user
    if (!isLoading && !user) {
      setShowLogin(true) // Open the login modal
      router.push("/") // Send them back to home
    }
  }, [user, isLoading, router, setShowLogin])

  // Show a loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-center justify-center items-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    )
  }

  // If user exists, render the page
  return user ? children : null
}