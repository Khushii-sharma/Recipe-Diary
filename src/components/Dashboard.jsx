"use client"

import { Pizza, Hamburger, Coffee, Salad } from "lucide-react"
import { useSearch } from "@/context/SearchContext"

export default function Dashboard() {
    const { isSearchActive, setIsSearchActive } = useSearch()

    return (
        <div 
            className={`min-h-screen transition duration-300 ${isSearchActive ? "opacity-30 pointer-events-none" : ""}`} 
            onClick={() => setIsSearchActive(false)}
        >
            {/* Outer Wrapper: Adjusts padding for mobile (py-6) vs desktop (py-12) */}
            <div className="bg-[#f1eeec] min-h-screen px-4 py-6 md:py-12 flex items-center justify-center">
                
                {/* Hero Card: w-full ensures it doesn't overflow; max-w-5xl keeps it elegant on desktop */}
                <div className="relative w-full max-w-5xl bg-white rounded-2xl md:rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 sm:p-10 md:p-16 overflow-hidden">

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-[#FFD6CC] to-transparent opacity-30 pointer-events-none" />

                    {/* Content Grid */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                        {/* Text Section: Centered on mobile, left-aligned on desktop */}
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1F2933] leading-tight">
                                Discover recipes that
                                <span className="text-[#FF7A5C]"> match your mood</span>
                            </h1>

                            <p className="mt-4 text-gray-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
                                Explore delicious recipes, save your favorites, and cook
                                with confidence — all in one place.
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsSearchActive(true)
                                }}
                                className="w-full sm:w-auto inline-block mt-8 rounded-full bg-[#FF7A5C] px-8 py-4 text-white font-bold hover:bg-[#F56548] hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                Start Cooking
                            </button>
                        </div>

                        {/* Icons: Now visible but simplified on mobile, full display on desktop */}
                        <div className="relative h-48 md:h-80 w-full">
                            {/* Pizza & Hamburger move slightly inward on mobile */}
                            <Pizza className="absolute top-0 left-4 md:left-10 text-[#FFD6CC]/60 md:text-[#FFD6CC] w-16 h-16 md:w-24 md:h-24 rotate-[-10deg]" />
                            <Hamburger className="absolute top-4 right-4 md:right-10 text-[#FFD6CC]/60 md:text-[#FFD6CC] w-20 h-20 md:w-28 md:h-28 rotate-12" />
                            
                            {/* Coffee & Salad only appear on larger mobile screens/tablets to avoid clutter */}
                            <Coffee className="absolute bottom-4 left-10 md:left-16 text-[#FFD6CC]/60 md:text-[#FFD6CC] w-16 h-16 md:w-20 md:h-20 hidden sm:block" />
                            <Salad className="absolute bottom-0 right-10 md:right-20 text-[#FFD6CC]/60 md:text-[#FFD6CC] w-20 h-20 md:w-28 md:h-28 hidden sm:block" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}