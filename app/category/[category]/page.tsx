"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import BreakingNewsBar from "@/components/breaking-news-bar"
import Footer from "@/components/footer"
import NewsGrid from "@/components/news-grid"
import Sidebar from "@/components/sidebar"
import { newsData } from "@/lib/news-data"
import type { NewsItem } from "@/lib/types"
import { useParams } from "next/navigation"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark"
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    const categoryName = decodeURIComponent(category as string)
    const filtered =
      categoryName.toLowerCase() === "all"
        ? newsData
        : newsData.filter((item) => item.category.toLowerCase() === categoryName.toLowerCase())
    setNews(filtered)
    setSelectedCategory(categoryName)
  }, [category])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Header
        selectedCategory={selectedCategory.toLowerCase()}
        onCategoryChange={(cat) => (window.location.href = `/category/${cat}`)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <BreakingNewsBar />

      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold capitalize">{selectedCategory} News</h1>
            <p className="text-muted-foreground mt-2">
              {news.length} articles found in {selectedCategory} category
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsGrid news={news} />
            </div>

            <aside className="lg:col-span-1">
              <Sidebar trending={news.slice(0, 5)} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
