"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface BreakingNews {
  id: string
  title: string
  description: string
  image_url: string
  published_at: string
}

export default function BreakingNewsBar() {
  const [news, setNews] = useState<BreakingNews[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/fetch-breaking-news?page=1&limit=10")
        if (response.ok) {
          const data = await response.json()
          if (data.articles && data.articles.length > 0) {
            setNews(data.articles)
            console.log("[v0] Loaded breaking news:", data.articles.length)
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching breaking news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBreakingNews()

    // Refresh every 5 minutes
    const interval = setInterval(fetchBreakingNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (news.length === 0) return

    const currentNews = news[currentIndex]
    const fullText = currentNews.title
    let charIndex = 0

    setDisplayedText("")

    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentIndex, news])

  useEffect(() => {
    if (news.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [news.length])

  if (loading || news.length === 0) {
    return (
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 animate-slide-in">
            <span className="inline-block bg-primary-foreground text-primary px-3 py-1 rounded font-bold text-xs md:text-sm flex-shrink-0">
              LIVE
            </span>
            <p className="text-sm md:text-base font-semibold">Loading breaking news...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentNews = news[currentIndex]

  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3">
          <span className="inline-block bg-primary-foreground text-primary px-3 py-1 rounded font-bold text-xs md:text-sm flex-shrink-0 animate-pulse">
            LIVE
          </span>

          <div className="flex-1 overflow-hidden">
            <Link
              href={`/article/${currentNews.id}`}
              className="inline-block text-sm md:text-base font-semibold hover:underline transition-all duration-300 hover:opacity-80 animate-fade-in min-h-[1.5rem]"
            >
              Breaking: {displayedText}
              {displayedText.length < currentNews.title.length && <span className="animate-blink">|</span>}
            </Link>
          </div>

          {/* Article counter */}
          <div className="flex-shrink-0 text-xs md:text-sm font-semibold opacity-75">
            {currentIndex + 1}/{news.length}
          </div>
        </div>
      </div>
    </div>
  )
}
