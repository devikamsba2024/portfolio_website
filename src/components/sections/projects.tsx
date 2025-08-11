"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

// Dummy projects data
const dummyProjects = [
  {
    id: "1",
    title: "Advanced AI Agent System",
    description: "A sophisticated multi-agent system that can autonomously handle complex tasks, featuring advanced reasoning capabilities and seamless human-AI collaboration.",
    techStack: ["Python", "LangChain", "OpenAI", "React", "TypeScript"],
    githubUrl: "https://github.com/yourusername/ai-agent-system",
    demoUrl: "https://demo.ai-agent.com",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      alt: "AI Agent System"
    }
  },
  {
    id: "2", 
    title: "Autonomous System Intelligence (ASI)",
    description: "Next-generation autonomous system with advanced decision-making capabilities, real-time learning, and adaptive behavior patterns for complex environments.",
    techStack: ["Python", "TensorFlow", "ROS2", "C++", "Docker"],
    githubUrl: "https://github.com/yourusername/asi-system",
    demoUrl: "https://demo.asi.com",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1673187730317-4973d8d0d8e8?w=800&h=600&fit=crop",
      alt: "Autonomous System Intelligence"
    }
  },
  {
    id: "3",
    title: "AI-Powered Research Assistant",
    description: "Intelligent research assistant that can analyze papers, generate insights, and help researchers discover new connections in their field of study.",
    techStack: ["Python", "HuggingFace", "FastAPI", "Vue.js", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/research-assistant",
    demoUrl: "https://demo.research-assistant.com",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "AI Research Assistant"
    }
  }
]

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my latest AI engineering projects, from autonomous systems to intelligent research tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.featuredImage.url}
                      alt={project.featuredImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button asChild variant="outline" className="flex-1">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button asChild className="flex-1">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
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
          <Button asChild size="lg">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
