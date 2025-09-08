import { getProjects } from "@/lib/contentful"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

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
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-[#6B6B6B]">{project.description}</p>
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
