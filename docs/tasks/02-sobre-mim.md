# Tarefa 02 — Página Sobre mim

> Leia primeiro `AGENTS.md` (§4, §6 "Sobre mim", §11 e §12) e `.github/copilot-instructions.md`.
> Em caso de conflito entre este briefing e o `AGENTS.md`, **pare e me avise** antes de decidir.

## 1. Objetivo
Substituir o conteúdo provisório de `app/(pages)/sobre/page.tsx` por uma página "Sobre mim" fiel ao protótipo, usando somente os tokens de cor de `app/globals.css`. Header e Footer já existem e não fazem parte desta tarefa.

## 2. Referências
- Imagem: `docs/design/sobre-mim.png`.
- Texto (use se não conseguir ler a imagem): `docs/helpers/sobre-mim-design.md`. Ele é a **única fonte do conteúdo** da página.

## 3. Escopo
**Alterar:** `app/(pages)/sobre/page.tsx`. Remover o HTML de teste, manter o `metadata` e usar **exatamente um `<h1>`**.

**Criar (justificar cada arquivo no plano):**
- Um componente em `components/` para qualquer bloco que se repita (por exemplo, o card). Server Component, sem `'use client'`. Antes de criar, verifique se já existe um componente reutilizável.
- Ícones: reutilize `components/icons.tsx` se existir. Se faltar algum, adicione lá como SVG inline.

**Não tocar:** `Header`, `Footer`, os layouts, `package.json`, `next.config.ts`, as outras páginas, `error.tsx`, `not-found.tsx` e `app/429`.

**Mover:** nada. Se for realmente necessário, avise no chat e explique o motivo.

## 4. Requisitos

**Conteúdo**
- Use só o texto de `docs/helpers/sobre-mim-design.md`. Onde faltar informação, escreva um placeholder visível (`[preencher]`).
- Não invente experiência, certificações, datas, links ou URLs (AGENTS.md §6).

**Estilo**
- Só Tailwind com os tokens existentes (`bg-background`, `bg-surface`, `bg-surface-elevated`, `bg-tertiary`, `text-foreground`, `text-muted`, `text-primary`, `border-border`, `ring-ring`…). Nenhum hexadecimal.
- Cantos de 12 a 16 px nos cards, bordas finas, sombras fracas.
- Reuso de estilo: primeiro extraia um **componente**. Só crie uma classe global em `globals.css` (consulte a doc do Tailwind v4 instalada para a sintaxe correta) se o mesmo conjunto de classes aparecer em 3 ou mais lugares e não couber em componente. Isso é uma **exceção autorizada** ao AGENTS.md §11, e você deve listá-la no relatório final.

**Movimento (CSS puro, sem GSAP e sem dependência nova)**
- Círculo com o ícone de terminal ("cmd") do protótipo: rotação lenta (20 s por volta, linear) **somente enquanto o card estiver em hover ou foco**.
- Card em hover ou foco: `scale-[1.03]` e sombra ciana suave pelo token (`shadow-lg shadow-primary/20`), com `transition-[transform,box-shadow] duration-300`.
- Todo movimento usa `motion-safe:`. Com `prefers-reduced-motion: reduce`, nada gira nem escala (a sombra pode continuar). Adicione `motion-reduce:transition-none`.
- O efeito de hover também vale para foco de teclado (`focus-within` / `focus-visible`).

**Acessibilidade (meta: WCAG 2.2 AA completo + contraste de texto AAA)**
- Texto normal: contraste mínimo de 7:1. Texto grande (≥ 24 px, ou ≥ 18,66 px em negrito): 4,5:1.
- Pares de token aprovados para texto, medidos com a fórmula WCAG:

| Texto | Pode usar sobre | Contraste |
|---|---|---|
| `text-foreground` | todos os fundos | 14,9 a 18,0 |
| `text-primary` | todos os fundos | 7,6 a 9,2 |
| `text-secondary` | todos os fundos | 8,8 a 10,6 |
| `text-muted` | só `background` (7,7) e `surface` (7,1) | em `surface-elevated` e `tertiary` cai para 6,4–6,5 |
| `text-muted-foreground` | **nunca para texto** | 3,4 a 4,1 |

- Um único `<h1>`, hierarquia de títulos sem pular nível, ícones decorativos com `aria-hidden`, links com nome acessível.
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`. Foco visível (`focus-visible`) em tudo que for interativo. Alvos de toque com pelo menos 24×24 px.
- A página precisa funcionar com zoom de 200% e sem scroll horizontal em 375 px.

**Responsivo (desktop-first)**
- Conforme o protótipo a partir de `lg`. Se houver 3 ou mais cards: 1 coluna abaixo de `md`, 2 em `md`, 3 em `lg`.
- Nenhum scroll horizontal da página em 375 px, inclusive com o card ampliado em hover.

**Proibido:** instalar dependências, `'use client'` sem necessidade, hexadecimais, `text-muted-foreground` em texto, alterar arquivos fora do escopo, inventar conteúdo.

## 5. Decisões já tomadas
1. As animações são só CSS/Tailwind, sem GSAP.
2. O giro do círculo acontece só em hover/foco. Um giro contínuo violaria a regra WCAG 2.2.2 (nível A) sem um botão de pausa.
3. Pode haver uma classe global reutilizável em `globals.css`, nas condições da seção 4.

## 6. Processo
Escreva o plano curto no início da resposta (arquivos, riscos) e IMPLEMENTE em seguida, na mesma execução. Pare e me pergunte SOMENTE se:
- encontrar conflito entre este briefing e o `AGENTS.md` (além da exceção da seção 4);
- precisar instalar dependência ou alterar arquivo fora do escopo;
- uma decisão mudar a arquitetura e não estiver na seção 5.

## 7. Critérios de aceite
- [ ] `/sobre` mostra header, footer e o conteúdo do arquivo de texto, sem nada inventado.
- [ ] Exatamente um `<h1>` na página.
- [ ] Nenhum hexadecimal e nenhuma dependência nova no `package.json`.
- [ ] Nenhum `text-muted-foreground` em texto. `text-muted` só sobre `background` ou `surface`.
- [ ] Sem scroll horizontal em 375, 768 e 1280 px.
- [ ] Com "Emulate CSS prefers-reduced-motion: reduce" no DevTools, nada gira nem escala.
- [ ] Tab percorre a página em ordem lógica, com foco visível, e o efeito de hover aparece também no foco.

## 8. Validação (execute de verdade e cole a saída)
```bash
npm run lint
npx tsc --noEmit
npm run build
```
Se algum comando falhar por causa do ambiente (por exemplo, rede para baixar fontes), diga isso e não declare sucesso.

## 9. Formato da resposta final
Arquivos criados/alterados/movidos · decisões que tomou além deste briefing · comandos executados com o resultado real · pares de cor usados no texto · pendências (ex.: placeholders `[preencher]`) · como eu testo manualmente (rotas e viewports).