import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    console.log(`[v0] Fetching article with id: ${id}`)

    const supabase = await createClient()

    const { data, error } = await supabase.from("breaking_news").select("*").eq("id", id).single()

    if (error) {
      console.error(`[v0] Database error fetching article:`, error)
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    if (!data) {
      console.error(`[v0] Article not found for id: ${id}`)
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      article: {
        id: data.id,
        title: data.title,
        description: data.description,
        content: data.content,
        image: data.image_url,
        category: data.category,
        date: new Date(data.published_at).toLocaleDateString(),
        author: data.source_name || "News Source",
        readTime: "5 min read",
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
