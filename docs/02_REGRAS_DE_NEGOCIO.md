# 02 — Regras de Negocio

## Regras do dominio

O sistema mapeia a cooperacao entre Recife e Nantes: atores (pessoas e
instituicoes), conexoes entre eles, setores representados e documentos
relacionados. Qualquer pessoa com o link pode navegar. Membros autenticados
podem fazer upload de arquivos. Admins atualizam a base de atores via
reprocessamento offline.

## Invariantes (obrigatorias)

- **I1.** Todo ator pertence a exatamente um lado: `recife` ou `nantes`.
- **I2.** Conexoes sao bidirecionais — se A conecta a B, B conecta a A.
- **I3.** Upload so eh permitido a usuarios autenticados (membros das
  delegacoes).
- **I4.** Dados pessoais exigem consentimento LGPD aceito no login.
- **I5.** Navegacao (read-only) eh publica, sem necessidade de login.

## Casos de borda explicitos pra QA

1. Ator sem nenhuma conexao — deve aparecer no mapa, mas isolado.
2. Upload de arquivo >50MB — deve ser rejeitado com mensagem clara.
3. Usuario tenta upload sem aceitar termo LGPD — bloqueado ate aceitar.
4. Dois atores com mesmo nome em lados diferentes — devem ser
   distinguiveis (lado + instituicao).
5. Ator pertence a multiplos setores — permitido (campo eh lista).
