"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Sparkles, Mic, Paperclip, RotateCcw, Copy, ThumbsUp, ThumbsDown, Zap } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import type { ChatMessage } from "@/types"
import { axiosInstance } from "@/configs/axios"

interface AIAssistantTabProps {
  chatMessages: ChatMessage[]
  newMessage: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
  onQuickTopic: (topic: string) => void
}

export function AIAssistantTab({
  chatMessages,
  newMessage,
  onMessageChange,
  onSendMessage,
  onQuickTopic,
}: AIAssistantTabProps) {
  const [isTyping, setIsTyping] = useState(false)
  // scrollAreaRef is kept for consistency with original code but bottomRef is primarily used for scrolling.
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const [chats, setChats] = useState<{
    sender : "AI" | "HUMAN",
    chat : string
  }[]>([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);


  const quickTopics = [
    { icon: "📚", title: "Course Prerequisites", desc: "Check course requirements", color: "from-blue-500 to-cyan-500" },
    { icon: "💼", title: "Placement Stats", desc: "View placement statistics", color: "from-green-500 to-emerald-500" },
    { icon: "👨‍🏫", title: "Faculty Contact", desc: "Find faculty information", color: "from-purple-500 to-pink-500" },
    { icon: "📅", title: "Exam Schedule", desc: "Check exam timetable", color: "from-orange-500 to-red-500" },
    { icon: "📖", title: "Library Hours", desc: "Library timings & services", color: "from-teal-500 to-blue-500" },
    { icon: "🏠", title: "Hostel Rules", desc: "Accommodation guidelines", color: "from-indigo-500 to-purple-500" },
    { icon: "💰", title: "Fee Structure", desc: "Payment & fee details", color: "from-yellow-500 to-orange-500" },
    { icon: "🎓", title: "Scholarship Info", desc: "Available scholarships", color: "from-pink-500 to-rose-500" },
  ]

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]); // Changed from chatMessages to chats for consistency with local state

  const handleSendMessage = () => { // This function is not used after local state refactor
    if (newMessage.trim()) {
      setIsTyping(true)
      onSendMessage()
      setTimeout(() => setIsTyping(false), 2000)
    }
  }

   const handleAskQuestion = async()=>{
    try {
      setChats((p)=>[...p, {sender : "HUMAN" , chat : message}]);
      setIsTyping(true);
      const res = await axiosInstance.post("/career-advice", {question : message});
      setChats((p)=>[...p, {sender : "AI" , chat : res?.data?.advice}]);
      setMessage("");

    } catch (error) {
      // Replaced alert with console.error for better user experience in an iframe environment
      console.error("Error occurred during API call:", error);
      // Optionally, you can add a user-facing message in the UI instead of alert
    }finally{
      setIsTyping(false);
    }
  }

  return (
    // Main container now uses grid to define the two columns and sets the overall height
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-h-[100vh] p-4">
      {/* Quick Topics Sidebar */}
      <div className="xl:col-span-1 flex flex-col"> {/* Added flex flex-col to allow card content to stretch */}
        <Card className="h-full border-0 rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 via-purple-50/50 to-pink-50/30 dark:from-gray-900/90 dark:via-purple-900/20 dark:to-pink-900/10 backdrop-blur-2xl flex flex-col">
          <CardHeader className="pb-4 border-b border-white/10 flex-shrink-0">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Quick Topics
            </CardTitle>
            <CardDescription>Click on any topic to get started</CardDescription>
          </CardHeader>
          {/* ScrollArea for Quick Topics ensures independent scrolling */}
          <ScrollArea className="flex-1">
            <CardContent className="p-4">
              <div className="space-y-3">
                {quickTopics.map((topic) => (
                  <Button
                    key={topic.title}
                    variant="ghost"
                    className="w-full justify-start p-4 h-auto rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 group border-0"
                    onClick={() => onQuickTopic(topic.title)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${topic.color} shadow-sm group-hover:shadow-md transition-all duration-300`}>
                        <span className="text-lg">{topic.icon}</span>
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{topic.title}</p>
                        <p className="text-xs text-muted-foreground">{topic.desc}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="xl:col-span-3 flex flex-col max-h-[100vh] overflow-scroll"> {/* Added flex flex-col to allow inner card to stretch */}
        <Card className="h-full border-0 rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 via-blue-50/50 to-teal-50/30 dark:from-gray-900/90 dark:via-blue-900/20 dark:to-teal-900/10 backdrop-blur-2xl flex flex-col overflow-y-scroll">
            {/* Chat Header - Fixed at the top of the chat card */}
            <CardHeader className="pb-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
                      <Bot className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 p-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 shadow-sm">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      CU AI Assistant
                    </h3>
                    <p className="text-sm text-muted-foreground">Always here to help • Powered by AI</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="rounded-2xl h-12 w-12 p-0 hover:bg-white/30 dark:hover:bg-gray-800/30">
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area - This is the scrollable part of the chat card */}
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-6 space-y-6">
                  {chats.map((message, idx) => (
                    <div key={idx} className={`flex items-start gap-4 ${message.sender=="AI" ? "" : "justify-end"}`}>
                      {message.sender=="AI" && (
                        <Avatar className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0 shadow-md">
                          <AvatarFallback className="text-white">
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.sender=="AI" ? "" : "order-first"}`}>
                        <div
                          className={`rounded-3xl p-4 shadow-sm ${
                            message.sender=="AI"
                              ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-tl-lg"
                              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-lg"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.chat}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className={`text-xs ${message.sender=="AI" ? "text-muted-foreground" : "text-purple-100"}`}>
                              {/* {message.timestamp.toLocaleTimeString()} */}
                            </span>
                            {message.sender=="AI" && (
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60">
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {message.sender!=="AI" && (
                        <Avatar className="h-10 w-10 bg-gradient-to-r from-green-500 to-teal-500 flex-shrink-0 shadow-md">
                          <AvatarFallback className="text-white font-semibold">AC</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 shadow-md">
                        <AvatarFallback className="text-white">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl rounded-tl-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              <div ref={bottomRef} />
              </ScrollArea>

            {/* Message Input - Fixed at the bottom of the chat card */}
            <div className="p-6 border-t border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button size="sm" variant="ghost" className="rounded-2xl h-12 w-12 p-0 hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-sm">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ask me anything about your career"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
                    className="rounded-3xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm pr-14 h-12 shadow-sm text-base"
                  />
                  <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-2xl h-8 w-8 p-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleAskQuestion}
                  disabled={!message.trim()}
                  className="rounded-2xl h-12 w-12 p-0 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                AI can make mistakes. Please verify important information.
              </p>
            </div>
          </Card>
        </div>
    </div>
  )
}