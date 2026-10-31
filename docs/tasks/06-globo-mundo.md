# Tarefa 06 — Globo 3D na página “Mundo” (GeoJSON + dados reais)

> Leia primeiro `AGENTS.md` (§3, §6 “Mundo”, §8, §9, §11 a §13 e §15), `.github/copilot-instructions.md`, `.github/skills/acessibilidade-terra/SKILL.md` e `docs/data/geojson-origem.md`.
> Em caso de conflito, pare e me avise antes de decidir. **Exceções já resolvidas:** itens 4 e 5 da seção 5.

**Antes de executar (dono):** `public/data/countries.geojson` (573 KB, simplificado) e `docs/data/geojson-origem.md` já estão no repositório; as Tarefas 04 e 05 estão concluídas; `.env.local` com a chave existe.

## 1. Objetivo

A página `/` (Mundo) passa a mostrar um globo 3D interativo com os polígonos dos países ligados aos dados reais pelo código alpha-2. Ao passar o mouse, aparece um tooltip curto com bandeira e nome. Ao clicar, o país fica selecionado (destaque visual e câmera voa até ele). Há estados de carregamento, erro e WebGL indisponível. **Sem painel de detalhes e sem busca/filtros nesta tarefa.**

## 2. Referências

- `AGENTS.md` §6 “Mundo”, §8 (GeoJSON) e §9 (React Globe.gl).
- Biblioteca: https://github.com/vasturiano/react-globe.gl e https://globe.gl/ (versão atual 2.38.0). Props confirmadas no README: `polygonsData`, `polygonGeoJsonGeometry`, `polygonCapColor`, `polygonSideColor`, `polygonStrokeColor`, `polygonAltitude`, `polygonLabel` (aceita HTML), `polygonsTransitionDuration`, `onPolygonHover(polygon, prev)`, `onPolygonClick(polygon, event, coords)`, `backgroundColor`, `showAtmosphere`, `atmosphereColor`, `onGlobeReady`. Sem `globeImageUrl`, o globo é uma esfera preta.
- Design: se existir `docs/design/mundo.png`, use-o como referência visual da composição (globo grande como centro). Se não existir, siga o `AGENTS.md` §4 e §6 e não invente elementos.
- Fatos verificados do GeoJSON (detalhes em `docs/data/geojson-origem.md`): 258 feições; propriedades `name`, `ISO3166-1-Alpha-2`, `ISO3166-1-Alpha-3`; 238 com alpha-2 válido e 20 com `-99` (Kosovo, Somaliland e áreas disputadas); Taiwan vem como `CN-TW`; 12 códigos ISO sem polígono (BQ, BV, CC, CX, GF, GP, MQ, RE, SJ, TK, TW, YT); os territórios ultramarinos franceses fazem parte do polígono da França.

## 3. Escopo

**Alterar:**
- `app/(pages)/page.tsx`: conteúdo provisório atual vira a página do globo (Server Component).
- `components/GlobeScene.tsx` (hoje vazio): Client Component do globo.
- `package.json` e lockfile: instalar **somente** `react-globe.gl`. Relate a versão e quais dependências vieram junto.
- `components/icons.tsx`: só se faltar algum ícone.

**Criar:**
- `lib/globe-data.ts`: funções puras para validar o GeoJSON e ligar cada feição ao país (sem React).
- `components/GlobeFallback.tsx`: estados de erro, carregamento e WebGL indisponível.

**Não tocar:** Header, Footer, `app/(pages)/layout.tsx`, `/paises`, `lib/countries.ts`, `lib/country-view.ts` (apenas importar; se faltar um campo, pare e avise), `public/data/countries.geojson` (somente leitura), `next.config.ts` (só com necessidade documentada), `app/globals.css` (use os tokens; se faltar um, liste no plano).

## 4. Requisitos

**Arquitetura**
- `page.tsx` é Server Component com `<Suspense>` (mesmo padrão da Tarefa 05): chama `getCountries()`, converte com `lib/country-view.ts` e entrega os dados ao `GlobeScene`. Em erro de dados, mostra a mensagem de erro amigável e um link para `/paises`.
- `GlobeScene` é Client Component (`'use client'`) e carrega `react-globe.gl` com `next/dynamic` e `ssr: false` **dentro** dele, conforme a documentação do Next instalada. Confirme esse padrão na doc local e relate.
- O GeoJSON é buscado no cliente **uma vez** em `/data/countries.geojson` (arquivo estático; não é a API REST Countries). Valide `type === 'FeatureCollection'` e ignore feições sem geometria `Polygon`/`MultiPolygon`.

**Ligação entre geometria e dados**
- Chave: `properties['ISO3166-1-Alpha-2']` em maiúsculas igual a `country.code`. **Nunca por nome** (AGENTS §8).
- Único alias manual permitido: `CN-TW` para `TW`, e somente se `TW` existir nos dados reais da API. Confirme e relate. Se a API tiver Kosovo (código de usuário, como `XK`), apenas relate; não crie mapeamento sem minha aprovação.
- Feição sem correspondência: terreno neutro, sem hover e sem clique, sem erro.
- Log **temporário** de desenvolvimento com (a) feições sem correspondência e (b) países da API sem polígono. Esperado: cerca de 12 países da API sem polígono. Clicar em um território ultramarino francês seleciona a França: é limitação do arquivo, não bug.

**Renderização e interação**
- Esfera sem textura de imagem externa e sem CDN; fundo do globo transparente para mostrar o fundo escuro da página; atmosfera no tom ciano do token primário.
- Cores vindas dos tokens do projeto (leitura dos tokens CSS em tempo de execução ou **uma** constante central documentada); sem hexadecimais espalhados. Estados: padrão, hover, selecionado e sem-dados. Estado não pode depender só de cor.
- Hover: tooltip curto e discreto com bandeira e nome via `polygonLabel`. Como aceita HTML, **escape todo texto e URL que vier dos dados**; não use `dangerouslySetInnerHTML`. Cursor de ponteiro apenas em áreas válidas.
- Clique: seleciona o país; a câmera voa até as coordenadas dele (`pointOfView` com duração; duração 0 se `prefers-reduced-motion`). Fora do canvas, um rótulo provisório e discreto “País selecionado: {nome}” (região `aria-live="polite"`) com botão “Limpar seleção”. Exponha `onSelect(país | null)` para a Tarefa 07 ligar o painel.
- Auto-rotação lenta, que pausa durante hover, arraste e seleção e fica desligada com `prefers-reduced-motion`. Câmera e rotação são da biblioteca; **sem GSAP** nisso.
- Tamanho: contêiner com altura explícita e responsiva (viewport menos Header e Footer, mínimo de cerca de 480 px). Meça com `ResizeObserver` e passe `width`/`height` ao globo (por padrão a biblioteca usa a janela inteira). Sem rolagem horizontal; redimensionar a janela funciona.
- Desempenho: `polygonsData`, acessores e callbacks memoizados; nada de buscar dados em hover, clique ou movimento de câmera (AGENTS §6). Meça FPS e travamentos em máquina real e relate. Navegar de `/` para `/paises` e voltar várias vezes não pode acumular memória nem erros no console.

**Estados**
- Carregando (biblioteca ou GeoJSON): esqueleto circular ou mensagem curta no tema escuro.
- Erro ao buscar ou validar o GeoJSON: mensagem amigável.
- WebGL indisponível (detectar antes de montar): mensagem com link para `/paises`.

**Acessibilidade**
- O canvas não é navegável por teclado. Ofereça texto de apoio visível com link para `/paises` (“Para navegar pela lista com teclado, acesse Países”), foco visível nos controles e contraste adequado. Registre essa limitação no relatório.

**Proibido:**
- Instalar outras bibliotecas (nem `three` direto; se o peer exigir, pare e avise), buscar a REST Countries no cliente, alterar o GeoJSON, usar texturas ou imagens externas, associar por nome, criar `CountryDetails`, busca ou filtros, usar GSAP na câmera, `any`.

## 5. Decisões já tomadas

1. GeoJSON simplificado a 5% (573 KB). Se o contorno parecer grosseiro ou lento, **eu** decido entre 10% (1,07 MB) e 3%; não regenere o arquivo sozinho.
2. Associação por alpha-2, com o alias `CN-TW`.
3. Globo escuro sem textura, com países coloridos, para combinar com o tema e não depender de CDN.
4. A seleção é provisória, sem painel de detalhes: o `CountryDetails` vem na Tarefa 07, e o `AGENTS.md` §6 prevê o clique abrindo o painel. Avise essa diferença na resposta final.
5. Busca e filtros por região na página Mundo ficam para uma tarefa futura.
6. Mesma função `getCountries()` e mesmo modelo de dados da Tarefa 05. A home também preenche o cache: o build pode consumir +3 chamadas por página; relate o número real.
7. Tooltip via `polygonLabel`, com escape.

## 6. Processo

**Fase 1:** só o plano: versão instalada do `react-globe.gl` e se funciona com React 19.3 e Next 16.4 na prática, como será o `dynamic` com `ssr: false`, tokens usados, como medir desempenho e riscos. Esperar meu “ok”.
**Fase 2:** passos pequenos: (1) instalar a biblioteca e mostrar um globo vazio com tamanho responsivo, (2) carregar o GeoJSON e desenhar polígonos neutros, (3) ligar aos dados por alpha-2 e registrar exceções, (4) hover e tooltip, (5) clique, seleção e câmera, (6) rotação e `prefers-reduced-motion`, (7) estados de carregamento, erro e WebGL, (8) acessibilidade e teste de desempenho.

## 7. Critérios de aceite

- [ ] `/` mostra o globo com países coloridos e áreas sem dados neutras.
- [ ] Hover em um país mostra bandeira e nome; em área sem correspondência, nada acontece.
- [ ] Clique seleciona um país, destaca-o e leva a câmera até ele; “Limpar seleção” funciona.
- [ ] A ligação é por alpha-2; o log lista as exceções e eu as revisei.
- [ ] Redimensionar a janela e abrir em viewport pequena não gera rolagem horizontal.
- [ ] Sem WebGL, aparece a mensagem alternativa com link para `/paises`.
- [ ] `prefers-reduced-motion` desliga rotação automática e voo animado.
- [ ] Nenhuma requisição à REST Countries parte do navegador.
- [ ] Sem erros no console; navegar entre `/` e `/paises` repetidas vezes não degrada o desempenho.

## 8. Validação

`npm run lint` · `npx tsc --noEmit` · `npm run build` (executar de verdade e colar a saída; o build exige `.env.local` com a chave real). Relate quantas chamadas à API o build consumiu e o que foi **observado** no navegador. Não declare como testado o que não foi executado.

## 9. Formato da resposta final

Arquivos alterados · versão do `react-globe.gl` e dependências instaladas · decisões extras · comandos e resultados reais · lista do log de exceções (feições sem país e países sem polígono) · tamanho aproximado do JavaScript da rota `/` · FPS observado · diferenças em relação ao `AGENTS.md` · pendências · como testar manualmente.
