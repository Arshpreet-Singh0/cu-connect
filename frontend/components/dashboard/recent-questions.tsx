"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Plus, Heart, Eye } from "lucide-react"
import type { Question } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RecentQuestionsProps {
  questions: Question[]
  onAskQuestion: (title: string, description: string) => void
}

export function RecentQuestions({ questions, onAskQuestion }: RecentQuestionsProps) {
  return (
    <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-purple-600" />
          Recent Questions
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ask Question
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
              <DialogDescription>Get help from your peers and seniors</DialogDescription>
            </DialogHeader>
            <QuestionForm onSubmit={onAskQuestion} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.slice(0, 3).map((q) => (
          <div
            key={q.id}
            className="border-l-4 border-purple-500 pl-4 p-3 rounded-r-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <h4 className="font-medium hover:text-purple-600 cursor-pointer">{q.question}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <span>{q.author}</span>
              <Badge variant="outline" className="rounded-full">
                {q.department}
              </Badge>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {q.likes}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {q.views}
              </span>
              <span>•</span>
              <span>{q.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function QuestionForm({ onSubmit }: { onSubmit: (title: string, description: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    onSubmit(title, description)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Question Title</Label>
        <Input id="title" name="title" placeholder="Enter your question title..." className="rounded-xl" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Provide more details about your question..."
          rows={4}
          className="rounded-xl"
          required
        />
      </div>
      <Button type="submit" className="w-full rounded-xl">
        Post Question
      </Button>
    </form>
  )
}
