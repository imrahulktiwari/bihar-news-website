"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-foreground text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                BN
              </div>
              <span className="font-bold text-xl">BiharNews.live</span>
            </div>
            <p className="text-sm opacity-90">Your trusted source for news from Bihar, India, and around the world.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 hover:bg-primary-foreground hover:text-primary rounded transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-primary-foreground hover:text-primary rounded transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-primary-foreground hover:text-primary rounded transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-primary-foreground hover:text-primary rounded transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground opacity-20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {currentYear} BiharNews.live. All rights reserved.</p>
          <p className="mt-2 text-xs">Made with care for news enthusiasts across Bihar and India.</p>
        </div>
      </div>
    </footer>
  )
}
