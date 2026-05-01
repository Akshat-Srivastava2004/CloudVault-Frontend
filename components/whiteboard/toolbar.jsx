"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useId } from "react"

const tools = [
  { id: "select", label: "Select" },
  { id: "hand", label: "Pan" },
  { id: "pen", label: "Pen" },
  { id: "highlighter", label: "Highlighter" },
  { id: "eraser", label: "Eraser" },
  { id: "line", label: "Line" },
  { id: "arrow", label: "Arrow" },
  { id: "rect", label: "Rectangle" },
  { id: "circle", label: "Circle" },
  { id: "text", label: "Text" },
  { id: "sticky", label: "Sticky" },
  { id: "image", label: "Image" },
]

export default function Toolbar({
  tool,
  setTool,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  opacity,
  setOpacity,
  compact = false,
  shapeFill,
  setShapeFill,
}) {
  const colorId = useId()
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {tools.map((t) => (
          <Button
            key={t.id}
            size="sm"
            variant={tool === t.id ? "default" : "outline"}
            className={tool === t.id ? "bg-primary text-primary-foreground" : ""}
            onClick={() => setTool(t.id)}
            title={t.label}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={colorId} className="text-sm text-muted-foreground">
            Color
          </label>
          <input
            id={colorId}
            type="color"
            className="h-8 w-12 rounded border border-border bg-background"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground w-16">Size</span>
          <Slider
            value={[strokeWidth]}
            min={1}
            max={32}
            step={1}
            onValueChange={(v) => setStrokeWidth(v[0])}
            className="w-full"
          />
          <span className="text-sm w-8 text-right">{strokeWidth}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground w-16">Opacity</span>
          <Slider
            value={[Math.round(opacity * 100)]}
            min={10}
            max={100}
            step={1}
            onValueChange={(v) => setOpacity(v[0] / 100)}
            className="w-full"
          />
          <span className="text-sm w-8 text-right">{Math.round(opacity * 100)}%</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">Fill shapes</span>
          <Switch checked={shapeFill} onCheckedChange={setShapeFill} />
        </div>
      </div>
    </div>
  )
}
