"use client";

import Link from "next/link";
import type { WeatherPageData } from "@/lib/weather";
import type { CropInsight } from "@/lib/crop-insights";
import { Reveal } from "@/components/landingpage/Reveal";
import {
  SunIcon,
  DropletIcon,
  CloudIcon,
  GaugeIcon,
  LeafIcon,
  ArrowRightIcon,
  PinIcon,
  CheckPillIcon,
  TrendIcon,
} from "@/components/landingpage/icons";

type DashboardWater = {
  hectares: number;
  droughtDays: number;
  coverageDays: number;
  sufficient: boolean;
  reservoirCapacityLiters: number;
  additionalNeededLiters: number;
  cropLabel: string;
};

type DashboardOverviewProps = {
  weather: WeatherPageData;
  crops: CropInsight[];
  dateLabel: string;
  water: DashboardWater;
};

const formatLiters = (value: number) => new Intl.NumberFormat("en-US").format(Math.round(value));

export default function DashboardOverview({
  weather,
  crops,
  dateLabel,
  water,
}: DashboardOverviewProps) {
  const primaryCrop = crops.find((crop) => crop.cropName.toLowerCase() === "corn") ?? crops[0];
  const mitigation = weather.mitigations[0];

  const stats = [
    { label: "Temperature", value: `${weather.temperatureC}°C`, sub: weather.condition, icon: SunIcon, tint: "bg-warning/10 text-warning" },
    { label: "Humidity", value: `${weather.humidityPct}%`, sub: weather.seasonLabel, icon: DropletIcon, tint: "bg-water/10 text-water" },
    { label: "Rain probability", value: `${weather.rainChancePct}%`, sub: "within 24 hours", icon: CloudIcon, tint: "bg-rain/10 text-rain" },
    { label: "Drought coverage", value: `${water.coverageDays.toFixed(1)} days`, sub: `of ${water.droughtDays}-day dry spell`, icon: GaugeIcon, tint: "bg-sagani/10 text-sagani" },
  ];

  return (
    <div className="mx-auto w-full px-5 py-8 sm:px-8 sm:py-12">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sagani">Farm overview</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-soil sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-soil/55">
              <PinIcon className="h-4 w-4 text-sagani" />
              {weather.locationLabel} · {weather.farmName}
            </p>
          </div>
          <time className="rounded-full border border-earth bg-white px-4 py-1.5 text-sm font-medium text-soil/60">
            {dateLabel}
          </time>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-8">
        <div className="flex flex-col gap-5 rounded-3xl bg-soil p-6 text-white shadow-xl shadow-soil/20 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
              <TrendIcon className="h-5 w-5 text-gold" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">AI recommended action</p>
              <h2 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                {mitigation?.title ?? "Keep an eye on conditions"}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                {mitigation?.detail ?? weather.forecastSummary}
              </p>
            </div>
          </div>
          {mitigation ? (
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                {mitigation.timing}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                {weather.seasonLabel} · {weather.seasonDetail}
              </span>
            </div>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-soil/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-soil/50">
                  {stat.label}
                </span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.tint}`}>
                  <stat.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 font-display text-2xl font-semibold text-soil">{stat.value}</p>
              <p className="mt-1 text-xs text-soil/50">{stat.sub}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <ModuleCard
            href="/weather"
            title="Current Weather"
            icon={<CloudIcon className="h-5 w-5" />}
            accent="bg-rain/10 text-rain"
          >
            <p className="text-sm text-soil/70">{weather.summary}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <ModuleRow label="Humidity" value={`${weather.humidityPct}%`} />
              <ModuleRow label="Wind" value={`${weather.windKph} kph`} />
              <ModuleRow label="Forecast" value={weather.forecastSummary} />
            </dl>
          </ModuleCard>
        </Reveal>

        <Reveal delay={0.1}>
          <ModuleCard
            href="/dashboard/crop-insights"
            title="Crop Insights"
            icon={<LeafIcon className="h-5 w-5" />}
            accent="bg-field/10 text-field"
          >
            {primaryCrop ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-soil">{primaryCrop.cropName}</p>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-warning">
                    {primaryCrop.localizationPriority}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-soil/70">
                  {primaryCrop.plantingSummary}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <ModuleRow label="Market price" value={primaryCrop.marketPriceSummary} />
                  <ModuleRow label="Watering" value={primaryCrop.wateringSummary} />
                </dl>
              </>
            ) : (
              <p className="text-sm text-soil/60">No crop data available.</p>
            )}
          </ModuleCard>
        </Reveal>

        <Reveal delay={0.15}>
          <ModuleCard
            href="/water"
            title="Water Control"
            icon={<DropletIcon className="h-5 w-5" />}
            accent="bg-water/10 text-water"
          >
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                water.sufficient ? "bg-safe/10 text-safe" : "bg-critical/10 text-critical"
              }`}
            >
              <CheckPillIcon className="h-4 w-4" />
              {water.sufficient
                ? "Reservoir sufficient"
                : `Needs ${formatLiters(water.additionalNeededLiters)} L more`}
            </div>
            <p className="mt-3 text-sm text-soil/70">
              {water.cropLabel} across {water.hectares} ha, with a {formatLiters(water.reservoirCapacityLiters)} L
              reservoir covering {water.coverageDays.toFixed(1)} of {water.droughtDays} drought days.
            </p>
          </ModuleCard>
        </Reveal>
      </div>
    </div>
  );
}

function ModuleCard({
  href,
  title,
  icon,
  accent,
  children,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-soil/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
            {icon}
          </span>
          <h3 className="font-display text-lg font-semibold text-soil">{title}</h3>
        </div>
      </div>
      <div className="mt-4 flex-1">{children}</div>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sagani transition-colors hover:text-soil"
      >
        Open {title}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ModuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-soil/50">{label}</dt>
      <dd className="line-clamp-2 text-right text-soil/75">{value}</dd>
    </div>
  );
}