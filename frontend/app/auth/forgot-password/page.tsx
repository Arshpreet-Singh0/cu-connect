"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="w-full max-w-md">
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>

            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
              {isEmailSent ? <CheckCircle className="h-8 w-8" /> : <Mail className="h-8 w-8" />}
            </div>

            <CardTitle className="text-2xl font-bold">
              {isEmailSent ? "Check Your Email" : "Forgot Password?"}
            </CardTitle>
            <CardDescription className="text-base">
              {isEmailSent
                ? "We've sent a password reset link to your email address"
                : "Enter your email address and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isEmailSent ? (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@cumail.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    If an account with <strong>{email}</strong> exists, you'll receive a password reset link shortly.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors"
                >
                  Try Different Email
                </Button>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
