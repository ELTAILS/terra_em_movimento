import "server-only";

import { cacheLife } from "next/cache";

import { mockCountries } from "@/lib/countries.mock";
import type {
  Country,
  CountryCoordinate,
  CountryCurrency,
  CountryLanguage,
} from "@/types/country";

const API_URL = "https://api.restcountries.com/countries/v5";
const PAGE_SIZE = 100;
const RESPONSE_FIELDS = [
  "names.common",
  "names.official",
  "codes.alpha_2",
  "codes.alpha_3",
  "capitals",
  "region",
  "subregion",
  "population",
  "coordinates",
  "flag.emoji",
  "flag.url_svg",
  "flag.url_png",
  "flag.description",
  "languages",
  "currencies",
].join(",");

type RawCountry = Record<string, unknown>;

type CountriesResult =
  | { status: "success"; countries: Country[] }
  | { status: "error"; error: CountryDataError };

export type CountryDataErrorReason =
  | "missing-key"
  | "unauthorized"
  | "forbidden"
  | "rate-limited"
  | "network"
  | "malformed-response"
  | "empty-collection"
  | "unknown";

export type CountryDataError = {
  reason: CountryDataErrorReason;
  message: string;
};

class CountryFetchError extends Error {
  constructor(
    readonly reason: CountryDataErrorReason,
    readonly status?: number,
  ) {
    super(reason);
    this.name = "CountryFetchError";
  }
}

function isRecord(value: unknown): value is RawCountry {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function isNonNegativeInteger(value: unknown): boolean {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
  );
}

function readRecord(value: unknown): RawCountry | null {
  return isRecord(value) ? value : null;
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function readCapitalNames(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((capital) => readString(readRecord(capital)?.name))
    .filter((name): name is string => name !== null);
}

function readCoordinate(value: unknown): CountryCoordinate | null {
  const record = readRecord(value);
  const lat = readNumber(record?.lat);
  const lng = readNumber(record?.lng);

  return lat !== null && lng !== null ? { lat, lng } : null;
}

function normalizeLanguage(value: unknown): CountryLanguage | null {
  const record = readRecord(value);
  const name = readString(record?.name);

  if (!name) {
    return null;
  }

  return {
    name,
    nativeName: readString(record?.native_name),
    iso6391: readString(record?.iso639_1),
    iso6393: readString(record?.iso639_3),
  };
}

function normalizeCurrency(value: unknown): CountryCurrency | null {
  const record = readRecord(value);
  const code = readString(record?.code);
  const name = readString(record?.name);
  const symbol = readString(record?.symbol);

  if (!code && !name && !symbol) {
    return null;
  }

  return { code, name, symbol };
}

function normalizeCountry(value: unknown): Country | null {
  const record = readRecord(value);
  const names = readRecord(record?.names);
  const codes = readRecord(record?.codes);
  const code = readString(codes?.alpha_2)?.toUpperCase();
  const name = readString(names?.common);

  if (!code || !/^[A-Z]{2}$/.test(code) || !name) {
    return null;
  }

  const flag = readRecord(record?.flag);
  const rawLanguages = Array.isArray(record?.languages)
    ? record.languages
    : [];
  const rawCurrencies = Array.isArray(record?.currencies)
    ? record.currencies
    : [];

  return {
    code,
    alpha3Code: readString(codes?.alpha_3)?.toUpperCase() ?? null,
    name,
    officialName: readString(names?.official),
    capitals: readStringArray(record?.capitals).concat(
      readCapitalNames(record?.capitals),
    ),
    region: readString(record?.region),
    subregion: readString(record?.subregion),
    population: readNumber(record?.population),
    coordinates: readCoordinate(record?.coordinates),
    flag: {
      emoji: readString(flag?.emoji),
      svgUrl: readString(flag?.url_svg),
      pngUrl: readString(flag?.url_png),
      description: readString(flag?.description),
    },
    languages: rawLanguages
      .map(normalizeLanguage)
      .filter((language): language is CountryLanguage => language !== null),
    currencies: rawCurrencies
      .map(normalizeCurrency)
      .filter((currency): currency is CountryCurrency => currency !== null),
  };
}

function normalizePage(value: unknown): {
  countries: Country[];
  more: boolean;
} {
  const root = readRecord(value);
  const data = readRecord(root?.data);
  const objects = data?.objects;
  const meta = readRecord(data?.meta);

  if (
    !Array.isArray(objects) ||
    typeof meta?.more !== "boolean" ||
    !isNonNegativeInteger(meta.total) ||
    !isNonNegativeInteger(meta.count) ||
    !isNonNegativeInteger(meta.limit) ||
    !isNonNegativeInteger(meta.offset)
  ) {
    throw new CountryFetchError("malformed-response");
  }

  return {
    countries: objects
      .map(normalizeCountry)
      .filter((country): country is Country => country !== null),
    more: meta.more,
  };
}

async function fetchCountriesPage(apiKey: string, offset: number): Promise<{
  countries: Country[];
  more: boolean;
}> {
  const params = new URLSearchParams({
    response_fields: RESPONSE_FIELDS,
    limit: String(PAGE_SIZE),
    offset: String(offset),
  });

  let response: Response;

  try {
    response = await fetch(`${API_URL}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  } catch {
    throw new CountryFetchError("network");
  }

  console.log("REST Countries request", {
    offset,
    status: response.status,
  });

  if (response.status === 401) {
    throw new CountryFetchError("unauthorized", response.status);
  }
  if (response.status === 403) {
    throw new CountryFetchError("forbidden", response.status);
  }
  if (response.status === 429) {
    throw new CountryFetchError("rate-limited", response.status);
  }
  if (!response.ok) {
    throw new CountryFetchError("unknown", response.status);
  }

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new CountryFetchError("malformed-response", response.status);
  }

  return normalizePage(body);
}

async function getCachedCountries(): Promise<Country[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 172800, expire: 259200 });

  const apiKey = process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    throw new CountryFetchError("missing-key");
  }

  const countries: Country[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const page = await fetchCountriesPage(apiKey, offset);
    countries.push(...page.countries);
    more = page.more;
    offset += PAGE_SIZE;
  }

  if (countries.length === 0) {
    throw new CountryFetchError("empty-collection");
  }

  return countries;
}

function errorMessage(reason: CountryDataErrorReason): string {
  switch (reason) {
    case "missing-key":
      return "A chave da REST Countries não está configurada.";
    case "unauthorized":
    case "forbidden":
      return "A chave da REST Countries foi recusada.";
    case "rate-limited":
      return "A REST Countries atingiu o limite de requisições.";
    case "network":
      return "Não foi possível conectar à REST Countries.";
    case "malformed-response":
      return "A REST Countries retornou dados inesperados.";
    case "empty-collection":
      return "A REST Countries não retornou países.";
    default:
      return "Não foi possível carregar os países.";
  }
}

function toDataError(error: unknown): CountryDataError {
  const reason =
    error instanceof CountryFetchError ? error.reason : "unknown";

  return { reason, message: errorMessage(reason) };
}

export async function getCountries(): Promise<CountriesResult> {
  if (!process.env.REST_COUNTRIES_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "REST Countries API key missing; using the development-only mock.",
      );
      return { status: "success", countries: mockCountries };
    }

    return {
      status: "error",
      error: {
        reason: "missing-key",
        message: errorMessage("missing-key"),
      },
    };
  }

  try {
    return { status: "success", countries: await getCachedCountries() };
  } catch (error) {
    return { status: "error", error: toDataError(error) };
  }
}