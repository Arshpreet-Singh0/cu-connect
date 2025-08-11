"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  MessageCircle,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
  Plus,
  Filter,
} from "lucide-react";
import { useState } from "react";
import type { PeerChat } from "@/types";

interface ChatTabProps {
  peerChats: PeerChat[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ChatTab({
  peerChats,
  searchQuery,
  onSearchChange,
}: ChatTabProps) {
  const [selectedChat, setSelectedChat] = useState<PeerChat | null>(null);
  const [message, setMessage] = useState("");

  const filteredChats = peerChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  const sampleMessages = [
    {
      id: 1,
      text: "Hey! How's the project going?",
      sender: "other",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "Going well! Just finished the frontend part.",
      sender: "me",
      time: "10:32 AM",
    },
    {
      id: 3,
      text: "That's awesome! Can you share the code?",
      sender: "other",
      time: "10:35 AM",
    },
    {
      id: 4,
      text: "I'll push it to GitHub in a few minutes.",
      sender: "me",
      time: "10:37 AM",
    },
    {
      id: 5,
      text: "Perfect! Thanks for the help 🙏",
      sender: "other",
      time: "10:40 AM",
    },
  ];


 

  return (
    <div className="max-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Card className="h-full border-0 rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 via-purple-50/50 to-blue-50/30 dark:from-gray-900/90 dark:via-purple-900/20 dark:to-blue-900/10 backdrop-blur-2xl">
            <CardHeader className="pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Messages
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Connect with peers and seniors
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pl-12 rounded-2xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm h-12"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl h-12 px-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Chat List */}
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <div className="space-y-3">
                    {filteredChats.map((chat) => (
                      <Card
                        key={chat.id}
                        className={`cursor-pointer transition-all duration-300 rounded-2xl border-0 hover:shadow-lg hover:scale-[1.02] ${
                          selectedChat?.id === chat.id
                            ? "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 shadow-lg ring-2 ring-purple-200 dark:ring-purple-800"
                            : "bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80"
                        } backdrop-blur-sm`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12 ring-2 ring-white/50 shadow-md">
                                <AvatarImage
                                  src={chat.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white font-semibold">
                                  {chat.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {chat.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse shadow-sm"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                                    {chat.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {chat.department} • {chat.year}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate mt-1 max-w-[150px]">
                                    {chat.lastMessage}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-1 ml-2">
                                  {chat.unreadCount > 0 && (
                                    <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse shadow-sm">
                                      {chat.unreadCount}
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    2m
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card className="h-full border-0 rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 via-blue-50/50 to-teal-50/30 dark:from-gray-900/90 dark:via-blue-900/20 dark:to-teal-900/10 backdrop-blur-2xl flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-14 w-14 ring-2 ring-white/50 shadow-lg">
                        <AvatarImage
                          src={selectedChat.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-lg font-bold">
                          {selectedChat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedChat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full shadow-sm"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                        {selectedChat.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.isOnline
                          ? "Active now"
                          : "Last seen 5m ago"}{" "}
                        • {selectedChat.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-2xl h-12 w-12 p-0 hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-sm"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-2xl h-12 w-12 p-0 hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-sm"
                    >
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-2xl h-12 w-12 p-0 hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-sm"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full p-6">
                  <div className="space-y-4">
                    {sampleMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === "me" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            msg.sender === "me" ? "order-2" : "order-1"
                          }`}
                        >
                          <div
                            className={`rounded-3xl p-4 shadow-sm ${
                              msg.sender === "me"
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-lg"
                                : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-tl-lg"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">
                              {msg.text}
                            </p>
                            <span
                              className={`text-xs mt-2 block ${
                                msg.sender === "me"
                                  ? "text-purple-100"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-white/10 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-2xl h-12 w-12 p-0 hover:bg-white/30 dark:hover:bg-gray-800/30"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="rounded-3xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm pr-14 h-12 shadow-sm"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-2xl h-8 w-8 p-0"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="rounded-2xl h-12 w-12 p-0 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full border-0 rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 via-blue-50/50 to-teal-50/30 dark:from-gray-900/90 dark:via-blue-900/20 dark:to-teal-900/10 backdrop-blur-2xl flex items-center justify-center">
              <div className="text-center p-12">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-12 w-12 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground text-lg">
                  Choose a chat from the sidebar to start messaging
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}