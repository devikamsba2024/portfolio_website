"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users } from "lucide-react"
import Image from "next/image"

// Dummy research data
const dummyResearch = [
  {
    id: "1",
    title: "Advanced Fine-tuning Techniques for Large Language Models",
    abstract: "A comprehensive study on novel fine-tuning methodologies for large language models, including parameter-efficient fine-tuning (PEFT), LoRA, and QLoRA techniques for improved performance and reduced computational costs.",
    authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Alex Thompson"],
    publicationUrl: "https://arxiv.org/abs/2024.01234",
    publishedDate: "2024-01-20",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "Fine-tuning Research"
    }
  },
  {
    id: "2",
    title: "Autonomous System Intelligence: A New Paradigm",
    abstract: "Exploring the emergence of Autonomous System Intelligence (ASI) and its potential to create systems that can think, learn, and adapt independently without human intervention.",
    authors: ["Dr. James Wilson", "Dr. Emily Zhang", "Prof. David Kim"],
    publicationUrl: "https://arxiv.org/abs/2024.01567",
    publishedDate: "2024-01-15",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1673187730317-4973d8d0d8e8?w=800&h=600&fit=crop",
      alt: "ASI Research"
    }
  },
  {
    id: "3",
    title: "Multi-Agent Systems for Complex Problem Solving",
    abstract: "Research on developing sophisticated multi-agent systems that can collaborate to solve complex problems, with applications in robotics, autonomous vehicles, and distributed AI systems.",
    authors: ["Dr. Lisa Park", "Prof. Robert Johnson", "Dr. Maria Garcia"],
    publicationUrl: "https://arxiv.org/abs/2024.01890",
    publishedDate: "2024-01-10",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      alt: "Multi-Agent Systems"
    }
  }
]

export default function Research() {
  return (
    <section id="research" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Research & Publications</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cutting-edge research in AI, machine learning, and autonomous systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyResearch.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={paper.featuredImage.url}
                      alt={paper.featuredImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 line-clamp-2">{paper.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-4">
                    {paper.abstract}
                  </CardDescription>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {paper.authors.join(", ")}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <a href={paper.publicationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Paper
                    </a>
                  </Button>
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
          <Button asChild size="lg" variant="outline">
            <a href="https://scholar.google.com/citations?user=yourprofile" target="_blank" rel="noopener noreferrer">
              View All Publications
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
