export interface Actor {
  id: string
  name: string
  side: "recife" | "nantes"
  type: "person" | "institution" | "company" | "association"
  sectors: string[]
  institution?: string
  role?: string
  description?: string
  contact?: {
    email?: string
    phone?: string
    linkedin?: string
    website?: string
  }
  connections: string[]
  missions?: string[]
  tags?: string[]
  photoUrl?: string
}

export interface Connection {
  id: string
  from: string
  to: string
  type: string
  label?: string
  since?: string
}

export interface Event {
  id: string
  title: string
  date: string
  endDate?: string
  location: "recife" | "nantes" | "online"
  description?: string
  participants: string[]
  type: "mission" | "event" | "meeting"
}

export interface Sector {
  id: string
  name: string
  description?: string
}
