"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getProjects, Project } from "@/lib/contentful"

const categories = ["All", "LLM & NLP", "Data Visualization", "Machine Learning"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

// Helper function to create a plain text excerpt from markdown
function createExcerpt(markdown: string, maxLength: number = 160): string {
  if (!markdown) return ''

  const plainText = markdown
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

export default function ProjectsContentful() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")
  const router = useRouter()

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectData = await getProjects()
        setProjects(projectData)
      } catch (error: any) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="relative min-h-screen flex flex-col justify-center py-20 bg-background text-foreground overflow-hidden section-scroll-snap">

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">SELECTED WORKS</h2>
            <p className="text-muted-foreground">A showcase of technical projects.</p>
          </div>
          <div className="hidden md:block text-sm font-mono text-muted-foreground">
            SCROLL TO EXPLORE &rarr;
          </div>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeFilter === category
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-background border border-border/50 text-foreground/70 hover:border-purple-500/50 hover:text-foreground"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-muted-foreground">Loading projects from Contentful...</p>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-muted-foreground text-lg">
                {projects.length === 0
                  ? "No projects found. Add projects to Contentful to see them here."
                  : `No projects found in the "${activeFilter}" category.`}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Horizontal Scroll Container */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:px-0 scrollbar-hide"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug || index}
                  variants={itemVariants}
                  className="snap-center shrink-0 w-[85vw] md:w-[600px] first:pl-0 last:pr-0"
                >
                  <SpotlightCard
                    onClick={() => router.push(`/project/${project.slug}`)}
                    className="h-full bg-card/60 backdrop-blur-md border border-border/50 rounded-none group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 hover:border-purple-500/50"
                    spotlightColor="rgba(168, 85, 247, 0.08)"
                  >
                    <CardHeader className="p-0 mb-6 overflow-hidden relative aspect-video">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      {project.featuredImage ? (
                        <Image
                          src={project.featuredImage.url}
                          alt={project.featuredImage.title || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-violet-600/20 flex items-center justify-center">
                          <span className="text-4xl font-black text-muted-foreground/30">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="flex justify-between items-start mb-2">
                        {project.category && (
                          <span className="text-[10px] font-mono-premium text-purple-600 tracking-widest bg-purple-50 dark:bg-purple-950/30 px-2 py-1 rounded-sm">
                            {project.category}
                          </span>
                        )}
                        <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity ml-auto">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-600 hover:scale-110 transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-600 hover:scale-110 transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-violet-600 transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                        {createExcerpt(project.description, 160)}
                      </p>

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-2 py-1 rounded-sm border border-border/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </SpotlightCard>
                </motion.div>
              ))}

              {/* "View All" Card */}
              <motion.div
                variants={itemVariants}
                className="snap-center shrink-0 w-[85vw] md:w-[600px] flex items-center justify-center bg-secondary/30"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">See More Work</h3>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={() => window.open(process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com', '_blank')}
                  >
                    View GitHub <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>

              {/* Spacer for scroll padding */}
              <div className="w-4 shrink-0" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}