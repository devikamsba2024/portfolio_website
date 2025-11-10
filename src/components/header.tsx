"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Education', href: '/education' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-gray-50/80 supports-[backdrop-filter]:to-gray-100/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">Devika Nekkalapu</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            asChild
            size="sm" 
            className="hidden md:flex bg-gray-600 hover:bg-gray-600/90 text-white border-none rounded-full px-4 py-2 shadow-md"
          >
            <Link href="/chat">
              Talk to My AI
            </Link>
          </Button>
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/20 bg-gradient-to-r from-gray-50 to-gray-100"
        >
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/chat"
              className="block text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Talk to My AI
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}
