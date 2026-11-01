# Tarefa 07 — Painel de detalhes do país (`CountryDetails`)

> Leia `AGENTS.md` (§4, §6, §12) e `.github/skills/acessibilidade-terra/SKILL.md`. Em conflito, pare e avise.
> **Economia de tokens:** faça um plano de no máximo 10 linhas e implemente em seguida, sem esperar aprovação, salvo se houver conflito. Não tente abrir o navegador (você não enxerga o globo) e **não rode `npm run build`** (gasta cota da API). Resposta final em até 15 linhas.

## 1. Objetivo

Criar o painel reutilizável `components/CountryDetails.tsx` (hoje vazio), com a **mesma aparência do card de `/paises`**, e ligá-lo aos dois lugares onde existe seleção: o botão “Explorar país” da página Países e o clique no globo. Nenhuma requisição nova: os dados já estão carregados.

## 2. Referência visual

O próprio `components/CountryCard.tsx`: mesmas classes e tokens (`bg-surface`, `rounded-2xl`, `border-border`, caixa interna `bg-surface-elevated`, rótulos `text-[10px] uppercase tracking-[0.14em] text-muted`, código em `font-mono`, destaque em `text-primary`). Não refatore o `CountryCard`; só copie o estilo. Para brilho/sombra use `color-mix(in srgb, var(--primary) 14%, transparent)` (como em `app/(pages)/page.tsx`), sem `rgba` solto.

Layout (de cima para baixo):
```
[bandeira 96×64 em caixa arredondada]                 [botão fechar X]
BRA / 076  (mono, muted)
AMÉRICA DO SUL  (sub-região, caixa alta pequena)
Brasil  (h2, grande)
República Federativa do Brasil  (nome oficial, muted, pequeno)
┌ caixa interna (surface-elevated, 2 colunas) ───────────────┐
│ CAPITAIS            POPULAÇÃO (direita)                    │
│ REGIÃO              SUB-REGIÃO (direita)                   │
└────────────────────────────────────────────────────────────┘
IDIOMAS      → chips (nome em português; nome nativo em muted, se houver)
MOEDAS       → uma por linha: “Real brasileiro (BRL)”
FUSOS HORÁRIOS → chips; se forem muitos, lista com altura máxima e rolagem interna
COORD: 10.00° S, 55.00° W  (mono, muted)
```
Campo ausente ou lista vazia mostra “Não informado”.

## 3. Escopo

**Alterar:**
- `lib/country-view.ts`: acrescentar ao `CountryCardView` (sem remover nada) `capitals: string[]`, `languages: { name: string; nativeName: string | null }[]`, `currencies: string[]` (cada uma “Nome (CÓDIGO)”, reaproveitando a lógica de moeda que já existe) e `timezones: string[]`. Os dados brutos já estão em `Country`. Para idiomas use `Intl.DisplayNames('pt-BR', { type: 'language' })` com o código `iso639_1`/`iso639_3` e fallback para `name`; **proteja com `try/catch`** (`of()` pode lançar `RangeError`).
- `components/CountryDetails.tsx` (hoje vazio): componente apresentacional.
- `components/CountriesExplorer.tsx`: renderizar o painel para o país de `selectedId`; fechar = `setSelectedId(null)`.
- `components/GlobeScene.tsx`: renderizar o painel para `selectedCountry`; fechar = a função `clearSelection` que já existe.

**Não tocar:** `lib/countries.ts`, `types/`, Header, Footer, `CountryCard.tsx`, `globals.css`, `package.json`, `next.config.ts`, GeoJSON.

## 4. Requisitos

**Componente:** props `country: CountryCardView`, `onClose: () => void`, `className?: string`. É um `<aside>` **não modal** com `aria-labelledby` apontando para o título; botão fechar com `aria-label="Fechar detalhes de {nome}"` (alvo mínimo de 44 px, foco visível).

**Foco e teclado:** ao abrir, mover o foco para o título (`tabIndex={-1}`); ao fechar, devolver o foco ao elemento que abriu, se ainda existir; **Esc fecha**; ao trocar de país com o painel aberto, não roubar o foco, e anunciar a mudança em uma região `aria-live="polite"`.

**Posicionamento (decidido pelo host, via `className`):**
- Países: painel fixo à direita (`fixed`, abaixo do header, largura até ~26rem) no desktop; em telas pequenas, folha inferior (`inset-x-3 bottom-3`, `max-h-[80dvh]`, rolagem interna). Sem fundo escurecido; os cards continuam clicáveis.
- Mundo: dentro do contêiner do globo (`absolute`), à direita no desktop (largura até ~24rem) e folha inferior no mobile; o globo continua visível e interativo (só o painel recebe `pointer-events`).
- Entrada com transição CSS curta (`motion-safe:`), sem GSAP nesta tarefa.

**No globo:** remover a linha visível “País selecionado: …” e o botão “Limpar seleção” (o X do painel faz esse papel), **mantendo** o anúncio `aria-live` (visualmente oculto). Esc também limpa a seleção.

**Países:** o painel não fecha ao filtrar ou buscar; mostra o país selecionado mesmo que o filtro o esconda.

**Proibido:** instalar dependências, nova rota por país, buscar dados no cliente, `dangerouslySetInnerHTML`, hexadecimais ou `rgba` soltos nos componentes novos, `any`.

## 5. Decisões já tomadas

1. Painel **não modal**: o globo e a grade continuam utilizáveis com o painel aberto.
2. Um único componente para os dois usos; cada host só decide a posição.
3. Seleção do globo e da página Países continuam independentes.
4. Sem GSAP agora; pode entrar depois como polimento.

## 6. Critérios de aceite

- [ ] “Explorar país” abre o painel com o país certo; o X, o Esc e “Explorar” em outro card funcionam.
- [ ] Clicar em um país no globo abre o painel; fechar limpa a seleção do globo.
- [ ] Idiomas, moedas e fusos aparecem completos (ex.: França com todos os fusos, rolagem interna).
- [ ] Países sem dado mostram “Não informado”; nenhum texto `undefined`.
- [ ] Sem rolagem horizontal; no mobile é folha inferior com rolagem interna.
- [ ] Nenhuma requisição nova; tamanho do payload dos views relatado (diferença em KB).

## 7. Validação

Execute **apenas** `npm run lint` e `npx tsc --noEmit` e cole a saída real. Liste os testes manuais que o dono deve fazer no navegador (abrir/fechar, Esc, foco, troca de país, país com muitos fusos, mobile). Não declare como testado o que não foi executado.

## 8. Resposta final (até 15 linhas)

Arquivos alterados · decisões extras · saída do lint e do tsc · diferença no tamanho dos dados · pendências.
