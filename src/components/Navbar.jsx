"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/context/SearchContext"
import { useEffect } from "react"
import { X, Search, Heart, LogIn, LogOut } from "lucide-react"
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
      {/* --- BACKDROP OVERLAY --- */}
      {/* This creates the "fadeness" and closes search when clicked outside */}
      {isSearchActive && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsSearchActive(false)}
        />
      )}

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4">
          
          {/* LOGO SECTION */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="md:w-9 md:h-9 transition-transform group-hover:scale-110"
              priority
            />
            <span className="hidden md:block text-xl lg:text-2xl font-extrabold text-orange-600 tracking-tight">
              RecipeDiary
            </span>
          </Link>

          {/* SEARCH BOX */}
          {/* Added dynamic z-index to keep search above the fadeness */}
          <div className={`relative flex-1 max-w-xs sm:max-w-md group transition-all duration-300 ${isSearchActive ? "z-51" : "z-0"}`}>
            <Input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchActive(true)}
              onKeyDown={(e) => e.key === "Enter" && submitSearch()}
              placeholder="Search recipes..."
              className="
                pr-14 md:pr-16 pl-9 md:pl-4
                h-10 md:h-11
                bg-gray-50 md:bg-white text-gray-900 
                border-gray-200 
                /* Focus Ring Customization */
                focus-visible:ring-2 
                focus-visible:ring-orange-500 
                focus-visible:border-orange-500
                rounded-full md:rounded-lg
                transition-all duration-300
              "
            />

            {/* Mobile Search Icon (Left side) */}
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 md:hidden" 
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
              {query && (
                <X
                  size={18}
                  className="text-gray-400 cursor-pointer hover:text-gray-600 p-0.5"
                  onClick={() => setQuery("")}
                />
              )}
              {/* Desktop Separator and Search Icon */}
              <div className="hidden md:block w-px h-4 bg-gray-200 mx-1" />
              <Search
                size={18}
                className="hidden md:block text-gray-400 cursor-pointer hover:text-orange-500 transition-colors"
                onClick={submitSearch}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-1 md:gap-3">
            {!user ? (
              <button
                onClick={() => setShowLogin(true)}
                className="p-2 md:px-4 md:py-2 md:bg-gray-100 text-gray-700 md:text-black rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                title="Login"
              >
                <LogIn size={20} className="md:hidden" />
                <span className="hidden md:block font-medium">Login</span>
              </button>
            ) : (
              <button
                onClick={logout}
                className="p-2 md:px-4 md:py-2 md:bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                title="Logout"
              >
                <LogOut size={20} className="md:hidden" />
                <span className="hidden md:block font-medium text-red-600">Logout</span>
              </button>
            )}

            <Link href="/saved">
              <Button 
                variant="default" 
                className="bg-orange-500 hover:bg-orange-600 rounded-full md:rounded-lg px-3 md:px-4 shadow-sm"
              >
                <Heart size={20} className="md:mr-2" />
                <span className="hidden md:block">Saved</span>
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