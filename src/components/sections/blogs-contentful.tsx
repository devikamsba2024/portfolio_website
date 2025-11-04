"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import { getBlogPosts, BlogPost } from "@/lib/contentful"
import { useEffect, useState, useRef } from "react"

export default function BlogsContentful() {
  console.log('🎭 BlogsContentful component rendering...', new Date().toISOString())
  
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [forceUpdate, setForceUpdate] = useState(0)
  const hasLoadedRef = useRef(false)
  
  console.log('📊 Current state - blogs length:', blogs.length)
  console.log('📊 Current state - loading:', loading)

  useEffect(() => {
    console.log('🚀 BlogsContentful useEffect triggered!')
    
    if (hasLoadedRef.current) {
      console.log('🔄 Already loaded, skipping...')
      return
    }
    
    async function fetchBlogs() {
      try {
        console.log('🔍 Starting fetchBlogs function...')
        hasLoadedRef.current = true
        
        const blogPosts = await getBlogPosts()
        console.log('📝 getBlogPosts() completed with:', blogPosts.length, 'posts')
        console.log('📝 Blog posts received:', blogPosts)
        
        setBlogs(blogPosts)
        setLoading(false)
        setForceUpdate(prev => prev + 1)
        console.log('✅ State updates called successfully')
      } catch (error: any) {
        console.error('❌ Error in fetchBlogs:', error)
        console.error('❌ Error details:', error?.message)
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [])

  // Additional useEffect to monitor state changes
  useEffect(() => {
    console.log('🔄 State changed - blogs:', blogs.length, 'loading:', loading, 'forceUpdate:', forceUpdate)
  }, [blogs, loading, forceUpdate])

  // Test function available in browser console
  if (typeof window !== 'undefined') {
    (window as any).testContentful = async () => {
      console.log('🧪 Manual Contentful test starting...')
      try {
        const result = await getBlogPosts()
        console.log('🧪 Manual test result:', result)
        return result
      } catch (error: any) {
        console.error('🧪 Manual test error:', error)
        return error
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  console.log('🎯 Blogs to display:', blogs.length)
  console.log('🎯 Loading state:', loading)
  console.log('🎯 Force update counter:', forceUpdate)
  console.log('🎯 Current blogs data:', blogs)

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
            <p className="text-gray-600 mt-2">Loading content from Contentful...</p>
          )}
          {/* DEBUG INFO */}
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Blogs count: {blogs.length}</p>
            <p>Loading: {loading.toString()}</p>
            <p>Force update: {forceUpdate}</p>
            {blogs.length > 0 && <p>First blog title: {blogs[0].title}</p>}
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
                    {blog.featuredImage && (
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={blog.featuredImage.url}
                            alt={blog.featuredImage.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardHeader>
                    )}
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
                              className="px-3 py-1 bg-gray-600/10 text-gray-600 text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button asChild variant="ghost" className="w-full group text-gray-600 hover:bg-gray-600/10 rounded-full">
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
              <Button asChild size="lg" className="bg-gray-600 hover:bg-gray-600/90 text-white rounded-full px-8 py-3 shadow-lg">
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