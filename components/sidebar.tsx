"use client"

import Link from "next/link"
import type { NewsItem } from "@/lib/types"

interface SidebarProps {
  trending: NewsItem[]
}

export default function Sidebar({ trending }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Trending Section */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-xl font-bold mb-4 pb-3 border-b border-border">Trending Now</h2>
        <div className="space-y-4">
          {trending.map((item, index) => (
            <Link
              key={item.id}
              href={`/article/${item.id}`}
              className="flex gap-3 hover:text-primary transition-colors group"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{new Date(item.date).toLocaleDateString("en-IN")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="bg-secondary border border-border rounded-lg p-5 h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-semibold">Advertisement</p>
          <p className="text-xs text-muted-foreground mt-2">Ad Placement</p>
        </div>
      </div>
    </aside>
  )
}
