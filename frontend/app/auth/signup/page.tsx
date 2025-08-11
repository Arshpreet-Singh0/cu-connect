"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  GraduationCap,
  ArrowLeft,
  Github,
  Chrome,
  Sparkles,
  CheckCircle,
  Linkedin,
  Globe,
  Code,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { axiosInstance } from "@/configs/axios"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1) // New state to track the current step
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    year: "",
    rollNumber: "",
    bio: "",
    currCompany : "",
    skills: "",
    linkedin: "",
    github: "",
    portfolio: "",
    leetcodeUser: "",
    codeforcesUser: "",
    role: "student",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    // Basic validation for the current step
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        alert("Please fill in all required fields for this step.")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.")
        return
      }
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long.")
        return
      }
    }
    if (step === 2) {
      if (!formData.department || !formData.year || !formData.rollNumber) {
        alert("Please fill in all required fields for this step.")
        return
      }
    }
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const currentYear = new Date().getFullYear()
    const yearOfGraduation = formData.year ? currentYear + (4 - parseInt(formData.year)) : null

    const dataToSend = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      currComapany : formData.currCompany,
      department: formData.department,
      yearOfGraduation,
      bio: formData.bio || undefined,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean) || undefined,
      socialLinks: {
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
        portfolio: formData.portfolio || undefined,
      },
      codingProfiles: {
        leetcodeUser: formData.leetcodeUser || undefined,
        codeforcesUser: formData.codeforcesUser || undefined,
      },
    }

    try {
      const res = await axiosInstance.post("/signup", dataToSend, {
        withCredentials : true
      });

      if(res?.data?.success){
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("An unexpected error occurred", error)
      setIsLoading(false)
    }
  }

  const benefits = [
    "Connect with 500+ expert mentors",
    "Access to AI-powered academic assistant",
    "Join 10,000+ active CU students",
    "Track your academic progress",
    "Get placement guidance",
  ]

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Join the Community
              </Badge>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Start Your Journey
              </h1>
              <p className="text-xl text-muted-foreground">Join thousands of CU students and unlock your potential</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What you'll get:</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-2xl font-bold">CU</span>
              </div>
              <CardTitle className="text-2xl font-bold">
                {step === 1 && "Create Your Account"}
                {step === 2 && "Academic Information"}
                {step === 3 && "Complete Your Profile"}
              </CardTitle>
              <CardDescription className="text-base">
                Step {step} of {totalSteps}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">

                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                        <Select onValueChange={(value) => handleInputChange("role", value)} defaultValue={formData.role}>
                          <SelectTrigger id="role" className="w-full h-12 rounded-xl border-2 focus:border-purple-500">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="alumni">Alumni</SelectItem>
                            <SelectItem value="mentor">Mentor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@cumail.in"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="pl-10 pr-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className="pl-10 pr-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Academic Information */}
                {step === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-20">
                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleInputChange("department", value)}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-2 focus:border-purple-500">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cse">Computer Science & Engineering</SelectItem>
                            <SelectItem value="it">Information Technology</SelectItem>
                            <SelectItem value="ece">Electronics & Communication</SelectItem>
                            <SelectItem value="me">Mechanical Engineering</SelectItem>
                            <SelectItem value="ce">Civil Engineering</SelectItem>
                            <SelectItem value="ee">Electrical Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-sm font-medium">Year</Label>
                        <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                          <SelectTrigger className="h-12 rounded-xl border-2 focus:border-purple-500">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                            <SelectItem value="passout">Pass out</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="rollNumber"
                          type="text"
                          placeholder="21CSE001"
                          value={formData.rollNumber}
                          onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                          className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Profile & Socials */}
                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">Bio (Tell us about yourself)</Label>
                      <Textarea
                        id="bio"
                        placeholder="Briefly describe your interests, goals, or what you're looking for in the community."
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="h-24 rounded-xl border-2 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-sm font-medium">Skills (e.g., Python, React, UI/UX)</Label>
                      <Input
                        id="skills"
                        type="text"
                        placeholder="Enter skills separated by commas"
                        value={formData.skills}
                        onChange={(e) => handleInputChange("skills", e.target.value)}
                        className="h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="com" className="text-sm font-medium">Current Company</Label>
                      <Input
                        id="com"
                        type="text"
                        // placeholder="Enter skills separated by commas"
                        value={formData.currCompany}
                        onChange={(e) => handleInputChange("currCompany", e.target.value)}
                        className="h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Social & Coding Profiles (Optional)</h4>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn Profile URL</Label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="linkedin"
                            type="url"
                            placeholder="https://www.linkedin.com/in/your-profile"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange("linkedin", e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github" className="text-sm font-medium">GitHub Profile URL</Label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="github"
                            type="url"
                            placeholder="https://github.com/your-username"
                            value={formData.github}
                            onChange={(e) => handleInputChange("github", e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="text-sm font-medium">Portfolio/Personal Website URL</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="portfolio"
                            type="url"
                            placeholder="https://www.your-portfolio.com"
                            value={formData.portfolio}
                            onChange={(e) => handleInputChange("portfolio", e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leetcodeUser" className="text-sm font-medium">LeetCode Username</Label>
                        <div className="relative">
                          <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="leetcodeUser"
                            type="text"
                            placeholder="your-leetcode-username"
                            value={formData.leetcodeUser}
                            onChange={(e) => handleInputChange("leetcodeUser", e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="codeforcesUser" className="text-sm font-medium">Codeforces Username</Label>
                        <div className="relative">
                          <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="codeforcesUser"
                            type="text"
                            placeholder="your-codeforces-username"
                            value={formData.codeforcesUser}
                            onChange={(e) => handleInputChange("codeforcesUser", e.target.value)}
                            className="pl-10 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms" className="text-purple-600 hover:text-purple-700 transition-colors">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-purple-600 hover:text-purple-700 transition-colors">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col gap-5 justify-between pt-4">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                  )}
                  {step < totalSteps && (
                    <Button type="button" onClick={handleNextStep} className="ml-auto">
                      Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  {step === totalSteps && (
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={isLoading || !agreeToTerms}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </form>

              {/* Login and Socials (only show on the final step for a cleaner UI) */}
              {step === totalSteps && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors bg-transparent"
                    >
                      <Chrome className="h-4 w-4 mr-2" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors bg-transparent"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        href="/auth/login"
                        className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}