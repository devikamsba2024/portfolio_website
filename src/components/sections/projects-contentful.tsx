"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { getProjects, Project } from "@/lib/contentful"
import { useEffect, useState } from "react"

export default function ProjectsContentful() {
  console.log('🎭 ProjectsContentful component rendering...', new Date().toISOString())
  
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  
  console.log('📊 Current state - projects length:', projects.length)
  console.log('📊 Current state - loading:', loading)

  useEffect(() => {
    console.log('🚀 ProjectsContentful useEffect triggered!')
    
    async function fetchProjects() {
      try {
        console.log('🔍 Starting fetchProjects function...')
        const projectData = await getProjects()
        console.log('📝 getProjects() completed with:', projectData.length, 'projects')
        console.log('📝 Projects received:', projectData)
        
        setProjects(projectData)
        console.log('✅ setProjects called successfully')
      } catch (error: any) {
        console.error('❌ Error in fetchProjects:', error)
        console.error('❌ Error details:', error?.message)
      } finally {
        console.log('🏁 Setting loading to false')
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])

  console.log('🎯 Projects to display:', projects.length)
  console.log('🎯 Loading state:', loading)

  return (
    <section id="projects" className="section-padding bg-white/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Featured Projects</h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            A showcase of my work in AI/ML, data science, and software development.
          </p>
          {loading && (
            <p className="text-[#FF8A3D] mt-2">Loading projects from Contentful...</p>
          )}
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project, index) => (
                <motion.div
                  key={project.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70">
                    {project.featuredImage && (
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={project.featuredImage.url}
                            alt={project.featuredImage.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardHeader>
                    )}
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-3 line-clamp-2 text-[#111111]">{project.title}</CardTitle>
                      <CardDescription className="text-[#6B6B6B] mb-4 line-clamp-3">
                        {project.description}
                      </CardDescription>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.slice(0, 4).map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                      <Button asChild variant="ghost" className="flex-1 group text-[#FF8A3D] hover:bg-[#FF8A3D]/10 rounded-full">
                        <a href={`/project/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="sm" className="text-[#6B6B6B] hover:text-[#FF8A3D] rounded-full">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button asChild variant="outline" size="sm" className="text-[#6B6B6B] hover:text-[#FF8A3D] rounded-full">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg" className="bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white rounded-full px-8 py-3 shadow-lg">
                <a href="/projects">
                  View All Projects
                </a>
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-[#6B6B6B] text-lg">
              {loading ? "Loading projects..." : "Coming soon! My featured projects will be showcased here."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}