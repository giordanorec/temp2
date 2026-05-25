# 04 — Pipeline / Fluxo de execucao

## Fluxo principal

```
Usuarios                    Site (Vercel)              Cloudflare R2
   |                            |                          |
   |-- navega (read-only) ----->|                          |
   |<-- paginas SSR/SSG --------|                          |
   |                            |                          |
   |-- login (NextAuth) ------->|                          |
   |<-- sessao autenticada -----|                          |
   |                            |                          |
   |-- upload arquivo --------->|-- salva no R2 ---------> |
   |<-- confirmacao ------------|                          |
   |                            |                          |
                                                           |
Admin (Claude Code)                                        |
   |                                                       |
   |-- puxa uploads do R2 ---------------------------------|
   |-- processa documentos                                 |
   |-- atualiza data/*.json                                |
   |-- git commit + push                                   |
   |-- Vercel rebuilda automaticamente                     |
```

## Estagios

1. **Navegacao publica** — qualquer pessoa acessa o mapa de atores,
   diretorio, agenda. Dados servidos de JSON estatico (SSG/ISR).

2. **Autenticacao** — membros das delegacoes fazem login via NextAuth
   (Google provider). Aceite de termo LGPD no primeiro login.

3. **Upload de documentos** — usuarios autenticados enviam arquivos
   (PDFs, apresentacoes, agendas) que sao armazenados no Cloudflare R2.

4. **Reprocessamento offline** — periodicamente, admins (Giordano/Mariana)
   puxam os uploads, processam no Claude Code, atualizam os JSONs no repo,
   fazem commit e push. Vercel rebuilda automaticamente.

## Tratamento de erro

- Upload falha: retry no client com mensagem amigavel.
- R2 indisponivel: mensagem "tente novamente em alguns minutos".
- JSON corrompido: CI/pre-commit valida schema antes de aceitar merge.
- Login falha: redirect pra pagina de login com mensagem de erro.
