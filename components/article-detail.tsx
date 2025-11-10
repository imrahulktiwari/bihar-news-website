"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Share2, Facebook, Twitter } from "lucide-react"
import type { NewsItem } from "@/lib/types"

interface ArticleDetailProps {
  article: NewsItem
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4 flex-wrap">
            <span className="bg-primary text-primary-foreground px-4 py-1 rounded text-sm font-semibold">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

          <div className="flex items-center justify-between py-4 border-t border-b border-border">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Source: {article.source}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-secondary rounded transition-colors" aria-label="Share on Facebook">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-secondary rounded transition-colors" aria-label="Share on Twitter">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-secondary rounded transition-colors" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-auto object-cover" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{article.summary}</p>

          <div className="bg-card border border-border p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4">Article Content</h2>
            <p className="leading-relaxed text-foreground">
              {article.content ||
                "Full article content would appear here. This is a demonstration of the article detail page with SEO-optimized structure. The page includes the article title, publication date, source information, hero image, and the complete article content with proper formatting and semantic HTML markup for search engines."}
            </p>
          </div>

          <div className="bg-secondary border border-border p-6 rounded-lg">
            <h3 className="font-bold mb-2">About this story</h3>
            <p className="text-sm text-muted-foreground">
              Published on {new Date(article.date).toLocaleDateString("en-IN")} | Source: {article.source}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
