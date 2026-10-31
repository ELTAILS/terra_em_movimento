# Tarefa 05 — Página “Países” (grade, busca, filtros, ordenação e “carregar mais”)

> Leia primeiro `AGENTS.md` (§3, §4, §6 “Países”, §7, §10 a §12 e §15), `.github/copilot-instructions.md` e `.github/skills/acessibilidade-terra/SKILL.md`.
> Em caso de conflito, pare e me avise antes de decidir. **Exceções já resolvidas:** itens 1 e 3 da seção 5.

## 1. Objetivo

Substituir o bloco temporário de `app/(pages)/paises/page.tsx` por uma página que reproduz `docs/design/paises.png` com os **dados reais** de `getCountries()`: cabeçalho da página, barra com busca, filtros por região e ordenação, grade de cards, rodapé de resultados com “Carregar mais países” e estado “selecionado”. Busca, filtro, ordenação e “carregar mais” trabalham **só sobre os dados já carregados**: nenhuma requisição nova à API.

## 2. Referências

- Página completa: `docs/design/paises.png` (o dono salva o arquivo nesse caminho; confira no repositório). Header e Footer já existem e **não fazem parte** desta tarefa, mesmo que o protótipo mostre variações deles.
- Descrição em texto do protótipo, de cima para baixo:
  1. **Cabeçalho da página:** etiqueta pequena em ciano com ícone de globo, título “Explore os países do mundo”, subtítulo e, à direita, um cartão de estatística (rótulo pequeno em caixa alta, número grande em ciano e um ícone em caixa quadrada).
  2. **Barra de ferramentas** em uma faixa de superfície elevada: campo de busca com ícone de lupa à esquerda; chips “Todos os países” (selecionado: preenchido em ciano, com um ponto), “América”, “Europa”, “África”, “Ásia”, “Oceania”; e, à direita, um seletor “Ordenar: Ordem alfabética (A-Z)” com seta.
  3. **Grade de cards** (3 colunas no desktop). Cada card: bandeira em caixa arredondada, nome do país com destaque, rótulo de sub-região em caixa alta pequena; no canto superior direito um código (`JPN / 392`); um painel interno mais escuro com quatro pares rótulo/valor (CAPITAL e MOEDA à esquerda; POPULAÇÃO e FUSO à direita, estes com valor alinhado à direita, o fuso em ciano); rodapé com `COORD: 35.67° N, 139.65° E` em fonte monoespaçada e o link-botão “Explorar país →” em ciano. O card **selecionado** tem borda ciano, brilho discreto, um selo “SELECIONADO” no canto e um ícone de verificação ao lado do nome.
  4. **Rodapé de resultados:** à esquerda um ponto turquesa e “Exibindo 6 de 195 países reconhecidos”; à direita o botão “Carregar mais países” com ícone de atualizar.
- **Conteúdo do protótipo que NÃO é dado real e não pode ser copiado:** “CENSO 2024”, “195 / 195”, “195 países reconhecidos”, “SOBERANIAS MONITORADAS”, a palavra “curiosidades”, o Brasil já vir selecionado, o rótulo “FUSO BASE” e capitais em português (“Tóquio”). Os dados reais vêm da REST Countries (cerca de 250 registros, incluindo territórios).

## 3. Escopo

**Alterar:**
- `app/(pages)/paises/page.tsx`: página nova (Server Component).
- `components/CountryCard.tsx` (hoje vazio).
- `components/icons.tsx`: acrescentar **somente** os ícones que faltarem (busca, seta, verificação, atualizar, seta do seletor), na mesma família visual dos existentes.
- `types/country.ts` e `lib/countries.ts`: **somente** acrescentar dois campos documentados: `codes.ccn3` (como `numericCode`) e `timezones`. Isso muda o conjunto de campos pedidos e faz o cache preencher uma vez de novo (3 chamadas): avise na resposta final.
- `lib/countries.mock.ts`: só o necessário para continuar válido com os dois campos novos.
- `next.config.ts`: **somente** se `next/image` exigir `images.remotePatterns`, e então apenas com o hostname exato das bandeiras observado nos dados reais.

**Criar:**
- `components/CountriesExplorer.tsx` (Client Component): estado de busca, região, ordenação, quantidade visível e país selecionado.
- `lib/country-view.ts`: função pura que transforma `Country` em `CountryCardView` (textos já prontos e localizados).
- `components/CountriesSkeleton.tsx`: estado de carregamento.

**Não tocar:** `components/Header.tsx`, `components/Footer.tsx`, `app/(pages)/layout.tsx`, outras páginas, `package.json`, lockfile, `public/data/countries.geojson`, `AGENTS.md`. Em `app/globals.css` não altere nada: use os tokens existentes; se faltar um token, liste no plano e espere meu “ok”.

## 4. Requisitos

**Arquitetura**
- `page.tsx` é Server Component: mostra o cabeçalho da página e, dentro de `<Suspense>` com `CountriesSkeleton` como fallback, um componente assíncrono de servidor que chama `getCountries()`. Em erro, mostra um estado de erro com `result.error.message` (sem detalhes técnicos). Em sucesso, converte com `lib/country-view.ts` e passa `CountryCardView[]` ao `CountriesExplorer`. Confirme na documentação local do Next (com `cacheComponents` ligado) se esse é o padrão correto e relate.
- Não usar `searchParams`, `cookies()` nem `headers()` na página (tornam a rota dinâmica e quebram a estratégia de cache). O estado da busca e dos filtros fica em `useState`.
- **Localização no servidor**, em `lib/country-view.ts`, para evitar divergência de hidratação: nome do país e da moeda com `Intl.DisplayNames('pt-BR')` (por exemplo `JP` vira “Japão”, `JPY` vira “Iene japonês”), com fallback para o nome entregue pela API; população com `Intl.NumberFormat('pt-BR')`.
- Cada `CountryCardView` já traz, pré-calculado, um texto de busca normalizado (minúsculas e sem acentos) com: nome em português, nome comum, nome oficial, capitais, região e sub-região (em português e no original) e códigos alpha-2/alpha-3.
- O componente cliente só filtra, ordena e fatia a lista (renderizar apenas os cards visíveis).

**Cabeçalho da página**
- Etiqueta: `CARTOGRAFIA GLOBAL • DADOS REST COUNTRIES`. Título: “Explore os países do mundo”. Subtítulo: “Descubra informações e características de cada país do planeta.”
- Cartão de estatística: rótulo `PAÍSES ENCONTRADOS`, valor `{filtrados} / {total}` com números reais, atualizado conforme busca e filtros.

**Barra de ferramentas**
- Busca: `<input>` com rótulo acessível (pode ser visualmente oculto), placeholder “Buscar por nome do país, capital ou continente...”, sem debounce (é local).
- Chips: Todos os países, América, Europa, África, Ásia, Oceania, como botões com `aria-pressed`. Mapear `region` da API aos chips (“Americas” = América). **Confirme os valores reais** com um log temporário dos valores distintos de `region` e `subregion` calculado sobre os dados já em cache (sem nova requisição) e relate a lista. Registros fora dos cinco grupos (por exemplo Antártida) aparecem apenas em “Todos os países”.
- Ordenação (seletor com rótulo): A–Z (padrão), Z–A, maior população, menor população. Nomes ordenados em pt-BR pelo nome **exibido**; população ausente vai para o fim.
- Em telas pequenas, a busca ocupa a largura toda e os chips rolam horizontalmente dentro do próprio contêiner, sem criar rolagem horizontal na página.

**Card (`CountryCard`)**
- Bandeira: `flag.url_svg` (ou png), `alt` com `flag.description` quando existir, senão “Bandeira de {nome}”; carregamento preguiçoso e dimensões fixas; fallback visível (emoji ou placeholder) quando faltar imagem.
- Rótulo de sub-região em caixa alta pequena (traduzido com um dicionário baseado nos valores reais; fallback para o original).
- Código no canto: `{alpha3} / {numérico}`; se faltar o numérico, só o alpha-3.
- CAPITAL: como a API entrega (várias separadas por vírgula; **não traduzir nem criar lista manual**).
- POPULAÇÃO: formatada em pt-BR.
- MOEDA: `Nome (CÓDIGO)` da primeira moeda; se houver mais, acrescentar `+N`.
- FUSO: se houver exatamente um, mostrá-lo como a API entrega; se houver vários, `N fusos`. O rótulo é “FUSO”, não “FUSO BASE”.
- Rodapé: `COORD: 15.79° S, 47.88° W` (duas casas decimais, ponto decimal, hemisfério N/S/E/W) com as coordenadas da API; ausente vira `COORD: —`. O botão “Explorar país →” tem nome acessível único por card (por exemplo “Explorar país: Japão”).
- Campo ausente mostra “Não informado”; nunca `undefined`, texto vazio ou valor inventado.
- Selecionado: borda ciano, brilho discreto, selo “SELECIONADO” e ícone de verificação ao lado do nome. Nenhum país vem selecionado por padrão.

**Rodapé de resultados e “carregar mais”**
- Texto “Exibindo {visíveis} de {filtrados} países”, em região `aria-live="polite"`. Botão “Carregar mais países”.
- Começam 12 cards; cada clique acrescenta 12; o botão some quando todos estão visíveis. Mudar busca, filtro ou ordenação volta para 12.

**Estados**
- Carregando: esqueleto com cards placeholders (sem animação contínua se `prefers-reduced-motion`).
- Vazio (busca/filtro sem resultado): “Nenhum país encontrado” e botão “Limpar filtros”.
- Erro de dados: mensagem do `result.error.message` e orientação curta para atualizar a página depois.

**Estilo, responsividade e acessibilidade**
- Somente Tailwind com os tokens de `app/globals.css`; sem hexadecimais nos componentes. Grade de 1, 2 e 3 colunas conforme a largura; cantos de 12 a 16 px, bordas finas, espaçamento consistente.
- Brilho radial ciano sutil no topo da página, como na referência; sem outros gradientes ou brilhos.
- Foco de teclado visível em todos os controles, contraste legível, `prefers-reduced-motion` respeitado, rótulos em todos os campos. Siga a skill de acessibilidade do projeto.
- Meça e relate o tamanho aproximado do payload que o servidor envia ao cliente com os 250 países.

**Proibido:**
- Instalar dependências (inclusive pacotes de ícones), criar Route Handler ou endpoint, buscar dados no cliente (`useEffect`/`fetch`), usar GSAP nesta tarefa, criar `CountryDetails` ou rota por país, usar `any`.
- Copiar textos ou números do protótipo listados como “não reais” na seção 2; criar traduções manuais de capitais; alterar `getCountries()` além dos dois campos novos.

## 5. Decisões já tomadas

1. **Seleção em vez de painel.** O `AGENTS.md` §6 diz que o clique no card abre `CountryDetails`. Nesta tarefa o botão “Explorar país” só **seleciona** o card; o painel reutilizável é a Tarefa 06 (precisa de design próprio). Deixe o estado e uma prop de callback prontos, sem criar a interface do painel, e avise esta diferença na resposta final.
2. Nomes de países e moedas em português via `Intl` no servidor; capitais permanecem como a API entrega (pendência conhecida).
3. Textos adaptados ao que é verdade nos dados: etiqueta `CARTOGRAFIA GLOBAL • DADOS REST COUNTRIES`, subtítulo sem “curiosidades”, cartão `PAÍSES ENCONTRADOS`, rodapé “países” sem “reconhecidos”.
4. 12 cards iniciais e passo de 12 (o protótipo mostra 6 apenas como amostra).
5. Estado de busca e filtros apenas local (sem parâmetros na URL).
6. Sem GSAP nesta tarefa; transições de hover/foco com Tailwind e respeitando `prefers-reduced-motion`.
7. O log temporário `REST Countries temporary summary` em `lib/countries.ts` permanece até eu confirmar o total da API; não remover nesta tarefa.

## 6. Processo

**Fase 1:** só o plano: arquivos, como `page.tsx` usará `Suspense` com a doc local do Next, valores distintos de `region`/`subregion` que pretende mapear, hostname real das bandeiras e se `next/image` exige `next.config.ts`, tokens que faltarem e riscos. Esperar meu “ok”.
**Fase 2:** implementar em passos pequenos: (1) campos novos e mock, (2) `country-view.ts`, (3) `CountryCard` estático, (4) `CountriesExplorer` com busca, filtro e ordenação, (5) “carregar mais” e seleção, (6) estados vazio, erro e carregando, (7) responsivo e acessibilidade.

## 7. Critérios de aceite

- [ ] `/paises` mostra os países reais em português, com os campos do card preenchidos ou “Não informado”.
- [ ] Busca encontra por nome em português e em inglês, capital, região e códigos, sem diferenciar acentos nem maiúsculas.
- [ ] Cada chip filtra corretamente; o cartão `{filtrados} / {total}` e o rodapé acompanham.
- [ ] As quatro ordenações funcionam; “Carregar mais” soma 12 e some ao fim.
- [ ] Clicar em “Explorar país” marca só um card como selecionado.
- [ ] Estados vazio, erro e carregando existem e seguem o tema escuro.
- [ ] Layouts de 3, 2 e 1 coluna sem rolagem horizontal na página; navegação completa por teclado.
- [ ] Nenhuma requisição nova à API ao buscar, filtrar, ordenar ou carregar mais.
- [ ] Nenhum dado falso do protótipo aparece na tela.

## 8. Validação

`npm run lint` · `npx tsc --noEmit` · `npm run build` (executar de verdade e colar a saída). O build agora **falha de propósito sem chave**: é preciso `.env.local` com a chave real. Relate quantas chamadas à API o novo conjunto de campos consumiu (esperado: +3 uma vez) e o que foi **observado** no navegador. Não declare como testado o que não foi executado.

## 9. Formato da resposta final

Arquivos alterados · decisões extras · comandos e resultados reais · valores distintos de `region`/`subregion` encontrados · hostname das bandeiras · tamanho aproximado do payload · diferenças em relação ao `AGENTS.md` · pendências · como testar manualmente.
