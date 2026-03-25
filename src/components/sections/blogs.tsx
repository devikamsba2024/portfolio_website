"use client"

import { motion } from "framer-motion"
import { CardContent, CardTitle } from "@/components/ui/card"
import { ExternalLink, CalendarDays } from "lucide-react"
import Image from "next/image"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { useEffect, useState } from "react"
import { MediumPost, formatMediumDate } from "@/lib/medium"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export function Blogs() {
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/medium")
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="blogs" className="relative min-h-screen flex flex-col justify-center py-20 bg-background text-foreground overflow-hidden section-scroll-snap">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">Latest Articles</h2>
          <p className="text-muted-foreground">Thoughts on AI, technology, and the future.</p>
        </div>

        {loading ? (
          <div className="flex gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-none bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:px-0 scrollbar-hide"
          >
            {posts.map((post) => (
              <motion.div
                key={post.guid}
                variants={itemVariants}
                className="snap-center shrink-0 w-[85vw] md:w-[600px]"
              >
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <SpotlightCard
                    className="h-full bg-card/60 backdrop-blur-md border border-border/50 rounded-none group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 hover:border-purple-500/50"
                    spotlightColor="rgba(168, 85, 247, 0.08)"
                  >
                    <div className="p-0 mb-6 overflow-hidden relative aspect-video">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted flex items-center justify-center">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 pt-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground tracking-widest bg-muted/30 px-2 py-1 rounded-sm border border-border/30">
                          <CalendarDays className="w-3 h-3" />
                          {formatMediumDate(post.pubDate)}
                        </div>
                        <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-purple-500 transition-all duration-200" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-violet-600 transition-all duration-300">
                        {post.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                        {post.description}
                      </p>
                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.categories.slice(0, 3).map((cat) => (
                            <span key={cat} className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-2 py-1 rounded-sm border border-border/30">
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </SpotlightCard>
                </a>
              </motion.div>
            ))}
            <div className="w-4 shrink-0" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
