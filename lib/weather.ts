import weatherJson from "@/data/weather.json";

export type WeatherDataState =
  | "LIVE_REAL_DATA"
  | "CACHED_REAL_DATA"
  | "SIMULATED_DATA";

export type ForecastIcon = "rain" | "cloudy" | "partly-cloudy" | "sunny";
export type MitigationTone = "water" | "watch" | "safe";

export interface ForecastDay {
  date: string;
  label: string;
  condition: string;
  icon: ForecastIcon;
  highC: number;
  lowC: number;
  rainChancePct: number;
}

export interface WeatherMitigation {
  code: string;
  title: string;
  detail: string;
  timing: string;
  tone: MitigationTone;
}

export interface WeatherPageData {
  farmName: string;
  locationLabel: string;
  coordinatesLabel: string;
  temperatureC: number;
  feelsLikeC: number;
  humidityPct: number;
  rainChancePct: number;
  windKph: number;
  condition: string;
  seasonLabel: string;
  seasonDetail: string;
  summary: string;
  forecastSummary: string;
  flags: string[];
  observedAt: string;
  forecastUpdatedAt: string;
  retrievedAt: string;
  sourceName: string;
  dataState: WeatherDataState;
  forecast: ForecastDay[];
  mitigations: WeatherMitigation[];
}

// This boundary is intentionally small: swap the local import for a normalized
// provider response later without changing the page or its components.
export function getWeatherPageData(): WeatherPageData {
  return weatherJson as WeatherPageData;
}

export function formatWeatherTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  }).format(new Date(value));
}

export function formatWeatherDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(value));
}
