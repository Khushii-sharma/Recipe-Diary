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
    <Link href={`/recipe/${meal.idMeal}`}>
      <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">
        
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        

        {/* Content */}
        <div className="p-4">
            <div className="flex items-center justify-between">
    
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 pr-2">
                {meal.strMeal}
                </h3>

                <button
                onClick={handleSave}
                className="p-2 rounded-full hover:bg-orange-50 transition"
                >
                <Heart
                    size={18}
                    className={
                    isSaved(meal.idMeal)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-400"
                    }
                />
                </button>

            </div>
          

          <p className="text-sm text-gray-500 mt-1">
            {meal.strCategory} • {meal.strArea}
          </p>

          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {meal.strInstructions}
          </p>

          <div className="mt-4 inline-block text-orange-600 font-medium text-sm group-hover:underline">
            View Recipe →
          </div>
        </div>
      </div>
    </Link>
  )
}
