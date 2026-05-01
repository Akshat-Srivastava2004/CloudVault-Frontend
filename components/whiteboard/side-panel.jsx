"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SidePanel({
  toolProps,
  showGrid,
  setShowGrid,
  onExport,
  onClear,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onCenter,
  requestImageInsert,
  participants = [],
}) {
  return (
    <div className="h-full w-[300px] p-3 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold">Board Options</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Grid</span>
          <Switch checked={showGrid} onCheckedChange={setShowGrid} />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" variant="outline" onClick={onUndo}>
          Undo
        </Button>
        <Button size="sm" variant="outline" onClick={onRedo}>
          Redo
        </Button>
        <Button size="sm" variant="outline" onClick={onZoomOut}>
          Zoom -
        </Button>
        <Button size="sm" variant="outline" onClick={onZoomIn}>
          Zoom +
        </Button>
        <Button size="sm" variant="outline" onClick={onCenter}>
          Center
        </Button>
        <Button size="sm" onClick={onExport} className="bg-primary text-primary-foreground">
          Export
        </Button>
        <Button size="sm" variant="secondary" onClick={requestImageInsert}>
          Insert Image
        </Button>
        <Button size="sm" variant="destructive" onClick={onClear}>
          Clear
        </Button>
      </div>

      <Separator />

      <div className="flex-1 min-h-0">
        <h3 className="text-sm font-semibold">Participants</h3>
        <ScrollArea className="mt-2 h-full pr-2">
          <div className="space-y-1">
            {participants.map((p) => {
              const initials = p.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
              const dot =
                p.status === "online" ? "bg-emerald-500" : p.status === "idle" ? "bg-amber-500" : "bg-muted-foreground"
              return (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/40 transition-colors">
                  <div className="relative">
                    <Avatar className="h-8 w-8 ring-2 ring-background">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background ${dot}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm leading-tight truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground truncate capitalize">{p.status}</div>
                  </div>
                  <Badge variant={p.role === "Admin" ? "default" : "secondary"} className="text-[10px]">
                    {p.role}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <div className="text-xs text-muted-foreground space-y-2">
        <p>{"Tools: Pen, Highlighter, Eraser, Line, Arrow, Rectangle, Circle, Text, Sticky, Pan, Select, Image"}</p>
        <p>{"Pro tips: Drag while holding Pan tool to move. Ctrl/Cmd + Wheel to zoom."}</p>
      </div>
    </div>
  )
}
