# 03 — Schema

## Modelo de dados

Dados armazenados como JSON em `data/`. Sem banco relacional.

### `data/actors.json`

```typescript
interface Actor {
  id: string;                  // slug unico (ex: "giordano-cabral")
  name: string;                // nome completo
  side: "recife" | "nantes";
  type: "person" | "institution" | "company" | "association";
  sectors: string[];           // ex: ["tecnologia", "educacao"]
  institution?: string;        // ID da instituicao a que pertence
  role?: string;               // cargo/funcao
  description?: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    website?: string;
  };
  connections: string[];       // IDs de atores conectados
  missions?: string[];         // IDs de missoes em que participou
  tags?: string[];
  photoUrl?: string;
}
```

### `data/connections.json`

```typescript
interface Connection {
  id: string;
  from: string;    // actor ID
  to: string;      // actor ID
  type: string;    // ex: "parceria", "projeto", "missao"
  label?: string;  // descricao curta
  since?: string;  // data ISO
}
```

### `data/events.json`

```typescript
interface Event {
  id: string;
  title: string;
  date: string;       // ISO date
  endDate?: string;
  location: "recife" | "nantes" | "online";
  description?: string;
  participants: string[];  // actor IDs
  type: "mission" | "event" | "meeting";
}
```

### `data/sectors.json`

```typescript
interface Sector {
  id: string;
  name: string;
  description?: string;
}
```

## Campos obrigatorios

| Campo | Tipo | Descricao | Notas |
|---|---|---|---|
| `Actor.id` | string | Slug unico | kebab-case |
| `Actor.name` | string | Nome completo | |
| `Actor.side` | enum | recife ou nantes | obrigatorio |
| `Actor.type` | enum | Tipo do ator | |
| `Actor.connections` | string[] | IDs conectados | pode ser vazio |
| `Connection.from/to` | string | IDs dos atores | devem existir |
| `Event.title` | string | Nome do evento | |
| `Event.date` | string | Data ISO | |

## Retencao

Dados ficam no repositorio indefinidamente (versionados via git). Uploads
no R2 ficam ate serem reprocessados — apos processamento, o admin decide
se mantem ou remove.

## Migracoes

Nao ha banco relacional. Mudancas de schema sao feitas via scripts de
transformacao em `scripts/` e documentadas em `docs/DECISOES.md`.
