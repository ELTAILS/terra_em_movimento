import type { Country } from "@/types/country";

// Mock pequeno e exclusivo para desenvolvimento local sem chave da API.
export const mockCountries: Country[] = [
  {
    code: "BR",
    alpha3Code: "BRA",
    name: "Brasil",
    officialName: "República Federativa do Brasil",
    capitals: ["Brasília"],
    region: "Americas",
    subregion: "South America",
    population: 203080756,
    coordinates: { lat: -10, lng: -55 },
    flag: {
      emoji: "🇧🇷",
      svgUrl: null,
      pngUrl: null,
      description: null,
    },
    languages: [
      {
        name: "Portuguese",
        nativeName: "Português",
        iso6391: "pt",
        iso6393: "por",
      },
    ],
    currencies: [{ code: "BRL", name: "Brazilian real", symbol: "R$" }],
  },
  {
    code: "JP",
    alpha3Code: "JPN",
    name: "Japão",
    officialName: "Estado do Japão",
    capitals: ["Tokyo"],
    region: "Asia",
    subregion: "Eastern Asia",
    population: 124516650,
    coordinates: { lat: 36, lng: 138 },
    flag: {
      emoji: "🇯🇵",
      svgUrl: null,
      pngUrl: null,
      description: null,
    },
    languages: [
      {
        name: "Japanese",
        nativeName: "日本語",
        iso6391: "ja",
        iso6393: "jpn",
      },
    ],
    currencies: [{ code: "JPY", name: "Japanese yen", symbol: "¥" }],
  },
  {
    code: "ZA",
    alpha3Code: "ZAF",
    name: "África do Sul",
    officialName: "República da África do Sul",
    capitals: ["Pretoria", "Cape Town", "Bloemfontein"],
    region: "Africa",
    subregion: "Southern Africa",
    population: 60414495,
    coordinates: { lat: -29, lng: 24 },
    flag: {
      emoji: "🇿🇦",
      svgUrl: null,
      pngUrl: null,
      description: null,
    },
    languages: [],
    currencies: [{ code: "ZAR", name: "South African rand", symbol: "R" }],
  },
];
