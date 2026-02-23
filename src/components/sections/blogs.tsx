"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, CalendarDays } from "lucide-react"
import Link from "next/link"

const blogs = [
  {
    id: "1",
    title: "Beyond Reason: Unveiling the Unseen Powers of Gemini 3",
    date: "November 20, 2025",
    description: "A deep dive into Google's Gemini 3 release, its benchmarking performance on Humanity’s Last Exam, and the new 'Deep Think' architecture.",
    link: "https://medium.com/@devikanekkalapu7/beyond-reason-unveiling-the-unseen-powers-of-gemini-3-35f854f197ed",
  },
  {
    id: "2",
    title: "What Makes Claude Skills Different from Agents, and Why It Matters",
    date: "November 5, 2025",
    description: "Examining the evolution of large language models from passive chatbots to active agents that can browse the web and execute complex tasks.",
    link: "https://medium.com/@devikanekkalapu7/what-makes-claude-skills-different-from-agents-and-why-it-matters-46a3df2bcec1",
  }
]

export function Blogs() {
  return (
    <section id="blogs" className="relative min-h-[50vh] flex flex-col justify-center py-20 bg-background section-scroll-snap overflow-hidden">

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4 uppercase">Latest Articles</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Thoughts on AI, technology, and the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={blog.link} target="_blank" className="group block h-full">
                <Card className="h-full bg-card/60 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-lg hover:border-accent/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
                        <CalendarDays className="w-3 h-3" />
                        {blog.date}
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base line-clamp-3">
                      {blog.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
