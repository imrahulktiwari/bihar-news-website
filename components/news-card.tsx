"use client"

import Link from "next/link"
import { Calendar, MapPin, Share2 } from "lucide-react"
import type { NewsItem } from "@/lib/types"

interface NewsCardProps {
  item: NewsItem
}

export default function NewsCard({ item }: NewsCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Link href={`/article/${item.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 group cursor-pointer animate-scale-in">
        <div className="relative overflow-hidden h-48 md:h-56 bg-secondary">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
              {item.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.summary}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{item.source}</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              if (navigator.share) {
                navigator.share({
                  title: item.title,
                  text: item.summary,
                  url: window.location.href,
                })
              }
            }}
            className="text-primary hover:text-primary-foreground hover:bg-primary w-full py-2 rounded flex items-center justify-center gap-2 transition-colors text-sm font-medium"
            aria-label={`Share "${item.title}" article`}
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </Link>
  )
}
