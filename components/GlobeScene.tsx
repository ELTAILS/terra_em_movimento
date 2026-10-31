"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import GlobeFallback from "@/components/GlobeFallback";
import {
  parseGeoJson,
  type GeoJsonFeature,
} from "@/lib/globe-data";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <GlobeFallback kind="loading" />,
});

const FALLBACK_COLORS = {
  primary: "rgb(56, 189, 248)",
  surface: "rgb(14, 22, 37)",
  border: "rgb(38, 52, 73)",
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
  };
}

function supportsWebgl() {
  const canvas = document.createElement("canvas");

  return Boolean(
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
  );
}

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [features, setFeatures] = useState<GeoJsonFeature[]>([]);
  const [size, setSize] = useState({ width: 0, height: 480 });
  const [error, setError] = useState<string | null>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [colors, setColors] = useState(FALLBACK_COLORS);

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
      setSize({
        width: Math.max(0, Math.floor(width)),
        height: Math.max(480, Math.floor(height)),
      });
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

  return (
    <div ref={containerRef} className="min-h-120 w-full overflow-hidden">
      {webglAvailable === false ? (
        <GlobeFallback kind="webgl" />
      ) : error ? (
        <GlobeFallback kind="error" message={error} />
      ) : webglAvailable === null || features.length === 0 || size.width === 0 ? (
        <GlobeFallback kind="loading" />
      ) : (
        <>
          <Globe
            width={size.width}
            height={size.height}
            backgroundColor="rgba(0, 0, 0, 0)"
            globeImageUrl={null}
            showAtmosphere
            atmosphereColor={colors.primary}
            atmosphereAltitude={0.12}
            polygonsData={features}
            polygonCapColor={() => colors.surface}
            polygonSideColor={() => colors.border}
            polygonStrokeColor={() => colors.primary}
            polygonAltitude={0.012}
            polygonsTransitionDuration={0}
          />
          <p className="sr-only">
            O globo é uma visualização interativa. Para navegar pela lista com
            teclado, acesse <a href="/paises">Países</a>.
          </p>
          <p className="mt-2 text-center text-sm text-muted">
            Para navegar pela lista com teclado,{" "}
            <a
              className="font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              href="/paises"
            >
              acesse Países
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
