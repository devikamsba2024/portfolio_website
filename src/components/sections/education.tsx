"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"

const education = [
  {
    id: "1",
    degree: "Master of Science: Business Analytics",
    track: "Data Science Track",
    school: "Wichita State University",
    location: "Wichita, KS",
    period: "Expected December 2025",
    gpa: "3.92 GPA",
    status: "In Progress"
  },
  {
    id: "2", 
    degree: "Bachelor of Technology: Information Technology",
    school: "Seshadri Rao Gudlavalleru Engineering College",
    location: "Gudlavalleru, India",
    period: "May 2019",
    gpa: "8.91 GPA",
    status: "Completed"
  }
]

export default function Education() {
  return (
    <section id="education" className="section-padding bg-white/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Education</h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            Academic foundation in data science, analytics, and information technology.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/70">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-[#111111] flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-[#FF8A3D]" />
                        {edu.degree}
                      </CardTitle>
                      {edu.track && (
                        <CardDescription className="text-[#FF8A3D] font-medium text-base mb-2">
                          {edu.track}
                        </CardDescription>
                      )}
                      <CardDescription className="text-[#111111] font-semibold text-lg">
                        {edu.school}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      edu.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {edu.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#6B6B6B]">
                      <Calendar className="h-4 w-4 text-[#FF8A3D]" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B6B6B]">
                      <MapPin className="h-4 w-4 text-[#FF8A3D]" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B6B6B]">
                      <Award className="h-4 w-4 text-[#FF8A3D]" />
                      <span className="font-semibold text-[#111111]">{edu.gpa}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
