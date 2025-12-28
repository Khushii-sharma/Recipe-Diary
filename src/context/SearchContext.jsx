"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [query, setQuery] = useState("")
  const searchInputRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchActive(false)
        setQuery("")
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const router = useRouter()
  const submitSearch = () => {
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <SearchContext.Provider
      value={{
        isSearchActive,
        setIsSearchActive,
        query,
        setQuery,
        searchInputRef,
        submitSearch, 
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
