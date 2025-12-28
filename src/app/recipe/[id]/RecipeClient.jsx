"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { useSaved } from "@/context/SavedContext"

// ---------------- INGREDIENTS ----------------
function getIngredients(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim()} ${ingredient.trim()}`)
    }
  }
  return ingredients
}

// ---------------- CLEAN INSTRUCTIONS ----------------
function cleanInstructions(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && !/^\d+$/.test(line))
    .join(" ")
}

export default function RecipeClient({ meal }) {
  const ingredients = getIngredients(meal)
  const instructions = cleanInstructions(meal.strInstructions)
  const { toggleSave, isSaved } = useSaved()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* HERO IMAGE */}
      <div className="relative w-full h-105 rounded-sm overflow-hidden shadow-lg">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* TITLE */}
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {meal.strMeal}
        </h1>

        <button
          onClick={() => toggleSave(meal)}
          className="flex items-center gap-2 mt-4 px-4 py-2 border rounded-full"
        >
          <Heart
            size={18}
            className={
              isSaved(meal.idMeal)
                ? "fill-orange-500 text-orange-500"
                : "text-gray-400"
            }
          />
          <span>
            {isSaved(meal.idMeal) ? "Saved" : "Save"}
          </span>
        </button>

        <p className="mt-2 text-gray-600">
          {meal.strCategory} • {meal.strArea}
        </p>
      </div>

      {/* CONTENT GRID */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* INGREDIENTS */}
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {ingredients.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}
        <div className="md:col-span-2 bg-white rounded-sm shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {instructions}
          </p>
        </div>
      </div>

      {/* VIDEO */}
      {meal.strYoutube && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Video Tutorial</h2>
          <div className="aspect-video rounded-sm overflow-hidden">
            <iframe
              src={meal.strYoutube.replace("watch?v=", "embed/")}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
