import type { Metadata } from "next";

import TopNavbar from "@/components/app/TopNavbar";
import {
  formatWeatherDate,
  formatWeatherTimestamp,
  getWeatherPageData,
  type ForecastIcon,
  type MitigationTone,
} from "@/lib/weather";

export const metadata: Metadata = {
  title: "Current Weather | Sagani",
  description: "Current and forecast weather, plus practical farm actions for Sagani farms.",
};

type IconProps = { className?: string };

function PinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function DropletIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 14a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function WindIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h11.5a2.5 2.5 0 1 0-2.4-3.2M3 12h16a2 2 0 1 1-1.9 2.7M3 16h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WeatherGlyph({ icon, className = "h-12 w-12" }: { icon: ForecastIcon; className?: string }) {
  if (icon === "rain") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="M12 29h23a8 8 0 0 0 1-15.94A12 12 0 0 0 13.2 11 9 9 0 0 0 12 29Z" fill="currentColor" opacity=".18" />
        <path d="M12 29h23a8 8 0 0 0 1-15.94A12 12 0 0 0 13.2 11 9 9 0 0 0 12 29Z" stroke="currentColor" strokeWidth="2" />
        <path d="m17 34-2 5m10-5-2 5m10-5-2 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "sunny") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="8" fill="currentColor" opacity=".22" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M24 5v5m0 28v5M5 24h5m28 0h5M10.5 10.5l3.5 3.5m20 20 3.5 3.5m0-27L34 14M14 34l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {icon === "partly-cloudy" ? (
        <>
          <circle cx="17" cy="16" r="7" fill="#d9a441" />
          <path d="M17 5v3m-8.5.5 2 2M5 17h3" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : null}
      <path d="M11 34h25a8 8 0 0 0 1-15.94A12 12 0 0 0 14.2 16 9 9 0 0 0 11 34Z" fill="currentColor" opacity=".18" />
      <path d="M11 34h25a8 8 0 0 0 1-15.94A12 12 0 0 0 14.2 16 9 9 0 0 0 11 34Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const mitigationTone: Record<MitigationTone, { icon: string; badge: string; bar: string }> = {
  water: {
    icon: "bg-rain/10 text-rain",
    badge: "bg-rain/10 text-rain",
    bar: "bg-rain",
  },
  watch: {
    icon: "bg-watch/15 text-warning",
    badge: "bg-watch/15 text-warning",
    bar: "bg-gold",
  },
  safe: {
    icon: "bg-safe/10 text-safe",
    badge: "bg-safe/10 text-safe",
    bar: "bg-safe",
  },
};

export default function WeatherPage() {
  const weather = getWeatherPageData();
  const stateLabel =
    weather.dataState === "LIVE_REAL_DATA"
      ? "Live data"
      : weather.dataState === "CACHED_REAL_DATA"
        ? "Cached data"
        : "Sample data";
  const stateDetail =
    weather.dataState === "LIVE_REAL_DATA"
      ? "Current provider feed"
      : weather.dataState === "CACHED_REAL_DATA"
        ? "Last available provider snapshot"
        : "Local JSON • not a live feed";

  return (
    <div className="min-h-screen bg-mist">
      <TopNavbar />

      <main className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12 lg:px-10">
        <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-sagani">
              <PinIcon className="h-4 w-4" />
              <span>{weather.locationLabel}</span>
              <span className="text-soil/25">•</span>
              <span className="text-soil/50">{weather.farmName}</span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-soil sm:text-5xl">
              Current weather
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-soil/60 sm:text-base">
              A quick read of today&apos;s conditions, the short outlook, and what to check on the farm next.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-watch/25 bg-watch/10 px-4 py-3 sm:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-warning">{stateLabel}</p>
              <p className="mt-0.5 text-xs text-soil/55">{stateDetail}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.55fr_0.85fr]">
          <article className="relative min-h-[390px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-rain via-[#236f78] to-sagani p-6 text-white shadow-xl shadow-rain/15 sm:p-8">
            <div className="pointer-events-none absolute -right-14 -top-20 h-64 w-64 rounded-full bg-white/10 blur-sm" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-gold/15 blur-2xl" />

            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/70">{formatWeatherDate(weather.observedAt)}</p>
                  <p className="mt-1 text-lg font-semibold">{weather.condition}</p>
                  <p className="mt-1 text-xs text-white/55">Feels like {weather.feelsLikeC}°C</p>
                </div>
                <WeatherGlyph icon="partly-cloudy" className="h-20 w-20 text-white sm:h-24 sm:w-24" />
              </div>

              <div>
                <div className="flex items-start">
                  <span className="font-display text-[6rem] font-semibold leading-[0.8] tracking-[-0.08em] sm:text-[7.5rem]">
                    {weather.temperatureC}
                  </span>
                  <span className="ml-3 font-display text-4xl font-medium text-white/80 sm:text-5xl">°</span>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                  {weather.summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
                  <DropletIcon className="h-5 w-5 text-white/75" />
                  <p className="mt-3 text-lg font-semibold sm:text-xl">{weather.humidityPct}%</p>
                  <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs">Humidity</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
                  <DropletIcon className="h-5 w-5 text-white/75" />
                  <p className="mt-3 text-lg font-semibold sm:text-xl">{weather.rainChancePct}%</p>
                  <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs">Rain chance</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
                  <WindIcon className="h-5 w-5 text-white/75" />
                  <p className="mt-3 text-lg font-semibold sm:text-xl">{weather.windKph}</p>
                  <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs">km/h wind</p>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <article className="rounded-[2rem] border border-soil/8 bg-white p-6 shadow-sm shadow-soil/5">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-warning">
                  <CalendarIcon />
                </span>
                <span className="rounded-full bg-earth px-3 py-1.5 text-[11px] font-semibold text-soil/55">
                  General context
                </span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-soil/40">Current season</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-soil">{weather.seasonLabel}</h2>
              <p className="mt-2 text-sm text-soil/55">{weather.seasonDetail}</p>
              <p className="mt-5 border-t border-earth pt-4 text-xs leading-5 text-soil/45">
                Season is a calendar-based guide for Bukidnon, not an official declaration.
              </p>
            </article>

            <article className="rounded-[2rem] bg-soil p-6 text-white shadow-lg shadow-soil/10">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rain text-white">
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Next 24 hours</p>
                  <p className="mt-1 text-xs text-white/45">Mock outlook</p>
                </div>
              </div>
              <p className="mt-6 text-base font-medium leading-7 text-white/90">{weather.forecastSummary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {weather.flags.map((flag) => (
                  <span key={flag} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs text-white/65">
                    {flag}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="forecast-title">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-rain">Weather outlook</p>
              <h2 id="forecast-title" className="mt-2 font-display text-3xl font-semibold text-soil">Five-day view</h2>
            </div>
            <p className="hidden text-xs text-soil/40 sm:block">High / low temperature</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {weather.forecast.map((day, index) => (
              <article
                key={day.date}
                className={`last:col-span-2 rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 sm:last:col-span-1 sm:p-5 ${
                  index === 0 ? "border-rain/30 bg-rain/5" : "border-soil/8 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-soil">{day.label}</p>
                  {index === 0 ? (
                    <span className="rounded-full bg-rain px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Now</span>
                  ) : null}
                </div>
                <WeatherGlyph icon={day.icon} className="my-4 h-11 w-11 text-rain" />
                <p className="min-h-10 text-xs leading-5 text-soil/50">{day.condition}</p>
                <div className="mt-4 flex items-end justify-between gap-2">
                  <p className="font-display text-xl font-semibold text-soil">
                    {day.highC}° <span className="text-soil/35">{day.lowC}°</span>
                  </p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-rain">
                    <DropletIcon className="h-3.5 w-3.5" /> {day.rainChancePct}%
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="actions-title">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sagani">Farm-ready guidance</p>
            <h2 id="actions-title" className="mt-2 font-display text-3xl font-semibold text-soil">What to do next</h2>
            <p className="mt-2 text-sm leading-6 text-soil/55">
              Practical checks selected from the weather flags above. Confirm actual field conditions before acting.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {weather.mitigations.map((item, index) => {
              const tone = mitigationTone[item.tone];

              return (
                <article key={item.code} className="relative overflow-hidden rounded-2xl border border-soil/8 bg-white p-6 shadow-sm shadow-soil/5">
                  <span className={`absolute inset-y-0 left-0 w-1 ${tone.bar}`} />
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone.icon}`}>
                      {index === 0 ? <DropletIcon /> : index === 1 ? <WeatherGlyph icon="rain" className="h-6 w-6" /> : <ShieldIcon />}
                    </span>
                    <span className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${tone.badge}`}>{item.timing}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-soil">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-soil/55">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="mt-10 rounded-2xl border border-soil/8 bg-white px-5 py-4 sm:px-6" aria-label="Weather data source">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-earth text-sagani">
                <ClockIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-soil">{weather.sourceName}</p>
                <p className="mt-1 text-xs leading-5 text-soil/45">
                  Observation: {formatWeatherTimestamp(weather.observedAt)} • Outlook updated: {formatWeatherTimestamp(weather.forecastUpdatedAt)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-soil/45 lg:justify-end">
              <span className="rounded-full bg-watch/10 px-3 py-1.5 font-semibold text-warning">{stateLabel}</span>
              <span>Loaded {formatWeatherTimestamp(weather.retrievedAt)}</span>
              <span className="hidden text-soil/20 sm:inline">•</span>
              <span>{weather.coordinatesLabel}</span>
            </div>
          </div>
        </aside>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-soil/45">
          Sagani supports farm decisions; it does not make the final decision for the farmer. Review actual field and water conditions before acting.
        </p>
      </main>
    </div>
  );
}
