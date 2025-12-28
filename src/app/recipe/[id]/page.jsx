import RecipeClient from "./RecipeClient"

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
    return <div className="p-10 text-center">Recipe not found</div>
  }

  return <RecipeClient meal={meal} />
}
