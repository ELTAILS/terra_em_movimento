# Terra em Movimento — Instruções para o GitHub Copilot

As regras completas do projeto estão em `AGENTS.md` (na raiz). Leia-o antes de qualquer tarefa.
Este arquivo é só o resumo curto e fixo.

## Stack
Next.js (App Router) + React + TypeScript + Tailwind CSS 4. Também: react-globe.gl, GSAP (só se instalado), REST Countries v5 (somente no servidor) e GeoJSON local. Deploy na Vercel.

## Estrutura real do projeto (não existe pasta `src/`)
- `app/` — rotas. Páginas com header/footer ficam em `app/(pages)/`. `429`, `error.tsx` e `not-found.tsx` ficam fora do grupo.
- `components/`, `lib/`, `types/`, `public/data/countries.geojson`, `docs/`.

## Regras permanentes
- Antes de usar APIs do Next.js, leia a documentação da versão instalada em `node_modules/next/dist/docs/`.
- Estilo só com Tailwind e os tokens de `app/globals.css`. Sem hexadecimais nos componentes.
- Reutilize componentes antes de criar novos. Não instale dependências sem justificar.
- Nunca exponha chaves de API no navegador.
- Não altere arquivos fora do escopo da tarefa. Não invente arquivos, links ou funcionalidades.
- Siga o briefing da tarefa em `docs/tasks/`. Primeiro apresente um plano e espere confirmação.

## Validação
Execute `npm run lint`, `npx tsc --noEmit` e `npm run build`. Informe os resultados reais e nunca declare sucesso sem executar.