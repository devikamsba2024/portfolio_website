import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProjects } from "@/lib/contentful"

// Helper function to create a plain text excerpt from markdown
function createExcerpt(markdown: string, maxLength: number = 150): string {
  if (!markdown) return ''
  
  // Remove markdown syntax comprehensively
  const plainText = markdown
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1') // Remove bold+italic
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/__([^_]+)__/g, '$1') // Remove bold (underscore)
    .replace(/_([^_]+)_/g, '$1') // Remove italic (underscore)
    .replace(/~~([^~]+)~~/g, '$1') // Remove strikethrough
    .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/\|[^|\n]*\|/g, '') // Remove tables
    .replace(/^[\s]*[-*+]\s+/gm, '') // Remove list bullets
    .replace(/^[\s]*\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/^[\s]*>\s+/gm, '') // Remove blockquotes
    .replace(/---+/g, '') // Remove horizontal rules
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
  
  // Truncate to maxLength
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

// This is a Server Component, it fetches data directly on the server
export default async function ProjectsServer() {
  console.log('🎭 ProjectsServer (SERVER COMPONENT) loading...')

  const projects = await getProjects()
  console.log('🎯 ProjectsServer - Server fetched:', projects.length, 'projects')
  
  // Debug: Log project images
  projects.forEach((project, index) => {
    if (project.featuredImage) {
      console.log(`📸 Project ${index + 1} (${project.title}):`, project.featuredImage.url)
    } else {
      console.log(`❌ Project ${index + 1} (${project.title}): No featured image`)
    }
  })

  const displayProjects = projects.length > 0 ? projects : []
  
  // Add timestamp to help with image caching issues
  const timestamp = Date.now()

  return (
    <section id="projects" className="py-20 bg-white/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Featured Projects</h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            A showcase of my work in AI/ML, data science, and software development.
          </p>

        </div>

        {displayProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.slice(0, 6).map((project, index) => (
                <Card 
                  key={`${project.slug || project.title}-${index}-${timestamp}`}
                  className="h-full group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70"
                >
                    {project.featuredImage && project.featuredImage.url ? (
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100">
                          <Image
                            src={project.featuredImage.url}
                            alt={project.featuredImage.title || project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                          />
                        </div>
                      </CardHeader>
                    ) : (
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-gray-400 text-center">
                            <div className="text-2xl mb-2">📁</div>
                            <div className="text-sm">Project Image</div>
                          </div>
                        </div>
                      </CardHeader>
                    )}
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-3 line-clamp-2 text-[#111111]">{project.title}</CardTitle>
                      <CardDescription className="text-[#6B6B6B] mb-4 line-clamp-3">
                        {createExcerpt(project.description, 150)}
                      </CardDescription>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.slice(0, 4).map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-600/10 text-gray-600 text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                      <Button 
                        asChild 
                        variant="default" 
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold shadow-md"
                      >
                        <Link href={`/project/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      {project.githubUrl && (
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm" 
                          className="text-gray-600 hover:text-gray-800 rounded-full"
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gray-600 hover:bg-gray-600/90 text-white rounded-full px-8 py-3 shadow-lg">
                <Link href="/projects">
                  View All Projects
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center mt-8">
            <p className="text-[#6B6B6B] text-lg">
              Coming soon! My featured projects will be showcased here.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
