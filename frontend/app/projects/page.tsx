"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, Github, ExternalLink, Users, Code, Zap, Trophy, Plus, Eye, Heart } from "lucide-react"
import Navigation from "@/components/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Smart Campus Management System",
      description:
        "A comprehensive web application for managing campus resources, student data, and academic processes with real-time analytics.",
      author: "Arjun Sharma",
      department: "CSE",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      stars: 45,
      views: 234,
      likes: 67,
      image: "/campus-management-dashboard.png",
      github: "https://github.com/arjun/smart-campus",
      demo: "https://smart-campus-demo.vercel.app",
      createdAt: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      title: "AI-Powered Study Assistant",
      description:
        "Machine learning application that helps students with personalized study plans, progress tracking, and intelligent recommendations.",
      author: "Priya Patel",
      department: "CSE",
      category: "Machine Learning",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      stars: 38,
      views: 189,
      likes: 52,
      image: "/ai-study-assistant-interface.png",
      github: "https://github.com/priya/ai-study-assistant",
      demo: "https://ai-study-assistant.herokuapp.com",
      createdAt: "2024-01-10",
      featured: true,
    },
    {
      id: 3,
      title: "IoT Weather Monitoring Station",
      description:
        "Real-time weather monitoring system using IoT sensors with data visualization and alert mechanisms for campus weather conditions.",
      author: "Rohit Kumar",
      department: "ECE",
      category: "IoT",
      technologies: ["Arduino", "Raspberry Pi", "Python", "React"],
      stars: 29,
      views: 156,
      likes: 41,
      image: "/iot-weather-dashboard.png",
      github: "https://github.com/rohit/iot-weather-station",
      demo: "https://weather-station-demo.com",
      createdAt: "2024-01-05",
      featured: false,
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description:
        "Secure and transparent voting system using blockchain technology for student elections and surveys with immutable records.",
      author: "Kavya Reddy",
      department: "IT",
      category: "Blockchain",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      stars: 33,
      views: 198,
      likes: 48,
      image: "/blockchain-voting-interface.png",
      github: "https://github.com/kavya/blockchain-voting",
      demo: "https://blockchain-voting-demo.netlify.app",
      createdAt: "2023-12-28",
      featured: false,
    },
    {
      id: 5,
      title: "Virtual Reality Lab Simulator",
      description:
        "Immersive VR application for conducting virtual laboratory experiments in physics and chemistry with realistic simulations.",
      author: "Vikash Sharma",
      department: "CSE",
      category: "VR/AR",
      technologies: ["Unity", "C#", "Oculus SDK", "Blender"],
      stars: 56,
      views: 312,
      likes: 78,
      image: "/vr-lab-simulator-interface.png",
      github: "https://github.com/vikash/vr-lab-simulator",
      demo: "https://vr-lab-demo.com",
      createdAt: "2023-12-20",
      featured: true,
    },
    {
      id: 6,
      title: "Mobile Health Tracker",
      description:
        "Cross-platform mobile application for tracking health metrics, medication reminders, and connecting with healthcare providers.",
      author: "Anita Desai",
      department: "IT",
      category: "Mobile Development",
      technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
      stars: 42,
      views: 267,
      likes: 59,
      image: "/health-tracker-app.png",
      github: "https://github.com/anita/health-tracker",
      demo: "https://health-tracker-demo.expo.dev",
      createdAt: "2023-12-15",
      featured: false,
    },
  ]

  const categories = [
    "Web Development",
    "Machine Learning",
    "Mobile Development",
    "IoT",
    "Blockchain",
    "VR/AR",
    "Data Science",
    "Cybersecurity",
  ]

  const departments = ["CSE", "IT", "ECE", "ME", "CE", "EE"]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesDepartment = selectedDepartment === "all" || project.department === selectedDepartment

    return matchesSearch && matchesCategory && matchesDepartment
  })

  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Projects</h1>
              <p className="text-muted-foreground">Discover amazing projects built by CU students</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Project
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Your Project</DialogTitle>
                  <DialogDescription>Share your amazing project with the CU community</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectTitle">Project Title</Label>
                      <Input id="projectTitle" placeholder="Enter project title..." className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your project..." rows={4} className="rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input id="github" placeholder="https://github.com/..." className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="demo">Demo URL</Label>
                      <Input id="demo" placeholder="https://your-demo.com" className="rounded-xl" />
                    </div>
                  </div>
                  <Button className="w-full rounded-xl">Submit Project</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white border-0 rounded-2xl">
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-sm opacity-90">Total Projects</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0 rounded-2xl">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{new Set(projects.map((p) => p.author)).size}</div>
              <div className="text-sm opacity-90">Contributors</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white border-0 rounded-2xl">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.stars, 0)}</div>
              <div className="text-sm opacity-90">Total Stars</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white border-0 rounded-2xl">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{featuredProjects.length}</div>
              <div className="text-sm opacity-90">Featured</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 rounded-2xl shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, technologies, or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 rounded-xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48 rounded-xl">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-xl bg-transparent">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.slice(0, 3).map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-0">
                      <Trophy className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {project.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{project.author}</div>
                          <div className="text-xs text-muted-foreground">{project.department}</div>
                        </div>
                        <Badge variant="outline" className="ml-auto rounded-full">
                          {project.category}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs rounded-full">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs rounded-full">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {project.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {project.likes}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Projects ({filteredProjects.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-0">
                      <Trophy className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {project.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{project.author}</div>
                        <div className="text-xs text-muted-foreground">{project.department}</div>
                      </div>
                      <Badge variant="outline" className="ml-auto rounded-full">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs rounded-full">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs rounded-full">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {project.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {project.likes}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                          <Github className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
