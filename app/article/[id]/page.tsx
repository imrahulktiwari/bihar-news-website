import Header from "@/components/header"
import BreakingNewsBar from "@/components/breaking-news-bar"
import Footer from "@/components/footer"
import ArticleDetail from "@/components/article-detail"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000"}/api/articles/${id}`,
    )

    if (!response.ok) {
      return {
        title: "Article Not Found",
      }
    }

    const { article } = await response.json()

    return {
      title: `${article.title} - BiharNews.live`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        images: [article.image],
      },
    }
  } catch {
    return {
      title: "Article Not Found",
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params

  try {
    console.log(`[v0] Loading article page for id: ${id}`)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000"}/api/articles/${id}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      console.error(`[v0] Failed to fetch article: ${response.statusText}`)
      notFound()
    }

    const { article } = await response.json()

    return (
      <div>
        <Header selectedCategory="all" onCategoryChange={() => {}} isDarkMode={false} toggleDarkMode={() => {}} />
        <BreakingNewsBar />
        <ArticleDetail article={article} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error(`[v0] Error loading article:`, error)
    notFound()
  }
}
