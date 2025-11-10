// Professional RSS feed parser utility
interface ParsedArticle {
  title: string
  description: string
  content: string
  imageUrl: string | null
  sourceUrl: string
  sourceName: string
  category: string
  publishedAt: Date
}

export async function parseNDTVFeed(): Promise<ParsedArticle[]> {
  try {
    // Fetch RSS feed from NDTV
    const response = await fetch("https://feeds.feedburner.com/ndtvnews-top-stories", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch NDTV feed: ${response.statusText}`)
    }

    const xmlText = await response.text()
    const articles = parseXML(xmlText)
    return articles
  } catch (error) {
    console.error("[v0] Error parsing NDTV feed:", error)
    return []
  }
}

function parseXML(xml: string): ParsedArticle[] {
  const articles: ParsedArticle[] = []

  // Extract all item nodes
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  const items = xml.match(itemRegex) || []

  items.forEach((item) => {
    try {
      // Extract fields using regex
      const titleMatch = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)
      const descMatch = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/)
      const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)
      const imageMatch = item.match(/<image>([\s\S]*?)<\/image>/)
      const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)

      if (titleMatch && linkMatch) {
        // Clean HTML tags from description
        const description = descMatch ? cleanHTML(descMatch[1]) : "Latest news from NDTV"
        const content = contentMatch ? cleanHTML(contentMatch[1]) : description

        let publishedDate = new Date()
        if (pubDateMatch) {
          const parsedDate = new Date(pubDateMatch[1].trim())
          // Validate the parsed date is not invalid
          if (!isNaN(parsedDate.getTime())) {
            publishedDate = parsedDate
          } else {
            console.warn(`[v0] Invalid date format: ${pubDateMatch[1]}`)
          }
        }

        articles.push({
          title: decodeHTML(titleMatch[1].trim()),
          description: description.substring(0, 200),
          content: content.substring(0, 1000),
          imageUrl: imageMatch ? extractImageUrl(imageMatch[1]) : "/news-collage.png",
          sourceUrl: linkMatch[1].trim(),
          sourceName: "NDTV News",
          category: "World",
          publishedAt: publishedDate,
        })
      }
    } catch (error) {
      console.error("[v0] Error parsing item:", error)
    }
  })

  return articles.slice(0, 10) // Return top 10 articles
}

function cleanHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove all HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim()
}

function decodeHTML(html: string): string {
  const entities: Record<string, string> = {
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&amp;": "&",
  }
  return html.replace(/&[a-z]+;/gi, (entity) => entities[entity] || entity)
}

function extractImageUrl(imageXML: string): string | null {
  const urlMatch = imageXML.match(/<url>([\s\S]*?)<\/url>/)
  return urlMatch ? urlMatch[1].trim() : null
}
