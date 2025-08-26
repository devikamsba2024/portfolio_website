import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/devikamsba2024',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ndevika',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:devikanekkalapu7@gmail.com',
    icon: Mail,
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              © 2024 Devika Nekkalapu. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
