# Origem do `public/data/countries.geojson`

## Fonte e licença
- Conjunto de dados **datasets/geo-countries** (https://github.com/datasets/geo-countries), arquivo `data/countries.geojson`, branch `main`, baixado em 31/10/2026.
- Derivado do **Natural Earth, 10m Admin-0 Countries**.
- Licença do conjunto: **Open Data Commons Public Domain Dedication and License v1.0 (ODC-PDDL)**; o Natural Earth coloca os dados originais em domínio público.

## O que foi alterado

**1. Simplificação** com **mapshaper 0.7.101**. O original tem 14,6 MB e cerca de 548 mil vértices.

| Versão | Tamanho | Vértices |
|---|---|---|
| Original | 14,6 MB | ~548.000 |
| 10% | 1,07 MB | ~62.000 |
| **5% (usada)** | **573 KB** | **~32.000** |
| 3% | 371 KB | ~20.000 |

O modo `keep-shapes` mantém as 258 feições. Coordenadas arredondadas para 3 casas decimais.

**2. Reorientação dos contornos (essencial).** O `react-globe.gl` (`three-globe`) espera o anel **externo no sentido horário** e os buracos no anti-horário (convenção do Natural Earth e do d3). O arquivo da fonte vem no sentido contrário. Sem a correção, a biblioteca trata cada parte como "a esfera inteira menos esta área" e gera triângulos em excesso. Medido fora do navegador, com a própria classe de geometria da biblioteca:

| Arquivo (5%) | Partes (objetos 3D) | Triângulos | Tempo de CPU |
|---|---|---|---|
| Sem reorientar | 800 | ~2.735.000 | ~30 s |
| **Reorientado (usado)** | **800** | **~95.000** | **~0,8 s** |
| Referência: `ne_110m` do exemplo oficial | 288 | ~32.000 | ~0,4 s |

Com a reorientação, 10% daria ~182 mil triângulos (~1,7 s) e 3% ~59 mil (~0,7 s).

## Como reproduzir (fora do repositório; não commitar o arquivo original de 14,6 MB)
```bash
curl -L -o countries.full.geojson https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson
npx mapshaper countries.full.geojson -simplify 5% keep-shapes -o precision=0.001 countries.simple.geojson force
```
Depois, reorientar cada anel: externo com área assinada negativa (horário) e buracos com área assinada positiva (anti-horário), invertendo a ordem dos pontos quando necessário (fórmula do polígono, `Σ x[i]·y[i+1] − x[i+1]·y[i]`).

## Verificação do arquivo no repositório
- Tamanho: **572.555 bytes**.
- `sha256`: `40045600a3f477f3b1c7e4c9b43e823d68358320324adee55869e17b0ebc0dc0` (`sha256sum public/data/countries.geojson`).

## Conteúdo (verificado)
- Propriedades de cada feição: `name`, `ISO3166-1-Alpha-2`, `ISO3166-1-Alpha-3`.
- 258 feições (107 `Polygon`, 151 `MultiPolygon`), 800 partes no total; todos os anéis externos no sentido horário.
- **238 têm alpha-2 válido; 20 têm `-99`** (Kosovo, Somaliland e áreas disputadas ou especiais). Sem alpha-2 duplicado.
- **Taiwan vem como `CN-TW`**, não `TW`.
- **12 códigos ISO não têm polígono próprio:** BQ, BV, CC, CX, GF, GP, MQ, RE, SJ, TK, TW (ver acima) e YT. Guiana Francesa, Guadalupe, Martinica, Reunião e Mayotte estão dentro do polígono da França.
- A associação com a REST Countries é pelo alpha-2, nunca pelo nome.
