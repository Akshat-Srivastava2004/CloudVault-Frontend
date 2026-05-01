"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Copy, CheckCircle2 } from "lucide-react"

export default function CreateWorkspaceModal({ open, onClose }) {
  const router = useRouter()
  const [workspaceName, setWorkspaceName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [generatedPasskey, setGeneratedPasskey] = useState("")

  const generatePasskey = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const segments = []
    for (let i = 0; i < 3; i++) {
      let segment = ""
      for (let j = 0; j < 4; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      segments.push(segment)
    }
    return segments.join("-")
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate API call
    setTimeout(() => {
      const passkey = generatePasskey()
      setGeneratedPasskey(passkey)
      setIsCreating(false)
      setIsCreated(true)
    }, 1500)
  }

  const copyPasskey = () => {
    navigator.clipboard.writeText(generatedPasskey)
  }

  const handleGoToWorkspace = () => {
    router.push("/workspace/collab")
  }

  const handleClose = () => {
    setWorkspaceName("")
    setIsCreated(false)
    setGeneratedPasskey("")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-card border-border p-8 relative">
        <Button variant="ghost" size="icon" onClick={handleClose} className="absolute top-4 right-4">
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>

        {!isCreated ? (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Workspace</h2>
            <p className="text-muted-foreground mb-6">Set up a new collaborative workspace for your team</p>

            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="workspaceName" className="text-sm font-medium text-foreground">
                  Workspace Name
                </label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="e.g., Marketing Team, Project Alpha"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="bg-secondary border-border text-foreground"
                  required
                />
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 text-sm">Workspace Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Real-time file sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Multi-user collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Secure passkey access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    Activity tracking
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-border text-foreground bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Workspace"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Workspace Created!</h2>
              <p className="text-muted-foreground">Your workspace "{workspaceName}" is ready</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Your Workspace Passkey:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 bg-background rounded-lg text-lg font-mono text-foreground text-center">
                    {generatedPasskey}
                  </code>
                  <Button variant="ghost" size="icon" onClick={copyPasskey} className="flex-shrink-0">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground font-medium mb-1">⚠️ Important</p>
                <p className="text-sm text-muted-foreground">
                  Save this passkey securely. Share it only with team members who need access to this workspace.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-border text-foreground bg-transparent"
              >
                Close
              </Button>
              <Button
                onClick={handleGoToWorkspace}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Go to Workspace
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
