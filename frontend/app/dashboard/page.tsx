"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Target } from "lucide-react";
import Navigation from "@/components/navigation";
import { useSearchParams } from "next/navigation";
import type { ChatMessage, Mentor, Question } from "@/types";
import { Card } from "@/components/ui/card";

import {
  topStudents,
  mentors,
  initialQuestions,
  initialFAQs,
  initialPeerChats,
} from "@/data/mock-data";
import { generateAIResponse } from "@/utils/ai-responses";

// Dashboard Components
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentQuestions } from "@/components/dashboard/recent-questions";
import { AvailableMentors } from "@/components/dashboard/available-mentors";

// Tab Components
import { ChatTab } from "@/components/dashboard/tabs/chat-tab";
import { MentorsTab } from "@/components/dashboard/tabs/mentors-tab";
import { FAQTab } from "@/components/dashboard/tabs/faq-tab";
import { AIAssistantTab } from "@/components/dashboard/tabs/ai-assistant-tab";
import { DCPDTab } from "@/components/dashboard/tabs/dcpd-tab";
import { useAppSelector } from "@/store/hooks";
import { axiosInstance } from "@/configs/axios";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [connectedUsers, setConnectedUsers] = useState(new Set<number>());

  // Questions state
  const [questions, setQuestions] = useState(initialQuestions);
  const [faqs] = useState(initialFAQs);
  const [peerChats] = useState(initialPeerChats);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "AI Assistant",
      message: "Hello! I'm your CU AI Assistant. How can I help you today?",
      timestamp: new Date(),
      isBot: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const searchParams = useSearchParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      ["dashboard", "chat", "mentors", "faq", "chatbot", "dcpd"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const getMentors = async () => {
    try {
      const res = await axiosInstance.get("/mentors");
      console.log(res);

      setMentors(res?.data?.mentors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date(),
        isBot: false,
      };
      setChatMessages([...chatMessages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: chatMessages.length + 2,
          sender: "AI Assistant",
          message: generateAIResponse(newMessage),
          timestamp: new Date(),
          isBot: true,
        };
        setChatMessages((prev) => [...prev, botResponse]);
      }, 1000);

      setNewMessage("");
    }
  };

  const handleConnectUser = (userId: number) => {
    setConnectedUsers(new Set([...connectedUsers, userId]));
  };

  const handleAskQuestion = (title: string, description: string) => {
    if (title.trim() && description.trim()) {
      const question: Question = {
        id: questions.length + 1,
        question: title,
        author: "Alex Chen",
        department: "CSE",
        answers: 0,
        time: "Just now",
        likes: 0,
        views: 1,
        tags: ["new-question"],
      };
      setQuestions([question, ...questions]);
    }
  };

  const handleQuickTopic = (topic: string) => {
    setNewMessage(`Tell me about ${topic.toLowerCase()}`);
  };
  const { user } = useAppSelector((s) => s.auth);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Your gateway to academic excellence and career success
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl bg-transparent"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl bg-transparent"
              >
                <Target className="h-4 w-4 mr-2" />
                Goals
              </Button>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-0"
        >
          <div className="flex min-h-screen">
            {/* Sidebar Tabs */}
            <aside className="w-64 bg-muted/20 border-r p-4 mt-24">
              <TabsList className="flex flex-col gap-2 w-full bg-transparent p-0">
                {[
                  { value: "dashboard", label: "Dashboard" },
                  { value: "chat", label: "Chat" },
                  { value: "mentors", label: "Mentors" },
                  { value: "faq", label: "Ask Questions" },
                  { value: "chatbot", label: "AI Assistant" },
                  { value: "dcpd", label: "DCPD" },
                  { value: "exp", label: "Interview Experience" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition
              data-[state=active]:bg-primary data-[state=active]:text-white
              hover:bg-muted`}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              <TabsContent value="dashboard" className="space-y-6">
                <StatsCards
                  onlineMentorsCount={mentors.filter((m) => m.isOnline).length}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <RecentQuestions />
                  <AvailableMentors
                    mentors={mentors}
                    connectedUsers={connectedUsers}
                    onConnect={handleConnectUser}
                  />
                </div>
              </TabsContent>

              <TabsContent value="chat">
                <Card className="bg-card/50 backdrop-blur-sm border-0 rounded-2xl shadow-xl p-6">
                  <ChatTab
                    peerChats={peerChats}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="mentors">
                <Card className="bg-card/50 backdrop-blur-sm border-0 rounded-2xl shadow-xl p-6">
                  <MentorsTab
                    mentors={mentors}
                    searchQuery={searchQuery}
                    selectedDepartment={selectedDepartment}
                    connectedUsers={connectedUsers}
                    onSearchChange={setSearchQuery}
                    onDepartmentChange={setSelectedDepartment}
                    onConnect={handleConnectUser}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card className="bg-card/50 backdrop-blur-sm border-0 rounded-2xl shadow-xl p-6">
                  <FAQTab
                    faqs={faqs}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="chatbot">
                <Card className="bg-card/50 backdrop-blur-sm border-0 rounded-2xl shadow-xl p-6">
                  <AIAssistantTab
                    chatMessages={chatMessages}
                    newMessage={newMessage}
                    onMessageChange={setNewMessage}
                    onSendMessage={handleSendMessage}
                    onQuickTopic={handleQuickTopic}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="dcpd">
                <Card className="bg-card/50 backdrop-blur-sm border-0 rounded-2xl shadow-xl p-6">
                  <DCPDTab topStudents={topStudents} />
                </Card>
              </TabsContent>
            </main>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
