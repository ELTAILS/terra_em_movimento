# Origem do `public/data/countries.geojson`

## Fonte e licença
- Conjunto de dados **datasets/geo-countries** (https://github.com/datasets/geo-countries), arquivo `data/countries.geojson`, branch `main`, baixado em 31/10/2026.
- Ele é derivado do **Natural Earth, 10m Admin-0 Countries**.
- Licença do conjunto: **Open Data Commons Public Domain Dedication and License v1.0 (ODC-PDDL)**; o Natural Earth coloca os dados originais em domínio público.

## O que foi alterado
O arquivo original tem 14,6 MB e cerca de 548 mil vértices, pesado demais para o navegador. Foi simplificado com **mapshaper 0.7.101**:

| Versão | Tamanho | Vértices |
|---|---|---|
| Original | 14,6 MB | ~548.000 |
| 10% | 1,07 MB | ~62.000 |
| **5% (usada)** | **573 KB** | **~32.000** |
| 3% | 371 KB | ~20.000 |

O modo `keep-shapes` impede que países pequenos desapareçam: as 258 feições originais continuam no arquivo. Coordenadas arredondadas para 3 casas decimais.

## Como reproduzir (fora do repositório; não commitar o arquivo original de 14,6 MB)
```bash
curl -L -o countries.full.geojson https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson
npx mapshaper countries.full.geojson -simplify 5% keep-shapes -o precision=0.001 countries.geojson force
```

## Conteúdo (verificado)
- Propriedades de cada feição: `name`, `ISO3166-1-Alpha-2`, `ISO3166-1-Alpha-3`.
- 258 feições: 107 `Polygon` e 151 `MultiPolygon`.
- **238 têm código alpha-2 válido; 20 têm `-99`** (Kosovo, Somaliland e áreas disputadas ou especiais).
- Não há alpha-2 duplicado.
- **Taiwan vem como `CN-TW`**, não `TW`.
- **12 códigos ISO não têm polígono próprio:** BQ, BV, CC, CX, GF, GP, MQ, RE, SJ, TK, TW (ver acima) e YT. Guiana Francesa, Guadalupe, Martinica, Reunião e Mayotte estão dentro do polígono da França.
- A associação com os dados da REST Countries deve ser feita pelo código alpha-2, nunca pelo nome.
