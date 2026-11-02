"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { GlobeMethods } from "react-globe.gl";

import GlobeFallback from "@/components/GlobeFallback";
import CountryDetails from "@/components/CountryDetails";
import {
  linkFeaturesToCountries,
  parseGeoJson,
  type GeoJsonFeature,
  type GlobePolygon,
} from "@/lib/globe-data";
import type { CountryCardView } from "@/lib/country-view";
import {
  consumeRequest,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/lib/globe-intent";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <GlobeFallback kind="loading" />,
});

const FALLBACK_COLORS = {
  primary: "rgb(56, 189, 248)",
  surface: "rgb(14, 22, 37)",
  border: "rgb(38, 52, 73)",
  selected: "rgb(45, 212, 191)",
  neutral: "rgb(38, 52, 73)",
};

type GlobeSceneProps = {
  countries: CountryCardView[];
  coordinates: Record<string, { lat: number; lng: number } | null>;
  onSelect?: (country: CountryCardView | null) => void;
};

type MaterialHolder = {
  material?: {
    shininess?: number;
    needsUpdate?: boolean;
  };
};

type GlobeGeometry = {
  type: string;
  coordinates: number[];
};

function readToken(name: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim() || fallback;
}

function getGlobeColors() {
  return {
    primary: readToken("--primary", FALLBACK_COLORS.primary),
    surface: readToken("--surface", FALLBACK_COLORS.surface),
    border: readToken("--border", FALLBACK_COLORS.border),
    selected: readToken("--secondary", FALLBACK_COLORS.selected),
    neutral: readToken("--border", FALLBACK_COLORS.neutral),
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

let webglSupportCache: boolean | null = null;

function supportsWebgl() {
  if (webglSupportCache !== null) {
    return webglSupportCache;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl") ??
    canvas.getContext("experimental-webgl");

  if (
    !context ||
    typeof WebGLRenderingContext === "undefined" ||
    !(context instanceof WebGLRenderingContext)
  ) {
    webglSupportCache = false;
    return false;
  }

  context.getExtension("WEBGL_lose_context")?.loseContext();
  webglSupportCache = true;
  return true;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isGlobePolygon(value: object): value is GlobePolygon {
  return (
    "feature" in value &&
    "country" in value &&
    typeof value.feature === "object" &&
    value.feature !== null
  );
}

export default function GlobeScene({
  countries,
  coordinates,
  onSelect,
}: GlobeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [features, setFeatures] = useState<GeoJsonFeature[]>([]);
  const [size, setSize] = useState({ width: 0, height: 480 });
  const [error, setError] = useState<string | null>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [colors, setColors] = useState(FALLBACK_COLORS);
  const [selectedCountry, setSelectedCountry] = useState<CountryCardView | null>(
    null,
  );
  const [hoveredCountry, setHoveredCountry] = useState<CountryCardView | null>(
    null,
  );
  const [globeReady, setGlobeReady] = useState(false);
  const selectedRef = useRef<CountryCardView | null>(null);
  const globeRequest = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [globeKey, setGlobeKey] = useState(0);
  const releaseRendererRef = useRef<(() => void) | null>(null);
  const releaseRenderer = useCallback(() => {
    releaseRendererRef.current?.();
  }, []);

  useEffect(() => {
    selectedRef.current = selectedCountry;
  }, [selectedCountry]);

  // Quando a página é escondida (o Next preserva o estado) ou desmontada, a
  // instância do globo é destruída e depois recriada. Até o próximo
  // onGlobeReady, o globo não está pronto: sem isto, o pedido de "Explorar
  // país" roda antes da nova instância e a câmera não voa.
  useEffect(
      () => () => {
        releaseRenderer();
        setGlobeReady(false);
      },
      [releaseRenderer],
    );

  const linkedData = useMemo(
    () => linkFeaturesToCountries(features, countries),
    [countries, features],
  );
  const polygonsData = useMemo(() => linkedData.polygons, [linkedData.polygons]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setWebglAvailable(supportsWebgl());
      setColors(getGlobeColors());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      const nextSize = {
        width: Math.max(0, Math.floor(width)),
        height: Math.max(480, Math.floor(height)),
      };

      setSize((currentSize) =>
        currentSize.width === nextSize.width &&
        currentSize.height === nextSize.height
          ? currentSize
          : nextSize,
      );
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (webglAvailable !== true) {
      return;
    }

    const controller = new AbortController();

    async function loadGeoJson() {
      try {
        const response = await fetch("/data/countries.geojson", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("O arquivo geográfico não respondeu corretamente.");
        }

        const collection = parseGeoJson(await response.json());
        setFeatures(collection.features);
        if (process.env.NODE_ENV === "development") {
          console.info("Globo: dados geográficos recebidos", {
            features: collection.features.length,
          });
        }
      } catch (loadError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Não foi possível validar o arquivo geográfico.",
        );
      }
    }

    void loadGeoJson();

    return () => controller.abort();
  }, [webglAvailable]);

  const setGlobeRotation = useCallback((enabled: boolean) => {
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.autoRotate = enabled;
    }
  }, []);

  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    globe.pointOfView({ altitude: 3 });
    const softenMaterial = (object: MaterialHolder) => {
      if (!object.material) {
        return;
      }

      object.material.shininess = 0;
      object.material.needsUpdate = true;
    };
    globe.scene().traverse(softenMaterial);

    const controls = globe.controls();
    controls.autoRotateSpeed = 0.3;

    // A instância é recriada ao reexibir a página: restaurar o país selecionado
    // (o estado é preservado) e não religar a rotação sobre ele.
    const current = selectedRef.current;
    const point = current ? coordinates[current.id] : null;
    if (point) {
      globe.pointOfView({ lat: point.lat, lng: point.lng, altitude: 2.2 }, 0);
    }
    controls.autoRotate = !prefersReducedMotion() && current === null;

    if (process.env.NODE_ENV === "development") {
      console.info("Globo: exceções de associação", {
        unmatchedFeatureCodes: linkedData.unmatchedFeatureCodes,
        countriesWithoutPolygon: linkedData.countriesWithoutPolygon,
      });
    }
    // Libera o contexto WebGL de forma determinística (evita acumular
    // contextos ao entrar e sair do Mundo várias vezes) e recria o globo se o
    // navegador o perder: sem isso ele fica invisível, embora o hover continue
    // funcionando.
    releaseRendererRef.current?.();
    const renderer = globe.renderer();
    const canvas = renderer.domElement;
    let recreateTimer: number | undefined;
    const handleLost = () => {
      console.warn("Globo: contexto WebGL perdido; recriando o globo.");
      window.clearTimeout(recreateTimer);
      recreateTimer = window.setTimeout(() => {
        releaseRendererRef.current?.();
        setGlobeReady(false);
        setGlobeKey((key) => key + 1);
      }, 800);
    };
    const handleRestored = () => window.clearTimeout(recreateTimer);
    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);
    releaseRendererRef.current = () => {
      window.clearTimeout(recreateTimer);
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
      renderer.forceContextLoss();
      releaseRendererRef.current = null;
    };
    setGlobeReady(true);
  }, [coordinates, linkedData.countriesWithoutPolygon, linkedData.unmatchedFeatureCodes]);

  const handleHover = useCallback(
    (polygon: object | null) => {
      const country = polygon && isGlobePolygon(polygon)
        ? polygon.country
        : null;
      setHoveredCountry(country);
      setGlobeRotation(country === null && selectedCountry === null);
    },
    [selectedCountry, setGlobeRotation],
  );

  const selectCountry = useCallback(
    (country: CountryCardView) => {
      setSelectedCountry(country);
      setHoveredCountry(null);
      setGlobeRotation(false);
      onSelect?.(country);

      const point = coordinates[country.id];
      if (point) {
        globeRef.current?.pointOfView(
          { lat: point.lat, lng: point.lng, altitude: 2.2 },
          prefersReducedMotion() ? 0 : 900,
        );
      }
    },
    [coordinates, onSelect, setGlobeRotation],
  );

  const handleClick = useCallback(
    (polygon: object) => {
      if (!isGlobePolygon(polygon) || !polygon.country) {
        return;
      }

      selectCountry(polygon.country);
    },
    [selectCountry],
  );

  useEffect(() => {
    if (!globeReady || polygonsData.length === 0 || !globeRequest) {
      return;
    }

    const country = countries.find((item) => item.id === globeRequest.countryId);
    consumeRequest();
    if (country) {
      queueMicrotask(() => selectCountry(country));
    }
  }, [countries, globeReady, globeRequest, polygonsData.length, selectCountry]);

  const clearSelection = useCallback(() => {
    setSelectedCountry(null);
    setGlobeRotation(!prefersReducedMotion());
    onSelect?.(null);
  }, [onSelect, setGlobeRotation]);

  const polygonGeometry = useCallback(
    (polygon: object): GlobeGeometry =>
      isGlobePolygon(polygon)
        ? polygon.feature.geometry as unknown as GlobeGeometry
        : { type: "Polygon", coordinates: [] },
    [],
  );
  const polygonCapColor = useCallback(
    (polygon: object) => {
      if (!isGlobePolygon(polygon) || polygon.country === null) {
        return colors.neutral;
      }

      return polygon.country.id === selectedCountry?.id
        ? colors.selected
        : polygon.country.id === hoveredCountry?.id
          ? colors.primary
          : colors.surface;
    },
    [colors, hoveredCountry?.id, selectedCountry?.id],
  );
  const polygonSideColor = useCallback(
    (polygon: object) =>
      !isGlobePolygon(polygon) || polygon.country === null
        ? colors.neutral
        : colors.border,
    [colors],
  );
  const polygonStrokeColor = useCallback(
    (polygon: object) =>
      !isGlobePolygon(polygon) || polygon.country === null
        ? false
        : colors.primary,
    [colors],
  );
  const polygonAltitude = useCallback(
    (polygon: object) =>
      isGlobePolygon(polygon) &&
      polygon.country?.id === selectedCountry?.id
        ? 0.04
        : 0.012,
    [selectedCountry?.id],
  );
  const polygonLabel = useCallback((polygon: object) => {
    if (!isGlobePolygon(polygon) || !polygon.country) return "";

    const { flagUrl, name } = polygon.country;

    const flag = flagUrl && flagUrl.startsWith("https://")
      ? `<img src="${escapeHtml(flagUrl)}" alt="" width="24" height="16" style="display:inline-block;vertical-align:middle;margin-right:6px;border-radius:2px" />`
      : "";

    return `<div>${flag}${escapeHtml(name)}</div>`;
  }, []);

  useEffect(() => {
    if (!globeReady) {
      return;
    }

    const controls = globeRef.current?.controls();
    if (!controls) {
      return;
    }

    const pause = () => setGlobeRotation(false);
    const resume = () => {
      if (!selectedCountry && !prefersReducedMotion()) {
        setGlobeRotation(true);
      }
    };
    controls.addEventListener("start", pause);
    controls.addEventListener("end", resume);

    return () => {
      controls.removeEventListener("start", pause);
      controls.removeEventListener("end", resume);
    };
  }, [globeReady, selectedCountry, setGlobeRotation]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-[clamp(30rem,70dvh,52rem)] w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          {webglAvailable === false ? (
            <GlobeFallback kind="webgl" />
          ) : error ? (
            <GlobeFallback kind="error" message={error} />
          ) : webglAvailable === null || polygonsData.length === 0 ||
            size.width === 0 ? (
            <GlobeFallback kind="loading" />
          ) : (
            <Globe
              key={globeKey}
              ref={globeRef}
              width={size.width}
              height={size.height}
              backgroundColor="rgba(0, 0, 0, 0)"
              globeImageUrl={null}
              showAtmosphere
              atmosphereColor={colors.primary}
              atmosphereAltitude={0.12}
              polygonsData={polygonsData}
              polygonGeoJsonGeometry={polygonGeometry}
              polygonCapColor={polygonCapColor}
              polygonSideColor={polygonSideColor}
              polygonStrokeColor={polygonStrokeColor}
              polygonAltitude={polygonAltitude}
              polygonLabel={polygonLabel}
              onPolygonHover={handleHover}
              onPolygonClick={handleClick}
              showPointerCursor={(objectType, objectData) =>
                objectType === "polygon" &&
                isGlobePolygon(objectData) &&
                Boolean(objectData.country)
              }
              onGlobeReady={handleGlobeReady}
              polygonsTransitionDuration={0}
            />
          )}
        </div>
        {selectedCountry ? (
          <CountryDetails
            country={selectedCountry}
            onClose={clearSelection}
            className="absolute inset-x-3 bottom-3 z-10 sm:bottom-3 sm:left-auto sm:right-3 sm:top-3 sm:h-[calc(100%-1.5rem)] sm:max-h-[calc(100%-1.5rem)] sm:w-[min(24rem,calc(100%-1.5rem))]"
          />
        ) : null}
      </div>
      <div className="sr-only" aria-live="polite">
        <p>
          {selectedCountry
            ? `País selecionado: ${selectedCountry.name}`
            : "Nenhum país selecionado"}
        </p>
      </div>
      <p className="mt-2 text-center text-sm text-muted">
        Para navegar pela lista com teclado,{" "}
        <Link
          className="font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          href="/paises"
        >
          acesse Países
        </Link>
        .
      </p>
    </>
  );
}
