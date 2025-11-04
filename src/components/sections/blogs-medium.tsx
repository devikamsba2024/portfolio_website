"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import { getMediumPosts, MediumPost, formatMediumDate } from "@/lib/medium"
import { useEffect, useState } from "react"

interface BlogsMediumProps {
  username?: string
  showAll?: boolean
}

export default function BlogsMedium({ username = "your-medium-username", showAll = false }: BlogsMediumProps) {
  console.log('🎭 BlogsMedium component rendering...', new Date().toISOString())
  
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  console.log('📊 Current state - posts length:', posts.length)
  console.log('📊 Current state - loading:', loading)

  useEffect(() => {
    console.log('🚀 BlogsMedium useEffect triggered!')
    
    async function fetchMediumPosts() {
      try {
        console.log('🔍 Starting fetchMediumPosts function...')
        console.log('👤 Medium username:', username)
        
        const mediumPosts = await getMediumPosts(username)
        console.log('📝 getMediumPosts() completed with:', mediumPosts.length, 'posts')
        console.log('📝 Posts received:', mediumPosts)
        
        setPosts(mediumPosts)
        console.log('✅ setPosts called successfully')
      } catch (error: any) {
        console.error('❌ Error in fetchMediumPosts:', error)
        console.error('❌ Error details:', error?.message)
        setError(error?.message || 'Failed to fetch Medium posts')
      } finally {
        console.log('🏁 Setting loading to false')
        setLoading(false)
      }
    }
    
    fetchMediumPosts()
  }, [username])

  console.log('🎯 Posts to display:', posts.length)
  console.log('🎯 Loading state:', loading)

  const displayPosts = showAll ? posts : posts.slice(0, 3)

  return (
    <section id="blogs" className="section-padding bg-white/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Latest Blog Posts</h2>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Thoughts and insights from my Medium blog
          </p>
        </div>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600 mt-2">Loading Medium posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-600 mt-2">Error: {error}</p>
            <p className="text-gray-600 text-sm mt-1">
              Please check the Medium username configuration
            </p>
          </div>
        )}

        {!loading && !error && displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post, index) => (
                <motion.div
                  key={post.guid || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70">
                    {post.thumbnail && (
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // Hide image if it fails to load
                              const target = e.target as HTMLElement
                              if (target.parentElement) {
                                target.parentElement.style.display = 'none'
                              }
                            }}
                          />
                        </div>
                      </CardHeader>
                    )}
                    <CardContent className="p-6">
                      {post.pubDate && (
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {formatMediumDate(post.pubDate)}
                          </span>
                        </div>
                      )}
                      <CardTitle className="text-xl mb-3 line-clamp-2 text-[#111111] group-hover:text-gray-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      {post.description && (
                        <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                          {post.description}
                        </CardDescription>
                      )}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.slice(0, 3).map((category: string) => (
                            <span
                              key={category}
                              className="px-3 py-1 bg-gray-600/10 text-gray-600 text-xs rounded-full font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        asChild 
                        variant="ghost" 
                        className="w-full group text-gray-600 hover:bg-gray-600/10 rounded-full"
                      >
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Read on Medium
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {!showAll && posts.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-12"
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gray-600 hover:bg-gray-600/90 text-white rounded-full px-8 py-3 shadow-lg"
                >
                  <a 
                    href={`https://medium.com/@${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    View All Posts on Medium
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            )}
          </>
        ) : !loading && !error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">No blog posts found</p>
            <p className="text-gray-500 text-sm">
              Check back later for new content!
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
