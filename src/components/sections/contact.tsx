"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Twitter, Circle } from 'lucide-react'

// Confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          initial={{ top: '50%', left: `${piece.x}%`, opacity: 1, scale: 1 }}
          animate={{
            top: '100%',
            opacity: 0,
            rotate: 360,
            scale: 0,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setShowConfetti(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Primary Email',
      description: 'devikanekkalapu7@gmail.com',
      href: 'mailto:devikanekkalapu7@gmail.com',
    },
    {
      icon: Mail,
      title: 'Student Email',
      description: 'dxnekkalapu@shockers.wichita.edu',
      href: 'mailto:dxnekkalapu@shockers.wichita.edu',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: '(316) 226-4233',
      href: 'tel:+13162264233',
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Wichita, KS',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/devikamsba2024', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ndevika/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ]

  return (
    <section id="contact" className="section-padding bg-background">
      {showConfetti && <Confetti />}

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations.
            Feel free to reach out if you'd like to work together or just say hello!
          </p>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/30 rounded-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Circle className="w-2 h-2 fill-green-500 text-green-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground">Currently Available for Opportunities</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/60 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-foreground">Send a Message</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-purple-500/50 hover:bg-purple-500/10"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder=" "
                          className={`peer ${focusedField === 'name' ? 'border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-3 -top-2.5 bg-card px-1 text-sm font-medium text-muted-foreground transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600"
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder=" "
                          className={`peer ${focusedField === 'email' ? 'border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-3 -top-2.5 bg-card px-1 text-sm font-medium text-muted-foreground transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        className={`peer ${focusedField === 'subject' ? 'border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                      />
                      <label
                        htmlFor="subject"
                        className="absolute left-3 -top-2.5 bg-card px-1 text-sm font-medium text-muted-foreground transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600"
                      >
                        Subject
                      </label>
                    </div>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        rows={5}
                        className={`peer ${focusedField === 'message' ? 'border-purple-500 ring-2 ring-purple-500/20' : ''}`}
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-3 -top-2.5 bg-card px-1 text-sm font-medium text-muted-foreground transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-600"
                      >
                        Message
                      </label>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Contact Information</h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/60 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300 group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="p-2 bg-gradient-to-r from-purple-600/10 to-violet-600/10 rounded-lg border border-purple-500/20"
                        >
                          <info.icon className="h-5 w-5 text-purple-600" />
                        </motion.div>
                        <div>
                          <h4 className="font-medium text-foreground">{info.title}</h4>
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-purple-600 transition-colors"
                          >
                            {info.description}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          {/* Social Media Links */}
            <div className="pt-4">
              <h4 className="font-medium mb-3 text-foreground">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/20 rounded-lg hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-5 w-5 text-purple-600" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Available For */}
            <div className="pt-4">
              <h4 className="font-medium mb-3 text-foreground">Available for:</h4>
              <div className="flex flex-wrap gap-2">
                {['AI/ML Consulting', 'Research Collaboration', 'Data Science Projects', 'Chatbot Development'].map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/20 text-foreground rounded-full font-medium hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
