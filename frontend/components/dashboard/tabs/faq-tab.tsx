"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, Heart, Eye, ChevronDown, ChevronUp, BookOpen, MessageSquare, Lightbulb } from 'lucide-react'
import { useState } from "react"
import type { FAQ } from "@/types"

interface FAQTabProps {
  faqs: FAQ[]
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function FAQTab({ faqs, searchQuery, onSearchChange }: FAQTabProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredFAQs = faqs.filter(
    (faq) =>
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "all" || faq.category === selectedCategory)
  )

  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-lg">
            Find quick answers to common questions about academics, campus life, and more
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Categories */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 rounded-2xl border-0 bg-white/60 backdrop-blur-sm shadow-sm h-12 text-base"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-2xl transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      : "bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <Card 
            key={faq.id} 
            className="border-0 rounded-3xl shadow-lg bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-purple-900/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-0">
              <div 
                className="p-6 cursor-pointer hover:bg-white/20 transition-all duration-300"
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight">
                        {faq.question}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full h-8 w-8 p-0 flex-shrink-0"
                      >
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <Badge 
                        variant="outline" 
                        className="rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700"
                      >
                        {faq.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              </div>

              {/* Expanded Answer */}
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-6 border-t border-white/20">
                  <div className="pt-4 pl-12">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex-shrink-0">
                          <Lightbulb className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Helpful
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask Follow-up
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFAQs.length === 0 && (
        <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-xl dark:from-gray-900/80 dark:to-purple-900/20">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or category filter</p>
            <Button className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask a Question
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="border-0 rounded-3xl shadow-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">Get personalized help from our AI assistant or connect with mentors</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI Assistant
              </Button>
              <Button variant="outline" className="rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}