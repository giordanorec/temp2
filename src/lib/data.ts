import type { Actor, Connection, Sector, Event } from "@/types"
import actorsData from "../../data/actors.json"
import connectionsData from "../../data/connections.json"
import sectorsData from "../../data/sectors.json"
import eventsData from "../../data/events.json"

export function getActors(): Actor[] {
  return actorsData as Actor[]
}

export function getActor(id: string): Actor | undefined {
  return (actorsData as Actor[]).find((a) => a.id === id)
}

export function getConnections(): Connection[] {
  return connectionsData as Connection[]
}

export function getActorConnections(actorId: string): Connection[] {
  return (connectionsData as Connection[]).filter(
    (c) => c.from === actorId || c.to === actorId
  )
}

export function getSectors(): Sector[] {
  return sectorsData as Sector[]
}

export function getEvents(): Event[] {
  return eventsData as Event[]
}

export function getActorsByIds(ids: string[]): Actor[] {
  const set = new Set(ids)
  return (actorsData as Actor[]).filter((a) => set.has(a.id))
}

export function getConnectedActors(actorId: string): Actor[] {
  const connections = getActorConnections(actorId)
  const connectedIds = connections.map((c) =>
    c.from === actorId ? c.to : c.from
  )
  return getActorsByIds(connectedIds)
}
