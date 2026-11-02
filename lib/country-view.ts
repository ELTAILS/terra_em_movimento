import type { Country } from "@/types/country";

export type CountryCardView = {
  id: string;
  name: string;
  commonName: string;
  officialName: string;
  region: string;
  regionKey: string | null;
  subregion: string;
  code: string;
  numericCode: string | null;
  flagUrl: string | null;
  flagEmoji: string | null;
  flagAlt: string;
  capital: string;
  capitals: string[];
  languages: { name: string; nativeName: string | null }[];
  currency: string;
  currencies: string[];
  population: string;
  populationValue: number | null;
  timezone: string;
  timezones: string[];
  coordinates: string;
  searchText: string;
};

const regionNames: Record<string, string> = {
  Africa: "África",
  Americas: "América",
  Asia: "Ásia",
  Europe: "Europa",
  Oceania: "Oceania",
  Antarctic: "Antártida",
  Antarctica: "Antártida",
};

const subregionNames: Record<string, string> = {
  "South America": "América do Sul",
  "Central America": "América Central",
  "North America": "América do Norte",
  "Caribbean": "Caribe",
  "Northern Europe": "Europa do Norte",
  "Southern Europe": "Europa do Sul",
  "Eastern Europe": "Europa Oriental",
  "Western Europe": "Europa Ocidental",
  "Central Europe": "Europa Central",
  "Southeast Europe": "Europa do Sudeste",
  "Northern Africa": "África do Norte",
  "Southern Africa": "África Austral",
  "Eastern Africa": "África Oriental",
  "Middle Africa": "África Central",
  "Western Africa": "África Ocidental",
  "Eastern Asia": "Ásia Oriental",
  "South-Eastern Asia": "Sudeste Asiático",
  "Southern Asia": "Ásia Meridional",
  "Central Asia": "Ásia Central",
  "Western Asia": "Ásia Ocidental",
  "Australia and New Zealand": "Austrália e Nova Zelândia",
  "Melanesia": "Melanésia",
  "Micronesia": "Micronésia",
  "Polynesia": "Polinésia",
};

const displayNames = new Intl.DisplayNames("pt-BR", {
  type: "region",
});
const currencyNames = new Intl.DisplayNames("pt-BR", {
  type: "currency",
});
const languageNames = new Intl.DisplayNames("pt-BR", {
  type: "language",
});
const numberFormat = new Intl.NumberFormat("pt-BR");

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR");
}

function countryName(country: Country) {
  try {
    return displayNames.of(country.code) ?? country.name;
  } catch {
    return country.name;
  }
}

function currencyName(code: string | null, fallback: string | null) {
  if (!code) {
    return fallback ?? "Não informado";
  }

  try {
    return currencyNames.of(code) ?? fallback ?? code;
  } catch {
    return fallback ?? code;
  }
}

function formatCurrency(country: Country) {
  const first = country.currencies[0];
  if (!first) {
    return "Não informado";
  }

  const code = first.code?.toUpperCase() ?? null;
  const label = currencyName(code, first.name);
  const extra = country.currencies.length > 1
    ? ` +${country.currencies.length - 1}`
    : "";

  return `${label}${code ? ` (${code})` : ""}${extra}`;
}

function formatCurrencies(country: Country) {
  return country.currencies.map((currency) => {
    const code = currency.code?.toUpperCase() ?? null;
    const label = currencyName(code, currency.name);
    return `${label}${code ? ` (${code})` : ""}`;
  });
}

function formatLanguages(country: Country) {
  return country.languages.map((language) => {
    const languageCode = language.iso6391 ?? language.iso6393;
    let name = language.name;

    if (languageCode) {
      try {
        name = languageNames.of(languageCode) ?? language.name;
      } catch {
        name = language.name;
      }
    }

    return {
      name: name.charAt(0).toLocaleUpperCase("pt-BR") + name.slice(1),
      nativeName: language.nativeName,
    };
  });
}

function formatCoordinates(country: Country) {
  if (!country.coordinates) {
    return "COORD: —";
  }

  const latitude = Math.abs(country.coordinates.lat).toFixed(2);
  const longitude = Math.abs(country.coordinates.lng).toFixed(2);
  const latitudeHemisphere = country.coordinates.lat >= 0 ? "N" : "S";
  const longitudeHemisphere = country.coordinates.lng >= 0 ? "E" : "W";

  return `COORD: ${latitude}° ${latitudeHemisphere}, ${longitude}° ${longitudeHemisphere}`;
}

export function toCountryCardView(country: Country): CountryCardView {
  const name = countryName(country);
  const region = country.region
    ? regionNames[country.region] ?? country.region
    : "Não informado";
  const subregion = country.subregion
    ? subregionNames[country.subregion] ?? country.subregion
    : "Não informado";
  const capital = country.capitals.length > 0
    ? country.capitals.join(", ")
    : "Não informado";
  const timezone = country.timezones.length === 1
    ? country.timezones[0]
    : country.timezones.length > 1
      ? `${country.timezones.length} fusos`
      : "Não informado";
  const searchText = normalizeSearchText([
    name,
    country.name,
    country.officialName ?? "",
    country.capitals.join(" "),
    country.region ?? "",
    country.subregion ?? "",
    region,
    subregion,
    country.code,
    country.alpha3Code ?? "",
  ].join(" "));

  return {
    id: country.code,
    name,
    commonName: country.name,
    officialName: country.officialName ?? "Não informado",
    region,
    regionKey: country.region,
    subregion,
    code: country.alpha3Code ?? country.code,
    numericCode: country.numericCode,
    flagUrl: country.flag.svgUrl ?? country.flag.pngUrl,
    flagEmoji: country.flag.emoji,
    flagAlt: country.flag.description ?? `Bandeira de ${name}`,
    capital,
    capitals: country.capitals,
    languages: formatLanguages(country),
    currency: formatCurrency(country),
    currencies: formatCurrencies(country),
    population: country.population === null
      ? "Não informado"
      : numberFormat.format(country.population),
    populationValue: country.population,
    timezone,
    timezones: country.timezones,
    coordinates: formatCoordinates(country),
    searchText,
  };
}

export function toCountryCardViews(countries: Country[]) {
  return countries.map(toCountryCardView);
}
