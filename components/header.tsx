"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Moon, Sun } from "lucide-react"

interface HeaderProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const categories = ["all", "Bihar", "India", "World", "Politics", "Sports", "Technology", "Entertainment"]

export default function Header({ selectedCategory, onCategoryChange, isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              BN
            </div>
            <span className="font-bold text-xl hidden sm:inline">BiharNews.live</span>
            <span className="font-bold text-lg sm:hidden">BN</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="md:hidden p-2 hover:bg-secondary rounded-lg" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5" />
            </button>

            <button className="md:hidden p-2 hover:bg-secondary rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar Mobile */}
        {searchOpen && (
          <div className="md:hidden mb-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block overflow-x-auto`}>
          <div className="flex gap-2 md:gap-4 pb-2 md:pb-0 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category)
                  setIsMenuOpen(false)
                }}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
