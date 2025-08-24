"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

// Featured projects data
const dummyProjects = [
  {
    id: "1",
    title: "AI-Powered Chatbot for NIAR",
    description: "Spearheading development of an AI chatbot for National Institute for Aviation Research using open-source LLMs, with dynamic search, document parsing, and scalable inference.",
    techStack: ["Python", "vLLM", "OpenWebUI", "LangChain", "PostgreSQL", "Qdrant", "Grafana"],
    githubUrl: "https://github.com/devikanekkalapu/niar-chatbot",
    demoUrl: "https://demo.niar-chatbot.com",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      alt: "AI Chatbot System"
    }
  },
  {
    id: "2", 
    title: "Customer Retention Prediction Model",
    description: "Developed machine learning models for British Telecommunications client to forecast customer behavior and improve retention strategies, achieving 9% increase in retention.",
    techStack: ["Python", "Scikit-learn", "Pandas", "SQL", "Tableau"],
    githubUrl: "https://github.com/devikanekkalapu/customer-retention",
    demoUrl: "https://demo.customer-retention.com",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1673187730317-4973d8d0d8e8?w=800&h=600&fit=crop",
      alt: "Customer Analytics Dashboard"
    }
  },
  {
    id: "3",
    title: "API Integration Platform",
    description: "Developed RESTful APIs using MuleSoft Anypoint Platform, integrating HubSpot, MDM Systems, IBM Kenexa, and PeopleSoft for seamless candidate tracking.",
    techStack: ["MuleSoft", "Java", "Apigee", "RESTful APIs", "PostgreSQL"],
    githubUrl: "https://github.com/devikanekkalapu/api-integration",
    demoUrl: "https://demo.api-integration.com",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "API Integration Platform"
    }
  }
]

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-[#FFF7EC] to-[#FFE1C6]">
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
            Explore my AI/ML projects, from chatbot development to predictive modeling and API integration solutions.
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
              <Card className="h-full group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/50">
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
                  <CardTitle className="text-xl mb-2 text-[#111111]">{project.title}</CardTitle>
                  <CardDescription className="text-[#6B6B6B] mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#FF8A3D]/10 text-[#FF8A3D] text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button asChild variant="outline" className="flex-1 border-[#FF8A3D] text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white rounded-full">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button asChild className="flex-1 bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white rounded-full">
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
          <Button asChild size="lg" className="bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white rounded-full px-8 py-3 shadow-lg">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
