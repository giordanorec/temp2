Faça as seguintes alterações no repo multiagentes-giordano. São 3 mudanças:

## 1. Adicionar `install.sh` na raiz do repo

Crie o arquivo `install.sh` com o seguinte conteúdo exato:

```bash
#!/usr/bin/env bash
# Instala o plugin multiagentes-giordano no Claude Code.
# Uso:  bash <(curl -sL https://raw.githubusercontent.com/giordanorec/multiagentes-giordano/main/install.sh)
set -euo pipefail

PLUGIN_DIR="$HOME/.claude/plugins/multiagentes-giordano"
COMMANDS_DIR="$HOME/.claude/commands"
SKILLS_DIR="$HOME/.claude/skills"

echo ""
echo "  multiagentes-giordano — instalador"
echo "  ====================================="
echo ""

# 1) Clone ou atualiza
if [[ -d "${PLUGIN_DIR}/.git" ]]; then
    echo "[1/4] Atualizando plugin..."
    git -C "${PLUGIN_DIR}" pull --ff-only origin main 2>/dev/null || true
else
    echo "[1/4] Baixando plugin..."
    rm -rf "${PLUGIN_DIR}"
    git clone --depth 1 https://github.com/giordanorec/multiagentes-giordano.git "${PLUGIN_DIR}"
fi

# 2) Instala slash commands
echo "[2/4] Instalando comandos..."
mkdir -p "${COMMANDS_DIR}"
for cmd in multiagente-init multiagente-spawn multiagente-dashboard; do
    cp "${PLUGIN_DIR}/commands/${cmd}.md" "${COMMANDS_DIR}/${cmd}.md"
    echo "       /${cmd}"
done

# 3) Instala skill
echo "[3/4] Instalando skill..."
mkdir -p "${SKILLS_DIR}/multiagente-workflow"
cp "${PLUGIN_DIR}/skills/multiagente-workflow/SKILL.md" \
   "${SKILLS_DIR}/multiagente-workflow/SKILL.md"

# 4) Torna scripts executáveis
chmod +x "${PLUGIN_DIR}/scripts/"*.sh "${PLUGIN_DIR}/scripts/"*.py 2>/dev/null || true

# 5) Verifica dependências
echo "[4/4] Verificando dependências..."
echo ""
OK=true
for dep in claude tmux jq python3; do
    if command -v "$dep" &>/dev/null; then
        echo "  OK  $dep"
    else
        echo "  --  $dep  (não encontrado)"
        OK=false
    fi
done
if command -v uuidgen &>/dev/null; then
    echo "  OK  uuidgen"
elif [[ -f /proc/sys/kernel/random/uuid ]]; then
    echo "  OK  uuid (via /proc)"
else
    echo "  --  uuidgen  (não encontrado)"
    OK=false
fi

echo ""
if $OK; then
    echo "  Pronto! Abra o Claude Code e digite:  /multiagente-init"
else
    echo "  Instale as dependências faltando:"
    echo "    Ubuntu/Debian:  sudo apt install -y tmux jq util-linux python3"
    echo "    macOS:          brew install tmux jq python3"
    echo ""
    echo "  Claude Code CLI:  npm install -g @anthropic-ai/claude-code"
fi
echo ""
```

Torne-o executável com `chmod +x install.sh`.

## 2. Corrigir `scripts/spawn.sh` — fallback para uuidgen

No arquivo `scripts/spawn.sh`, troque a linha:

```
SESSION_ID=$(uuidgen)
```

Por:

```bash
if command -v uuidgen &>/dev/null; then
    SESSION_ID=$(uuidgen)
elif [[ -f /proc/sys/kernel/random/uuid ]]; then
    SESSION_ID=$(cat /proc/sys/kernel/random/uuid)
else
    SESSION_ID=$(python3 -c "import uuid; print(uuid.uuid4())")
fi
```

Também no mesmo arquivo, troque o nome hardcoded do projeto no INIT_PROMPT. Onde diz:

```
INIT_PROMPT="Você é o agente '${AGENTE}' do projeto old-lady-game. Primeira sessão.
```

Troque `old-lady-game` por `$(basename "$PWD")`:

```
INIT_PROMPT="Você é o agente '${AGENTE}' do projeto $(basename "$PWD"). Primeira sessão.
```

## 3. Corrigir o path do PLUGIN_ROOT nos 3 commands

Nos arquivos `commands/multiagente-init.md`, `commands/multiagente-spawn.md` e `commands/multiagente-dashboard.md` (todos que contêm o snippet de PLUGIN_ROOT), troque:

```
PLUGIN_ROOT=$(find ~/.claude/plugins/cache -maxdepth 5 -type d \
```

Por:

```
PLUGIN_ROOT=$(find ~/.claude/plugins -maxdepth 5 -type d \
```

(remover o `/cache` do path)

## 4. Substituir a seção "Instalação rápida" do README.md

Troque toda a seção "Instalação rápida" (de `## Instalação rápida` até antes de `## Comandos`) por:

```markdown
## Instalação

### Um comando (Linux / macOS)

```bash
bash <(curl -sL https://raw.githubusercontent.com/giordanorec/multiagentes-giordano/main/install.sh)
```

### Passo a passo manual

1. Instale as dependências:
   ```bash
   # Ubuntu/Debian
   sudo apt install -y tmux jq util-linux python3

   # macOS
   brew install tmux jq python3
   ```

2. Instale o [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. Rode o instalador:
   ```bash
   bash <(curl -sL https://raw.githubusercontent.com/giordanorec/multiagentes-giordano/main/install.sh)
   ```

4. (Opcional) Para criar repos no GitHub automaticamente:
   ```bash
   sudo apt install -y gh   # ou: brew install gh
   gh auth login
   ```
```

Também remova a seção sobre `uuidgen` das dependências (o fallback resolve automaticamente), e remova as referências ao marketplace `giordanorec/claude-plugins` que não existe.

## Depois de fazer tudo

Commite com: `fix: instalador funcional, remove referências a plugin marketplace inexistente`

Push para main.
