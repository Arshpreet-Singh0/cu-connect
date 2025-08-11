"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser } from "@/store/slices/authSlice";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  // Ensure theme is properly mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const logout = ()=>{
    dispatch(clearUser())
  }

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CU</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CUConnect</h1>
                <p className="text-xs text-muted-foreground">
                  Future of Learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://worldwidetranscripts.com/wp-content/uploads/2024/12/Chandigarh-University-Logo-400x400-1.png"
              alt=""
              className="h-10 w-10 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">CUConnect</h1>
              <p className="text-xs text-muted-foreground">
                Future of Learning
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1">
              {[
                { name: "Dashboard", path: "/dashboard" },
                { name: "Chat", path: "/dashboard?tab=chat" },
                { name: "Mentors", path: "/dashboard?tab=mentors" },
                { name: "FAQ", path: "/dashboard?tab=faq" },
                { name: "AI Assistant", path: "/dashboard?tab=chatbot" },
                { name: "DCPD", path: "/dashboard?tab=dcpd" },
                { name: "Projects", path: "/projects" },
              ].map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${
                    pathname === item.path ||
                    pathname.startsWith(item.path.split("?")[0])
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => router.push(item.path)}
                >
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
                {user ? (
                  <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/alex-chen-portrait.png" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        student • {user?.department}
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                    </DropdownMenuTrigger>
                ) : (
                  <div className="flex items-center justify-center gap-5">
                    <Button onClick={()=>router.push("/auth/login")} className="bg-gradient-to-r from-purple-500 to-blue-500">Login</Button>
                    <Button onClick={()=>router.push("/auth/signup")} className="bg-gradient-to-r from-purple-500 to-blue-500">Signup</Button>
                  </div>
                )}
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    const newTheme = theme === "dark" ? "light" : "dark";
                    setTheme(newTheme);
                  }}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newTheme = theme === "dark" ? "light" : "dark";
                setTheme(newTheme);
              }}
              className="p-2"
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {[
                { name: "Dashboard", path: "/dashboard" },
                { name: "Chat", path: "/dashboard?tab=chat" },
                { name: "Mentors", path: "/dashboard?tab=mentors" },
                { name: "FAQ", path: "/dashboard?tab=faq" },
                { name: "AI Assistant", path: "/dashboard?tab=chatbot" },
                { name: "DCPD", path: "/dashboard?tab=dcpd" },
                { name: "Projects", path: "/projects" },
              ].map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`justify-start ${
                    pathname === item.path ||
                    pathname.startsWith(item.path.split("?")[0])
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => {
                    router.push(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
