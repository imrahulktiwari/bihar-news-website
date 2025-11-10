"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const categories = ["all", "Bihar", "India", "World", "Politics", "Sports", "Technology", "Entertainment"]

export default function CategoryNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      <Link
        href="/"
        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
          pathname === "/" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
        }`}
      >
        Home
      </Link>
      {categories.slice(1).map((category) => (
        <Link
          key={category}
          href={`/category/${category.toLowerCase()}`}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
            pathname === `/category/${category.toLowerCase()}`
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-foreground"
          }`}
        >
          {category}
        </Link>
      ))}
    </nav>
  )
}
