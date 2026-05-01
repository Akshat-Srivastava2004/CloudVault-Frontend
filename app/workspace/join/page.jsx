"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Cloud, Key, ArrowRight, Users } from "lucide-react"

export default function JoinWorkspacePage() {
  const router = useRouter()
  const [passkey, setPasskey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/workspace/collab")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Cloud className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-foreground">CloudVault</span>
          </Link>
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join Workspace</h1>
          <p className="text-muted-foreground">Enter the passkey to access the collaborative workspace</p>
        </div>

        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="passkey" className="text-sm font-medium text-foreground">
                Workspace Passkey
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="passkey"
                  type="text"
                  placeholder="Enter passkey (e.g., ABCD-1234-EFGH)"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value.toUpperCase())}
                  className="pl-10 bg-secondary border-border text-foreground font-mono"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Ask the workspace admin for the passkey</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                "Joining workspace..."
              ) : (
                <>
                  Join Workspace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2 text-sm">What you'll get access to:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                Real-time file sharing and collaboration
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                Multi-user document editing
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                Instant updates and notifications
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                Shared workspace resources
              </li>
            </ul>
          </div>
        </Card>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Want to create your own workspace?{" "}
            <Link href="/dashboard" className="text-primary hover:underline font-medium">
              Go to Dashboard
            </Link>
          </p>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-primary block">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
