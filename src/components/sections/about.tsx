"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Mail } from 'lucide-react'
import Link from 'next/link'

const skills = [
  { category: 'LLM & AI/ML', items: ['vLLM', 'OpenWebUI', 'LangChain', 'RAG', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn'] },
  { category: 'Programming', items: ['Python', 'Java', 'SQL'] },
  { category: 'Data & Analytics', items: ['Pandas', 'NumPy', 'SPSS', 'Tableau', 'Grafana', 'Matplotlib', 'Seaborn'] },
  { category: 'Databases & Tools', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Qdrant', 'Docker', 'Git', 'Traefik'] },
]

export function About() {
  return (
    <section id="about" className="section-padding bg-white/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#111111]">About Me</h2>
              <p className="text-lg text-[#6B6B6B] leading-relaxed">
                I'm a passionate AI/ML Engineer and Graduate Research Assistant at Wichita State University 
                with expertise in machine learning, data science, and AI-powered chatbot development. 
                Currently pursuing my Master's in Business Analytics (Data Science Track) while working 
                on cutting-edge AI research projects.
              </p>
            </div>

            <div>
              <p className="text-[#6B6B6B] leading-relaxed">
                My experience spans developing AI chatbots using LLMs, predictive modeling, data analytics, 
                and API integration. I'm passionate about leveraging AI to solve complex business problems 
                and improve operational efficiency through innovative data-driven solutions.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#111111]">Skills & Technologies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category} className="bg-white/80 backdrop-blur-sm border-white/70">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-gray-600">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs bg-gray-600/10 text-gray-600 rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group bg-gray-600 hover:bg-gray-600/90 text-white rounded-full px-6 py-3 shadow-lg">
                <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-full px-6 py-3">
                <Link href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
