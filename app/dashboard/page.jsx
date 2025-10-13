"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Cloud,
  Upload,
  Search,
  Grid,
  List,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Users,
  Plus,
  LogOut,
  Settings,
  History,
  FolderOpen,
} from "lucide-react"
import CreateWorkspaceModal from "@/components/create-workspace-modal"

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)

  const files = [
    { id: 1, name: "Project Proposal.pdf", type: "pdf", size: "2.4 MB", date: "2 hours ago", icon: FileText },
    { id: 2, name: "Design Mockups.fig", type: "design", size: "15.8 MB", date: "5 hours ago", icon: ImageIcon },
    { id: 3, name: "Presentation.pptx", type: "presentation", size: "8.2 MB", date: "1 day ago", icon: FileText },
    { id: 4, name: "Demo Video.mp4", type: "video", size: "45.6 MB", date: "2 days ago", icon: Video },
    { id: 5, name: "Assets.zip", type: "archive", size: "120 MB", date: "3 days ago", icon: Archive },
    { id: 6, name: "Background Music.mp3", type: "audio", size: "5.2 MB", date: "4 days ago", icon: Music },
  ]

  const stats = [
    { label: "Total Files", value: "156", icon: FileText },
    { label: "Storage Used", value: "45.2 GB", icon: Cloud },
    { label: "Shared Files", value: "23", icon: Share2 },
    { label: "Workspaces", value: "5", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Cloud className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">CloudVault</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowCreateWorkspace(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Workspace
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">JD</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuItem className="text-foreground">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground">
                    <History className="h-4 w-4 mr-2" />
                    Activity Log
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border text-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">My Files</h3>
                <p className="text-sm text-muted-foreground">156 files</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Shared with me</h3>
                <p className="text-sm text-muted-foreground">23 files</p>
              </div>
            </div>
          </Card>
          <Link href="/workspace/join">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Workspaces</h3>
                  <p className="text-sm text-muted-foreground">5 active</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Files Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recent Files</h2>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <Card key={file.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <file.icon className="h-8 w-8 text-primary" />
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
                      <DropdownMenuItem className="text-foreground">
                        <History className="h-4 w-4 mr-2" />
                        Version History
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="font-semibold text-foreground mb-2 truncate">{file.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <div className="divide-y divide-border">
              {files.map((file) => (
                <div key={file.id} className="p-4 hover:bg-secondary/50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <file.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • {file.date}
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
                        <DropdownMenuItem className="text-foreground">
                          <History className="h-4 w-4 mr-2" />
                          Version History
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <CreateWorkspaceModal open={showCreateWorkspace} onClose={() => setShowCreateWorkspace(false)} />
    </div>
  )
}
