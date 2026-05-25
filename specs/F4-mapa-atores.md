# F4 — MVP: Mapa de Atores

## Objetivo

Primeira entrega funcional: mapa visual interativo dos atores da cooperacao
Recife-Nantes, com conexoes entre eles, filtros e detalhe ao clicar.

## Criterio de aceite

- [ ] Pagina `/mapa` com grafo Cytoscape.js mostrando atores e conexoes
- [ ] Nos coloridos por lado (Recife = cor A, Nantes = cor B)
- [ ] Formas diferentes por tipo (pessoa = circulo, instituicao = quadrado, empresa = diamante)
- [ ] Filtros: por lado, por setor, por tipo
- [ ] Clicar no no abre painel lateral com detalhes do ator
- [ ] Pagina `/diretorio` com listagem de todos os atores + busca
- [ ] Pagina `/ator/[id]` com perfil completo
- [ ] Dados servidos de `data/*.json` (SSG)
- [ ] Responsivo (funciona em mobile)
- [ ] Landing page (`/`) com links funcionais pro mapa e diretorio

## Dados seed

Preencher `data/actors.json`, `data/connections.json`, `data/sectors.json`
com dados reais da cooperacao (pesquisados na internet + fornecidos pelo
usuario).

## Agentes envolvidos

- **arquiteto**: spec, integracao, revisao
- **frontend-dev**: componentes React, paginas, Cytoscape
- **pipeline-dev**: `data/*.json`, types, funcoes de leitura
- **asset-designer**: cores, tipografia, animacoes do mapa
- **dba**: validacao de schema, integridade referencial
- **qa-tester**: testes unitarios + visual

## Arquivos a criar/modificar

```
data/actors.json          # seed data
data/connections.json     # seed data
data/sectors.json         # seed data
data/events.json          # seed data (vazio por ora)
src/types/index.ts        # interfaces TypeScript
src/lib/data.ts           # funcoes de leitura dos JSONs
src/app/mapa/page.tsx     # pagina do mapa
src/app/diretorio/page.tsx # listagem
src/app/ator/[id]/page.tsx # detalhe
src/components/map/       # componentes do Cytoscape
src/components/directory/  # componentes do diretorio
src/app/page.tsx          # atualizar links
```
