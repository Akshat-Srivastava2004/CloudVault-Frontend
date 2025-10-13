"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Cloud,
  Upload,
  Search,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  FileText,
  ImageIcon,
  Video,
  Users,
  Copy,
  LogOut,
  Send,
} from "lucide-react"

export default function CollaborativeWorkspacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [message, setMessage] = useState("")
  const [showPasskey, setShowPasskey] = useState(false)

  const workspacePasskey = "ABCD-1234-EFGH"

  const activeUsers = [
    { id: 1, name: "John Doe", initials: "JD", color: "bg-primary", status: "online" },
    { id: 2, name: "Sarah Smith", initials: "SS", color: "bg-chart-2", status: "online" },
    { id: 3, name: "Mike Johnson", initials: "MJ", color: "bg-chart-3", status: "online" },
    { id: 4, name: "Emily Brown", initials: "EB", color: "bg-chart-4", status: "away" },
  ]

  const sharedFiles = [
    {
      id: 1,
      name: "Q4 Report.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "John Doe",
      time: "2 min ago",
      icon: FileText,
    },
    {
      id: 2,
      name: "Design Assets.zip",
      type: "archive",
      size: "15.8 MB",
      uploadedBy: "Sarah Smith",
      time: "15 min ago",
      icon: ImageIcon,
    },
    {
      id: 3,
      name: "Meeting Recording.mp4",
      type: "video",
      size: "45.6 MB",
      uploadedBy: "Mike Johnson",
      time: "1 hour ago",
      icon: Video,
    },
    {
      id: 4,
      name: "Project Brief.docx",
      type: "document",
      size: "1.2 MB",
      uploadedBy: "Emily Brown",
      time: "2 hours ago",
      icon: FileText,
    },
  ]

  const activities = [
    { id: 1, user: "Sarah Smith", action: "uploaded", file: "Design Assets.zip", time: "15 min ago" },
    { id: 2, user: "Mike Johnson", action: "edited", file: "Project Brief.docx", time: "45 min ago" },
    { id: 3, user: "John Doe", action: "shared", file: "Q4 Report.pdf", time: "1 hour ago" },
    { id: 4, user: "Emily Brown", action: "commented on", file: "Meeting Recording.mp4", time: "2 hours ago" },
  ]

  const copyPasskey = () => {
    navigator.clipboard.writeText(workspacePasskey)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <Cloud className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">CloudVault</span>
              </Link>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Team Workspace</h2>
                <p className="text-xs text-muted-foreground">4 members active</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowPasskey(!showPasskey)}
                className="border-border text-foreground"
              >
                <Copy className="h-4 w-4 mr-2" />
                {showPasskey ? workspacePasskey : "Show Passkey"}
              </Button>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-foreground">
                  <LogOut className="h-4 w-4 mr-2" />
                  Leave Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Users */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Active Members
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Invite
                </Button>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className={`${user.color} h-10 w-10`}>
                        <AvatarFallback className="text-white font-semibold">{user.initials}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                          user.status === "online" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upload Section */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-auto py-4">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Files
                </Button>
                <Button variant="outline" className="border-border text-foreground h-auto py-4 bg-transparent">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Link
                </Button>
              </div>
            </Card>

            {/* Shared Files */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Shared Files</h3>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-secondary border-border text-foreground h-9 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {sharedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <file.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • Uploaded by {file.uploadedBy} • {file.time}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="text-foreground">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Workspace Info */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Workspace Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Workspace Name</p>
                  <p className="font-semibold text-foreground">Team Workspace</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created By</p>
                  <p className="font-semibold text-foreground">John Doe (Admin)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Passkey</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm font-mono text-foreground">
                      {workspacePasskey}
                    </code>
                    <Button variant="ghost" size="icon" onClick={copyPasskey} className="flex-shrink-0">
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Files</p>
                  <p className="font-semibold text-foreground">24 files</p>
                </div>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.file}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat/Comments */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Team Chat</h3>
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                <div className="flex items-start gap-3">
                  <Avatar className="bg-chart-2 h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="text-white text-xs font-semibold">SS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-secondary p-3 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-1">Sarah Smith</p>
                      <p className="text-sm text-foreground">Just uploaded the new design files!</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">15 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="bg-chart-3 h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="text-white text-xs font-semibold">MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-secondary p-3 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-1">Mike Johnson</p>
                      <p className="text-sm text-foreground">Thanks! Looking great 👍</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">10 min ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-secondary border-border text-foreground"
                />
                <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
