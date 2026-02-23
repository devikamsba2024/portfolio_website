"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Home } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center section-scroll-snap bg-background py-20 overflow-hidden">

      <div className="container relative z-10 px-4 md:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm md:text-base font-medium tracking-[0.5em] text-muted-foreground uppercase mb-16"
        >
          A B O U T
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">

          {/* Left Column: Profile Image - aligned with "little background" */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 relative w-full max-w-xs mx-auto md:max-w-none md:sticky md:top-24"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/devika.jpeg"
                alt="Devika Nekkalapu"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Right Column: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-8 text-left space-y-8"
          >
            <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Here is a <span className="underline decoration-accent decoration-4 underline-offset-4">little</span> background
            </h3>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-semibold">AI/ML Engineer</span> with 7 years of experience delivering scalable machine learning and GenAI solutions across retail, Telecom, and financial services. Skilled in building end-to-end ML pipelines from data engineering and feature design to deployment and production monitoring.
              </p>
              <p>
                Hands-on experience with <span className="text-foreground font-semibold">RAG systems</span> using LangChain and GPT-based models to enhance enterprise knowledge automation and reduce operational costs. Strong background in predictive modeling, segmentation, anomaly detection, and forecasting using Python, SQL, Scikit-learn, TensorFlow, and PyTorch.
              </p>
              <p>
                Experienced in <span className="text-foreground font-semibold">AWS and GCP</span> ecosystems including SageMaker, EMR, Vertex AI, and Kubernetes-based deployments. Passionate about translating complex data into measurable business impact through robust ML systems and cross-functional collaboration.
              </p>
            </div>

            {/* Skill Badges */}
            <motion.div
              id="skills"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8 border-t border-border/30"
            >
              <h4 className="text-sm font-mono-premium text-muted-foreground mb-4">CORE SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'RAG', 'LangChain', 'LangGraph', 'LlamaIndex', 'RAGAS', 'Agentic AI Workflows', 'Prompt Engineering',
                  'QLoRA', 'LoRA', 'PEFT', 'Instruction Tuning', 'Embeddings', 'Hybrid Search (BM25 + Vector)', 'HNSW', 'Hugging Face Transformers',
                  'Python', 'SQL', 'Scikit-learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'Random Forest', 'K-Means',
                  'Deep Learning', 'LLMs',
                  'FastAPI', 'REST APIs', 'Next.js', 'React', 'TypeScript', 'Node.js',
                  'AWS', 'S3', 'ECS', 'EKS', 'EC2', 'SageMaker', 'RDS', 'Aurora', 'DynamoDB', 'Lambda', 'SQS', 'API Gateway', 'IAM', 'CloudWatch',
                  'GCP', 'Vertex AI', 'BigQuery', 'GKE', 'Cloud Run', 'Cloud Storage', 'Pub/Sub', 'Cloud Monitoring',
                  'PostgreSQL', 'Qdrant', 'Vector DBs',
                  'Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'CI/CD', 'MLflow', 'Weights & Biases',
                  'Data Analysis', 'MongoDB'
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/20 rounded-full text-foreground hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-20"
        >
          <Link
            href="#home"
            className="p-4 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors duration-300"
          >
            <Home className="w-6 h-6" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
