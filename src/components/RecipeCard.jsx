"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useSaved } from "@/context/SavedContext"

export default function RecipeCard({ meal }) {
  const { toggleSave, isSaved } = useSaved()
  
  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation() 
    toggleSave(meal)
  }

  return (
    <Link href={`/recipe/${meal.idMeal}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 h-full flex flex-col">
        
        {/* Image Container: Using aspect-video for consistent sizing across screens */}
        <div className="relative aspect-4/3 sm:aspect-video w-full overflow-hidden">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Category Badge - visible on the image for mobile-first flair */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm">
            {meal.strCategory}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base md:text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors">
              {meal.strMeal}
            </h3>

            <button
              onClick={handleSave}
              className="p-2 -mr-2 rounded-full hover:bg-orange-50 active:scale-90 transition-all shrink-0"
              aria-label="Save Recipe"
            >
              <Heart
                size={20}
                className={
                  isSaved(meal.idMeal)
                    ? "fill-orange-500 text-orange-500"
                    : "text-gray-400"
                }
              />
            </button>
          </div>

          <p className="text-xs md:text-sm font-medium text-gray-400 mt-1">
            {meal.strArea} Cuisine
          </p>

          {/* Instructions: Hidden on very small screens or clamped tighter to save vertical space */}
          <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed italic">
            &ldquo;{meal.strInstructions}&rdquo;
          </p>

          {/* Footer: Pushed to bottom */}
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-orange-600 font-bold text-xs md:text-sm flex items-center gap-1">
              View Recipe 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}