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
            {/* Horizontal layout with featured latest post */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Latest post - Large featured card */}
              {displayPosts[0] && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:w-2/5"
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70 relative">
                    {/* Latest badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Latest
                      </span>
                    </div>
                    {displayPosts[0].thumbnail && (
                      <CardHeader className="p-0">
                        <div className="relative h-48 lg:h-56 overflow-hidden rounded-t-lg">
                          <Image
                            src={displayPosts[0].thumbnail}
                            alt={displayPosts[0].title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
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
                      {displayPosts[0].pubDate && (
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {formatMediumDate(displayPosts[0].pubDate)}
                          </span>
                        </div>
                      )}
                      <CardTitle className="text-xl lg:text-2xl mb-3 line-clamp-2 text-[#111111] group-hover:text-gray-600 transition-colors">
                        {displayPosts[0].title}
                      </CardTitle>
                      {displayPosts[0].description && (
                        <CardDescription className="text-gray-600 mb-6 line-clamp-4 text-base">
                          {displayPosts[0].description}
                        </CardDescription>
                      )}
                      {displayPosts[0].categories && displayPosts[0].categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {displayPosts[0].categories.slice(0, 4).map((category: string) => (
                            <span
                              key={category}
                              className="px-3 py-1 bg-gray-600/10 text-gray-600 text-sm rounded-full font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                      <Button 
                        asChild 
                        variant="default" 
                        size="lg"
                        className="w-full group bg-gray-600 hover:bg-gray-600/90 text-white rounded-full"
                      >
                        <a 
                          href={displayPosts[0].link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Read Latest Post
                          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {/* Other posts - Smaller cards in vertical stack */}
              {displayPosts.length > 1 && (
                <div className="lg:w-3/5 flex flex-col gap-4">
                  {displayPosts.slice(1).map((post, index) => (
                    <motion.div
                      key={post.guid || index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70">
                        <div className="flex flex-col sm:flex-row">
                          {post.thumbnail && (
                            <div className="sm:w-1/3">
                              <div className="relative h-32 sm:h-full overflow-hidden rounded-l-lg">
                                <Image
                                  src={post.thumbnail}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    const target = e.target as HTMLElement
                                    if (target.parentElement) {
                                      target.parentElement.style.display = 'none'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          <div className={`${post.thumbnail ? 'sm:w-2/3' : 'w-full'} p-6`}>
                            {post.pubDate && (
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-gray-600" />
                                <span className="text-xs text-gray-600">
                                  {formatMediumDate(post.pubDate)}
                                </span>
                              </div>
                            )}
                            <CardTitle className="text-lg mb-2 line-clamp-2 text-[#111111] group-hover:text-gray-600 transition-colors">
                              {post.title}
                            </CardTitle>
                            {post.description && (
                              <CardDescription className="text-gray-600 mb-3 line-clamp-2 text-sm">
                                {post.description}
                              </CardDescription>
                            )}
                            {post.categories && post.categories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {post.categories.slice(0, 2).map((category: string) => (
                                  <span
                                    key={category}
                                    className="px-2 py-1 bg-gray-600/10 text-gray-600 text-xs rounded-full font-medium"
                                  >
                                    {category}
                                  </span>
                                ))}
                              </div>
                            )}
                            <Button 
                              asChild 
                              variant="ghost" 
                              size="sm"
                              className="group text-gray-600 hover:bg-gray-600/10 rounded-full p-0 h-auto"
                            >
                              <a 
                                href={post.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm"
                              >
                                Read More
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
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
