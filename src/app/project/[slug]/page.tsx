import { getProjects } from "@/lib/contentful"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projects = await getProjects()
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#FFE1C6] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link 
              href="/projects"
              className="text-[#FF8A3D] hover:underline mb-4 inline-block"
            >
              ← Back to All Projects
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-[#111111] mb-4">{project.title}</h1>
          
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          {project.featuredImage && (
            <div className="mb-8">
              <Image
                src={project.featuredImage.url}
                alt={project.featuredImage.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none mb-8 text-[#6B6B6B]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-[#111111] mt-8 mb-4">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold text-[#111111] mt-6 mb-3">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold text-[#111111] mt-4 mb-2">{children}</h3>,
                p: ({children}) => <p className="text-lg text-[#6B6B6B] mb-4 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-outside ml-6 mb-4 text-[#6B6B6B] [&_li]:mb-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-outside ml-6 mb-4 text-[#6B6B6B] [&_li]:mb-2">{children}</ol>,
                li: ({children}) => <li className="text-lg text-[#6B6B6B] leading-relaxed">{children}</li>,
                strong: ({children}) => <strong className="font-semibold text-[#111111]">{children}</strong>,
                code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-[#FF8A3D]">{children}</code>,
                table: ({children}) => <table className="w-full border-collapse border border-gray-300 mb-4">{children}</table>,
                th: ({children}) => <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left">{children}</th>,
                td: ({children}) => <td className="border border-gray-300 px-4 py-2">{children}</td>,
              }}
            >
              {project.description}
            </ReactMarkdown>
          </div>
          
          <div className="flex gap-4 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF8A3D] text-white px-6 py-3 rounded-full hover:bg-[#FF8A3D]/90 transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between">
              <Link 
                href="/projects"
                className="text-[#FF8A3D] hover:underline"
              >
                ← All Projects
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

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getProjects()
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}
