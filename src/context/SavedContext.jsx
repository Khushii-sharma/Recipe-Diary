"use client"

import { createContext, useContext, useEffect, useState } from "react"

const SavedContext = createContext()

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([])
  const [isHydrated, setIsHydrated] = useState(false) // Prevents SSR mismatches

  // 1. Initial Load: Only runs on the client
  useEffect(() => {
    const stored = localStorage.getItem("savedRecipes")
    if (stored) {
      try {
        setSaved(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse saved recipes", e)
      }
    }
    setIsHydrated(true)
  }, [])

  // 2. Persist to localStorage whenever 'saved' changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("savedRecipes", JSON.stringify(saved))
    }
  }, [saved, isHydrated])

  const toggleSave = (meal) => {
    setSaved(prev => {
      const exists = prev.find(item => item.idMeal === meal.idMeal)
      if (exists) {
        // We'll return a clean array filter
        return prev.filter(item => item.idMeal !== meal.idMeal)
      }
      // Add the new meal to the top of the list
      return [meal, ...prev]
    })
  }

  const removeSaved = (id) => {
    setSaved(prev => prev.filter(item => item.idMeal !== id))
  }

  const isSaved = (id) => saved.some(item => item.idMeal === id)

  return (
    <SavedContext.Provider
      value={{
        saved,
        setSaved,
        toggleSave,
        removeSaved,
        isSaved,
        isHydrated // Useful for showing skeleton loaders in the "Saved" page
      }}
    >
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  const context = useContext(SavedContext)
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider")
  }
  return context
}