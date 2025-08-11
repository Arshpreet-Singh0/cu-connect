"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Star } from "lucide-react"
import type { Mentor } from "@/types"

interface AvailableMentorsProps {
  mentors: Mentor[]
  connectedUsers: Set<number>
  onConnect: (userId: number) => void
}

export function AvailableMentors({ mentors, connectedUsers, onConnect }: AvailableMentorsProps) {
  // const onlineMentors = mentors.filter((m) => m.isOnline).slice(0, 2)

  return (
    <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Available Mentors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {mentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {mentor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{mentor.name}</h4>
              <p className="text-sm text-muted-foreground">
                Working at {mentor.currCompany}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{mentor.rating}</span>
                <span className="text-xs text-muted-foreground">({mentor.sessions} sessions)</span>
              </div>
            </div>
            <Button size="sm" className="rounded-xl">
              {connectedUsers.has(mentor.id) ? "Connected" : "Chat Now"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
