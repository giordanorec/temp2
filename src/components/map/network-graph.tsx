"use client"

import { useEffect, useRef, useCallback } from "react"
import type { Core, ElementDefinition } from "cytoscape"
import type { Actor, Connection } from "@/types"

interface NetworkGraphProps {
  actors: Actor[]
  connections: Connection[]
  selectedSide: string | null
  selectedSector: string | null
  selectedType: string | null
  onSelectActor: (actor: Actor | null) => void
}

const SIDE_COLORS = {
  recife: { bg: "#10b981", border: "#059669", label: "#ffffff" },
  nantes: { bg: "#3b82f6", border: "#2563eb", label: "#ffffff" },
}

const TYPE_SHAPES: Record<string, string> = {
  person: "ellipse",
  institution: "round-rectangle",
  company: "diamond",
  association: "round-hexagon",
}

export function NetworkGraph({
  actors,
  connections,
  selectedSide,
  selectedSector,
  selectedType,
  onSelectActor,
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<Core | null>(null)

  const filteredActors = actors.filter((a) => {
    if (selectedSide && a.side !== selectedSide) return false
    if (selectedSector && !a.sectors.includes(selectedSector)) return false
    if (selectedType && a.type !== selectedType) return false
    return true
  })

  const filteredIds = new Set(filteredActors.map((a) => a.id))

  const filteredConnections = connections.filter(
    (c) => filteredIds.has(c.from) && filteredIds.has(c.to)
  )

  const initGraph = useCallback(async () => {
    if (!containerRef.current) return

    const cytoscape = (await import("cytoscape")).default

    const nodes: ElementDefinition[] = filteredActors.map((actor) => ({
      data: {
        ...actor,
        id: actor.id,
        label: actor.name,
      },
    }))

    const edges: ElementDefinition[] = filteredConnections.map((conn) => ({
      data: {
        id: conn.id,
        source: conn.from,
        target: conn.to,
        label: conn.label || "",
        type: conn.type,
      },
    }))

    if (cyRef.current) {
      cyRef.current.destroy()
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "text-valign": "bottom",
            "text-halign": "center",
            "text-margin-y": 8,
            "font-size": "11px",
            "font-family": "var(--font-geist-sans), sans-serif",
            "text-max-width": "100px",
            "text-wrap": "wrap",
            width: 40,
            height: 40,
            "border-width": 2,
            "transition-property":
              "background-color, border-color, width, height",
            "transition-duration": 200,
          } as cytoscape.Css.Node,
        },
        ...Object.entries(SIDE_COLORS).map(([side, colors]) => ({
          selector: `node[side="${side}"]`,
          style: {
            "background-color": colors.bg,
            "border-color": colors.border,
            color: "#374151",
          } as cytoscape.Css.Node,
        })),
        ...Object.entries(TYPE_SHAPES).map(([type, shape]) => ({
          selector: `node[type="${type}"]`,
          style: { shape } as cytoscape.Css.Node,
        })),
        {
          selector: "node[type='institution'], node[type='association']",
          style: { width: 50, height: 50, "font-size": "12px" } as cytoscape.Css.Node,
        },
        {
          selector: "edge",
          style: {
            width: 1.5,
            "line-color": "#d1d5db",
            "curve-style": "bezier",
            "target-arrow-shape": "none",
            opacity: 0.6,
          } as cytoscape.Css.Edge,
        },
        {
          selector: "node:selected",
          style: {
            "border-width": 4,
            "border-color": "#f59e0b",
            width: 55,
            height: 55,
          } as cytoscape.Css.Node,
        },
        {
          selector: "node.highlighted",
          style: {
            "border-width": 3,
            "border-color": "#f59e0b",
            opacity: 1,
          } as cytoscape.Css.Node,
        },
        {
          selector: "node.faded",
          style: { opacity: 0.15 } as cytoscape.Css.Node,
        },
        {
          selector: "edge.highlighted",
          style: {
            "line-color": "#f59e0b",
            width: 2.5,
            opacity: 1,
          } as cytoscape.Css.Edge,
        },
        {
          selector: "edge.faded",
          style: { opacity: 0.08 } as cytoscape.Css.Edge,
        },
      ],
      layout: {
        name: "cose",
        animate: true,
        animationDuration: 800,
        nodeRepulsion: () => 8000,
        idealEdgeLength: () => 120,
        gravity: 0.3,
        padding: 40,
      } as cytoscape.CoseLayoutOptions,
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.3,
    })

    cy.on("tap", "node", (evt) => {
      const node = evt.target
      const actorData = actors.find((a) => a.id === node.id())
      if (actorData) {
        cy.elements().removeClass("highlighted faded")
        const neighborhood = node.closedNeighborhood()
        cy.elements().not(neighborhood).addClass("faded")
        neighborhood.addClass("highlighted")
        onSelectActor(actorData)
      }
    })

    cy.on("tap", (evt) => {
      if (evt.target === cy) {
        cy.elements().removeClass("highlighted faded")
        onSelectActor(null)
      }
    })

    cyRef.current = cy
  }, [filteredActors, filteredConnections, actors, onSelectActor])

  useEffect(() => {
    initGraph()
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [initGraph])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[500px] rounded-xl border border-border bg-card"
    />
  )
}
