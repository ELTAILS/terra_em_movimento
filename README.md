# Terra em Movimento

Aplicação web de exploração geográfica com tema escuro. A página principal mostra um **globo terrestre 3D interativo**: ao passar o mouse sobre um país aparece um resumo e, ao clicar, um painel com os detalhes. A página **Países** reúne todos os países em cards, com busca, filtro por continente e ordenação.

Projeto educacional criado para demonstração em evento presencial. Não existe chatbot nem agente de IA como funcionalidade do produto; ferramentas de IA generativa (GitHub Copilot) foram usadas apenas como apoio ao desenvolvimento.

> Demonstração: _adicione aqui a URL do deploy na Vercel._

## Funcionalidades

- **Mundo (`/`):** globo 3D com os contornos dos países, tooltip com bandeira e nome ao passar o mouse, seleção por clique com voo da câmera e painel de detalhes (capitais, população, região, idiomas, moedas, fusos horários e coordenadas).
- **Países (`/paises`):** grade de cards com busca por nome, capital ou continente, filtros por região, quatro ordenações e "Carregar mais". "Explorar país" leva ao globo, que seleciona e mostra o país.
- **Sobre o projeto (`/projeto`)** e **Sobre mim (`/sobre`)**.
- Páginas de erro personalizadas (404, 429 e erro genérico), estados de carregamento e alternativa para navegadores sem WebGL.
- Respeita `prefers-reduced-motion`.

## Tecnologias

- [Next.js](https://nextjs.org) 16 (App Router, Cache Components), React 19 e TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl) (Three.js/WebGL) para o globo
- [GSAP](https://gsap.com) para microanimações da interface
- [REST Countries API](https://restcountries.com) v5 como fonte dos dados dos países
- GeoJSON local para a geometria dos países
- Hospedagem na [Vercel](https://vercel.com)

## Como executar

Requisitos: Node.js 20.9 ou superior e uma chave da REST Countries (o plano gratuito basta).

```bash
npm install
cp .env.example .env.local
# edite .env.local e preencha REST_COUNTRIES_API_KEY
npm run dev
```

Abra http://localhost:3000.

| Comando | Para quê |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (**exige a chave**) |
| `npm start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Checagem de tipos |

### Variável de ambiente

| Nome | Descrição |
| --- | --- |
| `REST_COUNTRIES_API_KEY` | Chave Bearer da REST Countries. Usada **somente no servidor**; nunca use o prefixo `NEXT_PUBLIC_` nem a coloque no código, em logs ou no repositório. |

Sem a chave, `npm run dev` usa um pequeno conjunto de dados de exemplo (mock), apenas para desenvolvimento. Em produção, **a falta da chave ou uma falha da API durante o build interrompe o build de propósito**, para nunca publicar uma página quebrada.

## Como os dados funcionam

1. Um módulo exclusivo do servidor (`lib/countries.ts`) busca a coleção completa na REST Countries (3 requisições de até 100 países), valida e normaliza a resposta.
2. O resultado fica em cache com `'use cache'`: renova a cada **2 dias** e **expira em 3 dias**, o máximo que os Termos de uso da API permitem. Assim o plano gratuito (1.000 requisições por mês) é mais que suficiente: cada renovação custa 3 requisições. Não há cópia permanente dos dados da API.
3. Os componentes recebem apenas dados normalizados e já localizados em português (nomes de países e moedas via `Intl`). O navegador nunca fala com a REST Countries.
4. A busca, o filtro e a ordenação trabalham sobre os dados já carregados, sem novas requisições.

## O globo e o GeoJSON

A geometria vem de `public/data/countries.geojson`, derivado do conjunto [datasets/geo-countries](https://github.com/datasets/geo-countries) (Natural Earth, domínio público). O arquivo original (14,6 MB) foi simplificado para cerca de 570 KB e teve os contornos reorientados para o sentido que a biblioteca espera; os detalhes e a forma de reproduzir estão em [`docs/data/geojson-origem.md`](docs/data/geojson-origem.md).

Cada polígono é ligado ao país pelo código **ISO alpha-2** (nunca pelo nome).

## Limitações conhecidas

- Capitais e nomes oficiais aparecem como a API os entrega (em inglês).
- Alguns territórios pequenos ou ultramarinos não têm polígono próprio e estão dentro do polígono de outro país (por exemplo, a Guiana Francesa dentro da França). Eles aparecem na página Países e abrem o painel no globo, mas sem área destacada.
- O globo é um elemento visual em `canvas` e não é navegável por teclado; a página Países é a alternativa acessível.
- O globo exige WebGL. Em máquinas virtuais sem aceleração de vídeo ele pode ficar lento.

## Estrutura

```text
app/
├── (pages)/            # rotas com Header e Footer: /, /paises, /projeto, /sobre
├── 429/                # página explicativa de limite de requisições
├── error.tsx           # erro de segmento
├── not-found.tsx       # 404
└── layout.tsx          # layout raiz
components/             # Header, Footer, GlobeScene, CountryCard, CountryDetails, ...
lib/                    # countries.ts (dados), country-view.ts, globe-data.ts, globe-intent.ts
public/data/            # countries.geojson
types/                  # tipos compartilhados
docs/                   # tarefas, design e procedência dos dados
```

## Deploy na Vercel

1. Importe o repositório e confirme qual branch é a de produção.
2. Em **Settings → Environment Variables**, crie `REST_COUNTRIES_API_KEY` para **Production e Preview** e faça um novo deploy.
3. Cada build consome cerca de 3 requisições da API (o cache é preenchido na pré-renderização).

## Créditos

- Dados dos países: [REST Countries](https://restcountries.com).
- Geometria: [Natural Earth](https://www.naturalearthdata.com) via [datasets/geo-countries](https://github.com/datasets/geo-countries).
- Globo: [react-globe.gl](https://github.com/vasturiano/react-globe.gl) / [globe.gl](https://globe.gl).

## Autor

Wagner da Silva Junior · [GitHub](https://github.com/ELTAILS) · [LinkedIn](https://www.linkedin.com/in/wagner-da-silva-junior/)