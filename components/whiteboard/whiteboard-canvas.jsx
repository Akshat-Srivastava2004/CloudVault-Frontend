"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

const INITIAL = { scale: 1, offsetX: 0, offsetY: 0 }

function createCanvasSize(canvas) {
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const rect = canvas.getBoundingClientRect()
  canvas.width = Math.floor(rect.width * dpr)
  canvas.height = Math.floor(rect.height * dpr)
  const ctx = canvas.getContext("2d")
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { dpr }
}

function drawGrid(ctx, width, height, scale, offsetX, offsetY) {
  const step = 32 * scale
  ctx.save()
  ctx.translate(offsetX, offsetY)
  ctx.strokeStyle = "rgba(255,255,255,0.06)"
  ctx.lineWidth = 1
  for (let x = -offsetX % step; x < width; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let y = -offsetY % step; y < height; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  ctx.restore()
}

const WhiteboardCanvas = forwardRef(function WhiteboardCanvas({ toolProps, setTool }, ref) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const [items, setItems] = useState([]) // strokes/shapes/text/images
  const [undoStack, setUndo] = useState([])
  const [redoStack, setRedo] = useState([])
  const [view, setView] = useState(INITIAL)
  const [isPanning, setIsPanning] = useState(false)
  const [draft, setDraft] = useState(null) // preview of current shape
  const [editingText, setEditingText] = useState(null) // {id, x, y, value}

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => createCanvasSize(canvas)
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  const worldPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - view.offsetX) / view.scale
    const y = (e.clientY - rect.top - view.offsetY) / view.scale
    return { x, y }
  }

  // Drawing loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const { width, height } = canvas.getBoundingClientRect()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // grid first
    if (toolProps.showGrid) {
      drawGrid(ctx, width, height, view.scale, view.offsetX, view.offsetY)
    }

    ctx.save()
    ctx.translate(view.offsetX, view.offsetY)
    ctx.scale(view.scale, view.scale)

    // draw items
    for (const it of items) {
      drawItem(ctx, it)
    }
    // draw draft on top
    if (draft) drawItem(ctx, draft, true)

    ctx.restore()
  }, [items, draft, view, toolProps.showGrid])

  function drawItem(ctx, it, dashed = false) {
    ctx.save()
    ctx.globalAlpha = it.opacity ?? 1
    if (it.mode === "erase") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.strokeStyle = "rgba(0,0,0,1)"
      ctx.fillStyle = "rgba(0,0,0,1)"
    } else {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = it.color || "#fff"
      ctx.fillStyle = it.fill || "transparent"
    }
    ctx.lineWidth = it.size || 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    if (dashed) ctx.setLineDash([6, 6])

    switch (it.type) {
      case "path": {
        ctx.beginPath()
        const pts = it.points
        if (!pts.length) break
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y)
        }
        ctx.stroke()
        break
      }
      case "line": {
        ctx.beginPath()
        ctx.moveTo(it.x1, it.y1)
        ctx.lineTo(it.x2, it.y2)
        ctx.stroke()
        break
      }
      case "arrow": {
        // main line
        ctx.beginPath()
        ctx.moveTo(it.x1, it.y1)
        ctx.lineTo(it.x2, it.y2)
        ctx.stroke()
        // arrow head
        const angle = Math.atan2(it.y2 - it.y1, it.x2 - it.x1)
        const len = 12 + (it.size || 3) * 0.8
        const a1 = angle - Math.PI / 7
        const a2 = angle + Math.PI / 7
        ctx.beginPath()
        ctx.moveTo(it.x2, it.y2)
        ctx.lineTo(it.x2 - len * Math.cos(a1), it.y2 - len * Math.sin(a1))
        ctx.moveTo(it.x2, it.y2)
        ctx.lineTo(it.x2 - len * Math.cos(a2), it.y2 - len * Math.sin(a2))
        ctx.stroke()
        break
      }
      case "rect": {
        const w = it.x2 - it.x1
        const h = it.y2 - it.y1
        if (it.fill && it.fill !== "transparent") {
          ctx.fillRect(it.x1, it.y1, w, h)
        }
        ctx.strokeRect(it.x1, it.y1, w, h)
        break
      }
      case "circle": {
        const rx = (it.x2 - it.x1) / 2
        const ry = (it.y2 - it.y1) / 2
        const cx = it.x1 + rx
        const cy = it.y1 + ry
        ctx.beginPath()
        ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI * 2)
        if (it.fill && it.fill !== "transparent") ctx.fill()
        ctx.stroke()
        break
      }
      case "text": {
        ctx.fillStyle = it.color || "#fff"
        ctx.font = `${it.size || 18}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`
        ctx.textBaseline = "top"
        wrapText(ctx, it.value || "", it.x, it.y, 800, it.size * 1.4)
        break
      }
      case "sticky": {
        // render as filled rounded rect with text
        const pad = 8
        const w = it.w || 220
        const h = it.h || 160
        const r = 10
        ctx.fillStyle = it.bg || "rgba(255, 229, 100, 0.9)"
        roundRect(ctx, it.x, it.y, w, h, r)
        ctx.fill()
        ctx.fillStyle = "#111"
        ctx.font = "16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        wrapText(ctx, it.value || "", it.x + pad, it.y + pad, w - pad * 2, 20)
        break
      }
      case "image": {
        if (it.img) {
          ctx.drawImage(it.img, it.x, it.y, it.w, it.h)
        }
        break
      }
    }
    ctx.restore()
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = (text || "").split(" ")
    let line = ""
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y)
        line = words[n] + " "
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, y)
  }

  function roundRect(ctx, x, y, w, h, r) {
    const min = Math.min(w, h) / 2
    r = Math.min(r, min)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  // mouse events
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onDown = (e) => {
      if (e.button === 1 || (e.button === 0 && (toolProps.tool === "hand" || e.spaceKey))) {
        setIsPanning(true)
        wrapperRef.current.dataset.panX = e.clientX
        wrapperRef.current.dataset.panY = e.clientY
        return
      }

      const p = worldPoint(e)
      const common = {
        color: toolProps.tool === "highlighter" ? toolProps.strokeColor : toolProps.strokeColor,
        fill: toolProps.fillColor,
        size: toolProps.strokeWidth,
        opacity: toolProps.tool === "highlighter" ? 0.25 : toolProps.opacity,
      }

      if (toolProps.tool === "pen" || toolProps.tool === "highlighter" || toolProps.tool === "eraser") {
        setDraft({
          type: "path",
          points: [p],
          ...common,
          mode: toolProps.tool === "eraser" ? "erase" : "draw",
        })
      } else if (toolProps.tool === "line" || toolProps.tool === "arrow") {
        setDraft({ type: toolProps.tool, x1: p.x, y1: p.y, x2: p.x, y2: p.y, ...common })
      } else if (toolProps.tool === "rect" || toolProps.tool === "circle") {
        setDraft({ type: toolProps.tool, x1: p.x, y1: p.y, x2: p.x, y2: p.y, ...common })
      } else if (toolProps.tool === "text") {
        // create and begin editing
        const id = crypto.randomUUID()
        const it = {
          id,
          type: "text",
          x: p.x,
          y: p.y,
          value: "Double-click to edit",
          color: toolProps.strokeColor,
          size: toolProps.fontSize || 18,
          opacity: toolProps.opacity,
        }
        pushItem(it)
        // switch to select for ease
        setTool("select")
      } else if (toolProps.tool === "sticky") {
        const it = {
          id: crypto.randomUUID(),
          type: "sticky",
          x: p.x,
          y: p.y,
          value: "Note...",
          bg: "rgba(255,229,100,0.9)",
          opacity: 1,
        }
        pushItem(it)
        setTool("select")
      } else if (toolProps.tool === "image") {
        promptImage()
      }
    }

    const onMove = (e) => {
      if (isPanning) {
        const prevX = Number.parseFloat(wrapperRef.current.dataset.panX || "0")
        const prevY = Number.parseFloat(wrapperRef.current.dataset.panY || "0")
        const dx = e.clientX - prevX
        const dy = e.clientY - prevY
        wrapperRef.current.dataset.panX = e.clientX
        wrapperRef.current.dataset.panY = e.clientY
        setView((v) => ({ ...v, offsetX: v.offsetX + dx, offsetY: v.offsetY + dy }))
        return
      }
      if (!draft) return
      const p = worldPoint(e)
      setDraft((d) => {
        if (!d) return d
        if (d.type === "path") {
          return { ...d, points: [...d.points, p] }
        }
        if (d.type === "line" || d.type === "arrow" || d.type === "rect" || d.type === "circle") {
          return { ...d, x2: p.x, y2: p.y }
        }
        return d
      })
    }

    const onUp = () => {
      if (isPanning) {
        setIsPanning(false)
        return
      }
      if (draft) {
        pushItem(draft)
        setDraft(null)
      }
    }

    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      const delta = e.deltaY < 0 ? 1.1 : 1 / 1.1
      zoomAtPointer(delta, e)
    }

    canvas.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    canvas.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      canvas.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("wheel", onWheel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolProps, draft, isPanning, view])

  function zoomAtPointer(factor, e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    setView((v) => {
      const nx = (px - v.offsetX) / v.scale
      const ny = (py - v.offsetY) / v.scale
      const newScale = Math.max(0.2, Math.min(3, v.scale * factor))
      const offsetX = px - nx * newScale
      const offsetY = py - ny * newScale
      return { scale: newScale, offsetX, offsetY }
    })
  }

  function pushItem(it) {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), ...it }])
    setUndo((u) => [...u, "add"])
    setRedo([])
  }

  // Imperative API
  useImperativeHandle(
    ref,
    () => ({
      exportPNG() {
        // bake current draw into an offscreen canvas to avoid grid
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const off = document.createElement("canvas")
        off.width = rect.width * 2
        off.height = rect.height * 2
        const ctx = off.getContext("2d")
        ctx.scale(2, 2)
        ctx.translate(view.offsetX, view.offsetY)
        ctx.scale(view.scale, view.scale)
        for (const it of items) drawItem(ctx, it)
        const data = off.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = data
        a.download = "whiteboard.png"
        a.click()
      },
      clearBoard() {
        setItems([])
        setUndo([])
        setRedo([])
      },
      undo() {
        if (!items.length) return
        const last = items[items.length - 1]
        setItems(items.slice(0, -1))
        setRedo((r) => [...r, last])
      },
      redo() {
        if (!redoStack.length) return
        const next = redoStack[redoStack.length - 1]
        setRedo(redoStack.slice(0, -1))
        setItems((its) => [...its, next])
      },
      zoomStep(factor) {
        setView((v) => ({ ...v, scale: Math.max(0.2, Math.min(3, v.scale * factor)) }))
      },
      center() {
        setView(INITIAL)
      },
      promptImage() {
        promptImage()
      },
    }),
    [items, redoStack, view],
  )

  function promptImage() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const it = {
          type: "image",
          x: 80,
          y: 80,
          w: Math.min(640, img.width),
          h: Math.min(480, img.height),
          img,
        }
        pushItem(it)
        URL.revokeObjectURL(url)
      }
      img.src = url
    }
    input.click()
  }

  return (
    <div
      ref={wrapperRef}
      className="h-full w-full relative bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
    >
      {/* Interaction hint */}
      <div className="pointer-events-none absolute left-4 bottom-4 text-xs text-muted-foreground/80 bg-card/60 rounded-md px-2 py-1">
        {"Hold Ctrl/Cmd + Scroll to zoom. Middle-mouse or Pan tool to move."}
      </div>
      {/* Canvas */}
      <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" />
    </div>
  )
})

export default WhiteboardCanvas
