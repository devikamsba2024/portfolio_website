"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-white/10" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <Image
                src="/devika.jpeg"
                alt="Devika Nekkalapu"
                width={240}
                height={240}
                className="rounded-full object-cover border-4 border-white shadow-xl"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200/20 to-gray-300/20" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting & Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-[#111111]"
            >
              Hi, I'm <span className="text-[#111111]">Devika Nekkalapu</span>
            </motion.h1>

            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl text-lg lg:text-xl text-[#6B6B6B] mb-8 lg:mb-10 space-y-6 leading-relaxed"
            >
              <p>
                I'm an AI and Data Science enthusiast passionate about transforming data into intelligent insights and real-world solutions. With a background in business analytics, machine learning, and LLMs, I love exploring how data-driven intelligence can enhance decision-making and user experience.
              </p>
              
              <p>
                From analyzing customer behavior using Python, SQL, and Tableau to building and deploying chatbot applications powered by Large Language Models on AWS, my work bridges analytical depth with innovative AI solutions. I've also worked extensively with tools like TensorFlow, Scikit-learn, and Keras, creating scalable systems that integrate data, intelligence, and automation seamlessly.
              </p>
              
              <p>
                Curious by nature and driven by impact, I'm always learning, experimenting, and building projects that bring AI closer to everyday business problems.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
