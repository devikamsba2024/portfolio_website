import BlogsMedium from "@/components/sections/blogs-medium"
import Link from "next/link"

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#111111] mb-4">All Blog Posts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all my thoughts and insights from Medium
          </p>
        </div>
        
        <BlogsMedium 
          username={process.env.NEXT_PUBLIC_MEDIUM_USERNAME} 
          showAll={true} 
        />
        
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="text-gray-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
