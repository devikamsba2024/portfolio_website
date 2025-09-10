"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm **Devika's AI assistant**, powered by advanced language models. I can answer questions about her:\n\n- Background and skills\n- Projects and research  \n- Professional experiences\n\n*What would you like to know?*",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setIsMounted(true)
    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Call your backend API
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const chatEndpoint = process.env.NEXT_PUBLIC_CHAT_ENDPOINT || '/v1/chat/completions'
      const apiKey = process.env.NEXT_PUBLIC_API_KEY
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      // Add authorization header if API key is available
      if (apiKey && apiKey !== 'your-openrouter-api-key-here') {
        headers['Authorization'] = `Bearer ${apiKey}`
      }

      const response = await fetch(`${apiBaseUrl}${chatEndpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are Devika Nekkalapu's AI assistant. You help visitors learn about Devika's background, skills, and experience. 

About Devika:
- AI/ML Engineer and Graduate Research Assistant
- Specializes in data science, machine learning, and intelligent system development
- Expert in Python, TensorFlow, PyTorch, LLMs, NLP, computer vision
- Experience building AI-powered solutions and chatbots
- Strong background in data analytics and research
- Currently pursuing advanced studies in AI/ML

Be conversational, helpful, and focus on Devika's professional expertise. If asked about topics outside her portfolio, gently redirect to her AI/ML work and suggest contacting her directly for other inquiries.`
            },
            {
              role: 'user',
              content: inputValue
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request. Please try again."

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error calling API:', error)
      
      // Fallback to local responses if API fails
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('background') || input.includes('who') || input.includes('about')) {
      return "Devika Nekkalapu is an AI/ML Engineer and Graduate Research Assistant specializing in data science and intelligent system development. She has extensive experience building AI-powered solutions and chatbots using LLMs and machine learning."
    }
    
    if (input.includes('skills') || input.includes('technology') || input.includes('tech')) {
      return "Devika's technical expertise includes AI/ML, Python, TensorFlow, PyTorch, LLMs, data science, machine learning, deep learning, NLP, computer vision, and chatbot development. She's proficient in building end-to-end AI solutions."
    }
    
    if (input.includes('projects') || input.includes('work') || input.includes('portfolio')) {
      return "Devika has worked on various AI projects including autonomous systems, machine learning models, chatbot development, and data analytics solutions. You can check out her full portfolio on the projects section of her website."
    }
    
    if (input.includes('education') || input.includes('study') || input.includes('degree')) {
      return "Devika is currently a Graduate Research Assistant pursuing advanced studies in AI/ML. She has a strong academic background in computer science and artificial intelligence."
    }
    
    if (input.includes('experience') || input.includes('job') || input.includes('career')) {
      return "Devika has experience as an AI/ML Engineer and Graduate Research Assistant. She specializes in developing intelligent systems, working with LLMs, and creating data-driven solutions for various applications."
    }
    
    if (input.includes('contact') || input.includes('reach') || input.includes('connect')) {
      return "You can connect with Devika through the contact section on her website. She's always open to discussing AI/ML opportunities, research collaborations, and innovative projects."
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Great to meet you! I'm here to answer any questions about Devika's background, skills, and projects. What would you like to know?"
    }
    
    return "That's an interesting question! While I can tell you about Devika's AI/ML expertise, projects, education, and professional background, I'd recommend checking out her full portfolio or reaching out to her directly for more specific inquiries. Is there something particular about her work you'd like to know?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#FFE1C6]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Portfolio</span>
                </Link>
              </Button>
            </div>
            <h1 className="text-xl font-bold text-[#FF8A3D]">Talk to My AI</h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-[#FF8A3D] text-white' 
                        : 'bg-gradient-to-br from-orange-100 to-orange-200 text-[#FF8A3D]'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user' 
                        ? 'bg-[#FF8A3D] text-white' 
                        : 'bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800 border border-orange-200'
                    }`}>
                      {message.type === 'bot' ? (
                        <div className="text-sm leading-relaxed">
                          {isMounted ? (
                            <ReactMarkdown
                              components={{
                                h1: ({children}) => <h1 className="text-lg font-bold text-gray-900 mt-3 mb-2">{children}</h1>,
                                h2: ({children}) => <h2 className="text-base font-bold text-gray-900 mt-2 mb-1">{children}</h2>,
                                h3: ({children}) => <h3 className="text-sm font-semibold text-gray-900 mt-2 mb-1">{children}</h3>,
                                p: ({children}) => <div className="text-sm text-gray-800 mb-2 leading-relaxed">{children}</div>,
                                ul: ({children}) => <ul className="list-disc list-inside mb-2 text-gray-800 space-y-1">{children}</ul>,
                                ol: ({children}) => <ol className="list-decimal list-inside mb-2 text-gray-800 space-y-1">{children}</ol>,
                                li: ({children}) => <li className="text-sm text-gray-800">{children}</li>,
                                strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                                em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                                code: ({children}) => <code className="bg-orange-200 px-1 py-0.5 rounded text-xs font-mono text-orange-800">{children}</code>,
                                pre: ({children}) => <pre className="bg-orange-100 p-3 rounded text-xs font-mono text-orange-900 overflow-x-auto mb-2">{children}</pre>,
                                table: ({children}) => <table className="w-full border-collapse border border-gray-300 mb-3 text-xs">{children}</table>,
                                thead: ({children}) => <thead className="bg-orange-50">{children}</thead>,
                                tbody: ({children}) => <tbody>{children}</tbody>,
                                tr: ({children}) => <tr className="border-b border-gray-200">{children}</tr>,
                                th: ({children}) => <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-900">{children}</th>,
                                td: ({children}) => <td className="border border-gray-300 px-2 py-1 text-gray-800">{children}</td>,
                                blockquote: ({children}) => <blockquote className="border-l-2 border-orange-300 pl-2 ml-2 italic text-gray-700 mb-2">{children}</blockquote>,
                                a: ({children, href}) => <a href={href} className="text-orange-600 hover:text-orange-700 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                              {message.content}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-[#FF8A3D] flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#FF8A3D] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#FF8A3D] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#FF8A3D] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-orange-200 p-4 bg-gradient-to-r from-orange-50/50 to-orange-100/50">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Devika's background, skills, projects..."
                className="flex-1 border-orange-200 focus:border-[#FF8A3D] focus:ring-[#FF8A3D] rounded-full"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#FF8A3D] hover:bg-[#FF8A3D]/90 text-white rounded-full px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
