"use client"

import { Pizza, Hamburger, Coffee, Salad } from "lucide-react"
import Link from "next/link"
import { useSearch } from "@/context/SearchContext"

export default function Dashboard() {
    const { isSearchActive, setIsSearchActive } = useSearch()

  return (
    <div 
      className={`min-h-screen transition ${isSearchActive ? "opacity-30" : ""}`} onClick={() => setIsSearchActive(false)}>
      
        <div className="bg-[#f1eeec] min-h-screen px-4 py-12 flex items-center justify-center">
      
            <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-10 overflow-hidden">

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#FFD6CC] to-transparent opacity-30 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                {/* Text */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1F2933] leading-tight">
                    Discover recipes that
                    <span className="text-[#FF7A5C]"> match your mood</span>
                    </h1>

                    <p className="mt-4 text-gray-600 text-lg">
                    Explore delicious recipes, save your favorites, and cook
                    with confidence — all in one place.
                    </p>

                    <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsSearchActive(true)
                    }}
                    className="inline-block mt-6 rounded-md bg-[#FF7A5C] px-6 py-3 text-white font-medium hover:bg-[#F56548] transition shadow-md"
                    >
                    Start Cooking
                    </button>

                </div>

                {/* Icons */}
                <div className="relative hidden md:block">
                    <Pizza className="absolute top-0 left-10 text-[#FFD6CC] w-20 h-20 rotate-[-10deg]" />
                    <Hamburger className="absolute top-10 right-10 text-[#FFD6CC] w-24 h-24 rotate-12" />
                    <Coffee className="absolute bottom-10 left-16 text-[#FFD6CC] w-20 h-20" />
                    <Salad className="absolute bottom-0 right-20 text-[#FFD6CC] w-24 h-24" />
                </div>

                </div>
            </div>
        </div>
    </div>
    
  )
}
