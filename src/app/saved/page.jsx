"use client"

import { useSaved } from "@/context/SavedContext"
import RecipeCard from "@/components/RecipeCard"

export default function SavedPage() {
  const { saved } = useSaved()

  if (saved.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-500">
        No saved recipes yet
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Saved Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {saved.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  )
}
