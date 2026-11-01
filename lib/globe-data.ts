export type GeoJsonGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

export type GeoJsonFeature = {
  type: "Feature";
  properties?: Record<string, unknown> | null;
  geometry: GeoJsonGeometry;
};

export type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
};

export type GlobePolygon = {
  feature: GeoJsonFeature;
  country: CountryCardView | null;
};

export type GlobeDataLink = {
  polygons: GlobePolygon[];
  unmatchedFeatureCodes: string[];
  countriesWithoutPolygon: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGeometry(value: unknown): value is GeoJsonGeometry {
  if (!isRecord(value)) {
    return false;
  }

  return (
    (value.type === "Polygon" || value.type === "MultiPolygon") &&
    Array.isArray(value.coordinates)
  );
}

function isFeature(value: unknown): value is GeoJsonFeature {
  if (!isRecord(value) || value.type !== "Feature") {
    return false;
  }

  return isGeometry(value.geometry);
}

export function parseGeoJson(value: unknown): GeoJsonFeatureCollection {
  if (!isRecord(value) || value.type !== "FeatureCollection") {
    throw new Error("O arquivo geográfico não contém uma coleção válida.");
  }

  if (!Array.isArray(value.features)) {
    throw new Error("A coleção geográfica não contém feições válidas.");
  }

  return {
    type: "FeatureCollection",
    features: value.features.filter(isFeature),
  };
}

export function getFeatureCode(feature: GeoJsonFeature): string | null {
  const code = feature.properties?.["ISO3166-1-Alpha-2"];

  return typeof code === "string" && /^[A-Z]{2}$/.test(code.toUpperCase())
    ? code.toUpperCase()
    : null;
}

export function linkFeaturesToCountries(
  features: GeoJsonFeature[],
  countries: CountryCardView[],
): GlobeDataLink {
  const countriesByCode = new Map(
    countries.map((country) => [country.id.toUpperCase(), country]),
  );
  const polygonCodes = new Set<string>();
  const unmatchedFeatureCodes: string[] = [];

  const polygons = features.map((feature) => {
    const featureCode = getFeatureCode(feature);
    const lookupCode = featureCode === "CN-TW" ? "TW" : featureCode;
    const country = lookupCode ? countriesByCode.get(lookupCode) ?? null : null;

    if (lookupCode && country) {
      polygonCodes.add(lookupCode);
    }
    if (!country && featureCode) {
      unmatchedFeatureCodes.push(featureCode);
    }

    return { feature, country };
  });

  return {
    polygons,
    unmatchedFeatureCodes,
    countriesWithoutPolygon: countries
      .filter((country) => !polygonCodes.has(country.id.toUpperCase()))
      .map((country) => country.id),
  };
}
import type { CountryCardView } from "@/lib/country-view";
