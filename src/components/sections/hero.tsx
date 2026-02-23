"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MagneticButton } from "@/components/ui/magnetic-button"


const Typewriter = ({ roles }: { roles: string[] }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleType = () => {
      const fullText = roles[currentRoleIndex]

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypingSpeed(50)
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypingSpeed(150)
      }

      if (!isDeleting && currentText === fullText) {
        // Finished typing
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentText === '') {
        // Finished deleting
        setIsDeleting(false)
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roles, currentRoleIndex, typingSpeed])

  return (
    <span className="inline-block min-w-[200px]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background text-foreground section-scroll-snap">

      <div className="container relative z-10 flex flex-col items-center text-center">

        {/* Profile Image Centered in Rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 relative z-20 flex justify-center items-center"
        >
          {/* Concentric Rings Anchored to Profile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none -z-10 flex items-center justify-center">
            {/* Spiraling Rings (Expanding Outward) */}
            <div className="absolute w-[240px] h-[240px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 0 }}
                className="w-full h-full rounded-full border border-accent/30"
              />
            </div>
            <div className="absolute w-[320px] h-[320px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="w-full h-full rounded-full border border-accent/30"
              />
            </div>
            <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
                className="w-full h-full rounded-full border border-accent/30"
              />
            </div>
            <div className="absolute w-[480px] h-[480px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 3 }}
                className="w-full h-full rounded-full border border-accent/30"
              />
            </div>

            {/* Distinct Enclosing Ring (Static/Subtle Pulse) */}
            <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <motion.div
                animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-full border-2 border-accent/30"
              />
            </div>
          </div>

          <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-background shadow-2xl">
            <Image
              src="/devika2.jpeg"
              alt="Devika Nekkalapu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Wide Spaced Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 space-y-3"
        >
          <h2 className="text-[10px] md:text-xs font-mono text-accent uppercase tracking-[0.3em] h-4">
            <Typewriter roles={["AI/ML Engineer", "Data Scientist"]} />
          </h2>

          <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-[0.2em] text-foreground uppercase">
            Hi, I&apos;m Devika
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {['About', 'Experience', 'Skills', 'Projects'].map((item) => (
              <MagneticButton key={item} strength={25}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="group inline-block px-5 py-2 text-[10px] font-medium tracking-widest text-foreground uppercase border border-foreground/20 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-600 hover:text-white hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  <span className="relative z-10">{item}</span>
                </a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/50"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-foreground/50"></div>
        </div>
      </motion.div>
    </section>
  )
}

