Tarefa 01 — Header e Footer

Leia primeiro AGENTS.md e .github/copilot-instructions.md. Em caso de conflito entre este briefing e o AGENTS.md, pare e me avise antes de decidir.

1. Objetivo

Substituir o Header e o Footer provisórios (bg-zinc-800, texto simples) por versões fiéis ao protótipo, usando somente os tokens de cor que já existem em app/globals.css, e fazer com que apareçam apenas nas quatro páginas principais.

2. Referências visuais
docs/design/header-footer-referencia.png (header e footer do protótipo).
docs/design/paleta.png (paleta e componentes do design system).
Descrição em texto (use se não conseguir ler a imagem):
Header (altura ~80 px, fundo escuro, borda inferior sutil):
Esquerda: marca "TERRA EM MOVIMENTO" em maiúsculas, negrito, branca, seguida de um pequeno ponto ciano.
Centro: links Mundo, Países, Sobre o projeto, Sobre mim. O link ativo fica em ciano, com fundo levemente elevado e sublinhado ciano. Os demais ficam em cinza claro.
Direita: pílula com borda sutil, ícone de globo ciano e o texto "EXPLORADOR DO PLANETA" (maiúsculas, letras espaçadas, pequeno), mais um avatar circular com ícone de usuário.
Footer (fundo escuro, tudo centralizado):
Marca "TERRA EM MOVIMENTO" em azul, pequena, maiúsculas.
Linha de links de navegação.
Linha com 4 ícones circulares: GitHub, GitLab, LinkedIn e Instagram.
Divisória fina.
Linha inferior em 3 colunas: "Amostra de Cursos UniALFA Umuarama" (esquerda), "© 2026 Todos os direitos reservados" (centro) e "Wagner Da Silva Junior" (direita).
A faixa cinza com o texto "meu-footer" na imagem é resto do protótipo. Ignore.
3. Escopo

Alterar: app/layout.tsx (remover Header/Footer; manter fontes, metadata e <html lang="pt-BR">), components/Header.tsx, components/Footer.tsx.

Criar (justificar cada um no plano):

app/(pages)/layout.tsx: fragmento com <Header />, <main className="flex-1">{children}</main> e <Footer />. Use fragmento, e não uma div, para o flex-1 continuar funcionando dentro do body (que já é flex flex-col).
components/NavLinks.tsx: Client Component só para ler usePathname() e marcar o link ativo. O Header continua Server Component.
components/icons.tsx: ícones em SVG inline (globo, usuário, GitHub, GitLab, LinkedIn, Instagram), sem instalar pacote.
lib/site.ts: lista única dos links de navegação (rótulo + rota) e das redes sociais, usada por Header e Footer.

Mover: app/page.tsx para app/(pages)/page.tsx com git mv, preservando o conteúdo. Não pode restar um app/page.tsx.

Não tocar: globals.css (os tokens já existem), next.config.ts, package.json, error.tsx, not-found.tsx, app/429, as páginas de países, projeto e sobre, e a fonte (continua Geist).

4. Requisitos

Estilo

Só classes Tailwind com os tokens existentes: bg-background, bg-surface, bg-surface-elevated, bg-tertiary, text-foreground, text-muted, text-primary, border-border, ring-ring etc.
Nenhum hexadecimal nos componentes. O azul das bolinhas sociais do protótipo (~
#3B82F6) não pertence à paleta: use primary.
Cantos 12–16 px nos elementos de superfície, glow ciano só como acento (no ponto da marca e na pílula), sem sombras fortes.

Comportamento e acessibilidade

Navegação com next/link. Link ativo com aria-current="page" além da cor.
A marca é um <Link href="/">, não um <h1> (cada página terá o seu próprio h1).
<nav aria-label="Principal"> no header e <nav aria-label="Rodapé"> no footer.
Ícones decorativos com aria-hidden. Links de ícone com aria-label ("GitHub", "LinkedIn" etc.).
Foco visível por teclado (focus-visible) e transições com motion-reduce:transition-none.
Links externos com target="_blank" e rel="noopener noreferrer".

Responsivo (desktop-first)

A partir de lg: layout como no protótipo.
Abaixo de lg: a pílula "Explorador do planeta" é escondida.
Abaixo de md: a navegação vai para uma segunda linha, com rolagem horizontal interna. Sem menu hambúrguer nesta versão.
Nenhum scroll horizontal da página em 375 px.

Proibido nesta tarefa

new Date() ou Date.now() no Footer. O projeto usa cacheComponents: true, e a documentação local avisa que isso quebra o prerender. Deixe o ano fixo: 2026.
Instalar dependências (ícones, GSAP, fontes).
Inventar URLs de redes sociais.
5. Decisões já tomadas (mude só se eu pedir)
Footer sem o link "Home" (a rota / já é "Mundo"). Rótulos iguais aos do header (AGENTS.md §6).
Pílula "Explorador do planeta": texto estático, não clicável.
Avatar: círculo que leva a /sobre, com aria-label="Sobre mim". Sem login ou conta (fora do escopo).
Redes sociais: placeholders editáveis em lib/site.ts, com comentário TODO. Liste no relatório final quais ficaram sem URL real.
Correções de texto do protótipo: "UniALFA Umuarama" (capitalização) e "©" no lugar de "c".
6. Processo (duas fases)

Fase 1 — só o plano, sem editar nada. Responda com: arquivos que vai ler, arquivos que vai criar/alterar/mover, riscos (especialmente o conflito app/page.tsx × app/(pages)/page.tsx) e qualquer dúvida. Espere meu "ok".

Fase 2 — implementação em passos pequenos:

Mover a home para (pages) e criar app/(pages)/layout.tsx. Remover Header/Footer do layout raiz.
lib/site.ts e components/icons.tsx.
Header (+ NavLinks).
Footer.
7. Critérios de aceite
 /, /paises, /projeto e /sobre mostram header e footer.
 /429 e uma rota inexistente (404) não mostram header nem footer.
 O link ativo muda conforme a rota e tem aria-current="page".
 Sem hexadecimais nos componentes. Sem novas dependências no package.json.
 Footer fica no fim da tela mesmo em página curta.
 Teclado: Tab percorre header e footer em ordem lógica, com foco visível.
 375 px sem scroll horizontal da página.
8. Validação (execute de verdade e cole a saída)
bash
npm run lint
npx tsc --noEmit
npm run build

Se algo falhar, corrija o que a tarefa causou. Se a falha já existia, diga isso. Não declare "passou" sem ter rodado.

9. Formato da resposta final

Arquivos criados/alterados/movidos · decisões que tomou além deste briefing · comandos executados com o resultado real · pendências (ex.: URLs sociais) · como eu testo manualmente (rotas e viewports).