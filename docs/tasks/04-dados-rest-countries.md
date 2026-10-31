# Tarefa 04 — Camada de dados da REST Countries v5 (servidor + cache de no máximo 3 dias)

> Leia primeiro `AGENTS.md` (§3, §7, §12, §13, §14 e §15) e `.github/copilot-instructions.md`.
> Em caso de conflito, pare e me avise antes de decidir. **Exceção já resolvida:** o item 1 da seção 5 explica a diferença entre o `AGENTS.md` §7 e a documentação do Next instalado.

## 1. Objetivo

Passar a existir um módulo exclusivo do servidor que busca todos os países na REST Countries v5 usando a chave `REST_COUNTRIES_API_KEY`, converte a resposta para um único tipo `Country` da aplicação e mantém o resultado em cache por no máximo 3 dias, sem expor a chave e sem gastar a cota do plano Free. Esta tarefa **não** cria a tela final: só uma verificação temporária em `/paises`.

## 2. Referências

- Documentação da API: https://restcountries.com/docs/countries (List, Pagination, Field reference, Errors) e https://restcountries.com/docs (Authentication, Request limits, Acceptable use).
- Documentação local do Next instalado (leia antes de escrever código, o Next é a versão 16.4.3 com `cacheComponents: true`):
  - `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cacheLife.md`
  - `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`
- Fatos da API que você deve **confirmar** na documentação e na amostra da seção 10, não copiar daqui como verdade:
  - Base `https://api.restcountries.com/countries/v5`, cabeçalho `Authorization: Bearer <chave>`.
  - A lista vem em `data.objects`, com `data.meta` (`total`, `count`, `limit`, `offset`, `more`).
  - Plano Free: `limit` máximo 100, 1.000 requisições por mês, 20 requisições a cada 10 segundos. São cerca de 249 países, então a coleção completa custa **3 chamadas** (`offset` 0, 100, 200).
  - O campo `leaders` é premium e **não deve ser usado**.
- Não há imagem de design nesta tarefa.

## 3. Escopo

**Alterar:**
- `types/country.ts` (hoje vazio): tipo normalizado `Country` e tipos auxiliares.
- `lib/countries.ts` (hoje vazio): busca, paginação, normalização, cache e tratamento de erros.
- `app/(pages)/paises/page.tsx`: **somente** um bloco temporário de verificação (seção 4), marcado como `TEMPORÁRIO`. O restante da página fica como está.
- `.gitignore`: **somente** acrescentar a linha `!.env.example`, porque `.env*` hoje também ignora o arquivo de exemplo.

**Criar:**
- `.env.example`: apenas o nome `REST_COUNTRIES_API_KEY=` sem valor, para documentar a variável.
- `lib/countries.mock.ts`: mock pequeno (3 a 5 países) usado só em desenvolvimento sem chave, claramente sinalizado como mock.

**Não tocar:** `components/`, `app/(pages)/layout.tsx`, `app/(pages)/projeto/`, `app/(pages)/sobre/`, `app/globals.css`, `next.config.ts`, `package.json` e lockfile, `AGENTS.md`, `public/data/countries.geojson`, `docs/`.

## 4. Requisitos

**Busca**
- `fetch` apenas no servidor, no endpoint de lista, com `limit=100` e `offset` 0, 100, 200 (use `data.meta.more`/`total` para decidir quando parar, sem número fixo de páginas).
- Pedir só os campos necessários com `response_fields`. Campos esperados: nome comum e oficial, código alpha-2 e alpha-3, capitais, região, sub-região, população, coordenadas, bandeira (emoji, URL svg/png e descrição), idiomas e moedas. **Use somente nomes de campo confirmados na seção 10 ou na documentação.**
- Chamadas em sequência (não em paralelo), para respeitar o limite de 20 requisições por 10 segundos.

**Cache**
- Uma única função de servidor (por exemplo `getCountries`) com a diretiva `'use cache'` e `cacheLife` **definido no próprio escopo da função**.
- Valores: `stale: 300`, `revalidate: 172800` (2 dias) e `expire: 259200` (3 dias). O `expire` é o que impede entregar dado com mais de 3 dias.
- A coleção completa (as 3 páginas) deve ser uma única entrada de cache.

**Normalização**
- Um único ponto converte a resposta bruta em `Country`. Nenhum componente conhece o formato bruto da API.
- `code` = alpha-2 em maiúsculas (será a chave de ligação com o GeoJSON em tarefa futura). Campos ausentes viram `null` ou lista vazia, nunca `undefined` nem valor inventado.
- Descartar com segurança registros sem código alpha-2 válido, sem quebrar a coleção.

**Erros**
- Tratar: chave ausente, 401, 403, 429, falha de rede, resposta malformada e coleção vazia.
- A função exportada para as páginas devolve um resultado com estado explícito (sucesso ou erro com um motivo categorizado), sem lançar exceção para a página e **sem** expor stack trace, chave ou resposta bruta.
- **Falha nunca pode ficar guardada em cache por 2 dias.** Estruture o código para que só uma resposta bem-sucedida entre no cache (por exemplo, a função com cache lança erro em caso de falha e uma função externa converte isso em estado de erro). Confirme na documentação como `use cache` se comporta quando a função lança erro e relate o que encontrou.

**Mock**
- Sem `REST_COUNTRIES_API_KEY`, usar o mock **somente** quando `NODE_ENV !== 'production'`, com um aviso claro no log do servidor.
- Em produção sem chave, devolver estado de erro "chave ausente", nunca o mock.

**Segurança**
- Nada de `NEXT_PUBLIC_`. A chave não pode aparecer em logs, em componentes, em `public/`, no README nem em mensagens de erro.
- Fora do módulo, só tipos e dados normalizados circulam.

**Verificação temporária em `/paises`**
- Um bloco simples, marcado `TEMPORÁRIO`, que mostra a quantidade de países e os 3 primeiros nomes, ou a mensagem do estado de erro. Sem estilização nova.
- Um `console.log` temporário no servidor, **a cada requisição real à API**, com apenas `offset` e status HTTP (nunca a chave nem o corpo), para eu contar quantas chamadas reais acontecem.

**Proibido:**
- Instalar dependências, criar Route Handler/endpoint próprio, banco de dados, arquivo JSON salvo em disco ou no repositório com cópia dos dados, `use cache: remote`, `export const revalidate`, `dynamic` ou `fetchCache` (dão erro com `cacheComponents`).
- Usar os perfis prontos `days`, `weeks` ou `max` do `cacheLife`: o `expire` deles é de 1 semana ou mais, acima do limite de 3 dias.
- Copiar exemplos da API legada v3.1, usar a chave `rc_live_demo` dentro do código, ou usar o campo `leaders`.
- Criar `CountryCard`, `CountryDetails` ou qualquer UI final.

## 5. Decisões já tomadas

1. **Cache com `'use cache'` + `cacheLife`, e não `next.revalidate` no `fetch`.** O `AGENTS.md` §7 cita `next.revalidate`, mas com `cacheComponents: true` a documentação do Next instalado manda usar `use cache` + `cacheLife`. Siga a documentação, **não edite o `AGENTS.md`** e liste esta diferença na resposta final para eu atualizar o arquivo.
2. Janela de 2 dias para renovar e 3 dias como limite absoluto (margem de 1 dia sobre o limite dos Termos de uso).
3. Os dados vêm só do servidor; o navegador nunca fala com a REST Countries (por isso nenhum hostname precisa ser liberado no CORS da chave).
4. Sem backend separado, sem banco e sem endpoints próprios (AGENTS.md §13).
5. A ligação com o GeoJSON (por alpha-2) e a UI ficam para tarefas seguintes.

## 6. Processo

**Fase 1:** só o plano: arquivos, riscos, dúvidas e o que a documentação local diz sobre `use cache` com erros lançados. Esperar meu "ok".
**Fase 2:** implementar em passos pequenos: (1) tipos, (2) busca de uma página, (3) paginação completa, (4) normalização, (5) cache, (6) erros e mock, (7) bloco temporário.

## 7. Critérios de aceite

- [ ] `types/country.ts` e `lib/countries.ts` implementados; nenhum outro arquivo fora do escopo foi alterado.
- [ ] `/paises` mostra a quantidade e 3 nomes reais com a chave configurada; sem chave (em desenvolvimento) mostra o mock sinalizado.
- [ ] O log temporário mostra **no máximo 3 chamadas reais** por preenchimento do cache, e recarregar `/paises` várias vezes não gera novas chamadas dentro da janela.
- [ ] Com chave inválida, a página mostra um estado de erro amigável e **não** guarda o erro em cache.
- [ ] A chave não aparece no bundle do cliente, em logs nem em mensagens.
- [ ] `.env.example` entra no Git e `.env.local` continua ignorado.

## 8. Validação

`npm run lint` · `npx tsc --noEmit` · `npm run build` (executar de verdade e colar a saída).
Anotar também quantas chamadas reais o `npm run build` fez (cada build consome cota). Relatar o que foi **observado**; não afirmar comportamento em produção que não foi testado.

## 9. Formato da resposta final

Arquivos alterados · decisões extras · comandos e resultados reais · diferença entre `AGENTS.md` §7 e a documentação do Next · pendências · como testar manualmente.

## 10. Amostra real da resposta (preencher antes de executar)

{
  "data": {
    "objects": [
      {
        "names": {
          "common": "Abkhazia",
          "official": "Republic of Abkhazia"
        },
        "codes": {
          "alpha_2": "",
          "alpha_3": ""
        },
        "capitals": [
          {
            "attributes": {
              "administrative": false,
              "constitutional": false,
              "executive": false,
              "judicial": false,
              "legislative": false,
              "primary": true
            },
            "coordinates": {
              "lat": 43.0033,
              "lng": 41.0153
            },
            "name": "Sukhumi"
          }
        ],
        "flag": {
          "colors": {
            "dominant": "",
            "palette": [],
            "prominent": "",
            "swatches": {
              "dark_muted": null,
              "dark_vibrant": null,
              "light_muted": null,
              "light_vibrant": null,
              "muted": null,
              "vibrant": null
            }
          },
          "description": "",
          "emoji": "",
          "html_entity": "",
          "unicode": "",
          "url_png": "",
          "url_svg": ""
        },
        "region": "Asia",
        "subregion": "Western Asia",
        "coordinates": {
          "lat": 43,
          "lng": 41
        },
        "currencies": [
          {
            "code": "RUB",
            "name": "Russian ruble",
            "symbol": "₽"
          }
        ],
        "languages": [
          {
            "bcp47": "ab",
            "iso639_1": "ab",
            "iso639_2b": "abk",
            "iso639_2t": "abk",
            "iso639_3": "abk",
            "name": "Abkhaz",
            "native_name": "Аҧсуа бызшәа"
          },
          {
            "bcp47": "ru",
            "iso639_1": "ru",
            "iso639_2b": "rus",
            "iso639_2t": "rus",
            "iso639_3": "rus",
            "name": "Russian",
            "native_name": "русский"
          }
        ],
        "population": 244236,
        "_meta": {
          "lastUpdatedTimestamp": 1788557516
        }
      },
      {
        "names": {
          "common": "Afghanistan",
          "official": "Islamic Republic of Afghanistan"
        },
        "codes": {
          "alpha_2": "AF",
          "alpha_3": "AFG"
        },
        "capitals": [
          {
            "attributes": {
              "administrative": false,
              "constitutional": false,
              "executive": false,
              "judicial": false,
              "legislative": false,
              "primary": true
            },
            "coordinates": {
              "lat": 34.52,
              "lng": 69.18
            },
            "name": "Kabul"
          }
        ],
        "flag": {
          "colors": {
            "dominant": "#d43e34",
            "palette": [
              {
                "hex": "#d43e34",
                "proportion": 0.2923709456372773
              },
              {
                "hex": "#000000",
                "proportion": 0.30904522613065327
              },
              {
                "hex": "#007e3d",
                "proportion": 0.3074463225216994
              },
              {
                "hex": "#ecd9c3",
                "proportion": 0.058017359524897213
              },
              {
                "hex": "#777975",
                "proportion": 0.021242576518958427
              },
              {
                "hex": "#7fb68e",
                "proportion": 0.010050251256281407
              },
              {
                "hex": "#0a1211",
                "proportion": 0.0013704888076747374
              },
              {
                "hex": "#196909",
                "proportion": 0.00045682960255824577
              }
            ],
            "prominent": "#000000",
            "swatches": {
              "dark_muted": "#0a1211",
              "dark_vibrant": null,
              "light_muted": "#ecd9c3",
              "light_vibrant": "#7fb68e",
              "muted": "#777975",
              "vibrant": "#d43e34"
            }
          },
          "description": "The flag of Afghanistan is composed of three equal vertical bands of black, red and green, with the national emblem in white centered in the red band.",
          "emoji": "🇦🇫",
          "html_entity": "&#127462;&#127467;",
          "unicode": "U+1F1E6 U+1F1EB",
          "url_png": "https://flags.restcountries.com/v5/w640/af.png",
          "url_svg": "https://flags.restcountries.com/v5/svg/af.svg"
        },
        "region": "Asia",
        "subregion": "Southern Asia",
        "coordinates": {
          "lat": 33,
          "lng": 65
        },
        "currencies": [
          {
            "code": "AFN",
            "name": "Afghan afghani",
            "symbol": "؋"
          }
        ],
        "languages": [
          {
            "bcp47": "prs",
            "iso639_1": "",
            "iso639_2b": "",
            "iso639_2t": "",
            "iso639_3": "prs",
            "name": "Dari",
            "native_name": "دری"
          },
          {
            "bcp47": "ps",
            "iso639_1": "ps",
            "iso639_2b": "pus",
            "iso639_2t": "pus",
            "iso639_3": "pus",
            "name": "Pashto",
            "native_name": "پښتو"
          },
          {
            "bcp47": "tk",
            "iso639_1": "tk",
            "iso639_2b": "tuk",
            "iso639_2t": "tuk",
            "iso639_3": "tuk",
            "name": "Turkmen",
            "native_name": "Türkmençe"
          }
        ],
        "population": 43844000,
        "_meta": {
          "lastUpdatedTimestamp": 1788724017
        }
      }
    ],
    "meta": {
      "total": 254,
      "count": 2,
      "limit": 2,
      "offset": 0,
      "more": true,
      "request_id": "c255938a-b355-4900-bba0-09295b2b3f11",
      "duration": 38
    }
  }
