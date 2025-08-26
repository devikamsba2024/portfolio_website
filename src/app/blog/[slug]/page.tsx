import { getBlogPosts } from "@/lib/contentful"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogs = await getBlogPosts()
  const blog = blogs.find(b => b.slug === params.slug)

  if (!blog) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#FFE1C6] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link 
              href="/blog"
              className="text-[#FF8A3D] hover:underline mb-4 inline-block"
            >
              ← Back to All Posts
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-[#111111] mb-4">{blog.title}</h1>
          
          {blog.publishedDate && (
            <p className="text-[#6B6B6B] mb-6">
              Published on {formatDate(blog.publishedDate)}
            </p>
          )}
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {blog.excerpt && (
            <div className="text-lg text-[#6B6B6B] mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8A3D]">
              {blog.excerpt}
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {typeof blog.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <div className="text-[#6B6B6B]">
                <p>Content from Contentful rich text field:</p>
                <pre className="bg-gray-100 p-4 rounded mt-4 text-sm overflow-auto">
                  {JSON.stringify(blog.content, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between">
              <Link 
                href="/blog"
                className="text-[#FF8A3D] hover:underline"
              >
                ← All Posts
              </Link>
              <Link 
                href="/"
                className="text-[#FF8A3D] hover:underline"
              >
                Home →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = await getBlogPosts()
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}
