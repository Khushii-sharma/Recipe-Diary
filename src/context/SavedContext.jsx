"use client"

import { createContext, useContext, useEffect, useState } from "react"

const SavedContext = createContext()

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([])

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedRecipes")
    if (stored) setSaved(JSON.parse(stored))
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(saved))
  }, [saved])

  const toggleSave = (meal) => {
    setSaved(prev => {
      const exists = prev.find(item => item.idMeal === meal.idMeal)
      if (exists) {
        return prev.filter(item => item.idMeal !== meal.idMeal)
      }
      return [...prev, meal]
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
        toggleSave,
        removeSaved,
        isSaved,
      }}
    >
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}
