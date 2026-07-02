"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type {
  ExpressionSpecification,
  GeoJSONSource,
  Map as MapboxMap,
} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContactForm } from "@/components/site/contact-form-provider";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import type { SiteLanguage } from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./service-page.module.css";

type ServicePageProps = {
  language: SiteLanguage;
  page: SitePage;
};

type ServiceCenter = {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number];
  active?: boolean;
};

type RenderedPointFeature = {
  geometry: {
    coordinates: unknown;
    type: string;
  };
  properties?: Record<string, unknown>;
};

const heroServices = [
  { title: "Складний ремонт автотехніки", compact: true },
  { title: "Монтаж додаткового обладнання", compact: false },
  { title: "Гарантійний та постгарантійний ремонт", compact: false },
  { title: "Регламентне ТО", compact: true },
] as const;

const MAPBOX_STYLE = "mapbox://styles/avtospecprom26/cmr0zc7p3007a01qqeapjbq69";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAP_SOURCE_ID = "service-centers";
const MAP_CLUSTER_CIRCLE_ID = "service-centers-clusters";
const MAP_CLUSTER_COUNT_ID = "service-centers-cluster-count";
const MAP_POINT_SYMBOL_ID = "service-centers-points";
const MAP_MARKER_IMAGE_ID = "service-centers-marker";
const MAP_MARKER_ACTIVE_IMAGE_ID = "service-centers-marker-active";
const MAP_DEFAULT_CENTER: [number, number] = [30.14335, 49.059410074170074];
const MAP_DEFAULT_ZOOM = 5.464574754416704;
const MAP_CITY_BOUNDS_PADDING = 24;
const MAP_CITY_MAX_ZOOM = 10.2;

const UKRAINIAN_LABEL_FIELD: ExpressionSpecification = [
  "coalesce",
  ["get", "name_uk"],
  ["get", "name:uk"],
  ["get", "name"],
  ["get", "name_en"],
];

const serviceCenters: ServiceCenter[] = [
  {
    id: "if-modern-auto",
    city: "ІВАНО-ФРАНКІВСЬК",
    name: 'ТОВ "Модерн-авто"',
    address: "вул. Надрічна, 42",
    phone: "+38(0342)55-21-10",
    coordinates: [24.6931, 48.9215],
  },
  {
    id: "kyiv-stolytsia",
    city: "КИЇВ",
    name: 'ТОВ "Автоцентр Столиця"',
    address: "вул. Велика Кільцева, 58",
    phone: "+38(044)390-71-90",
    coordinates: [30.3592, 50.4017],
  },
  {
    id: "lviv-zakhid",
    city: "ЛЬВІВ",
    name: 'ТОВ "Автосервіс Захід"',
    address: "вул. Городоцька, 48",
    phone: "+38(032)240-31-20",
    coordinates: [24.0129, 49.8385],
    active: true,
  },
  {
    id: "kharkiv-auto",
    city: "ХАРКІВ",
    name: 'ТОВ "Харків-Авто"',
    address: "просп. Гагаріна, 314Б",
    phone: "+38(057)732-43-11",
    coordinates: [36.2738, 49.9083],
  },
  {
    id: "odesa-motors",
    city: "ОДЕСА",
    name: 'ТОВ "Одеса Моторс"',
    address: "вул. Балківська, 115",
    phone: "+38(048)734-22-05",
    coordinates: [30.7106, 46.4688],
  },
  {
    id: "chernihiv-autoinvest",
    city: "ЧЕРНІГІВ",
    name: 'ДП ТОВ "Девелопмент макс ЛЛС " Автоінвестстрой-Чернігів"',
    address: "просп. Миру, 231",
    phone: "+38(0462)77-48-12",
    coordinates: [31.3082, 51.5217],
  },
  {
    id: "kyiv-auto-center",
    city: "КИЇВ",
    name: 'ТОВ "Київ Автоцентр"',
    address: "просп. Степана Бандери, 24Д",
    phone: "+38(044)499-80-88",
    coordinates: [30.4941, 50.4869],
  },
  {
    id: "lviv-auto-service",
    city: "ЛЬВІВ",
    name: 'ТОВ "Львівський Автосервіс"',
    address: "вул. Липинського, 50Б",
    phone: "+38(032)252-11-08",
    coordinates: [24.0292, 49.8695],
  },
  {
    id: "dnipro-auto-service",
    city: "ДНІПРО",
    name: 'ТОВ "Дніпро Авто Сервіс"',
    address: "вул. Запорізьке шосе, 37Д",
    phone: "+38(056)790-52-30",
    coordinates: [35.0445, 48.4123],
  },
  {
    id: "vinnytsia-podillia",
    city: "ВІННИЦЯ",
    name: 'ТОВ "Поділля Автосервіс"',
    address: "Хмельницьке шосе, 114В",
    phone: "+38(0432)50-88-19",
    coordinates: [28.4258, 49.2280],
  },
  {
    id: "poltava-center",
    city: "ПОЛТАВА",
    name: 'ТОВ "Полтава Автоцентр"',
    address: "вул. Харківське шосе, 13",
    phone: "+38(0532)61-44-70",
    coordinates: [34.5752, 49.6035],
  },
  {
    id: "cherkasy-auto",
    city: "ЧЕРКАСИ",
    name: 'ТОВ "Черкаси Авто"',
    address: "просп. Хіміків, 74",
    phone: "+38(0472)64-05-33",
    coordinates: [32.0232, 49.4188],
  },
  {
    id: "zhytomyr-autodim",
    city: "ЖИТОМИР",
    name: 'ТОВ "Житомирський Автодім"',
    address: "просп. Незалежності, 57",
    phone: "+38(0412)42-67-15",
    coordinates: [28.6856, 50.2767],
  },
] as const;

function getCenterKey(item: ServiceCenter) {
  return item.id;
}

function localizeMapLabels(map: MapboxMap) {
  const style = map.getStyle();
  const excludedLayerIds = new Set([MAP_CLUSTER_COUNT_ID]);

  style.layers?.forEach((layer) => {
    if (layer.type !== "symbol" || !layer.layout || !("text-field" in layer.layout)) {
      return;
    }

    if (excludedLayerIds.has(layer.id)) {
      return;
    }

    try {
      map.setLayoutProperty(layer.id, "text-field", UKRAINIAN_LABEL_FIELD);
    } catch {
      // Ignore layers that do not allow overriding text-field in the current style.
    }
  });
}

function buildServiceCentersGeoJson(
  points: ServiceCenter[],
  activeCenterKey: string | null = null,
) {
  return {
    type: "FeatureCollection" as const,
    features: points.map((point) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: point.coordinates,
      },
      properties: {
        id: point.id,
        city: point.city,
        name: point.name,
        address: point.address,
        phone: point.phone,
        isActive: point.id === activeCenterKey,
      },
    })),
  };
}

function ensureServiceCenterLayers(map: MapboxMap) {
  if (!map.hasImage(MAP_MARKER_IMAGE_ID)) {
    map.loadImage("/mapbox/marker-kyiv.png", (error, image) => {
      if (error || !image || map.hasImage(MAP_MARKER_IMAGE_ID)) {
        return;
      }

      map.addImage(MAP_MARKER_IMAGE_ID, image);
      ensureServiceCenterLayers(map);
    });
    return;
  }

  if (!map.hasImage(MAP_MARKER_ACTIVE_IMAGE_ID)) {
    map.loadImage("/mapbox/marker-kyiv-active.png", (error, image) => {
      if (error || !image || map.hasImage(MAP_MARKER_ACTIVE_IMAGE_ID)) {
        return;
      }

      map.addImage(MAP_MARKER_ACTIVE_IMAGE_ID, image);
      ensureServiceCenterLayers(map);
    });
    return;
  }

  if (!map.getSource(MAP_SOURCE_ID)) {
    map.addSource(MAP_SOURCE_ID, {
      type: "geojson",
      data: buildServiceCentersGeoJson(serviceCenters),
      cluster: true,
      clusterRadius: 54,
      clusterMaxZoom: 8,
    });
  }

  if (!map.getLayer(MAP_CLUSTER_CIRCLE_ID)) {
    map.addLayer({
      id: MAP_CLUSTER_CIRCLE_ID,
      type: "circle",
      source: MAP_SOURCE_ID,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": "#FD3626",
        "circle-radius": ["step", ["get", "point_count"], 22, 5, 26, 10, 30],
        "circle-stroke-color": "#FFFFFF",
        "circle-stroke-width": 2,
      },
    });
  }

  if (!map.getLayer(MAP_CLUSTER_COUNT_ID)) {
    map.addLayer({
      id: MAP_CLUSTER_COUNT_ID,
      type: "symbol",
      source: MAP_SOURCE_ID,
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": 18,
      },
      paint: {
        "text-color": "#FFFFFF",
      },
    });
  }

  if (!map.getLayer(MAP_POINT_SYMBOL_ID)) {
    map.addLayer({
      id: MAP_POINT_SYMBOL_ID,
      type: "symbol",
      source: MAP_SOURCE_ID,
      filter: ["!", ["has", "point_count"]],
      layout: {
        "icon-image": [
          "case",
          ["boolean", ["get", "isActive"], false],
          MAP_MARKER_ACTIVE_IMAGE_ID,
          MAP_MARKER_IMAGE_ID,
        ],
        "icon-size": 1,
        "icon-allow-overlap": true,
        "icon-anchor": "center",
      },
    });
  }
}

function HeroServiceGrid() {
  return (
    <div className={styles.heroServicesGrid}>
      {heroServices.map((item) => (
        <div
          key={item.title}
          className={
            item.compact ? styles.heroServiceRowCompact : styles.heroServiceRowTall
          }
        >
          <span className={styles.heroServiceIcon}>
            <Image
              src="/figma/services-page/tick-square.svg"
              alt=""
              fill
              unoptimized
              className={styles.heroServiceIconAsset}
            />
          </span>
          <p className={styles.heroServiceText}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export function ServicePage({ language, page }: ServicePageProps) {
  const { openContactForm } = useContactForm();
  const [regionQuery, setRegionQuery] = useState("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [activeCenterKey, setActiveCenterKey] = useState<string | null>(null);
  const [isMobileCentersPanelOpen, setIsMobileCentersPanelOpen] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const mapboxRef = useRef<(typeof import("mapbox-gl"))["default"] | null>(null);
  const centerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const normalizedQuery = regionQuery.trim().toLocaleLowerCase("uk-UA");
  const cityOptions = useMemo(
    () => Array.from(new Set(serviceCenters.map((item) => item.city))),
    [],
  );
  const autocompleteOptions = useMemo(
    () => cityOptions.filter((city) => !selectedCities.includes(city)),
    [cityOptions, selectedCities],
  );
  const filteredCenters = useMemo(
    () =>
      serviceCenters.filter((item) => {
        if (!normalizedQuery && selectedCities.length === 0) {
          return true;
        }

        const normalizedCity = item.city.toLocaleLowerCase("uk-UA");

        if (selectedCities.length > 0) {
          const normalizedSelectedCities = selectedCities.map((city) =>
            city.toLocaleLowerCase("uk-UA"),
          );

          return normalizedSelectedCities.some(
            (selectedCity) => normalizedCity === selectedCity,
          );
        }

        return normalizedCity === normalizedQuery;
      }),
    [normalizedQuery, selectedCities],
  );
  const visibleCenterKeys = useMemo(
    () => filteredCenters.map((item) => getCenterKey(item)),
    [filteredCenters],
  );
  const effectiveActiveCenterKey =
    activeCenterKey && (visibleCenterKeys.includes(activeCenterKey) || visibleCenterKeys.length === 0)
      ? activeCenterKey
      : null;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!autocompleteRef.current?.contains(event.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !MAPBOX_TOKEN) {
      return;
    }

    let isCancelled = false;
    let map: MapboxMap | null = null;

    void (async () => {
      const mapboxglModule = await import("mapbox-gl");
      const mapboxgl = mapboxglModule.default;

      if (isCancelled || !mapContainerRef.current || mapRef.current) {
        return;
      }

      mapboxRef.current = mapboxgl;
      mapboxgl.accessToken = MAPBOX_TOKEN;

      map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: MAPBOX_STYLE,
        center: MAP_DEFAULT_CENTER,
        zoom: MAP_DEFAULT_ZOOM,
        minZoom: MAP_DEFAULT_ZOOM,
        pitch: 0,
        bearing: 0,
        attributionControl: true,
      });
      const stableMap = map;

      stableMap.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
          visualizePitch: false,
        }),
        "top-right",
      );

      stableMap.on("load", () => {
        localizeMapLabels(stableMap);
        ensureServiceCenterLayers(stableMap);
      });
      stableMap.on("styledata", () => {
        localizeMapLabels(stableMap);
        ensureServiceCenterLayers(stableMap);
      });
      stableMap.on("click", MAP_CLUSTER_CIRCLE_ID, (event) => {
        const feature = stableMap.queryRenderedFeatures(event.point, {
          layers: [MAP_CLUSTER_CIRCLE_ID],
        })[0] as unknown as RenderedPointFeature | undefined;
        const clusterId = feature?.properties?.cluster_id;
        const source = stableMap.getSource(MAP_SOURCE_ID) as GeoJSONSource | undefined;

        if (typeof clusterId !== "number" || !source) {
          return;
        }

        source.getClusterExpansionZoom(clusterId, (error, zoom) => {
          if (error || !feature || feature.geometry.type !== "Point") {
            return;
          }

          stableMap.easeTo({
            center: feature.geometry.coordinates as [number, number],
            zoom: zoom ?? undefined,
            duration: 800,
          });
        });
      });
      stableMap.on("click", MAP_POINT_SYMBOL_ID, (event) => {
        const pointFeature = event.features?.[0] as
          | { properties?: Record<string, unknown> }
          | undefined;
        const pointId = pointFeature?.properties?.id;

        if (typeof pointId === "string") {
          setActiveCenterKey(pointId);
        }
      });
      stableMap.on("mouseenter", MAP_CLUSTER_CIRCLE_ID, () => {
        stableMap.getCanvas().style.cursor = "pointer";
      });
      stableMap.on("mouseleave", MAP_CLUSTER_CIRCLE_ID, () => {
        stableMap.getCanvas().style.cursor = "";
      });
      stableMap.on("mouseenter", MAP_POINT_SYMBOL_ID, () => {
        stableMap.getCanvas().style.cursor = "pointer";
      });
      stableMap.on("mouseleave", MAP_POINT_SYMBOL_ID, () => {
        stableMap.getCanvas().style.cursor = "";
      });

      mapRef.current = stableMap;

      if (process.env.NODE_ENV !== "production") {
        (window as Window & { __serviceMap?: MapboxMap }).__serviceMap = stableMap;
      }
    })();

    return () => {
      isCancelled = true;
      if (process.env.NODE_ENV !== "production") {
        delete (window as Window & { __serviceMap?: MapboxMap }).__serviceMap;
      }
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }
    const source = map.getSource(MAP_SOURCE_ID) as GeoJSONSource | undefined;

    if (!source) {
      return;
    }

    source.setData(buildServiceCentersGeoJson(filteredCenters, effectiveActiveCenterKey));
  }, [effectiveActiveCenterKey, filteredCenters]);

  useEffect(() => {
    const map = mapRef.current;
    const activeCenter = serviceCenters.find(
      (item) => item.id === effectiveActiveCenterKey,
    );
    const mapboxgl = mapboxRef.current;

    if (!map || !mapboxgl || !activeCenter || !effectiveActiveCenterKey) {
      return;
    }

    map.flyTo({
      center: activeCenter.coordinates,
      zoom: 14.5,
      speed: 1.1,
      essential: true,
    });

    centerRefs.current[effectiveActiveCenterKey]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [effectiveActiveCenterKey]);

  useEffect(() => {
    const map = mapRef.current;
    const mapboxgl = mapboxRef.current;

    if (!map || !mapboxgl || filteredCenters.length === 0) {
      return;
    }

    if (filteredCenters.length === 1) {
      map.flyTo({
        center: filteredCenters[0].coordinates,
        zoom: 9.5,
        speed: 1,
        essential: true,
      });
      return;
    }

    const bounds = filteredCenters.reduce(
      (accumulator, center) => {
        accumulator.extend(center.coordinates);
        return accumulator;
      },
      new mapboxgl.LngLatBounds(filteredCenters[0].coordinates, filteredCenters[0].coordinates),
    );

    map.fitBounds(bounds, {
      padding: MAP_CITY_BOUNDS_PADDING,
      maxZoom: MAP_CITY_MAX_ZOOM,
      duration: 900,
    });
  }, [filteredCenters]);

  function handleRegionSelect(city: string) {
    setRegionQuery("");
    setSelectedCities((current) => (current.includes(city) ? current : [...current, city]));
    setIsAutocompleteOpen(false);
  }

  function handleRegionChange(value: string) {
    setRegionQuery(value);
    setIsAutocompleteOpen(true);
  }

  function handleRegionReset() {
    setRegionQuery("");
    setSelectedCities([]);
    setIsAutocompleteOpen(false);
  }

  function handleChipRemove(city: string) {
    setSelectedCities((current) => current.filter((item) => item !== city));
  }

  function handleActiveCenterReset() {
    setActiveCenterKey(null);
    const map = mapRef.current;
    const mapboxgl = mapboxRef.current;

    if (!map || !mapboxgl) {
      return;
    }

    if (filteredCenters.length > 1) {
      const bounds = filteredCenters.reduce(
        (accumulator, center) => {
          accumulator.extend(center.coordinates);
          return accumulator;
        },
        new mapboxgl.LngLatBounds(filteredCenters[0].coordinates, filteredCenters[0].coordinates),
      );

      map.fitBounds(bounds, {
        padding: MAP_CITY_BOUNDS_PADDING,
        maxZoom: MAP_CITY_MAX_ZOOM,
        duration: 900,
      });
      return;
    }

    map.easeTo({
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      duration: 900,
    });
  }

  const centersPanel = (
    <>
      <div className={styles.regionInputWrap} ref={autocompleteRef}>
        <div className={styles.regionInput}>
          <span className={styles.regionInputIcon}>
            <Image
              src="/figma/services-page/search.svg"
              alt=""
              fill
              unoptimized
            />
          </span>
          <input
            type="text"
            value={regionQuery}
            placeholder="Всі регіони"
            className={styles.regionInputField}
            onFocus={() => setIsAutocompleteOpen(true)}
            onChange={(event) => handleRegionChange(event.target.value)}
          />
        </div>

        {isAutocompleteOpen ? (
          <div className={styles.regionAutocomplete}>
            <button
              type="button"
              className={styles.regionAutocompleteOption}
              onClick={handleRegionReset}
            >
              Всі регіони
            </button>
            {autocompleteOptions.map((city) => (
              <button
                key={city}
                type="button"
                className={styles.regionAutocompleteOption}
                onClick={() => handleRegionSelect(city)}
              >
                {city}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {selectedCities.length > 0 ? (
        <div className={styles.regionChips}>
          {selectedCities.map((city) => (
            <button
              key={city}
              type="button"
              className={styles.regionChip}
              onClick={() => handleChipRemove(city)}
            >
              <span className={styles.regionChipLabel}>{city}</span>
              <span className={styles.regionChipClose} aria-hidden="true">
                ×
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.centersList}>
        {filteredCenters.map((item) => {
          const itemKey = getCenterKey(item);
          const isActive = itemKey === effectiveActiveCenterKey;

          return (
            <button
              key={itemKey}
              ref={(node) => {
                centerRefs.current[itemKey] = node;
              }}
              type="button"
              className={isActive ? styles.centerItemActive : styles.centerItem}
              onClick={() => {
                if (isActive) {
                  handleActiveCenterReset();
                  return;
                }

                setActiveCenterKey(itemKey);
              }}
            >
              <p className={isActive ? styles.centerCityActive : styles.centerCity}>
                {item.city}
              </p>
              {isActive ? (
                <span className={styles.centerClose} aria-hidden="true">
                  ×
                </span>
              ) : null}
              <p className={styles.centerName}>{item.name}</p>
              <p className={styles.centerMeta}>{item.address}</p>
              <p className={styles.centerMeta}>{item.phone}</p>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} initialLanguage={language} page={page} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumbMuted}>Головна</span>
                <span className={styles.breadcrumbMuted}>/</span>
                <span className={styles.breadcrumbCurrent}>Сервіс</span>
              </div>

              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Сервісне обслуговування</h1>

                <div className={styles.heroTextBlock}>
                  <p className={styles.heroLead}>
                    Cервісні центри компанії надають широкий перелік послуг і
                    виконують усі види робіт.
                  </p>
                  <HeroServiceGrid />
                </div>
              </div>

              <button
                type="button"
                className={styles.heroButton}
                onClick={openContactForm}
              >
                <span className={styles.heroButtonLabel}>Зв&apos;язатися з нами</span>
              </button>
            </div>

            <div className={styles.heroImageCard}>
              <Image
                src="/figma/services-page/hero-image.webp"
                alt="Сервісне обслуговування"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                className={styles.heroImage}
                priority
              />
            </div>
          </div>

          <div className={styles.heroGlow} aria-hidden="true" />
        </section>

        <section className={styles.centersSection}>
          <div className={styles.sectionGlowRight} aria-hidden="true" />
          <div className={styles.sectionGlowLeft} aria-hidden="true" />

          <div className={styles.centersHeader}>
            <h2 className={styles.centersTitle}>
              Сервісні центри у всіх регіонах України
            </h2>
            <p className={styles.centersDescription}>
              Технічне обслуговування базових автомобілів відбувається в
              регіональних сервісних центрах по всій країні.
            </p>
          </div>

          <div className={styles.centersContent}>
            <div className={styles.leftColumn}>{centersPanel}</div>

            <div className={styles.mapColumn}>
              <div className={styles.mapCard}>
                <div ref={mapContainerRef} className={styles.mapCanvas} />
                {isMobileCentersPanelOpen ? (
                  <div className={styles.mobileCentersOverlay}>
                    <div className={styles.mobileCentersOverlayHeader}>
                      <button
                        type="button"
                        className={styles.mobileCentersClose}
                        onClick={() => setIsMobileCentersPanelOpen(false)}
                      >
                        Закрити список
                      </button>
                    </div>
                    <div className={styles.mobileCentersPanel}>{centersPanel}</div>
                  </div>
                ) : null}
              </div>
              {!isMobileCentersPanelOpen ? (
                <div className={styles.mobileCentersActions}>
                  <button
                    type="button"
                    className={styles.mobileCentersToggle}
                    onClick={() => setIsMobileCentersPanelOpen(true)}
                  >
                    Показати список представництв
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.medicalSection}>
          <div className={styles.medicalInner}>
            <div className={styles.medicalImageCard}>
              <Image
                src="/figma/services-page/medical-service-image.webp"
                alt="Ремонт і обслуговування медичного обладнання"
                fill
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                className={styles.medicalImage}
              />
            </div>

            <div className={styles.medicalCopy}>
              <div className={styles.medicalTextBlock}>
                <h2 className={styles.medicalTitle}>
                  Ремонт і обслуговування медичного обладнання
                </h2>

                <div className={styles.medicalDescription}>
                  <p>
                    Ремонт медичної техніки забезпечують виробники або їхні
                    офіційні представники в Україні за запитом.
                  </p>
                  <p>
                    Щоб дізнатися більше, зв&apos;яжіться з нами або залиште вашу
                    заявку.
                  </p>
                </div>
              </div>

              <button type="button" className={styles.medicalButton}>
                <span className={styles.medicalButtonIcon}>
                  <Image
                    src="/figma/services-page/request-icon.svg"
                    alt=""
                    fill
                    unoptimized
                  />
                </span>
                <span className={styles.medicalButtonText}>
                  Замовити сервіс медичного обладнання
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer language={language} />
    </div>
  );
}
