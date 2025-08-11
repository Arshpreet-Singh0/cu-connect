"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import type { PeerChat } from "@/types"

interface ChatTabProps {
  peerChats: PeerChat[]
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ChatTab({ peerChats, searchQuery, onSearchChange }: ChatTabProps) {
  const filteredChats = peerChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Peer Chat</CardTitle>
        <CardDescription>Connect with your peers and seniors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for students, seniors, or topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-xl"
            />
            <Button className="rounded-xl">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChats.map((chat) => (
              <Card
                key={chat.id}
                className="cursor-pointer hover:shadow-md transition-shadow rounded-2xl border-0 bg-muted/30"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{chat.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {chat.department} • {chat.year}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <Badge className="mt-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
