# 06 — LGPD

## Base legal

**Consentimento** — usuario aceita termo de consentimento no primeiro login.

## Finalidade especifica

- Mapear e conectar atores da cooperacao Recife-Nantes
- Facilitar comunicacao entre membros das delegacoes
- Armazenar documentos compartilhados sobre a cooperacao

## Dados coletados

- Nome, email (via Google OAuth)
- Informacoes de perfil profissional (cargo, instituicao)
- Documentos enviados via upload
- Metadados de uso (data de login, uploads realizados)

## Campos obrigatorios de auditoria

Toda linha de registro deve ter:
- `data_primeira_coleta`
- `fonte_origem` (ex: "google_oauth", "manual_admin")
- `consentimento_aceito` (boolean + data)
- `opt_out` (boolean)

## Retencao

- **Ativos**: enquanto o usuario mantiver consentimento
- **Opt-outs**: dado removido em ate 30 dias apos solicitacao
- **Uploads**: mantidos ate reprocessamento; admin decide retencao

## Canal de opt-out

- Botao "Revogar consentimento / excluir meus dados" no perfil do usuario
- Email de contato: grec@cin.ufpe.br

## Termo de consentimento (resumo)

Exibido no primeiro login. Deve informar:
1. Quais dados sao coletados
2. Finalidade
3. Quem tem acesso (admins do projeto)
4. Direito de revogacao a qualquer momento
5. Contato do responsavel

## Plano em caso de incidente

1. Identificar escopo do vazamento (quais dados, quantos usuarios)
2. Notificar usuarios afetados em ate 72h
3. Registrar incidente em `docs/DECISOES.md`
4. Corrigir vulnerabilidade
5. Reportar a ANPD se dados sensiveis envolvidos
