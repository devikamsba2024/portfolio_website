"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#FFF7EC] to-[#FFE1C6]">
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
                width={160}
                height={160}
                className="rounded-full object-cover border-4 border-white shadow-xl"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200/20 to-orange-300/20" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-[#6B6B6B] mb-2 font-serif italic"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hey, there
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-[#111111]"
            >
              I AM <span className="text-[#111111]">DEVIKA NEKKALAPU</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl font-medium text-[#6B6B6B] mb-4"
            >
              AI/ML Engineer | Graduate Research Assistant | Data Scientist
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-xl text-base text-[#6B6B6B] mb-6 lg:mb-8"
            >
              Building AI-powered solutions and chatbots using LLMs and machine learning. 
              Specializing in data science, analytics, and intelligent system development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button 
                asChild
                size="default" 
                className="group bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white border-none rounded-full px-6 py-2 shadow-lg"
              >
                <Link href="#projects">
                  <Github className="mr-2 h-4 w-4" />
                  View Projects
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="default" 
                className="group border-[#FF8A3D] text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white rounded-full px-6 py-2"
              >
                <Link href="/chat">
                  <FileText className="mr-2 h-4 w-4" />
                  Talk to My AI
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
