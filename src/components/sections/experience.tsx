"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin, Building } from "lucide-react"

const experiences = [
  {
    id: "1",
    title: "Graduate Research Assistant",
    company: "National Institute for Aviation Research",
    location: "Wichita, KS",
    period: "05/2025 to Current",
    type: "Research",
    responsibilities: [
      "Spearheaded development of an AI-powered chatbot for NIAR and Wichita State University using open-source LLMs",
      "Built a web-based interface, scalable inference pipeline, retrieval-augmented generation (RAG) modules, and a load-balanced deployment for seamless user interaction",
      "Implemented monitoring dashboards and logging for observability, and integrated relational and vector databases to support retrieval-augmented responses",
      "Deployed a functional prototype and currently advancing towards high availability, scalability, and production readiness"
    ]
  },
  {
    id: "2",
    title: "FREDS AI Task Force GRA",
    company: "Wichita State University",
    location: "Wichita, KS", 
    period: "01/2025 to 05/2025",
    type: "Research",
    responsibilities: [
      "Working as a Research Assistant, focusing on integrating AI tools and technologies into the Finance, Real Estate, and Decision Sciences (FREDS) Department at the Barton School of Business, Wichita State University",
      "Researched and worked on the WSDM Cup 2025 'Multilingual Chatbot Arena' project, applying large language models to predict human-preferred responses",
      "Fine-tuned multilingual models using QLoRA and low-rank adaptation techniques to enable efficient training on limited hardware"
    ]
  },
  {
    id: "3",
    title: "Senior Software Engineer",
    company: "Torry Harris Integration Solutions",
    location: "Bangalore, India",
    period: "10/2022 to 01/2024",
    type: "Full-time",
    responsibilities: [
      "Worked as a Data Analyst for a leading British Telecommunications client, focusing on sales analysis for mobile networks, broadband services, and TV packages",
      "Developed predictive models using machine learning algorithms to forecast customer behavior and improve retention strategies, resulting in a 9% increase in customer retention",
      "Advanced analytics on customer data using SQL and Python to uncover patterns and trends, informing strategic decisions that contributed to a 6% reduction in churn rate",
      "Created dashboards and periodic reports using Tableau offering insights into market trends, operational efficiency, and customer behavior"
    ]
  },
  {
    id: "4",
    title: "Senior Software Engineer",
    company: "TekSystems Global Services",
    location: "Hyderabad, India",
    period: "02/2020 to 10/2022",
    type: "Full-time",
    responsibilities: [
      "Developed and deployed RESTful APIs using MuleSoft Anypoint Platform, integrating HubSpot, MDM Systems, IBM Kenexa, and PeopleSoft for seamless candidate tracking and event management",
      "Enhanced API security and scalability by developing Apigee proxies, strengthening API infrastructure, and ensuring reliable communication channels",
      "Received SPOT Award and 'Best Project' for exceptional performance and contributions to the Applicant Candidate Tracker project"
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#111111]">Professional Experience</h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            Building AI solutions, conducting research, and delivering data-driven insights across various industries.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/50">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-[#111111] flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="text-[#111111] font-semibold text-lg flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-600" />
                        {exp.company}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      exp.type === 'Research' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 text-sm text-[#6B6B6B]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="text-[#6B6B6B] text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-gray-600 mt-1.5 text-xs">●</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
