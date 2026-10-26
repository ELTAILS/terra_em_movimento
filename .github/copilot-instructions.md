# Terra em Movimento — Instruções para agentes de IA

## Objetivo
Desenvolver um explorador interativo do planeta com
Next.js, TypeScript e Tailwind CSS.

## Tecnologias
- Next.js com App Router.
- React e TypeScript.
- Tailwind CSS para os estilos.
- React Globe.gl para o globo 3D.
- GSAP para animações complementares.
- REST Countries para informações dos países.
- GeoJSON local para as geometrias geográficas.
- Vercel para hospedagem.

## Páginas
- src/app/page.tsx: Mundo.
- src/app/paises/page.tsx: cards dos países.
- src/app/projeto/page.tsx: sobre o projeto.
- src/app/sobre/page.tsx: sobre mim.
- src/app/not-found.tsx: página 404.
- src/app/error.tsx: tratamento de erros da aplicação.

## Regras de desenvolvimento
- Consulte a documentação compatível com a versão
  instalada do Next.js antes de usar APIs do framework.
- Reutilize componentes existentes antes de criar novos.
- Mantenha os dados dos países em uma estrutura
  compartilhada entre o globo e os cards.
- Execute bibliotecas que dependem do navegador,
  como o globo 3D, no ambiente client-side apropriado.
- Use Tailwind CSS para estilização e GSAP somente
  quando necessário para animações.
- Não exponha chaves de API no navegador.
- Não instale dependências novas sem justificar
  sua necessidade.
- Preserve a identidade visual escura definida no protótipo.
- Não altere arquivos não relacionados à tarefa.

## Validação
- Verifique os erros de TypeScript e lint.
- Execute o build de produção.
- Corrija os erros encontrados antes de concluir.
- Informe quais arquivos foram alterados e como testar.