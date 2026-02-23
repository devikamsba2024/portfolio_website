"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"


const education = [
  {
    id: "1",
    degree: "Master's degree, Business Analytics",
    track: "Data Science Track",
    school: "Wichita State University",
    location: "Wichita, KS",
    period: "Jan 2024 - Dec 2025",
    gpa: "Grade: 3.92",
    status: "Completed"
  },
  {
    id: "2",
    degree: "Bachelor of Technology, Information Technology",
    school: "Gudlavalleru Engineering College, Seshadri Rao Knowledge Village",
    location: "Gudlavalleru, India",
    period: "Jun 2014 - May 2018",
    gpa: "Grade: 8.91",
    status: "Completed"
  }
]

export default function Education() {
  return (
    <section id="education" className="relative min-h-screen flex flex-col justify-center py-20 bg-background section-scroll-snap overflow-hidden">



      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4 uppercase">Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Academic foundation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/60 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                          {edu.degree}
                        </CardTitle>
                      </div>

                      {edu.track && (
                        <p className="text-accent font-medium text-sm mb-2 ml-7">
                          {edu.track}
                        </p>
                      )}

                      <CardDescription className="text-lg font-semibold text-foreground ml-7">
                        {edu.school}
                      </CardDescription>
                    </div>

                    <span className={`px-3 py-1 text-xs rounded-full font-medium font-mono uppercase tracking-widest self-start ${edu.status === 'In Progress'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'bg-muted text-muted-foreground border border-border'
                      }`}>
                      {edu.status}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 ml-7">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Award className="h-4 w-4 text-accent" />
                      <span>{edu.gpa}</span>
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
