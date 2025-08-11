"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, MessageCircle, Star, Calendar, Award, Users, Clock, MapPin, ExternalLink } from 'lucide-react'
import type { Mentor } from "@/types"
import { useEffect, useState } from "react"
import { axiosInstance } from "@/configs/axios"

interface MentorsTabProps {
  searchQuery: string
  selectedDepartment: string
  connectedUsers: Set<number>
  onSearchChange: (query: string) => void
  onDepartmentChange: (department: string) => void
  onConnect: (userId: number) => void
}

export function MentorsTab({
  searchQuery,
  selectedDepartment,
  connectedUsers,
  onSearchChange,
  onDepartmentChange,
}: MentorsTabProps) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.currCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor?.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = selectedDepartment === "all" || mentor.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })


  const getMentors = async()=>{
    try {
      const res = await axiosInstance.get("/mentors");
      console.log(res);
      
      setMentors(res?.data?.mentors);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getMentors();
  },[]);


  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 backdrop-blur-xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Find Your Perfect Mentor
          </CardTitle>
          <CardDescription className="text-lg">
            Connect with experienced alumni and industry professionals who can guide your career journey
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search mentors by expertise, company, or department..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="rounded-2xl border-0 bg-white/60 backdrop-blur-sm shadow-sm pl-4"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl border-0 bg-white/60 backdrop-blur-sm shadow-sm">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="CSE">Computer Science</SelectItem>
                <SelectItem value="IT">Information Technology</SelectItem>
                <SelectItem value="ECE">Electronics & Communication</SelectItem>
                <SelectItem value="ME">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Button className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Card 
            key={mentor.id} 
            className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-blue-900/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
          >
            <CardContent className="p-6">
              {/* Mentor Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-4 ring-white/50 shadow-lg">
                    <AvatarImage src={mentor.avatar || "/alex-chen-portrait.png"} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-lg font-bold">
                      {mentor.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {mentor.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse"></div>
                  )}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold">{mentor.role}</p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {mentor.currCompany}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-sm font-bold">{mentor.rating || 4.8}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                    <Users className="h-3 w-3" />
                    <span className="text-sm font-bold">{mentor.sessions || 3}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-sm font-bold">{4} year</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
              </div>

              {/* Department Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
                  {mentor.department}
                </Badge>
                <Badge variant="outline" className="rounded-full bg-gradient-to-r from-green-100 to-teal-100 border-green-200">
                  {mentor?.experience}
                </Badge>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground mb-2">EXPERTISE</p>
                <div className="flex flex-wrap gap-1">
                  {mentor?.skills.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="text-xs rounded-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {mentor?.skills?.length > 4 && (
                    <Badge variant="secondary" className="text-xs rounded-full">
                      +{mentor?.skills?.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  // onClick={() => onConnect(mentor.id)}
                  // disabled={connectedUsers.has(mentor.id)}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {/* {connectedUsers.has(mentor.id) ? "Connected" : "Message"} */}
                  Send Message
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-2xl bg-white/60 backdrop-blur-sm border-purple-200 hover:bg-white/80 group-hover:scale-105 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              {/* Schedule Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 rounded-2xl hover:bg-white/40 text-purple-600 hover:text-purple-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-purple-900/20">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}