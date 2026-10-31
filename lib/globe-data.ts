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

  return typeof code === "string" && /^[A-Z]{2}$/.test(code)
    ? code
    : null;
}
