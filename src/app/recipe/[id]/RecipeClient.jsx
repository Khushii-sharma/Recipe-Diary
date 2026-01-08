"use client"

import Image from "next/image"
import { Heart, PlayCircle, Utensils, Globe, ChevronRight } from "lucide-react"
import { useSaved } from "@/context/SavedContext"

// ---------------- HELPER: GET INGREDIENTS ----------------
function getIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || "As needed"
      })
    }
  }
  return ingredients
}

// ---------------- HELPER: CLEAN INSTRUCTIONS ----------------
function cleanInstructions(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && !/^\d+$/.test(line))
}

export default function RecipeClient({ meal }) {
  const ingredients = getIngredients(meal)
  const instructions = cleanInstructions(meal.strInstructions)
  const { toggleSave, isSaved } = useSaved()

  const saved = isSaved(meal.idMeal)

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION: Responsively adjusts height */}
      <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Floating Action Header on Image */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 lg:p-12 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 bg-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {meal.strCategory}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Globe size={12} /> {meal.strArea}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-lg">
                {meal.strMeal}
              </h1>
            </div>

            <button
              onClick={() => toggleSave(meal)}
              className={`
                flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-xl
                ${saved ? "bg-orange-600 text-white" : "bg-white text-gray-900 hover:bg-orange-50"}
              `}
            >
              <Heart size={20} className={saved ? "fill-white" : ""} />
              {saved ? "Saved" : "Save Recipe"}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Ingredients (Sticky on desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-orange-50 rounded-3xl p-6 sm:p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Utensils className="text-orange-600" /> Ingredients
              </h2>
              <ul className="space-y-4">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between text-gray-700 border-b border-orange-200/50 pb-3 last:border-0">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-orange-700 font-bold text-sm bg-white px-3 py-1 rounded-lg shadow-sm border border-orange-100">
                      {item.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* RIGHT: Instructions */}
          <main className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to make it</h2>
            <div className="space-y-8">
              {instructions.map((step, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* 3. VIDEO SECTION: Now inside the main flow, fully responsive */}
            {meal.strYoutube && (
              <div className="mt-16 p-6 sm:p-10 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <PlayCircle className="text-red-500" /> Video Tutorial
                    </h2>
                    <p className="text-slate-400 mt-1">Watch the step-by-step preparation guide</p>
                  </div>
                  <a 
                    href={meal.strYoutube} 
                    target="_blank" 
                    className="text-sm font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition"
                  >
                    Open in YouTube <ChevronRight size={16} />
                  </a>
                </div>

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <iframe
                    src={meal.strYoutube.replace("watch?v=", "embed/")}
                    title="YouTube Video"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
      
      {/* Footer Spacer for Mobile */}
      <div className="h-10 sm:hidden" />
    </div>
  )
}