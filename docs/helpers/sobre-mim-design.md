---
name: Terra em Movimento
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#171c25'
  surface-container: '#1b2029'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2f0'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dfe2f0'
  inverse-on-surface: '#2c303b'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#c2cde5'
  on-tertiary: '#263144'
  tertiary-container: '#a6b1c9'
  on-tertiary-container: '#394458'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#d8e3fc'
  tertiary-fixed-dim: '#bcc7df'
  on-tertiary-fixed: '#111c2e'
  on-tertiary-fixed-variant: '#3c475b'
  background: '#0f131d'
  on-background: '#dfe2f0'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-technical:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
O sistema visual expressa a convergência entre cartografia orbital, instrumentação científica e interfaces analíticas de ponta. Projetado para proporcionar uma experiência imersiva, técnica e de precisão, o design evoca o rigor de consoles espaciais e a sofisticação da exploração planetária contemporânea.

A estética adota uma fusão entre minimalismo técnico e elementos sutis de glassmorfismo escuro. As superfícies flutuantes em tons de azul profundo e o emprego de gradientes pontuais de ciano e turquesa geram contraste focal deliberado, guiando o olhar do explorador através de camadas densas de dados geoespaciais sem ruído sensorial.

## Colors
A paleta cromática estrutura-se em um esquema noturno de alto contraste, otimizado para longas sessões de visualização e visualização de mapas em tempo real:

- **Plano de Fundo Imersivo (`#070B14`)**: A base do cosmos, profundo e neutro, que permite aos elementos gráficos luminosos sobressaírem com nitidez cirúrgica.
- **Camadas de Superfície (`#0E1625` e `#131E30`)**: Superfícies de suporte e elevação com transparência controlada para sobreposição cartográfica.
- **Destaque Primário (`#38BDF8`)**: Ciano elétrico reservado para nós interativos vitais, cursores ativos, estados focados e indicadores de pulso de telemetria.
- **Destaque Secundário (`#2DD4BF`)**: Turquesa técnico aplicado a gradientes analíticos, taxas de variação temporal e dados derivados.
- **Bordas Estruturais (`#263449`)**: Delimitações finas para retenção de forma sem criar caixas pesadas.
- **Tipografia (`#F1F5F9` primário e `#94A3B8` secundário)**: Níveis precisos de luminância para legibilidade sem ofuscamento sob iluminação escura.

## Typography
A escala tipográfica adota a família **Inter** por sua neutralidade instrumental, clareza em micro-escalas e suporte a números tabulares essenciais em telemetria e coordenadas geográficas.

- Metadados, tags de status e valores cartográficos utilizam o nível `label-technical` em caixa alta com espaçamento entre letras estendido (`0.08em`), remetendo a displays de instrumentos de voo e consoles científicos.
- Cabeçalhos priorizam tracking levemente negativo para manter a densidade visual e autoridade técnica.
- Leituras numéricas críticas de latitude, longitude e elevação devem invocar números tabulares (`font-feature-settings: "tnum"`).

## Layout & Spacing
O sistema opera sobre uma grelha fluida de 12 colunas no desktop, 8 colunas no tablet e 4 colunas em telas móveis, garantindo visualização desobstruída do globo cartográfico subjacente.

- **Desktop (≥1200px)**: Doca flutuante inferior, barras laterais de inspeção com largura fixa de 380px e margem de `2rem`. O espaço central é mantido livre para o mapa e camadas 3D.
- **Tablet (768px - 1199px)**: Paineis retráteis com recuo de `1.5rem` das bordas da tela, colapsando métricas complementares em gavetas expansíveis.
- **Mobile (<768px)**: Camadas verticais de base fixa com sheets deslizantes (bottom sheets) e margens compactas de `1rem` para maximizar a área de manipulação tátil.

## Elevation & Depth
A hierarquia de profundidade evita sombras escuras tradicionais, adotando estratificação de painéis translúcidos combinados com bordas refinadas e emanações de luz espectral:

- **Nível Base (Mapa/Espaço)**: Fundo total `#070B14`, plano zero sem elevação.
- **Nível 1 (Cartões e Painéis Secundários)**: Fundo `#0E1625` com opacidade de 85%, desfoque de fundo (`backdrop-filter: blur(16px)`), contorno de 1px sólido `#263449`.
- **Nível 2 (Superfícies de Foco e Overlays)**: Fundo `#131E30` translúcido (90%), borda de 1px `#263449`, sombreado ambiente difuso: `0 8px 32px -4px rgba(7, 11, 20, 0.6)`.
- **Nível Ativo (Nós e Alertas de Telemetria)**: Acréscimo de fulgor ciano perimetral (`box-shadow: 0 0 16px -2px rgba(56, 189, 248, 0.35)`), sinalizando interação ativa ou anomalia geoespacial detectada.

## Shapes
A linguagem de forma emprega o raio **Rounded (nível 2)**, estabelecendo equilíbrio entre contenção técnica e suavidade ergonômica:

- Painéis flutuantes, molduras de HUD e cartões de dados adotam curvatura de `0.75rem` (12px) a `1rem` (16px).
- Indicadores de estado, chips analíticos e botões de telemetria utilizam cantos arredondados padronizados em `0.5rem` (8px) ou geometria de cápsula completa para pílulas de filtros rápidos.
- Entradas de texto e caixas de seleção preservam a precisão angular estruturada em cantos uniformes de `0.5rem`.

## Components

### Botões
- **Primário**: Fundo gradiente linear sutil de ciano para turquesa (`#38BDF8` a `#2DD4BF`), texto `#070B14` em semibold. No estado hover, halo sutil de `rgba(56, 189, 248, 0.4)` e elevação luminosa de 1px.
- **Secundário**: Fundo translúcido `#0E1625` (70%), borda de 1px `#263449`, texto `#F1F5F9`. Hover com realce de borda para `#38BDF8` e texto iluminado.
- **Fantasma / Ícone**: Sem preenchimento de fundo, ícones monocromáticos em `#94A3B8`, transicionando para `#38BDF8` ao toque.

### Cartões de Dados (Glass Cards)
Superfícies construídas com fundo `#0E1625` a 80% de opacidade, `backdrop-filter: blur(12px)` e borda superior reforçada com gradiente suave de `#263449` para `#38BDF8` a 20%. Cabeçalhos exibem metadados em `label-technical` (`#94A3B8`), com títulos de coordenadas em destaque claro.

### Chips e Pílulas de Camada
Elementos compactos de chaveamento geoespacial (ex.: "Placas Tectônicas", "Fluxo Oceânico", "Atmosfera"). Em estado inativo: fundo `#0E1625`, borda `#263449`, texto `#94A3B8`. Em estado ativo: fundo `rgba(56, 189, 248, 0.12)`, borda `#38BDF8`, texto `#38BDF8` e ponto luminescente pulsante integrado de 6px.

### Listas e Painéis de Telemetria
Linhas alternadas ou isoladas com espaçamento `space-sm`, delimitadas por divisores finos em `#263449` com gradiente de transparência lateral. Valores numéricos renderizados com alinhamento à direita e algarismos monoespaçados.

### Campos de Entrada e Busca Coordenada
Fundo `#070B14` a 90%, borda de 1px `#263449`, texto `#F1F5F9`, placeholder `#94A3B8` a 60%. Foco evidenciado por transição imediata da borda para `#38BDF8` acompanhada por micro-fulgor de 3px difuso.

### Caixas de Seleção e Interruptores (Switches)
Interruptores com trilha em `#131E30`, borda `#263449`, e botão interior que assume `#38BDF8` com rastro iluminado quando acionado. Caixas de seleção com cantos de 4px, fundo escuro e preenchimento cyan sólido com marca de verificação escura ao selecionar camadas ativas de exploração.