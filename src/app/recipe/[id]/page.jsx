import RecipeClient from "./RecipeClient"
import { Suspense } from "react";

async function getRecipe(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    { cache: "no-store" }
  )
  const data = await res.json()
  return data.meals?.[0]
}

export default async function RecipeDetail({ params }) {
  const { id } = await params
  const meal = await getRecipe(id)

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Recipe not found</h1>
        <p className="text-gray-500 mt-2">The meal you are looking for doesn't exist or has been removed.</p>
        <a href="/" className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition">
          Back to Home
        </a>
      </div>
    )
  }

  return (
    // Max-width container keeps the content from stretching too far on 4K monitors
    <main className="min-h-screen bg-white">
       <RecipeClient meal={meal} />
    </main>
  )
}