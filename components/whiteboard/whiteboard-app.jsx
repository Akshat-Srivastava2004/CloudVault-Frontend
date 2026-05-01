"use client"

import { useState, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Toolbar from "./toolbar"
import WhiteboardCanvas from "./whiteboard-canvas"
import SidePanel from "./side-panel"

const DEFAULT_COLOR = "#49c1d2" // aligns with --primary
const DEFAULT_BG = "transparent"

export default function WhiteboardApp() {
  const [tool, setTool] = useState("pen") // pen | highlighter | eraser | line | rect | circle | arrow | text | sticky | hand | select | image
  const [strokeColor, setStrokeColor] = useState(DEFAULT_COLOR)
  const [fillColor, setFillColor] = useState(DEFAULT_BG)
  const [strokeWidth, setStrokeWidth] = useState(3)
  const [opacity, setOpacity] = useState(1)
  const [showGrid, setShowGrid] = useState(true)
  const [roomId, setRoomId] = useState("design-room")
  const [passkey] = useState("****-****") // placeholder; real backend would generate
  const [fontSize, setFontSize] = useState(18)
  const [shapeFill, setShapeFill] = useState(false)

  const canvasRef = useRef(null)

  const participants = useMemo(
    () => [
      { id: "u1", name: "Akash Yadav", role: "Admin", status: "online" },
      { id: "u2", name: "Riya Singh", role: "Editor", status: "online" },
      { id: "u3", name: "Sanchit Yadav", role: "Viewer", status: "idle" },
      { id: "u4", name: "Maya Patel", role: "Editor", status: "online" },
      { id: "u5", name: "Omar Khan", role: "Viewer", status: "idle" },
      { id: "u6", name: "Gaurav Singh", role: "Editor", status: "online" },
    ],
    [],
  )
  const onlineCount = useMemo(() => participants.filter((p) => p.status === "online").length, [participants])

  const toolProps = useMemo(
    () => ({
      tool,
      strokeColor,
      fillColor: shapeFill ? strokeColor : fillColor,
      strokeWidth,
      opacity,
      fontSize,
      showGrid,
    }),
    [tool, strokeColor, fillColor, strokeWidth, opacity, fontSize, showGrid, shapeFill],
  )

  const handleExport = () => {
    if (!canvasRef.current) return
    canvasRef.current.exportPNG()
  }

  const handleClear = () => {
    if (!canvasRef.current) return
    canvasRef.current.clearBoard()
  }

  const handleUndo = () => canvasRef.current?.undo()
  const handleRedo = () => canvasRef.current?.redo()
  const handleZoomIn = () => canvasRef.current?.zoomStep(1.1)
  const handleZoomOut = () => canvasRef.current?.zoomStep(1 / 1.1)
  const handleCenter = () => canvasRef.current?.center()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary/40">
              Cloud Board
            </Badge>
            <span className="text-sm text-muted-foreground">Workspace:</span>
            <Input value={roomId} onChange={(e) => setRoomId(e.target.value)} className="h-8 w-[180px]" />
            <span className="text-xs text-muted-foreground">Passkey:</span>
            <Badge variant="secondary">{passkey}</Badge>
            <div className="ml-3 hidden md:flex items-center gap-2">
              <div className="flex -space-x-2">
                {participants.slice(0, 4).map((p, i) => (
                  <Avatar key={p.id} className="h-7 w-7 ring-2 ring-background">
                    <AvatarFallback>
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {participants.length > 4 && (
                  <div className="h-7 w-7 rounded-full bg-muted text-xs grid place-items-center ring-2 ring-background">
                    +{participants.length - 4}
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {onlineCount} online · {participants.length} total
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleUndo}>
              Undo
            </Button>
            <Button size="sm" variant="outline" onClick={handleRedo}>
              Redo
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              -
            </Button>
            <Button size="sm" variant="outline" onClick={handleCenter}>
              Center
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              +
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button size="sm" variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button size="sm" onClick={handleExport} className="bg-primary text-primary-foreground">
              Export PNG
            </Button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto]">
        {/* Left Toolbar */}
        <Card className="hidden lg:flex flex-col gap-2 p-2 border-r border-border bg-card/70">
          <Toolbar
            tool={tool}
            setTool={setTool}
            strokeColor={strokeColor}
            setStrokeColor={setStrokeColor}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            opacity={opacity}
            setOpacity={setOpacity}
            shapeFill={shapeFill}
            setShapeFill={setShapeFill}
          />
        </Card>

        {/* Canvas */}
        <div className="relative">
          <WhiteboardCanvas ref={canvasRef} toolProps={toolProps} setTool={(t) => setTool(t)} />
          {/* Mobile toolbar overlay */}
          <div className="lg:hidden absolute left-2 top-2 right-2">
            <Card className="p-2 bg-card/70 backdrop-blur">
              <Toolbar
                tool={tool}
                setTool={setTool}
                strokeColor={strokeColor}
                setStrokeColor={setStrokeColor}
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
                opacity={opacity}
                setOpacity={setOpacity}
                compact
                shapeFill={shapeFill}
                setShapeFill={setShapeFill}
              />
            </Card>
          </div>
        </div>

        {/* Side Panel */}
        <Card className="border-l border-border bg-card/70">
          <SidePanel
            toolProps={toolProps}
            setShowGrid={setShowGrid}
            showGrid={showGrid}
            onExport={handleExport}
            onClear={handleClear}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onCenter={handleCenter}
            requestImageInsert={() => canvasRef.current?.promptImage()}
            participants={participants}
          />
        </Card>
      </div>
    </div>
  )
}
