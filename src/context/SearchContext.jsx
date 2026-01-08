"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [query, setQuery] = useState("")
  const searchInputRef = useRef(null)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 1. Sync Query with URL (Useful if user shares the link or goes back/forward)
  useEffect(() => {
    const q = searchParams.get("q")
    if (q) setQuery(q)
  }, [searchParams])

  // 2. Global Shortcut: Pressing '/' to search (Standard Web Pattern)
  useEffect(() => {
    const onKeyDown = (e) => {
      // Focus search if '/' is pressed and user isn't typing in another input
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault()
        setIsSearchActive(true)
        searchInputRef.current?.focus()
      }
      
      if (e.key === "Escape") {
        setIsSearchActive(false)
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // 3. Clear focus when navigating away
  useEffect(() => {
    setIsSearchActive(false)
  }, [pathname])

  const submitSearch = () => {
    if (!query.trim()) return
    
    // Smoothly blur the input on mobile to hide the keyboard
    searchInputRef.current?.blur()
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
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}