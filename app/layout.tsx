import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "BiharNews.live - Latest News from Bihar, India & World",
  description:
    "Get breaking news, latest updates on politics, sports, technology, and entertainment from Bihar and across India.",
  keywords: "Bihar news, India news, breaking news, live news",
  openGraph: {
    title: "BiharNews.live",
    description: "Latest News from Bihar, India & World",
    type: "website",
    locale: "en_IN",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#D32F2F" />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
