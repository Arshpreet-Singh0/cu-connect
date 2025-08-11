export interface User {
  id: number
  name: string
  department: string
  year?: string
  avatar?: string
  isOnline?: boolean
  bio?: string
  skills?: string[]
  github?: string
  linkedin?: string
}

export interface Student extends User {
  cgpa: number
  codingRank: number
  projects: number
}

export interface Mentor extends User {
  role: string
  company: string
  experience: string
  expertise: string[]
  rating: number
  sessions: number
}

export interface ChatMessage {
  id: number
  sender: string
  message: string
  timestamp: Date
  isBot: boolean
}

export interface Question {
  id: number
  question: string
  author: string
  department: string
  answers: number
  time: string
  likes: number
  views: number
  tags: string[]
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  helpful: number
  views: number
}

export interface PeerChat {
  id: number
  name: string
  department: string
  year: string
  isOnline: boolean
  lastMessage: string
  avatar?: string
  unreadCount: number
}

export interface Project {
  id: number
  title: string
  description: string
  author: string
  department: string
  category: string
  technologies: string[]
  stars: number
  views: number
  likes: number
  image?: string
  github?: string
  demo?: string
  createdAt: string
  featured: boolean
}
