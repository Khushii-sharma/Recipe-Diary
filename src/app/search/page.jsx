"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import { detectCategoryFromQuery } from "@/lib/searchUtils";

// 1. Move the search logic into a sub-component
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchRecipes = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    fetchRecipes();
  }, [query]);

  const categoryIntent = detectCategoryFromQuery(query);

  const finalRecipes = recipes.filter((meal) => {
    if (categoryIntent === "All") return true;

    if (categoryIntent === "Vegetarian") {
      return meal.strCategory === "Vegetarian";
    }

    if (categoryIntent === "Dessert") {
      return meal.strCategory === "Dessert";
    }

    if (categoryIntent === "NonVeg") {
      return (
        meal.strCategory !== "Vegetarian" &&
        meal.strCategory !== "Dessert"
      );
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Results for <span className="text-orange-600">“{query}”</span>
      </h1>

      {finalRecipes.length === 0 ? (
        <p className="text-gray-500">No matching recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {finalRecipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

// 2. Export the main page wrapped in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-100">
        <p className="text-gray-400 animate-pulse font-medium">Searching for recipes...</p>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}