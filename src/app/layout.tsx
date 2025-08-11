import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Engineer Portfolio',
  description: 'Modern AI Engineer portfolio showcasing projects in autonomous systems, machine learning, and artificial intelligence.',
  keywords: ['AI Engineer', 'Machine Learning', 'Autonomous Systems', 'Artificial Intelligence', 'Portfolio'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  openGraph: {
    title: 'AI Engineer Portfolio',
    description: 'Modern AI Engineer portfolio showcasing projects in autonomous systems, machine learning, and artificial intelligence.',
    siteName: 'AI Engineer Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer Portfolio',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
