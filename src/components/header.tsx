"use client"

import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full p-6 mix-blend-difference text-primary-foreground dark:text-primary">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/devikanekkalapu" target="_blank" className="hover:text-gray-400 transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com/in/devikanekkalapu" target="_blank" className="hover:text-gray-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="mailto:devika@example.com" className="hover:text-gray-400 transition-colors">
            <Mail className="w-5 h-5" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/#contact" className="text-sm font-medium hover:text-gray-400 transition-colors uppercase tracking-widest">
            Say Hello
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
