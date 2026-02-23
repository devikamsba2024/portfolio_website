"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contact', label: 'Contact' },
]

export function StickyNavigation() {
    const [isVisible, setIsVisible] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling past hero
            setIsVisible(window.scrollY > 400)

            // Update active section
            const sections = navItems.map(item => document.getElementById(item.id))
            const scrollPosition = window.scrollY + 200

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg"
                >
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo/Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-bold text-lg bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent"
                            >
                                Devika Nekkalapu
                            </motion.div>

                            {/* Navigation Items */}
                            <div className="hidden md:flex items-center gap-1">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative",
                                            activeSection === item.id
                                                ? "text-white"
                                                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                                        )}
                                    >
                                        {activeSection === item.id && (
                                            <motion.span
                                                layoutId="activeSection"
                                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Mobile Menu - Dots */}
                            <div className="flex md:hidden gap-1.5">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            activeSection === item.id
                                                ? "bg-purple-600 w-6"
                                                : "bg-foreground/20 hover:bg-foreground/40"
                                        )}
                                        aria-label={`Go to ${item.label}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}
