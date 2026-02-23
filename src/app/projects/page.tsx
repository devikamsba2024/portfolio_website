import { getProjects } from "@/lib/contentful"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, ArrowRight } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"

// Helper function to create a plain text excerpt from markdown
function createExcerpt(markdown: string, maxLength: number = 150): string {
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

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="mb-16">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-purple-600 transition-colors duration-300 mb-12"
          >
            <div className="p-2 rounded-full bg-secondary/50 border border-border/50 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase">Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
                ALL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">WORKS</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                A complete directory of my technical projects, explorations, and research in AI and Machine Learning.
              </p>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] bg-secondary/30 px-4 py-2 border border-border/50 backdrop-blur-sm">
              Total Projects: {projects.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <Link key={project.slug || project.title} href={`/project/${project.slug}`}>
              <SpotlightCard
                className="h-full bg-card/40 backdrop-blur-md border border-border/50 rounded-none group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 hover:border-purple-500/30"
                spotlightColor="rgba(168, 85, 247, 0.1)"
              >
                <CardHeader className="p-0 mb-6 overflow-hidden relative aspect-video">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                  {project.featuredImage ? (
                    <Image
                      src={project.featuredImage.url}
                      alt={project.featuredImage.title || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-violet-900/40 flex items-center justify-center">
                      <span className="text-6xl font-black text-white/10 uppercase">{project.title.charAt(0)}</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono text-purple-600 tracking-widest bg-purple-500/10 px-2 py-1 rounded-sm border border-purple-500/20 uppercase">
                      {project.category || "Project"}
                    </span>
                    <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                      {project.githubUrl && (
                        <span className="hover:text-purple-600 transition-colors">
                          <Github className="w-5 h-5" />
                        </span>
                      )}
                      {project.demoUrl && (
                        <span className="hover:text-purple-600 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                  </div>

                  <CardTitle className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-violet-500 transition-all duration-300">
                    {project.title}
                  </CardTitle>

                  <p className="text-muted-foreground text-lg mb-8 line-clamp-2 font-light">
                    {createExcerpt(project.description, 150)}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-muted-foreground/60 bg-secondary/50 px-2 py-1 rounded-sm border border-border/50 uppercase tracking-tight">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-purple-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    View Case Study <ArrowRight className="w-3 h-3" />
                  </div>
                </CardContent>
              </SpotlightCard>
            </Link>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black tracking-tighter mb-2">HAVE A PROJECT IN MIND?</h3>
            <p className="text-muted-foreground">Open for collaborations and interesting challenges.</p>
          </div>
          <Link
            href="/#contact"
            className="px-10 py-5 bg-foreground text-background font-black tracking-tighter hover:bg-purple-600 hover:text-white transition-all uppercase text-sm"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </div>
  )
}

