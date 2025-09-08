import { getProjects } from "@/lib/contentful"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#FFE1C6] py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#111111] text-center mb-8">All Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#111111] mb-3">{project.title}</h2>
              <p className="text-[#6B6B6B] mb-4">{project.description}</p>
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Link 
                  href={`/project/${project.slug}`}
                  className="text-[#FF8A3D] hover:underline"
                >
                  View Details →
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B6B6B] hover:text-[#FF8A3D]"
                  >
                    GitHub
                  </a>
                )}
              </div>
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
