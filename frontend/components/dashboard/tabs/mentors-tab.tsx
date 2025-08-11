"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, MessageCircle, Star } from "lucide-react"
import type { Mentor } from "@/types"

interface MentorsTabProps {
  mentors: Mentor[]
  searchQuery: string
  selectedDepartment: string
  connectedUsers: Set<number>
  onSearchChange: (query: string) => void
  onDepartmentChange: (department: string) => void
  onConnect: (userId: number) => void
}

export function MentorsTab({
  mentors,
  searchQuery,
  selectedDepartment,
  connectedUsers,
  onSearchChange,
  onDepartmentChange,
  onConnect,
}: MentorsTabProps) {
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = selectedDepartment === "all" || mentor.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Find Mentors</CardTitle>
        <CardDescription>Connect with experienced alumni and industry professionals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search mentors by expertise, company, or department..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-xl"
            />
            <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
              </SelectContent>
            </Select>
            <Button className="rounded-xl">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="border-0 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
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
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-muted-foreground">{mentor.role}</p>
                      <p className="text-sm font-medium text-purple-600">{mentor.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{mentor.bio}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="rounded-full">
                          {mentor.department}
                        </Badge>
                        <Badge variant="outline" className="rounded-full">
                          {mentor.experience}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{mentor.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {mentor.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs rounded-full">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          onClick={() => onConnect(mentor.id)}
                          disabled={connectedUsers.has(mentor.id)}
                          className="rounded-xl"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {connectedUsers.has(mentor.id) ? "Connected" : "Message"}
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                          View Profile
                        </Button>
                      </div>
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
