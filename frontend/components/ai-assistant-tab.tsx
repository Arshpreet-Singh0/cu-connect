"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send } from "lucide-react"
import type { ChatMessage } from "@/types"

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
  const quickTopics = [
    "Course Prerequisites",
    "Placement Stats",
    "Faculty Contact",
    "Exam Schedule",
    "Library Hours",
    "Hostel Rules",
    "Fee Structure",
    "Scholarship Info",
  ]

  return (
    <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          CU AI Assistant
        </CardTitle>
        <CardDescription>Get instant help with department-specific queries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ScrollArea className="h-96 w-full border rounded-2xl p-4 bg-muted/20">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex items-start gap-3 ${message.isBot ? "" : "justify-end"}`}>
                  {message.isBot && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl p-3 max-w-xs ${message.isBot ? "bg-muted" : "bg-purple-500 text-white"}`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                  {!message.isBot && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about CU academics, placements, or campus life..."
              value={newMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
              className="rounded-xl"
            />
            <Button onClick={onSendMessage} className="rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickTopics.map((topic) => (
              <Button
                key={topic}
                variant="outline"
                size="sm"
                className="text-xs bg-transparent rounded-xl"
                onClick={() => onQuickTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
