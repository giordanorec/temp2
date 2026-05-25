# multiagentes-giordano — Instalador & Compatibilidade

Instalador portátil do plugin [multiagentes-giordano](https://github.com/giordanorec/multiagentes-giordano) para Claude Code em todas as plataformas.

## Instalação rápida

```bash
curl -sL https://raw.githubusercontent.com/giordanorec/temp2/main/install-multiagentes.sh | bash
```

Ou clone e rode:

```bash
git clone https://github.com/giordanorec/temp2.git
bash temp2/install-multiagentes.sh
```

## Compatibilidade por plataforma

| Plataforma | Slash commands | Spawnar agentes | Dashboard tmux | Status |
|---|---|---|---|---|
| **Claude Code CLI** (local) | OK | OK | OK (Tilix/iTerm2) | Totalmente funcional |
| **Claude Code Web** (claude.ai/code) | OK | OK | Sem GUI (attach via tmux) | Funcional sem dashboard visual |
| **Claude Code App Desktop** | OK | OK | OK se tmux/terminal disponível | Funcional |
| **Claude Code App Mobile** | OK | OK | Sem GUI | Funcional sem dashboard visual |
| **Claude Desktop** (claude.ai desktop app) | Não suportado | Não suportado | Não suportado | Incompatível |

### Por que Claude Desktop não funciona

O Claude Desktop usa **MCP servers** como sistema de extensão, não slash commands ou skills do Claude Code. Além disso, não tem acesso ao `claude` CLI necessário para spawnar sessões persistentes. O plugin depende fundamentalmente de:
- `claude` CLI com `--session-id` para sessões persistentes
- `tmux` para o dashboard
- Filesystem local para comunicação entre agentes (`specs/`, `reports/`, `memory/`)

Nenhum desses está disponível no Claude Desktop.

## Auto-instalação em sessões web

Copie `.claude/hooks/session-start.sh` para seu repositório. Adicione ao `settings.json` global (`~/.claude/settings.json`):

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "bash .claude/hooks/session-start.sh"
      }]
    }]
  }
}
```

## Patches incluídos

- `patches/spawn-uuid-fallback.patch` — Faz `spawn.sh` funcionar sem `uuidgen` (usa `/proc/sys/kernel/random/uuid` ou Python como fallback). Aplique no repo original:
  ```bash
  cd ~/.claude/plugins/multiagentes-giordano
  git apply /caminho/para/patches/spawn-uuid-fallback.patch
  ```
