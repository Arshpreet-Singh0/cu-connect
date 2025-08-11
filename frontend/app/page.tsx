"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Users,
  Bot,
  Trophy,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useAppSelector } from "@/store/hooks"

export default function LandingPage() {
  const { theme } = useTheme()
  const {user} = useAppSelector(s=>s.auth);
  console.log(user);
  

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Peer Chat",
      description: "Connect instantly with seniors, peers, and alumni for real-time guidance",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Mentors",
      description: "Get mentored by industry professionals from top companies",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Assistant",
      description: "Department-specific AI chatbot for instant academic support",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "DCPD Rankings",
      description: "Track your academic progress and coding achievements",
      color: "from-orange-500 to-red-500",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "500+", label: "Expert Mentors" },
    { number: "50K+", label: "Questions Answered" },
    { number: "95%", label: "Success Rate" },
  ]

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "CSE Student",
      avatar: "/student-male-studying.png",
      content:
        "CUConnect helped me connect with amazing mentors who guided me through my placement preparation. Got placed at Google!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "ECE Graduate",
      avatar: "/diverse-female-student.png",
      content:
        "The AI assistant and peer support made my final year project so much easier. Highly recommend to all CU students!",
      rating: 5,
    },
    {
      name: "Dr. Rajesh Gupta",
      role: "Alumni Mentor",
      avatar: "/mentor-male.png",
      content:
        "As a mentor, I love how easy it is to connect with students and share my industry experience through this platform.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-green-500/10"></div>
        <div className="container mx-auto px-4 py-20 relative md:w-[80%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Future of Learning
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
                  CUConnect
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Bridging <span className="text-purple-600 font-semibold">Guidance</span>,
                  <span className="text-blue-600 font-semibold"> Mentorship</span> &
                  <span className="text-green-600 font-semibold"> Support</span>
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  The ultimate platform for Chandigarh University students to connect with peers, seniors, and alumni
                  for real-time academic and career guidance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-muted/50 transition-all duration-300 group bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-4 ring-purple-500/20">
                        <AvatarImage src="/alex-chen-portrait.png" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Alex Chen</h3>
                        <p className="text-sm text-muted-foreground">CSE Student</p>
                      </div>
                      <Badge className="ml-auto bg-green-500/10 text-green-600 border-green-500/20">Online</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <p className="text-sm">How do I prepare for Google interviews?</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-4 ml-8">
                        <p className="text-sm">
                          Focus on DSA, system design, and behavioral questions. I can share my preparation strategy!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Connected with 50+ mentors
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border-purple-500/20">
              Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to <span className="text-purple-600">succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools and resources designed specifically for Chandigarh University students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:w-[80%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-500/20">
                  Why Choose CUConnect
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Built for <span className="text-green-600">CU Students</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Designed specifically for the Chandigarh University ecosystem with features that matter most to your
                  academic journey.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <Zap className="h-6 w-6" />,
                    title: "Instant Connections",
                    description: "Connect with the right people at the right time for immediate help",
                  },
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Verified Community",
                    description: "All members are verified CU students, alumni, and faculty",
                  },
                  {
                    icon: <Globe className="h-6 w-6" />,
                    title: "24/7 Availability",
                    description: "Get help anytime with our AI assistant and global alumni network",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                    <div>
                      <div className="flex-shrink-0 p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
                      {benefit.icon}
                    </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 h-32">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Student Satisfaction</div>
                  </div>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Support</div>
                  </div>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 -mt-4 h-32">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Expert Mentors</div>
                  </div>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 mt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:w-[85%]">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 border-orange-500/20">
              Testimonials
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What our <span className="text-orange-600">community</span> says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm rounded-2xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-16 text-center text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to transform your academic journey?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of CU students who are already benefiting from our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="px-8 py-6 text-lg rounded-xl bg-white text-purple-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Join CUConnect
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-xl border-2 border-white text-white hover:bg-white/10 transition-all duration-300 bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <img src="https://worldwidetranscripts.com/wp-content/uploads/2024/12/Chandigarh-University-Logo-400x400-1.png" alt="CU" />
              </div>
              <div>
                <h3 className="font-bold">CUConnect</h3>
                <p className="text-sm text-muted-foreground">Future of Learning</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 CUConnect. Made with ❤️ for Chandigarh University</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
