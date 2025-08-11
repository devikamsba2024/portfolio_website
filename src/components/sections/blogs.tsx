"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

// Dummy blogs data
const dummyBlogs = [
  {
    id: "1",
    title: "The Rise of Autonomous System Intelligence (ASI)",
    excerpt: "Exploring the next frontier in AI: Autonomous System Intelligence and its potential to revolutionize how machines think, learn, and interact with the world.",
    publishedDate: "2024-01-15",
    tags: ["ASI", "AI", "Autonomous Systems", "Machine Learning"],
    slug: "rise-of-autonomous-system-intelligence",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1673187730317-4973d8d0d8e8?w=800&h=600&fit=crop",
      alt: "Autonomous System Intelligence"
    }
  },
  {
    id: "2",
    title: "Advanced AI Agents: Beyond Traditional Chatbots",
    excerpt: "How modern AI agents are evolving from simple chatbots to sophisticated autonomous systems capable of complex reasoning and decision-making.",
    publishedDate: "2024-01-10",
    tags: ["AI Agents", "Chatbots", "Autonomous Systems", "AI"],
    slug: "advanced-ai-agents-beyond-chatbots",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      alt: "Advanced AI Agents"
    }
  },
  {
    id: "3",
    title: "The Future of AI Research: Trends and Predictions",
    excerpt: "An analysis of emerging trends in AI research, from large language models to autonomous systems, and what the future holds for artificial intelligence.",
    publishedDate: "2024-01-05",
    tags: ["AI Research", "Trends", "Machine Learning", "Future Tech"],
    slug: "future-of-ai-research-trends",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "AI Research Future"
    }
  }
]

export default function Blogs() {
  return (
    <section id="blogs" className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, research, and insights on the latest developments in AI and autonomous systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={blog.featuredImage.url}
                      alt={blog.featuredImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(blog.publishedDate)}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-3 line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="ghost" className="w-full group">
                    <a href={`/blog/${blog.slug}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <a href="/blog">
              View All Posts
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
