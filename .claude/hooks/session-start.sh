#!/usr/bin/env bash
# Hook de SessionStart: instala o plugin multiagentes-giordano
# automaticamente quando uma sessão Claude Code na web é iniciada.
#
# Adicione ao settings.json:
#   "hooks": { "SessionStart": [{ "matcher": "", "hooks": [{ "type": "command", "command": "bash .claude/hooks/session-start.sh" }] }] }
set -euo pipefail

PLUGIN_DIR="$HOME/.claude/plugins/multiagentes-giordano"

if [[ -d "${PLUGIN_DIR}/commands" ]]; then
    exit 0
fi

if command -v git &>/dev/null; then
    git clone --depth 1 https://github.com/giordanorec/multiagentes-giordano.git "${PLUGIN_DIR}" 2>/dev/null || exit 0

    mkdir -p "$HOME/.claude/commands" "$HOME/.claude/skills/multiagente-workflow"

    for cmd in multiagente-init multiagente-spawn multiagente-dashboard; do
        src="${PLUGIN_DIR}/commands/${cmd}.md"
        [[ -f "${src}" ]] && sed 's|find ~/.claude/plugins/cache|find ~/.claude/plugins|g' "${src}" > "$HOME/.claude/commands/${cmd}.md"
    done

    cp "${PLUGIN_DIR}/skills/multiagente-workflow/SKILL.md" \
       "$HOME/.claude/skills/multiagente-workflow/SKILL.md" 2>/dev/null || true

    chmod +x "${PLUGIN_DIR}/scripts/"*.sh "${PLUGIN_DIR}/scripts/"*.py 2>/dev/null || true
fi
