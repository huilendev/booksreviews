//app/page.tsx
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { books } from "@/lib/books"

export default function Home() {
  const [search, setSearch] = useState("")

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
    )
  }, [search])

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2">SPOOKY REVIEWS</h1>
          <p className="text-sm text-gray-600 font-sans">A minimalist literary journal</p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="border-b border-black/10 py-8 px-4 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search books…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-black/20 rounded-none focus:outline-none focus:ring-1 focus:ring-black text-base font-sans"
          />
        </div>
      </div>

      {/* Books Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredBooks.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-gray-500 font-sans">No books found.</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link href={`/books/${book.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="group cursor-pointer transition-all duration-300"
                    >
                      {/* Book Cover */}
                      <div className="relative aspect-[3/4] mb-4 overflow-hidden border border-black/10">
                        <Image
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          fill
                          className="object-cover group-hover:opacity-95 transition-opacity"
                        />
                      </div>

                      {/* Book Info */}
                      <div className="space-y-2">
                        <h2 className="font-serif text-lg font-bold leading-tight group-hover:underline">
                          {book.title}
                        </h2>
                        <p className="text-sm text-gray-700 font-sans">{book.author}</p>
                        <p className="text-xs text-gray-500 font-sans">{book.year}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {book.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 border border-black/10 text-black/70 font-sans"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
