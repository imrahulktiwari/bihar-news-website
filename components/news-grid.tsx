"use client"

import NewsCard from "./news-card"
import type { NewsItem } from "@/lib/types"

interface NewsGridProps {
  news: NewsItem[]
}

export default function NewsGrid({ news }: NewsGridProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No news available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.map((item, index) => (
        <div key={item.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
          <NewsCard item={item} />
        </div>
      ))}
    </div>
  )
}
