import { getBlogPosts } from "@/lib/contentful"
import Link from "next/link"
import { notFound } from "next/navigation"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from "next/image"

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
              ← Back to All Blog Posts
            </Link>
            <Link
              href="/"
              className="text-[#6B6B6B] hover:underline ml-4 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
          </div>

          {blog.featuredImage && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={blog.featuredImage.url}
                alt={blog.featuredImage.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold text-[#111111] mb-4">{blog.title}</h1>
          {blog.publishedDate && (
            <p className="text-sm text-[#6B6B6B] mb-2">Published on {formatDate(blog.publishedDate)}</p>
          )}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-lg max-w-none text-[#111111]">
            {blog.content ? (
              documentToReactComponents(blog.content)
            ) : (
              <p className="text-[#6B6B6B]">No content available for this blog post.</p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/blog"
              className="text-[#FF8A3D] hover:underline"
            >
              ← Back to All Blog Posts
            </Link>
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
