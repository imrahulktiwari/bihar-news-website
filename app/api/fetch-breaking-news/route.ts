import { createClient } from "@/lib/supabase/server"
import { parseNDTVFeed } from "@/lib/rss-parser"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    console.log(`[v0] Fetching news - category: ${category}, page: ${page}, limit: ${limit}`)

    const supabase = await createClient()

    // Build query
    let query = supabase.from("breaking_news").select("*", { count: "exact" })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    const offset = (page - 1) * limit
    const { data, error, count } = await query
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("[v0] Database query error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`[v0] Fetched ${data?.length || 0} articles, total count: ${count}`)

    return NextResponse.json({
      success: true,
      articles: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: page * limit < (count || 0),
    })
  } catch (error) {
    console.error("[v0] Error in fetch-breaking-news:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    console.log("[v0] Starting NDTV feed update...")

    const articles = await parseNDTVFeed()

    if (articles.length === 0) {
      return NextResponse.json({ error: "No articles found" }, { status: 404 })
    }

    console.log(`[v0] Fetched ${articles.length} articles from NDTV`)

    const supabase = await createClient()

    const articlesToInsert = articles.map((article) => {
      let publishedAt = article.publishedAt
      if (isNaN(publishedAt.getTime())) {
        console.warn(`[v0] Invalid publishedAt date, using current time`)
        publishedAt = new Date()
      }
      return {
        title: article.title,
        description: article.description,
        content: article.content,
        image_url: article.imageUrl,
        source_url: article.sourceUrl,
        source_name: article.sourceName,
        category: article.category,
        published_at: publishedAt.toISOString(),
        is_featured: true,
      }
    })

    const { data, error } = await supabase
      .from("breaking_news")
      .upsert(articlesToInsert, { onConflict: "source_url" })
      .select()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`[v0] Saved ${data?.length || 0} articles to database`)

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      articles: data,
    })
  } catch (error) {
    console.error("[v0] Error updating feed:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
