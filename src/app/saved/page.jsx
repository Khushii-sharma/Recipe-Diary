"use client"

import { useSaved } from "@/context/SavedContext"
import RecipeCard from "@/components/RecipeCard"
import { Button } from "@/components/ui/button"
import { Trash2, UtensilsCrossed, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function SavedPage() {
  const { saved, isHydrated, setSaved } = useSaved()
  const { user, isLoading: authLoading, setShowLogin } = useAuth()
  const [isConfirming, setIsConfirming] = useState(false)
  const router = useRouter()

  // --- PROTECTION LOGIC ---
  useEffect(() => {
    // If auth check is done and no user is found
    if (!authLoading && !user) {
      setShowLogin(true) // Open login modal automatically
      router.push("/")   // Redirect to home
    }
  }, [user, authLoading, setShowLogin, router])

  // 1. AUTH LOADING STATE: Spinner while checking if user is logged in
  if (authLoading || !isHydrated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Loading your cookbook...</p>
      </div>
    )
  }

  // If no user, return null while the useEffect redirect handles them
  if (!user) return null

  // 2. EMPTY STATE: Shown when user is logged in but has 0 saved recipes
  if (saved.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <UtensilsCrossed size={40} className="text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your cookbook is empty</h2>
        <p className="text-gray-500 mt-2 max-w-sm">
          You haven't saved any recipes yet. Start exploring and build your collection!
        </p>
        <Link href="/">
          <Button className="mt-8 bg-orange-600 hover:bg-orange-700 px-8 h-12 rounded-full shadow-lg shadow-orange-100 transition-all active:scale-95">
            Explore Recipes
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            My Cookbook
          </h1>
        </div>

        {/* Action: Clear All with Confirmation */}
        <div className="flex items-center gap-2">
          {isConfirming ? (
            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200 bg-red-50 p-1.5 rounded-xl border border-red-100">
              <span className="text-[10px] font-bold text-red-600 px-2 uppercase tracking-wider">Are you sure?</span>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-lg h-8 px-3 text-xs"
                onClick={() => { setSaved([]); setIsConfirming(false); }}
              >
                Clear All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-lg h-8 px-3 text-xs bg-white border-gray-200"
                onClick={() => setIsConfirming(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-xl px-4"
              onClick={() => setIsConfirming(true)}
            >
              <Trash2 size={18} className="mr-2" />
              <span className="text-sm font-medium">Clear All</span>
            </Button>
          )}
        </div>
      </div>

      {/* RECIPE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {saved.map((meal, index) => (
          <div 
            key={meal.idMeal} 
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <RecipeCard meal={meal} />
          </div>
        ))}
      </div>
    </div>
  )
}