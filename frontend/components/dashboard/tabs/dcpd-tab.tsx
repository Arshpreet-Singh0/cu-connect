import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Code, Award, TrendingUp, GraduationCap, Star, BookOpen, Share, MessageCircle } from "lucide-react"
import type { Student } from "@/types"

interface DCPDTabProps {
  topStudents: Student[]
}

export function DCPDTab({ topStudents }: DCPDTabProps) {
  const departmentRankings = [
    { dept: "Computer Science & Engineering", students: 1250, avgCGPA: 8.4, rank: 1 },
    { dept: "Information Technology", students: 980, avgCGPA: 8.2, rank: 2 },
    { dept: "Electronics & Communication", students: 850, avgCGPA: 8.1, rank: 3 },
    { dept: "Mechanical Engineering", students: 720, avgCGPA: 7.9, rank: 4 },
  ]

  const codingPlatforms = [
    { platform: "LeetCode", topScore: 2450, leader: "Arjun Sharma", icon: "🏆" },
    { platform: "CodeChef", topScore: 2180, leader: "Priya Patel", icon: "🥈" },
    { platform: "Codeforces", topScore: 1950, leader: "Rohit Kumar", icon: "🥉" },
    { platform: "HackerRank", topScore: 2890, leader: "Arjun Sharma", icon: "🏅" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Department of Career Planning & Development</h2>
        <p className="text-muted-foreground">Excellence Recognition & Rankings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Arjun Sharma</div>
            <p className="text-xs opacity-90">CSE • CGPA: 9.8</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Code className="h-4 w-4" />
              Coding Champion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#1 Rank</div>
            <p className="text-xs opacity-90">University Leaderboard</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4" />
              Projects Leader
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Projects</div>
            <p className="text-xs opacity-90">Most Active Student</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Student Profiles
          </CardTitle>
          <CardDescription>Recognizing academic and coding excellence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topStudents.map((student, idx) => (
              <div
                key={student.id}
                className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition-shadow bg-muted/20"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      idx === 0 ? "bg-yellow-500" : idx === 1 ? "bg-gray-400" : "bg-orange-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{student.bio}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {student.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      CGPA: {student.cgpa}
                    </span>
                    <span className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      Rank: #{student.codingRank}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {student.projects} Projects
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {student.skills?.map((skill, skillIdx) => (
                      <Badge key={skillIdx} variant="secondary" className="text-xs rounded-full">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                    View Profile
                  </Button>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="p-1 rounded-xl">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-1 rounded-xl">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Department Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentRankings.map((dept, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-2xl hover:shadow-sm transition-shadow bg-muted/20"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        dept.rank === 1
                          ? "bg-yellow-500"
                          : dept.rank === 2
                            ? "bg-gray-400"
                            : dept.rank === 3
                              ? "bg-orange-500"
                              : "bg-slate-500"
                      }`}
                    >
                      {dept.rank}
                    </div>
                    <div>
                      <h4 className="font-medium">{dept.dept}</h4>
                      <p className="text-sm text-muted-foreground">{dept.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Avg CGPA: {dept.avgCGPA}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Coding Platform Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {codingPlatforms.map((platform, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-2xl hover:shadow-sm transition-shadow bg-muted/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <h4 className="font-medium">{platform.platform}</h4>
                      <p className="text-sm text-muted-foreground">Leader: {platform.leader}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{platform.topScore}</div>
                    <p className="text-xs text-muted-foreground">Top Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
