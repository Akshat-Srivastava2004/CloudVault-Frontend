"use client"

import { useReducer, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Cloud, Mail, Lock, ArrowRight } from "lucide-react"

const initialState = {
  email: "",
  password: "",
}

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

export default function LoginPage() {
  const router = useRouter()
  const [formData, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // 🔹 Step 1: Fake API request
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await response.json()
      console.log("Fake API response:", data)

      // 🔹 Step 2: Check against localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"))

      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        alert("Login successful!")
        localStorage.setItem("isLoggedIn", "true")
        router.push("/dashboard")
      } else {
        alert("Invalid email or password. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong while logging in.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Cloud className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-foreground">CloudVault</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Log in to access your account</p>
        </div>

        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {["email", "password"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  {field === "email" && (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  )}
                  {field === "password" && (
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  )}
                  <Input
                    id={field}
                    name={field}
                    type={field}
                    placeholder={field === "email" ? "you@example.com" : "••••••••"}
                    value={formData[field]}
                    onChange={handleChange}
                    className="pl-10 bg-secondary border-border text-foreground"
                    required
                  />
                </div>
              </div>
            ))}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
