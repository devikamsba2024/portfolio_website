import { getBlogPosts } from "@/lib/contentful"
import Link from "next/link"

export default async function BlogsPage() {
  const blogs = await getBlogPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#111111] text-center mb-8">All Blog Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.slug} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#111111] mb-3">{blog.title}</h2>
              {blog.excerpt && (
                <p className="text-[#6B6B6B] mb-4">{blog.excerpt}</p>
              )}
              {blog.publishedDate && (
                <p className="text-sm text-[#6B6B6B] mb-4">{blog.publishedDate}</p>
              )}
              <Link 
                href={`/blog/${blog.slug}`}
                className="text-[#FF8A3D] hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="text-[#FF8A3D] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
