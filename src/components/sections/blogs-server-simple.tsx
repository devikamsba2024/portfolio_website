import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getBlogPosts } from "@/lib/contentful"

// This is a Server Component, it fetches data directly on the server
export default async function BlogsServerSimple() {
  console.log('🎭 BlogsServerSimple (SERVER COMPONENT) loading...')

  const blogPosts = await getBlogPosts()
  console.log('🎯 BlogsServerSimple - Server fetched:', blogPosts.length, 'posts')

  const displayBlogs = blogPosts.length > 0 ? blogPosts : []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="blogs" className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Blogs</h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            Thoughts, research, and insights on AI/ML development, data science, and technology trends.
          </p>

        </div>

        {displayBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBlogs.slice(0, 3).map((blog, index) => (
                <div key={blog.slug || index}>
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
                        <Link href={`/blog/${blog.slug || 'blog-post'}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white rounded-full px-8 py-3 shadow-lg">
                <Link href="/blog">
                  View All Posts
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center mt-8">
            <p className="text-[#6B6B6B] text-lg">
              Coming soon! My thoughts and insights will be shared here.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
