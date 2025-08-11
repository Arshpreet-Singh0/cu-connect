import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Users, HelpCircle, Trophy, Zap } from "lucide-react"

interface StatsCardsProps {
  onlineMentorsCount: number
}

export function StatsCards({ onlineMentorsCount }: StatsCardsProps) {
  const stats = [
    {
      title: "Active Chats",
      value: "24",
      change: "+3 from yesterday",
      icon: MessageCircle,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      title: "Mentors Available",
      value: onlineMentorsCount.toString(),
      change: "Online now",
      icon: Users,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Questions Answered",
      value: "1,234",
      change: "This month",
      icon: HelpCircle,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Your Rank",
      value: "#42",
      change: "In CSE department",
      icon: Trophy,
      gradient: "from-orange-500 to-orange-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-br ${stat.gradient} text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <stat.icon className="h-4 w-4" />
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs opacity-90 flex items-center gap-1 mt-1">
              {stat.title === "Active Chats" && <Zap className="h-3 w-3" />}
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
