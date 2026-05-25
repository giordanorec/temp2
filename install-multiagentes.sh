#!/usr/bin/env bash
# Instala o plugin multiagentes-giordano no Claude Code.
# Funciona em: CLI local, Claude Code na web, Claude Code mobile.
#
# Uso:
#   curl -sL https://raw.githubusercontent.com/giordanorec/temp2/main/install-multiagentes.sh | bash
#   # ou
#   bash install-multiagentes.sh
set -euo pipefail

PLUGIN_DIR="$HOME/.claude/plugins/multiagentes-giordano"
COMMANDS_DIR="$HOME/.claude/commands"
SKILLS_DIR="$HOME/.claude/skills"
REPO_URL="https://github.com/giordanorec/multiagentes-giordano.git"

echo "==> Instalando multiagentes-giordano para Claude Code..."

# 1) Clone ou atualiza o repo do plugin
if [[ -d "${PLUGIN_DIR}/.git" ]]; then
    echo "    Plugin já existe, atualizando..."
    git -C "${PLUGIN_DIR}" pull --ff-only origin main 2>/dev/null || true
else
    echo "    Clonando ${REPO_URL}..."
    rm -rf "${PLUGIN_DIR}"
    git clone --depth 1 "${REPO_URL}" "${PLUGIN_DIR}"
fi

# 2) Instala slash commands globais
mkdir -p "${COMMANDS_DIR}"
for cmd in multiagente-init multiagente-spawn multiagente-dashboard; do
    src="${PLUGIN_DIR}/commands/${cmd}.md"
    dst="${COMMANDS_DIR}/${cmd}.md"
    if [[ -f "${src}" ]]; then
        sed 's|find ~/.claude/plugins/cache -maxdepth 5 -type d \\|find ~/.claude/plugins -maxdepth 5 -type d \\|g' \
            "${src}" > "${dst}"
        echo "    ✓ /${cmd}"
    fi
done

# 3) Instala skill
mkdir -p "${SKILLS_DIR}/multiagente-workflow"
cp "${PLUGIN_DIR}/skills/multiagente-workflow/SKILL.md" \
   "${SKILLS_DIR}/multiagente-workflow/SKILL.md"
echo "    ✓ skill multiagente-workflow"

# 4) Torna scripts executáveis
chmod +x "${PLUGIN_DIR}/scripts/"*.sh "${PLUGIN_DIR}/scripts/"*.py 2>/dev/null || true

# 5) Verifica dependências
echo ""
echo "==> Verificando dependências..."
MISSING=()
for dep in tmux jq python3; do
    if command -v "$dep" &>/dev/null; then
        echo "    ✓ ${dep}"
    else
        echo "    ✗ ${dep} (não encontrado)"
        MISSING+=("$dep")
    fi
done

# uuidgen pode não existir, mas /proc/sys/kernel/random/uuid funciona no Linux
if command -v uuidgen &>/dev/null; then
    echo "    ✓ uuidgen"
elif [[ -f /proc/sys/kernel/random/uuid ]]; then
    echo "    ✓ uuid via /proc (uuidgen ausente, mas OK no Linux)"
else
    echo "    ✗ uuidgen (não encontrado)"
    MISSING+=("uuidgen")
fi

if command -v claude &>/dev/null; then
    echo "    ✓ claude CLI ($(claude --version 2>/dev/null || echo 'versão desconhecida'))"
else
    echo "    ✗ claude CLI (necessário para spawnar agentes)"
    MISSING+=("claude")
fi

echo ""
if [[ ${#MISSING[@]} -gt 0 ]]; then
    echo "⚠  Dependências faltando: ${MISSING[*]}"
    echo "   Instale com: sudo apt install -y ${MISSING[*]}"
else
    echo "✓  Todas as dependências instaladas."
fi

echo ""
echo "==> Instalação concluída!"
echo "    Comandos disponíveis no Claude Code:"
echo "      /multiagente-init         — Inicia projeto multi-agente"
echo "      /multiagente-spawn <agente> — Spawna um especialista"
echo "      /multiagente-dashboard    — Abre dashboard tmux"
echo ""
echo "    Plugin instalado em: ${PLUGIN_DIR}"
echo ""
echo "    Nota: o dashboard tmux requer terminal gráfico (Tilix/iTerm2/Terminal.app)."
echo "    Em ambientes web/headless, o dashboard não abrirá, mas os agentes funcionam."
