# Tarefa 03 — Página Sobre o projeto

> Leia primeiro `AGENTS.md` (§3, §6 "Sobre o projeto", §10, §11 e §12) e `.github/copilot-instructions.md`.
> Em caso de conflito entre este briefing e o `AGENTS.md`, **pare e me avise** antes de decidir.

## 1. Objetivo
Substituir o conteúdo provisório de `app/(pages)/projeto/page.tsx` por uma página "Sobre o projeto" fiel ao protótipo, usando somente os tokens de cor de `app/globals.css`, com um carrossel automático das tecnologias do projeto feito com GSAP. Header e Footer já existem e não fazem parte desta tarefa.

## 2. Referências
- Página: `docs/design/sobre-projeto.png`.
- Carrossel: `docs/design/carrossel-tecnologias.png`. É uma faixa horizontal com um rótulo em fonte monoespaçada à esquerda e itens separados por linhas verticais finas que passam da direita para a esquerda em loop. **Só o comportamento e o layout valem; não copie as marcas da imagem.**
- Texto (use se não conseguir ler a imagem): `docs/helpers/sobre-projeto-design.md`. Ele é a **única fonte do conteúdo** da página, inclusive da lista de tecnologias.

## 3. Escopo
**Alterar:** `app/(pages)/projeto/page.tsx`. Remover o HTML de teste, manter o `metadata` e usar **exatamente um `<h1>`**. A página continua Server Component.

**Criar (justificar cada arquivo no plano):**
- `components/TechCarousel.tsx`: **Client Component** (`'use client'` é necessário aqui, por causa do GSAP). Só o carrossel é client.
- Um componente em `components/` para qualquer bloco que se repita (por exemplo, o card). Server Component. Antes de criar, verifique se já existe um reutilizável.
- Ícones: reutilize `components/icons.tsx`. Se faltar algum, adicione lá como SVG inline.

**Dependências autorizadas (única exceção):** `gsap` e `@gsap/react`, nas versões estáveis mais recentes. Se já estiverem no `package.json`, não reinstale. Informe as versões no relatório. Nada além disso.

**Não tocar:** `Header`, `Footer`, os layouts, `next.config.ts`, as outras páginas, `error.tsx`, `not-found.tsx` e `app/429`.

**Mover:** nada. Se for realmente necessário, avise no chat e explique o motivo.

## 4. Requisitos

**Conteúdo (AGENTS.md §6, "Sobre o projeto")**
- Use só o texto de `docs/helpers/sobre-projeto-design.md`. Onde faltar informação, escreva um placeholder visível (`[preencher]`).
- A página é editorial: objetivo, arquitetura e tecnologias reais. Inclua o diagrama simples *fonte de dados → associação geográfica → interface* e a explicação de que o GeoJSON é a geometria, a REST Countries traz os dados, o React Globe.gl desenha o globo e o GSAP anima a interface. Explique também que o Copilot apoia o processo de desenvolvimento e não é uma função de IA do site.
- Não afirme que um recurso está finalizado se ainda não foi implementado. Não invente datas, links ou URLs.

**Estilo**
- Só Tailwind com os tokens existentes (`bg-background`, `bg-surface`, `bg-surface-elevated`, `bg-tertiary`, `text-foreground`, `text-muted`, `text-primary`, `border-border`, `ring-ring`…). Nenhum hexadecimal.
- Cantos de 12 a 16 px nos cards, bordas finas, sombras fracas.
- Reuso de estilo: primeiro extraia um **componente**. Só crie uma classe global em `globals.css` (consulte a doc do Tailwind v4 instalada para a sintaxe correta) se o mesmo conjunto de classes aparecer em 3 ou mais lugares e não couber em componente. Isso é uma **exceção autorizada** ao AGENTS.md §11, e você deve listá-la no relatório final.

**Movimento dos cards (CSS puro)**
- Círculo com o globo do protótipo: use um **ícone SVG** com rotação lenta (20 s por volta, linear) **somente enquanto o card estiver em hover ou foco**. **Não use o `react-globe.gl` nem WebGL** nesta página.
- Card em hover ou foco: `scale-[1.03]` e sombra ciana suave pelo token (`shadow-lg shadow-primary/20`), com `transition-[transform,box-shadow] duration-300`.
- Todo movimento usa `motion-safe:`. Com `prefers-reduced-motion: reduce`, nada gira nem escala (a sombra pode continuar). Adicione `motion-reduce:transition-none`.
- O efeito de hover também vale para foco de teclado (`focus-within` / `focus-visible`).

**Carrossel de tecnologias (GSAP)**
- Substitui os cards de tecnologia. Mostra, em faixa horizontal, as tecnologias listadas no arquivo de texto.
- **Movimento:** da direita para a esquerda, loop contínuo e sem saltos, velocidade lenta a média (cerca de 50 px/s, `ease: "none"`, `repeat: -1`). Calcule a duração a partir da largura da faixa, para a velocidade não mudar com o número de itens.
- **Loop sem emenda:** a faixa tem dois grupos idênticos lado a lado. Anime a faixa até -50% da largura. Cada grupo precisa ser **mais largo que o contêiner** (repita os itens se necessário) para não aparecer vazio em 1920 px.
- **Itens (v1):** nome da tecnologia em texto, em células separadas por `border-l border-border`. Sem logotipos nesta versão, e sem links.
- **Bordas:** esmaecer nas pontas com máscara em CSS (sem hexadecimal).
- **React:** use `useGSAP()` de `@gsap/react`, com `scope`, seguindo https://gsap.com/resources/React/. Sem tweens duplicados e sem limpeza manual desnecessária.
- **Acessibilidade (WCAG 2.2.2, nível A, para movimento automático acima de 5 s):**
  - Botão visível "Pausar animação" / "Retomar animação", acessível por teclado, com foco visível e com pelo menos 24×24 px.
  - Pausar também ao passar o mouse e ao focar dentro do carrossel.
  - A faixa em movimento é decorativa (`aria-hidden="true"` e `inert`). Uma lista `<ul>` com as tecnologias, visível apenas para leitores de tela (`sr-only`), mantém a informação acessível. O botão fica fora do `aria-hidden`.
  - Com `prefers-reduced-motion: reduce` (use `gsap.matchMedia()`), **não anima**: mostra as tecnologias paradas, quebrando linha, sem as cópias.
- Altura fixa, para não causar mudança de layout.

**Acessibilidade geral (meta: WCAG 2.2 AA completo + contraste de texto AAA)**
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
- A página precisa funcionar com zoom de 200% e sem scroll horizontal em 375 px (o carrossel rola dentro do próprio contêiner, não a página).

**Responsivo (desktop-first)**
- Conforme o protótipo a partir de `lg`. Se houver 3 ou mais cards: 1 coluna abaixo de `md`, 2 em `md`, 3 em `lg`.
- Nenhum scroll horizontal da página em 375 px, inclusive com o card ampliado em hover.

**Proibido:** instalar qualquer dependência além de `gsap` e `@gsap/react`, `'use client'` fora do `TechCarousel`, usar `react-globe.gl` nesta página, hexadecimais, `text-muted-foreground` em texto, alterar arquivos fora do escopo, inventar conteúdo.

## 5. Decisões já tomadas
1. Os cards usam só CSS/Tailwind. O GSAP é usado apenas no carrossel de tecnologias.
2. O giro do círculo acontece só em hover/foco. Um giro contínuo violaria a regra WCAG 2.2.2 (nível A) sem um botão de pausa.
3. O carrossel tem botão de pausa e respeita `prefers-reduced-motion`.
4. Pode haver uma classe global reutilizável em `globals.css`, nas condições da seção 4.

## 6. Processo
Escreva o plano curto no início da resposta (arquivos, riscos) e IMPLEMENTE em seguida, na mesma execução. Pare e me pergunte SOMENTE se:
- encontrar conflito entre este briefing e o `AGENTS.md` (além das exceções da seção 4);
- precisar instalar dependência além de `gsap` e `@gsap/react`, ou alterar arquivo fora do escopo;
- uma decisão mudar a arquitetura e não estiver na seção 5.

## 7. Critérios de aceite
- [ ] `/projeto` mostra header, footer e o conteúdo do arquivo de texto, sem nada inventado, incluindo o diagrama.
- [ ] Exatamente um `<h1>` na página.
- [ ] Nenhum hexadecimal. O `package.json` só ganhou `gsap` e `@gsap/react`.
- [ ] Nenhum `text-muted-foreground` em texto. `text-muted` só sobre `background` ou `surface`.
- [ ] O carrossel anda da direita para a esquerda, sem salto no fim do ciclo e sem espaço vazio em 1920 px.
- [ ] O botão de pausa funciona com mouse e com teclado, e o movimento também para em hover e foco.
- [ ] Com "Emulate CSS prefers-reduced-motion: reduce" no DevTools, nada gira, nada escala e o carrossel fica parado.
- [ ] Um leitor de tela (ou a árvore de acessibilidade do DevTools) lê cada tecnologia uma vez só.
- [ ] Sem scroll horizontal da página em 375, 768 e 1280 px.
- [ ] Tab percorre a página em ordem lógica, com foco visível, e o efeito de hover aparece também no foco.

## 8. peça para EU executar:
```bash
npm run lint
npx tsc --noEmit
npm run build
```
e no final fala os resultados esperados.

No relatório final, liste cada comando com **uma linha de resultado** (por exemplo: "lint: 0 erros, 0 avisos"). Se algum falhar, diga se a falha é nova ou já existia. Se não conseguir executar algum, diga qual eu devo rodar e o que esperar. Nunca declare sucesso sem ter rodado.

## 9. Formato da resposta final
Arquivos criados/alterados/movidos · dependências instaladas e versões · decisões que tomou além deste briefing · comandos executados com o resultado real · pares de cor usados no texto · pendências (ex.: placeholders `[preencher]`) · como eu testo manualmente (rotas e viewports).