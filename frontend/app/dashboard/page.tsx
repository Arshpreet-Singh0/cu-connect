"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Target } from "lucide-react"
import Navigation from "@/components/navigation"
import { useSearchParams } from "next/navigation"
import type { ChatMessage, Question } from "@/types"
import { topStudents, mentors, initialQuestions, initialFAQs, initialPeerChats } from "@/data/mock-data"
import { generateAIResponse } from "@/utils/ai-responses"

// Dashboard Components
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentQuestions } from "@/components/dashboard/recent-questions"
import { AvailableMentors } from "@/components/dashboard/available-mentors"

// Tab Components
import { ChatTab } from "@/components/dashboard/tabs/chat-tab"
import { MentorsTab } from "@/components/dashboard/tabs/mentors-tab"
import { FAQTab } from "@/components/dashboard/tabs/faq-tab"
import { AIAssistantTab } from "@/components/dashboard/tabs/ai-assistant-tab"
import { DCPDTab } from "@/components/dashboard/tabs/dcpd-tab"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [connectedUsers, setConnectedUsers] = useState(new Set<number>())

  // Questions state
  const [questions, setQuestions] = useState(initialQuestions)
  const [faqs] = useState(initialFAQs)
  const [peerChats] = useState(initialPeerChats)

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "AI Assistant",
      message: "Hello! I'm your CU AI Assistant. How can I help you today?",
      timestamp: new Date(),
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["dashboard", "chat", "mentors", "faq", "chatbot", "dcpd"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date(),
        isBot: false,
      }
      setChatMessages([...chatMessages, userMessage])

      // Simulate AI response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: chatMessages.length + 2,
          sender: "AI Assistant",
          message: generateAIResponse(newMessage),
          timestamp: new Date(),
          isBot: true,
        }
        setChatMessages((prev) => [...prev, botResponse])
      }, 1000)

      setNewMessage("")
    }
  }

  const handleConnectUser = (userId: number) => {
    setConnectedUsers(new Set([...connectedUsers, userId]))
  }

  const handleAskQuestion = (title: string, description: string) => {
    if (title.trim() && description.trim()) {
      const question: Question = {
        id: questions.length + 1,
        question: title,
        author: "Alex Chen",
        department: "CSE",
        answers: 0,
        time: "Just now",
        likes: 0,
        views: 1,
        tags: ["new-question"],
      }
      setQuestions([question, ...questions])
    }
  }

  const handleQuickTopic = (topic: string) => {
    setNewMessage(`Tell me about ${topic.toLowerCase()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex! 👋</h1>
              <p className="text-muted-foreground">Your gateway to academic excellence and career success</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                <Target className="h-4 w-4 mr-2" />
                Goals
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50 rounded-2xl p-1">
            <TabsTrigger value="dashboard" className="rounded-xl">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chat" className="rounded-xl">
              Chat
            </TabsTrigger>
            <TabsTrigger value="mentors" className="rounded-xl">
              Mentors
            </TabsTrigger>
            <TabsTrigger value="faq" className="rounded-xl">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="rounded-xl">
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="dcpd" className="rounded-xl">
              DCPD
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <StatsCards onlineMentorsCount={mentors.filter((m) => m.isOnline).length} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentQuestions questions={questions} onAskQuestion={handleAskQuestion} />
              <AvailableMentors mentors={mentors} connectedUsers={connectedUsers} onConnect={handleConnectUser} />
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <ChatTab peerChats={peerChats} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <MentorsTab
              mentors={mentors}
              searchQuery={searchQuery}
              selectedDepartment={selectedDepartment}
              connectedUsers={connectedUsers}
              onSearchChange={setSearchQuery}
              onDepartmentChange={setSelectedDepartment}
              onConnect={handleConnectUser}
            />
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <FAQTab faqs={faqs} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-6">
            <AIAssistantTab
              chatMessages={chatMessages}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onQuickTopic={handleQuickTopic}
            />
          </TabsContent>

          <TabsContent value="dcpd" className="space-y-6">
            <DCPDTab topStudents={topStudents} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
