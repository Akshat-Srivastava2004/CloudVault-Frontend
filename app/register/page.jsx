"use client"

import { useReducer, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Cloud, Mail, Lock, User, ArrowRight } from "lucide-react"

// Initial form state
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

// Reducer to manage form state
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  // Handle field changes
  const handleChange = (e) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value })
  }

  // Handle registration submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic password check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      setIsLoading(false)
      return
    }

    try {
      // ✅ 1️⃣ Fake API call (this URL simulates a backend)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()
      console.log("Fake API response:", data)

      // ✅ 2️⃣ Save user locally
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }))

      alert("Registration successful! Please log in.")
      router.push("/login")
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong! Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Cloud className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-foreground">CloudVault</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start your journey with secure cloud storage</p>
        </div>

        {/* Card */}
        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Inputs */}
            {["name", "email", "password", "confirmPassword"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  {field === "name" && <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />}
                  {field === "email" && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />}
                  {(field === "password" || field === "confirmPassword") && (
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  )}
                  <Input
                    id={field}
                    name={field}
                    type={field.includes("password") ? "password" : field}
                    placeholder={
                      field === "email"
                        ? "you@example.com"
                        : field === "name"
                        ? "John Doe"
                        : "••••••••"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className="pl-10 bg-secondary border-border text-foreground"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-border" required />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
