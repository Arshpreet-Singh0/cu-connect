import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Code, Award, TrendingUp, GraduationCap, Star, BookOpen, Share, MessageCircle, Crown, Medal, Target, Zap } from 'lucide-react'
import type { Student } from "@/types"

interface DCPDTabProps {
  topStudents: Student[]
}

export function DCPDTab({ topStudents }: DCPDTabProps) {
  const departmentRankings = [
    { dept: "Computer Science & Engineering", students: 1250, avgCGPA: 8.4, rank: 1, growth: "+12%" },
    { dept: "Information Technology", students: 980, avgCGPA: 8.2, rank: 2, growth: "+8%" },
    { dept: "Electronics & Communication", students: 850, avgCGPA: 8.1, rank: 3, growth: "+15%" },
    { dept: "Mechanical Engineering", students: 720, avgCGPA: 7.9, rank: 4, growth: "+5%" },
  ]

  const codingPlatforms = [
    { platform: "LeetCode", topScore: 2450, leader: "Arjun Sharma", icon: "🏆", participants: 1200 },
    { platform: "CodeChef", topScore: 2180, leader: "Priya Patel", icon: "🥈", participants: 980 },
    { platform: "Codeforces", topScore: 1950, leader: "Rohit Kumar", icon: "🥉", participants: 850 },
    { platform: "HackerRank", topScore: 2890, leader: "Arjun Sharma", icon: "🏅", participants: 1100 },
  ]

  const achievements = [
    { title: "Top Performer", value: "Arjun Sharma", subtitle: "CSE • CGPA: 9.8", icon: Trophy, color: "from-yellow-400 to-yellow-600" },
    { title: "Coding Champion", value: "#1 Rank", subtitle: "University Leaderboard", icon: Code, color: "from-purple-500 to-purple-700" },
    { title: "Projects Leader", value: "12 Projects", subtitle: "Most Active Student", icon: Award, color: "from-green-500 to-green-700" },
    { title: "Innovation Award", value: "5 Patents", subtitle: "Research Excellence", icon: Zap, color: "from-blue-500 to-blue-700" },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 backdrop-blur-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500">
              <Crown className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Department of Career Planning & Development
          </CardTitle>
          <CardDescription className="text-lg">
            Excellence Recognition & Rankings - Celebrating Academic and Professional Achievements
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {achievements.map((achievement, idx) => (
          <Card 
            key={idx}
            className={`border-0 rounded-3xl shadow-xl bg-gradient-to-br ${achievement.color} text-white hover:shadow-2xl transition-all duration-500 hover:scale-105 group`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <achievement.icon className="h-5 w-5" />
                {achievement.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{achievement.value}</div>
              <p className="text-xs opacity-90">{achievement.subtitle}</p>
              <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/40 rounded-full w-full transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Student Profiles */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            Top Student Profiles
          </CardTitle>
          <CardDescription className="text-base">
            Recognizing academic and coding excellence across all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topStudents.map((student, idx) => (
              <Card
                key={student.id}
                className="border-0 rounded-3xl bg-gradient-to-r from-white/60 to-purple-50/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Rank Badge */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                          idx === 0 
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600" 
                            : idx === 1 
                              ? "bg-gradient-to-r from-gray-400 to-gray-600" 
                              : "bg-gradient-to-r from-orange-400 to-orange-600"
                        }`}
                      >
                        {idx === 0 ? <Crown className="h-6 w-6" /> : idx + 1}
                      </div>
                      <Avatar className="h-16 w-16 ring-4 ring-white/50 shadow-lg">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-lg font-bold">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{student.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{student.bio}</p>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                              <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                                <GraduationCap className="h-4 w-4" />
                                <span className="font-bold">{student.department}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Department</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                              <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-bold">{student.cgpa}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">CGPA</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                                <Code className="h-4 w-4" />
                                <span className="font-bold">#{student.codingRank}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Coding Rank</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                                <BookOpen className="h-4 w-4" />
                                <span className="font-bold">{student.projects}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Projects</p>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {student.skills?.slice(0, 4).map((skill, skillIdx) => (
                              <Badge 
                                key={skillIdx} 
                                variant="secondary" 
                                className="text-xs rounded-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {student.skills && student.skills.length > 4 && (
                              <Badge variant="secondary" className="text-xs rounded-full">
                                +{student.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                            View Profile
                          </Button>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="rounded-2xl h-8 w-8 p-0 hover:bg-white/40">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="rounded-2xl h-8 w-8 p-0 hover:bg-white/40">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rankings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Rankings */}
        <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                <Target className="h-5 w-5 text-white" />
              </div>
              Department Rankings
            </CardTitle>
            <CardDescription>Performance metrics across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentRankings.map((dept, idx) => (
                <Card
                  key={idx}
                  className="border-0 rounded-2xl bg-gradient-to-r from-white/60 to-blue-50/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                            dept.rank === 1
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : dept.rank === 2
                                ? "bg-gradient-to-r from-gray-400 to-gray-600"
                                : dept.rank === 3
                                  ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                  : "bg-gradient-to-r from-slate-400 to-slate-600"
                          }`}
                        >
                          {dept.rank === 1 ? <Medal className="h-5 w-5" /> : dept.rank}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{dept.dept}</h4>
                          <p className="text-xs text-muted-foreground">{dept.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">CGPA: {dept.avgCGPA}</div>
                        <div className="text-xs text-green-600 font-medium">{dept.growth}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coding Platform Rankings */}
        <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                <Code className="h-5 w-5 text-white" />
              </div>
              Coding Platform Rankings
            </CardTitle>
            <CardDescription>Top performers across coding platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {codingPlatforms.map((platform, idx) => (
                <Card
                  key={idx}
                  className="border-0 rounded-2xl bg-gradient-to-r from-white/60 to-purple-50/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{platform.icon}</span>
                        <div>
                          <h4 className="font-semibold">{platform.platform}</h4>
                          <p className="text-sm text-muted-foreground">Leader: {platform.leader}</p>
                          <p className="text-xs text-muted-foreground">{platform.participants} participants</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{platform.topScore}</div>
                        <p className="text-xs text-muted-foreground">Top Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}