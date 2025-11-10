"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Header from "@/components/header"
import BreakingNewsBar from "@/components/breaking-news-bar"
import NewsGrid from "@/components/news-grid"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { newsData } from "@/lib/news-data"
import type { NewsItem } from "@/lib/types"

interface FetchedArticle {
  id: string
  title: string
  description: string
  image_url: string
  published_at: string
  category?: string
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(false)

  // Load initial news
  useEffect(() => {
    setMounted(true)
    const isDark = localStorage.getItem("theme") === "dark"
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const fetchNews = useCallback(
    async (pageNum: number, isReset = false) => {
      if (loadingRef.current) return
      loadingRef.current = true
      setLoading(true)

      try {
        console.log(`[v0] Fetching news - page: ${pageNum}, category: ${selectedCategory}`)

        const response = await fetch(`/api/fetch-breaking-news?page=${pageNum}&limit=10&category=${selectedCategory}`)

        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }

        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          const convertedArticles = data.articles.map((article: FetchedArticle) => ({
            id: article.id,
            title: article.title,
            description: article.description,
            image: article.image_url,
            category: article.category || "world",
            date: new Date(article.published_at).toLocaleDateString(),
            author: "NDTV News",
            readTime: "5 min read",
          }))

          if (isReset) {
            setNews(convertedArticles)
          } else {
            setNews((prev) => [...prev, ...convertedArticles])
          }

          setHasMore(data.hasMore)
          console.log(`[v0] Loaded ${convertedArticles.length} articles, hasMore: ${data.hasMore}`)
        }
      } catch (error) {
        console.error("[v0] Error fetching news:", error)
      } finally {
        loadingRef.current = false
        setLoading(false)
      }
    },
    [selectedCategory],
  )

  // Initialize with first page
  useEffect(() => {
    if (!mounted) return
    setPage(1)
    fetchNews(1, true)
  }, [selectedCategory, mounted, fetchNews])

  useEffect(() => {
    if (!hasMore || loading) return

    const observerTarget = document.createElement("div")
    document.body.appendChild(observerTarget)

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingRef.current) {
        const nextPage = page + 1
        setPage(nextPage)
        fetchNews(nextPage, false)
      }
    })

    observer.observe(observerTarget)

    return () => {
      observer.disconnect()
      document.body.removeChild(observerTarget)
    }
  }, [page, hasMore, loading, fetchNews])

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

  if (!mounted) {
    return null
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <BreakingNewsBar />

      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsGrid news={news} />
              {loading && (
                <div className="mt-12 text-center">
                  <div className="inline-block px-8 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              {!hasMore && news.length > 0 && (
                <div className="mt-12 text-center text-muted-foreground">
                  <p>No more news to load</p>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <Sidebar trending={newsData.slice(0, 5)} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
