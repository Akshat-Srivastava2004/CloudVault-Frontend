import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Shield,
  Cloud,
  Lock,
  Users,
  FileText,
  Share2,
  History,
  Zap,
  Upload,
  Download,
  FolderOpen,
  CheckCircle2,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">CloudVault</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-foreground">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            The complete platform for secure file storage.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            Your team's toolkit to stop configuring and start collaborating. Securely store, share, and manage your
            digital assets with enterprise-grade security.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/workspace/join">
              <Button size="lg" variant="outline" className="text-lg px-8 border-border text-foreground bg-transparent">
                Join Workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Files Stored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">256-bit</div>
              <div className="text-muted-foreground">Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4 text-balance">
            Robust Features for an Enhanced User Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Our system is equipped with a suite of powerful features designed to provide a comprehensive and secure file
            management experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">User Authentication</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure login and registration powered by JWT-based protocols.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Intuitive File Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Effortlessly upload, list, view, download, and delete your digital assets.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Controlled File Sharing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate secure, time-limited sharing links for precise access control.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Seamless Cloud Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leveraging leading cloud storage services for unmatched scalability and reliability.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Unyielding Data Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each user's files are meticulously isolated and privatized, ensuring complete confidentiality.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Personalized User Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A clear overview of all uploaded files for streamlined organization and quick access.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Version Control</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track changes and revert to previous versions of your files.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Real-time Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work together on documents with multi-user editing and instant updates.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">Collaboration</span>
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
                Faster iteration. More innovation.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The platform for rapid progress. Let your team focus on shipping features instead of managing
                infrastructure with automated workflows, built-in collaboration, and real-time synchronization.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Create Secure Workspaces</h4>
                    <p className="text-muted-foreground">Admin-controlled rooms with passkey protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Real-time File Sharing</h4>
                    <p className="text-muted-foreground">Instant updates across all team members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Multi-user Editing</h4>
                    <p className="text-muted-foreground">Collaborate seamlessly on shared documents</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-card border-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Team Workspace</div>
                      <div className="text-sm text-muted-foreground">5 members active</div>
                    </div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <Upload className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground">project-files.zip uploaded</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground">document.pdf edited by Alex</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <Download className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground">Sarah downloaded assets.zip</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <Card className="p-12 bg-card border-border text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to transform your file management?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Join thousands of teams already using CloudVault to securely store, share, and collaborate on their files.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 border-border text-foreground bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">CloudVault</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Secure cloud storage and collaboration platform for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 CloudVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
