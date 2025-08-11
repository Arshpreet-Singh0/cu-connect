"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, Heart, Eye } from "lucide-react"
import type { FAQ } from "@/types"

interface FAQTabProps {
  faqs: FAQ[]
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function FAQTab({ faqs, searchQuery, onSearchChange }: FAQTabProps) {
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find quick answers to common questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-xl"
            />
            <Button className="rounded-xl">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="border-0 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{faq.answer}</p>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-xs rounded-full">
                          {faq.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {faq.helpful} helpful
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {faq.views} views
                          </span>
                        </div>
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
