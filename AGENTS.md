<!-- BEGIN:nextjs-agent-rules -->
# Next.js: leia a documentação antes de codificar

Antes de qualquer alteração que envolva Next.js, confira a versão instalada no `package.json` e leia a documentação correspondente disponível em `node_modules/next/dist/docs/`, quando essa pasta existir. Consulte a documentação específica para App Router, layouts e páginas, Server/Client Components, carregamento e cache de dados, tratamento de erros e deploy. Não invente APIs do framework nem confie apenas na memória ou em tutoriais de versões antigas.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Terra em Movimento

## 1. Contexto do projeto

**Terra em Movimento** é uma aplicação web de exploração geográfica com tema escuro. A página principal mostra um globo terrestre 3D interativo. O visitante pode passar o mouse sobre um país para ver um resumo e clicar para abrir um painel com os detalhes. A página de países mostra cards gerados a partir da mesma coleção de dados utilizada pelo globo.

O projeto é uma demonstração educacional para um evento presencial. A prioridade é uma experiência visual bem acabada, fácil de entender em poucos segundos, com interação rápida e funcionamento confiável no computador do evento.

O desenvolvimento pode ser acelerado por GitHub Copilot e outras IAs generativas. As ferramentas de IA são utilizadas durante o desenvolvimento; **não existe um chatbot nem um agente de IA como funcionalidade do produto**. O agente de programação deve explicar alterações relevantes, não esconder decisões de arquitetura, e jamais declarar testes aprovados sem executá-los.

## 2. Objetivos funcionais

- Exibir um globo 3D com contornos/áreas geográficas de países.
- Selecionar um país no globo e associá-lo corretamente às informações do país.
- Ao passar o mouse, mostrar uma informação breve e discreta; ao clicar, abrir um painel reutilizável de detalhes.
- Mostrar a coleção de países em uma grade de cards na página Países.
- Permitir pesquisa por nome e filtros por continente/região usando os dados já carregados, sem consultar a API a cada tecla ou filtro.
- Usar o mesmo modelo de dados para o globo, os cards e o painel de detalhes.
- Oferecer páginas estáticas sobre o projeto e sobre a pessoa desenvolvedora.
- Ter estados de carregamento, vazio e falha claros e coerentes com o tema escuro.
- Ser responsivo, acessível, rápido e pronto para publicação na Vercel.

Não adicionar recursos fora do escopo (autenticação, banco de dados, painel administrativo, chatbot, API de terremotos ou outras APIs externas) sem solicitação explícita.

## 3. Tecnologias e responsabilidades

- **Next.js App Router + React + TypeScript:** páginas, layouts, componentes e carregamento dos dados.
- **Tailwind CSS:** ferramenta principal de estilização. Verifique a versão instalada e siga a configuração existente; o projeto inicial usa Tailwind CSS 4. Não misture instruções de configuração da v3 com a v4.
- **React Globe.gl:** componente de visualização do globo 3D, usando Three.js/WebGL. Consulte a documentação e a API da versão instalada antes de configurar polígonos e eventos.
- **GeoJSON local:** geometria dos países usada para desenhar as áreas no globo. Esse arquivo não é uma API.
- **REST Countries v5:** fonte externa escolhida para dados gerais dos países.
- **GSAP + `@gsap/react` (se instalados):** animações complementares da interface, como entrada de painéis, elementos da home e transições. Não use GSAP para substituir os controles de câmera/rotação já fornecidos pela biblioteca do globo.
- **Vercel:** hospedagem e integração de deploy com o GitHub.

Antes de instalar dependências, confira `package.json` e o lockfile. Não reinstale nem atualize pacotes sem necessidade. Não use outra biblioteca de globo ou animação para resolver um problema que a stack atual já resolve.

## 4. Identidade visual obrigatória

O protótipo do Google Stitch enviado pelo usuário é a principal referência visual. Preserve a estética: produto premium, escuro, tecnológico, legível e discreto. Não converter o projeto em um dashboard genérico ou em uma interface clara.

### Paleta

- **Primary / azul-ciano:** `#38BDF8` — ações primárias, foco, links ativos e destaques importantes.
- **Secondary / turquesa:** `#2DD4BF` — estado secundário, indicadores positivos e alguns detalhes.
- **Tertiary / azul-marinho:** `#131E30` — superfícies e áreas de contraste.
- **Neutral / fundo principal:** `#070B14` — fundo global da aplicação.
- **Superfície elevada:** `#1B2029` ou uma tonalidade próxima que preserve contraste com o fundo.
- **Superfície alternativa:** `#0E1625`.
- **Texto principal:** `#F1F5F9`.
- **Texto secundário:** `#94A3B8`.
- **Bordas discretas:** `#263449`.

Use Inter ou a fonte já configurada no projeto. Preserve a fonte existente em `app/layout.tsx`, se já estiver correta. Não adicione várias famílias tipográficas.

### Regras de composição

- Tema escuro em todas as páginas principais.
- Layout desktop-first para demonstração em monitor, com adaptação real para tablet e mobile.
- Cards com cantos de aproximadamente 12–16 px, bordas finas e espaçamento consistente.
- Glows e gradientes em azul/ciano apenas como acentos; evitar excesso de neon, sombras muito fortes e glassmorphism em todos os elementos.
- A página Mundo deve dar destaque visual ao globo, não a gráficos e estatísticas aleatórias.
- Usar ícones consistentes. Não misturar famílias visuais sem justificativa.
- Hover, focus, selected, loading, empty e error states devem seguir o design system.
- Manter contraste de texto legível; não usar cor como único meio para transmitir estado.
- Respeitar `prefers-reduced-motion` e oferecer foco de teclado visível.

Se for necessário criar tokens de cores, centralize-os na configuração/folha global compatível com a versão instalada do Tailwind. Evite espalhar cores quase iguais e valores hexadecimais inconsistentes por dezenas de componentes.

## 5. Arquitetura e rotas desejadas

A estrutura atual do repositório deve ser inspecionada antes de mover ou criar arquivos. O alvo lógico é:

```text
app/
├── (pages)/
│   ├── layout.tsx       # Header + children + Footer
│   ├── page.tsx         # Mundo: /
│   ├── paises/page.tsx  # /paises
│   ├── projeto/page.tsx # /projeto
│   └── sobre/page.tsx   # /sobre
├── 429/page.tsx         # página ilustrativa/acessível em /429
├── error.tsx            # tratamento de erro do segmento
├── not-found.tsx        # interface 404
├── layout.tsx           # layout raiz: html, body, metadata e CSS global
├── globals.css
└── favicon.ico

components/
├── Header.tsx
├── Footer.tsx
├── GlobeScene.tsx
├── CountryCard.tsx
└── CountryDetails.tsx

lib/
└── countries.ts         # acesso e normalização dos dados da API (servidor)

public/
└── data/countries.geojson

types/                   # tipos compartilhados, se forem necessários
```

### Regras de rotas/layout

- `(pages)` é um **Route Group**: o nome entre parênteses não aparece na URL.
- Não manter ao mesmo tempo `app/page.tsx` e `app/(pages)/page.tsx`, pois ambos resolvem `/` e criam conflito. Ao migrar a home, preserve seu código e confirme o build.
- `app/layout.tsx` é o layout raiz; deve conter `<html lang="pt-BR">`, `<body>`, CSS global e metadata. Não duplicar header/footer aqui se a intenção é excluí-los das páginas de erro.
- `app/(pages)/layout.tsx` compartilha `Header`, `children` e `Footer` entre Mundo, Países, Sobre o projeto e Sobre mim.
- Manter as páginas 429 e as interfaces de erro fora do grupo `(pages)` se elas não devem exibir o header/footer comum.
- `not-found.tsx` é a tela 404. `error.tsx` é uma fronteira de erro e precisa seguir os requisitos de Client Component da versão atual do Next.js. Não afirmar que `error.tsx` cria por si só uma URL `/500`.
- `app/429/page.tsx` cria uma rota de apresentação em `/429`; ela não será ativada automaticamente quando uma API responder HTTP 429.
- Manter a estrutura existente sempre que possível. Não fazer reorganizações abrangentes sem explicar por quê.

## 6. Header, footer e páginas

### Header

- Marca “TERRA EM MOVIMENTO” com ícone de globo.
- Links: **Mundo**, **Países**, **Sobre o projeto**, **Sobre mim**.
- Destacar a rota atual com azul-ciano e/ou sublinhado sutil.
- Compacto, consistente em todas as páginas e responsivo.
- Usar navegação do Next.js (`next/link`) para rotas internas.

### Mundo (`/`)

- Globo grande como centro visual da experiência.
- Busca de país e, se não sobrecarregar a interface, filtros compactos por região.
- Ao passar o mouse em uma área válida: tooltip curto com nome e bandeira, quando disponível.
- Ao clicar em uma área válida: selecionar o país e abrir `CountryDetails` como painel flutuante/lateral.
- Manter o globo visível quando o painel abrir; permitir fechar o painel facilmente.
- Não buscar dados da API em cada hover, clique ou movimento da câmera.

### Países (`/paises`)

- Grid responsivo de cards gerados a partir da coleção normalizada de países.
- Renderizar com `.map()`/equivalente, uma `key` estável baseada no código ISO quando válido.
- Mostrar somente os campos verificados e úteis: bandeira, nome, região/continente, capital e população quando disponível.
- Pesquisa e filtros devem funcionar no conjunto carregado; não enviar requisição à API por tecla digitada.
- Clique em um card abre o mesmo `CountryDetails` reutilizável. Não criar uma rota individual por país, a menos que o usuário peça.
- Tratar campos ausentes com texto de fallback, sem renderizar `undefined`, arrays vazios ou estatísticas inventadas.

### Sobre o projeto (`/projeto`)

- Página editorial, com objetivo, arquitetura e tecnologias reais do sistema.
- Mostrar um diagrama simples: fonte de dados → associação geográfica → interface.
- Explicar que o GeoJSON é a geometria, REST Countries contém os dados, React Globe.gl desenha o globo e GSAP anima elementos de interface.
- Explicar que IA generativa/Copilot apoia o processo de desenvolvimento, não é uma função de IA oferecida pelo site.
- Não afirmar que um recurso está finalizado se ainda não tiver sido implementado.

### Sobre mim (`/sobre`)

- Estilo profissional, seguindo a identidade visual do projeto.
- Usar somente informações fornecidas pelo usuário ou já presentes no conteúdo do projeto.
- Não inventar experiência profissional, certificações, links, URLs de GitHub/LinkedIn ou domínio próprio. Usar placeholders editáveis quando faltarem informações.

### 404, 429 e erros

- Usar as convenções oficiais do Next.js e conferir a documentação da versão instalada.
- Página 404: mensagem clara, identidade visual correspondente e ação para voltar ao Mundo.
- Página `/429`: mensagem de limite de requisições apenas como página explicativa/manual; não simular que o Next.js a detecta automaticamente.
- `error.tsx`: mensagem segura e amigável, opção de tentar novamente quando apropriado e sem expor stack traces, tokens, detalhes internos nem respostas privadas da API.

## 7. Dados de países: REST Countries v5

A fonte externa escolhida é a **REST Countries v5**. A API atual usa chave Bearer e o formato de resposta da v5 é diferente de muitos tutoriais antigos. Antes de implementar, consulte a documentação atual: https://restcountries.com/docs/countries.

### Regras essenciais

- Endpoint base atual documentado: `https://api.restcountries.com/countries/v5`.
- Enviar a chave no cabeçalho `Authorization: Bearer ...` no servidor.
- Guardar a chave como `REST_COUNTRIES_API_KEY` em `.env.local` durante o desenvolvimento e nas Environment Variables da Vercel na implantação.
- Nunca usar `NEXT_PUBLIC_REST_COUNTRIES_API_KEY`, nunca colocar a chave no cliente, nos componentes, em arquivos `public/`, no GeoJSON, no README ou em logs.
- Manter a consulta em um módulo exclusivo do servidor, por exemplo `lib/countries.ts`; pode-se usar `import 'server-only'` para impedir importações acidentais no cliente.
- Páginas Server Component podem carregar dados e passá-los como props serializáveis aos componentes interativos. Componentes client-side não devem importar diretamente o módulo que contém a chave.
- Na v5, valide o envelope atual da resposta (por exemplo, `data`/`data.objects` para listas) e os nomes reais dos campos. **Não copiar exemplos da API legada `restcountries.com/v3.1` sem adaptação.**
- Utilizar `response_fields` para solicitar apenas os campos necessários e paginação com `limit` e `offset`; o limite Free documentado é de até 100 registros por chamada.
- A quota Free atualmente documentada é de 1.000 requisições por mês por conta. Não criar uma requisição por país, por card ou por interação.
- As condições atuais permitem cache de resposta por até **três dias**, não armazenamento permanente de uma cópia completa dos dados da REST Countries. Respeitar esse limite e conferir os termos atuais antes de uma mudança no uso.
- Definir explicitamente a estratégia de cache no `fetch` do servidor (`next.revalidate` quando apropriado) com no máximo 259.200 segundos. Não depender de suposições sobre o cache padrão do Next.js.
- Tratar erro HTTP, resposta malformada, resposta vazia, ausência de chave, 401/403, 429 e falha de rede. Mostrar estado amigável; não deixar falha externa quebrar toda a página sem tratamento.
- Para desenvolvimento sem chave, criar mock pequeno apenas para testes e desenvolvimento e sinalizá-lo claramente como mock. Não usar dados de demonstração como se fossem a base real de produção.

Links: https://restcountries.com/docs e https://restcountries.com/docs/countries.

## 8. GeoJSON e ligação entre países e geometria

- O arquivo é servido do caminho público `/data/countries.geojson`.
- Conferir o arquivo real antes de codificar: propriedades comuns desse conjunto incluem `name`, `ISO3166-1-Alpha-2` e `ISO3166-1-Alpha-3`; não presumir que a propriedade se chama `ISO_A2`.
- Associar geometria e dados usando primeiro o código ISO alpha-2 normalizado, comparando com o código alpha-2 correspondente da REST Countries (`codes.alpha_2` na estrutura v5 documentada).
- Não usar apenas nomes traduzidos para fazer a associação, porque nomes podem diferir entre fontes e idiomas.
- GeoJSON pode incluir territórios, áreas disputadas ou features sem código ISO válido (por exemplo, `-99`). Tratar feature sem correspondência sem crash, e registrar/validar exceções antes de adicionar mapeamentos manuais.
- Não confundir a fonte de geometria com a API de dados. O GeoJSON local não fornece população, capital, moedas ou idiomas.
- Verificar o tamanho do arquivo e a quantidade de coordenadas. Preferir uma versão simplificada adequada à visualização quando necessário, sem perder a licença/atribuição da fonte. Manter referência de procedência/licença em `docs/` quando aplicável.

## 9. React Globe.gl e Next.js

- Usar a biblioteca React `react-globe.gl` (não confundir as bindings React com o web component `globe.gl`).
- Consultar a documentação/API da versão instalada: https://github.com/vasturiano/react-globe.gl e https://globe.gl/.
- WebGL/Three.js dependem do navegador. Manter o globo em um Client Component com `'use client'` e, se a biblioteca não for compatível com SSR, usar `next/dynamic` com `ssr: false` de dentro de um Client Component conforme a documentação do Next.js.
- Não colocar `'use client'` em todos os arquivos sem necessidade; manter layouts e páginas estáticas como Server Components quando possível.
- Definir altura responsiva explícita para a área do globo e verificar o resize do container.
- Respeitar os eventos de hover e click da biblioteca. Evitar recomputar todos os dados ou reconstruir toda a cena em cada renderização.
- Implementar loading/fallback visual caso WebGL não esteja disponível ou o GeoJSON demore a carregar.
- Verificar desempenho, uso de memória, travamentos, zoom e rotação em máquina real. Não sacrificar responsividade por efeitos decorativos.

## 10. GSAP e animações

- GSAP é para microinterações e animações da interface: entrada de painéis, cards, título, navegação e transições selecionadas.
- Preferir `@gsap/react` e `useGSAP()` nos Client Components quando disponível; seguir a documentação https://gsap.com/resources/React/.
- Usar `useRef`/escopo para limitar seletores a cada componente e permitir limpeza/reversão das animações ao desmontar ou atualizar.
- Evitar criar tweens duplicados, efeitos em cascata exagerados e manipulação concorrente das mesmas propriedades por GSAP e React.
- Não animar tudo. Priorizar duração curta, suavidade e propósito funcional.
- Respeitar `prefers-reduced-motion`; desativar/reduzir animações não essenciais quando preferido.
- Não usar GSAP para a rotação principal ou a câmera 3D que já pertencem à biblioteca do globo.

## 11. Tailwind CSS e CSS global

- Usar Tailwind para layout, espaçamento, tipografia, responsividade, estados e cores.
- Consultar a versão instalada. Para Tailwind CSS v4, conferir a documentação oficial https://tailwindcss.com/docs/installation/framework-guides/nextjs e preservar a configuração existente.
- Evitar adicionar CSS global para coisas que podem ficar no componente; `globals.css` deve conter principalmente reset/imports, tokens globais e estilos verdadeiramente globais.
- Não criar um segundo sistema de design, bibliotecas de UI ou CSS-in-JS sem necessidade e autorização.
- Criar classes completas que o compilador Tailwind consiga detectar; não montar nomes de classes dinamicamente de forma que não sejam incluídos no build.

## 12. TypeScript, componentes e qualidade

- Manter TypeScript estrito; evitar `any`. Definir um tipo normalizado de país para a aplicação, separado do tipo bruto da API e do tipo do GeoJSON.
- Normalizar a resposta da REST Countries em um único ponto. Componentes não devem conhecer a estrutura bruta da API.
- Tratar campos opcionais e listas vazias de forma segura.
- Reutilizar `CountryCard` e `CountryDetails` em vez de copiar o mesmo layout para o globo e a página Países.
- Para listas, usar chaves estáveis (código ISO válido ou identificador explícito), nunca o índice como primeira opção.
- Preferir nomes claros e componentes pequenos; evitar abstrações genéricas prematuras.
- Não instalar pacotes de ícones, animação, estado ou UI se a dependência existente resolver o problema.
- Manter labels acessíveis, `alt` nas imagens, áreas clicáveis adequadas, navegação por teclado, foco visível e botões com nomes acessíveis.

## 13. Segurança e variáveis de ambiente

- `.env.local` deve estar no `.gitignore`; nunca verificar segredo com `git status`/logs sem cuidado e nunca publicar valor real.
- Variáveis `NEXT_PUBLIC_*` são expostas ao navegador: nunca colocar a chave da REST Countries nelas.
- Não enviar chaves nem cabeçalhos privados para o cliente.
- Não exibir stack traces, tokens, conteúdo sensível de erro ou a resposta integral da API para o usuário.
- Não adicionar backend separado, banco de dados ou endpoints próprios sem necessidade. O único código de servidor necessário inicialmente é a consulta segura à API por meio do Next.js.

## 14. Fluxo de desenvolvimento com IA

Antes de implementar uma tarefa:

1. Ler este arquivo e `.github/copilot-instructions.md`, verificando conflitos.
2. Inspecionar a estrutura existente e os scripts no `package.json`.
3. Ler a documentação local da versão instalada do Next.js e a documentação da biblioteca envolvida.
4. Descrever brevemente o plano, os arquivos a modificar e os riscos de integração.
5. Implementar em etapas pequenas; preservar alterações já feitas pelo usuário.
6. Não alterar arquivos fora do escopo nem reescrever páginas inteiras sem necessidade.
7. Ao concluir, listar arquivos alterados, decisões importantes, testes executados e pendências reais.

Não afirmar que uma funcionalidade está pronta se há apenas um mock ou uma ilustração. Não afirmar que um teste passou sem executar o comando correspondente.

## 15. Testes obrigatórios antes de considerar uma tarefa concluída

### Antes de integrar

- Confirmar as quatro rotas: `/`, `/paises`, `/projeto`, `/sobre`.
- Verificar se o header/footer aparece somente nas páginas pretendidas.
- Verificar que não há conflito entre `app/page.tsx` e `app/(pages)/page.tsx`.
- Conferir se a API v5 responde com a chave e o formato esperado e se nenhum tutorial v3.1 foi copiado sem adaptação.
- Confirmar que a chave não aparece no código cliente, no bundle público ou nos commits.
- Verificar se o código ISO associa corretamente os países do GeoJSON à lista da API.
- Testar hover, click, fechar painel, pesquisa, filtros e cards.
- Testar APIs sem chave, offline, resposta vazia e erro 429; a UI deve falhar com elegância.

### Comandos

Inspecionar primeiro os scripts disponíveis no `package.json`. Executar os comandos existentes e equivalentes apropriados, normalmente:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Se um script não existir, registrar isso e executar a alternativa apropriada; não criar um comando fictício nem declarar sucesso. Corrigir erros introduzidos pela tarefa.

### Teste visual e funcional

- Testar no desktop com resolução de apresentação e em viewport menor.
- Testar ao menos Chrome/Chromium; verificar console sem erros relevantes.
- Confirmar que o globo não causa overflow, scroll horizontal ou bloqueio dos controles.
- Confirmar que o painel pode ser fechado e que a seleção muda corretamente.
- Confirmar loading, empty state, erro de API e fallback de WebGL/GeoJSON.
- Validar contraste, foco de teclado e preferência por movimento reduzido.

## 16. GitHub e Vercel

- O repositório GitHub será a fonte do código; Vercel fará o deploy.
- Com a integração Git da Vercel configurada, pushes em branches normalmente geram Preview Deployments, e pushes/merges na branch configurada como produção (normalmente `main`) geram deploy de produção. Confirmar a branch real no painel da Vercel.
- Configurar `REST_COUNTRIES_API_KEY` em Project Settings → Environment Variables para os ambientes necessários. Depois de alterar variáveis, fazer novo deploy para que sejam aplicadas.
- Antes do push: conferir `git status`, revisar `git diff`, garantir que `.env.local` e outros segredos não serão enviados e executar lint/typecheck/build.
- Depois do deploy: abrir a URL de Preview/Production, testar as quatro rotas, seleção do globo, cards, API e comportamento em tela cheia.
- Não assumir que um deploy foi publicado apenas porque o push foi feito; confirmar o estado e a URL do deployment no painel da Vercel.

Documentação: https://vercel.com/docs/git.

## 17. Fontes oficiais para consulta

- Next.js — AI coding agents: https://nextjs.org/docs/app/guides/ai-agents
- Next.js — documentação App Router: https://nextjs.org/docs/app
- React Globe.gl: https://github.com/vasturiano/react-globe.gl
- Globe.gl: https://globe.gl/
- GSAP com React: https://gsap.com/resources/React/
- Tailwind CSS com Next.js: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- REST Countries: https://restcountries.com/docs/countries
- GeoJSON de países e licença/dados: https://github.com/datasets/geo-countries
- Deploy Git na Vercel: https://vercel.com/docs/git

Ao iniciar uma tarefa, consulte as seções relevantes, não precisa reler todo o arquivo para uma mudança simples. Se a documentação atual contradizer uma instrução deste arquivo, siga a documentação oficial atual, explique a diferença e proponha atualizar este arquivo.
