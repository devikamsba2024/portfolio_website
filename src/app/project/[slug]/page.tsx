import { getProjects } from "@/lib/contentful"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import { motion } from "framer-motion"
import { ArrowLeft, Github, Globe, Calendar, Tag, ChevronRight } from "lucide-react"

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
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Navigation / Header */}
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-muted-foreground hover:text-purple-600 transition-colors duration-300"
          >
            <div className="p-2 rounded-full bg-secondary/50 border border-border/50 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase">Back to Projects</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span>Portfolio</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-purple-600">{project.title}</span>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-mono tracking-widest uppercase rounded-full">
              {project.category || "Project"}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
              <Calendar className="w-3 h-3" />
              <span>2024</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border/50 pt-12">
            <div className="md:col-span-2">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {project.description.split('\n')[0]}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-secondary/50 border border-border/50 text-xs font-mono rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">Links</h4>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="p-3 rounded-full bg-secondary/50 border border-border/50 hover:border-purple-500/50 hover:text-purple-600 hover:bg-purple-500/5 transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="p-3 rounded-full bg-secondary/50 border border-border/50 hover:border-purple-500/50 hover:text-purple-600 hover:bg-purple-500/5 transition-all"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {project.featuredImage && (
          <div className="mb-20 relative aspect-[21/9] w-full overflow-hidden rounded-none border border-border/50 shadow-2xl shadow-purple-500/5">
            <Image
              src={project.featuredImage.url}
              alt={project.featuredImage.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-purple max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-bold mb-8 mt-16">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold mb-6 mt-12 text-foreground/90">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-semibold mb-4 mt-10 text-foreground/80">{children}</h3>,
                p: ({ children }) => <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">{children}</p>,
                ul: ({ children }) => <ul className="list-none space-y-4 mb-8 pl-0">{children}</ul>,
                li: ({ children }) => (
                  <li className="flex items-start gap-4 text-muted-foreground">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                    <span className="text-lg">{children}</span>
                  </li>
                ),
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                code: ({ children }) => <code className="bg-secondary/50 text-purple-400 px-1.5 py-0.5 rounded font-mono text-sm border border-border/50">{children}</code>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-600/50 bg-purple-600/5 pl-6 py-4 italic rounded-r-lg mb-8">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-400 underline underline-offset-4 transition-colors"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {project.description}
            </ReactMarkdown>
          </div>

          <div className="mt-24 pt-12 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Interested in this project?</h3>
              <p className="text-muted-foreground">Feel free to reach out for a detailed discussion.</p>
            </div>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-none font-bold tracking-tighter hover:shadow-xl hover:shadow-purple-500/20 transition-all uppercase"
            >
              Get In Touch
            </Link>
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

