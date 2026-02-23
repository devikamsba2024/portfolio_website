import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StickyNavigation } from '@/components/navigation'
import { AnimatedBackground } from '@/components/animated-background'

export const metadata: Metadata = {
  title: 'Devika Portfolio',
  description: 'Modern AI Engineer portfolio showcasing projects in autonomous systems, machine learning, and artificial intelligence.',
  keywords: ['AI Engineer', 'Machine Learning', 'Autonomous Systems', 'Artificial Intelligence', 'Portfolio'],
  authors: [{ name: 'Devika' }],
  creator: 'Devika',
  publisher: 'Devika',
  openGraph: {
    title: 'Devika Portfolio',
    description: 'Modern AI Engineer portfolio showcasing projects in autonomous systems, machine learning, and artificial intelligence.',
    siteName: 'Devika Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devika Portfolio',
    description: 'Modern AI Engineer portfolio showcasing projects in autonomous systems, machine learning, and artificial intelligence.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased`}>
        <AnimatedBackground />
        <div className="bg-noise" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <StickyNavigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
