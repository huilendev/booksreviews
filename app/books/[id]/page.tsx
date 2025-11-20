// app/books/[id]/page.tsx
"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { books } from "@/lib/books"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const book = books.find((b) => b.id === id)

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Book not found</h1>
          <Link href="/" className="text-sm underline font-sans">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.main
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="border-b border-black/10 py-6 px-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sm font-sans text-gray-600 hover:text-black transition-colors">
            ← Back to reviews
          </Link>
        </div>
      </header>

      {/* Book Section */}
      <section className="py-12 px-4 border-b border-black/10">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Cover */}
          <motion.div
            className="md:w-48 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative aspect-[3/4] border border-black/10">
              <Image
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h1 className="font-serif text-4xl font-bold mb-2 leading-tight">{book.title}</h1>
            <p className="text-lg text-gray-700 font-sans mb-1">{book.author}</p>
            <p className="text-sm text-gray-500 font-sans mb-6">{book.year}</p>

            {/* Static Rating */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 font-sans mb-3">Rating:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${
                      star <= Math.floor(book.rating) ? "text-black" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 border border-black/20 text-black/70 font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Review */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-2xl mx-auto prose-review">
          <MarkdownRenderer content={book.review} />
        </div>
      </motion.section>
    </motion.main>
  )
}
