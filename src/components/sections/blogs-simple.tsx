"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { getBlogPosts, BlogPost } from "@/lib/contentful"
import { useState } from "react"

export default function BlogsSimple() {
  console.log('🎭 BlogsSimple component rendering...', new Date().toISOString())
  
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [loaded, setLoaded] = useState(false)

  // Load data immediately if not already loaded
  if (!loaded) {
    console.log('🚀 BlogsSimple loading data immediately...')
    setLoaded(true)
    getBlogPosts().then(result => {
      console.log('🎯 BlogsSimple got result:', result.length, 'posts')
      setBlogs(result)
      setLoading(false)
    }).catch(error => {
      console.error('❌ BlogsSimple error:', error)
      setLoading(false)
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  console.log('🎯 BlogsSimple - Blogs to display:', blogs.length)
  console.log('🎯 BlogsSimple - Loading state:', loading)

  return (
    <section id="blogs" className="section-padding bg-white/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Blogs</h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            Thoughts, research, and insights on AI/ML development, data science, and technology trends.
          </p>
          {loading && (
            <p className="text-[#FF8A3D] mt-2">Loading content from Contentful...</p>
          )}
          {/* DEBUG INFO */}
          <div className="mt-4 p-4 bg-blue-100 rounded-lg text-sm">
            <p><strong>SIMPLE Component Debug Info:</strong></p>
            <p>Blogs count: {blogs.length}</p>
            <p>Loading: {loading.toString()}</p>
            <p>Loaded flag: {loaded.toString()}</p>
            {blogs.length > 0 && <p>First blog title: {blogs[0].title}</p>}
            <p>This MUST work now!</p>
          </div>
        </motion.div>

        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70 cursor-pointer">
                    <CardContent className="p-6">
                      {blog.publishedDate && (
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-[#6B6B6B]" />
                          <span className="text-sm text-[#6B6B6B]">
                            {formatDate(blog.publishedDate)}
                          </span>
                        </div>
                      )}
                      <CardTitle className="text-xl mb-3 line-clamp-2 text-[#111111]">{blog.title}</CardTitle>
                      {blog.excerpt && (
                        <CardDescription className="text-[#6B6B6B] mb-4 line-clamp-3">
                          {blog.excerpt}
                        </CardDescription>
                      )}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button asChild variant="ghost" className="w-full group text-[#FF8A3D] hover:bg-[#FF8A3D]/10 rounded-full">
                        <a href={`/blog/${blog.slug || 'blog-post'}`}>
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
              <Button asChild size="lg" className="bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white rounded-full px-8 py-3 shadow-lg">
                <a href="/blog">
                  View All Posts
                </a>
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-[#6B6B6B] text-lg">
              {loading ? "Loading blog posts..." : "Coming soon! My thoughts and insights will be shared here."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
