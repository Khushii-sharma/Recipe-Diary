export function detectCategoryFromQuery(query) {
  const q = query.toLowerCase()

  if (q.includes("veg") || q.includes("vegetarian")) {
    return "Vegetarian"
  }

  if (q.includes("dessert") || q.includes("sweet")) {
    return "Dessert"
  }

  if (
    q.includes("nonveg") ||
    q.includes("chicken") ||
    q.includes("mutton") ||
    q.includes("meat")
  ) {
    return "NonVeg"
  }

  return "All"
}
