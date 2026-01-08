"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import { detectCategoryFromQuery } from "@/lib/searchUtils";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  const categoryIntent = detectCategoryFromQuery(query);

  const finalRecipes = recipes.filter((meal) => {
    if (categoryIntent === "All") return true;
    if (categoryIntent === "Vegetarian") return meal.strCategory === "Vegetarian";
    if (categoryIntent === "Dessert") return meal.strCategory === "Dessert";
    if (categoryIntent === "NonVeg") {
      return meal.strCategory !== "Vegetarian" && meal.strCategory !== "Dessert";
    }
    return true;
  });

  return (
    // Responsive Padding: px-4 on mobile, px-8 on tablet, px-12 on desktop
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 md:py-10">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-center sm:text-left">
        Results for <span className="text-orange-600">“{query}”</span>
      </h1>

      {finalRecipes.length === 0 && !loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No matching recipes found.</p>
        </div>
      ) : (
        /* Responsive Grid:
           - 1 column on mobile
           - 2 columns on small tablets (640px+)
           - 3 columns on desktops (1024px+)
           - 4 columns on large screens (1280px+)
        */
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {finalRecipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-gray-400 animate-pulse font-medium">Searching for recipes...</p>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}