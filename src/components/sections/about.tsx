"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Mail } from 'lucide-react'

const skills = [
  { category: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'LangChain'] },
  { category: 'Programming', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Rust'] },
  { category: 'Frameworks', items: ['Next.js', 'React', 'Node.js', 'FastAPI', 'Django'] },
  { category: 'Tools', items: ['Docker', 'Kubernetes', 'AWS', 'Git', 'Jupyter'] },
]

export function About() {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="aspect-square rounded-2xl bg-background overflow-hidden">
                  <Image
                    src="/placeholder-profile.jpg"
                    alt="Your Name"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate AI Engineer and researcher with expertise in machine learning, 
                deep learning, and artificial intelligence. With a strong foundation in both 
                theoretical and practical aspects of AI, I specialize in building intelligent 
                systems that solve real-world problems.
              </p>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed">
                My work spans across various domains including natural language processing, 
                computer vision, and reinforcement learning. I believe in the power of AI to 
                transform industries and improve human lives through innovative solutions.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Skills & Technologies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category}>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-primary">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
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
              <Button size="lg" className="group">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
