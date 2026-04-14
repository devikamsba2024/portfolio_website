"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, MapPin, ArrowRight, ChevronDown } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { useState } from "react"

const experiences = [
  {
    id: "1",
    title: "AI/ML Engineer",
    company: "National Institute for Aviation Research",
    location: "Wichita, KS",
    period: "01/2025 - Present",
    type: "Contract",
    logo: "NIAR",
    responsibilities: [
      "Designed and deployed a production-grade GenAI platform utilizing Python and Retrieval-Augmented Generation (RAG).",
      "Built end-to-end RAG pipelines with LangChain, enhancing context-aware responses through hybrid search.",
      "Developed agentic AI workflows for multi-step reasoning and dynamic tool orchestration.",
      "Architected scalable, cloud-native AI systems on AWS, ensuring efficient LLM inference with GPU deployment."
    ]
  },
  {
    id: "2",
    title: "Software Engineer",
    company: "Torry Harris Integration Solutions",
    location: "Bengaluru, Karnataka, India",
    period: "10/2022 - 01/2024",
    type: "Full-time",
    logo: "THIS",
    responsibilities: [
      "Delivered large-scale machine learning solutions on GCP for telecom churn prediction and personalized revenue growth.",
      "Built hybrid ensemble churn models, achieving 82% recall and reducing churn by 15%.",
      "Developed scalable feature pipelines in BigQuery for batch and near-real-time data ingestion.",
      "Operationalized training and deployment using Vertex AI for reproducible workflows and low-latency inference."
    ]
  },
  {
    id: "4",
    title: "Senior Data Scientist",
    company: "TEKsystems Global Services in India",
    location: "Hyderabad, Telangana, India",
    period: "02/2020 - 10/2022",
    type: "Full-time",
    logo: "TEK",
    responsibilities: [
      "Developed Customer Lifetime Value (CLV) models using XGBoost to enhance value-based targeting strategies.",
      "Engineered behavioral features like RFM metrics and transaction velocity to analyze customer patterns at scale.",
      "Implemented MLOps workflows on AWS for model training and performance monitoring in a regulated banking environment."
    ]
  },
  {
    id: "5",
    title: "Project Engineer",
    company: "Wipro",
    location: "Bengaluru, Karnataka, India",
    period: "06/2018 - 02/2020",
    type: "Full-time",
    logo: "WIP",
    responsibilities: [
      "Delivered data-driven insights through analytics and reporting initiatives, enhancing business decision-making.",
      "Built optimized SQL workflows using Python, improving data reliability and processing efficiency.",
      "Developed forecasting and variance analysis reports, along with Tableau dashboards for performance tracking."
    ]
  }
]

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


export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="relative min-h-screen flex flex-col justify-center py-20 bg-background section-scroll-snap overflow-hidden">



      <div className="container px-4 md:px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4 uppercase">Experience</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm font-mono text-muted-foreground uppercase tracking-widest">
              <span>Timeline</span> <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-violet-500 to-purple-600"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg shadow-purple-500/50 z-10 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              </div>

              {/* Content */}
              <div className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                <SpotlightCard
                  className="h-full bg-card/60 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50"
                  spotlightColor="rgba(168, 85, 247, 0.08)"
                >
                  <CardHeader
                    className="pb-4 border-b border-border/50 cursor-pointer select-none"
                    onClick={() => toggleExpand(exp.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center font-black text-xs shadow-lg hover:scale-110 transition-transform duration-300">
                        {exp.logo}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] md:text-xs font-mono-premium text-purple-600 bg-purple-50 px-2 py-1 rounded-sm border border-purple-200">
                          {exp.period}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-purple-600"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>

                    <CardTitle className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-violet-600 transition-all duration-300">
                      {exp.title}
                    </CardTitle>

                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" /> {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-mono">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                    </div>
                  </CardHeader>

                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {exp.responsibilities.map((resp, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="text-muted-foreground text-sm leading-relaxed flex items-start gap-3"
                              >
                                <span className="min-w-[6px] h-[6px] rounded-full bg-purple-600 mt-2"></span>
                                <span>{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
