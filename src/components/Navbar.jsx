"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/context/SearchContext"
import { useEffect, useState } from "react"
import { X, Search } from "lucide-react"
import LoginModal from "@/components/LoginModal"
import { useAuth } from "@/context/AuthContext"


export default function Navbar() {
  const {
    isSearchActive,
    setIsSearchActive,
    query,
    setQuery,
    searchInputRef,
    submitSearch,
  } = useSearch()

  const { user, logout, showLogin, setShowLogin } = useAuth()

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchActive])

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-orange-600"
        >
          <Image
            src="/logo.svg"
            alt="RecipeDiary logo"
            width={36}
            height={36}
            priority
          />
          <span>RecipeDiary</span>
        </Link>

        {/* SEARCH */}
        <div className="relative flex-1 max-w-md">
          
          {/* Input */}
          <Input
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            placeholder="Search recipes..."
            className="
              pr-16 pl-4
              bg-white text-gray-900 shadow-sm
              border border-transparent
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-orange-500
              focus-visible:ring-offset-2
              transition
            "
          />

          {/* Clear icon (inside input) */}
          {query && (
            <X
              size={18}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setQuery("")}
            />

          )}

          {/* 🔍 Search icon (right inside input) */}
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-500"
            onClick={submitSearch}
          />

        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gray-300 text-black px-3 py-1 rounded"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="bg-gray-300 text-black px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
          <Link href="/saved">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Saved
            </Button>
          </Link>
        </div>
      </div>
    </nav>
    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
    />
    </>
  )
}
