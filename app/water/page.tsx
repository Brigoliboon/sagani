"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CROP_OPTIONS,
  WATER_FARM_SCENARIO,
  estimateWaterReport,
} from "@/constants/water";
import type { WaterReport } from "@/constants/water";
import { Reveal } from "@/components/landingpage/Reveal";
import {
  LogoMark,
  LeafIcon,
  DropletIcon,
  ClockIcon,
  GaugeIcon,
  CheckPillIcon,
  WalletIcon,
  PinIcon,
  DownloadIcon,
} from "@/components/landingpage/icons";

const formatLiters = (value: number) => new Intl.NumberFormat("en-US").format(Math.round(value));

const crop =
  CROP_OPTIONS.find((option) => option.id === WATER_FARM_SCENARIO.cropId) ?? CROP_OPTIONS[0];

const inputClass =
  "w-full rounded-xl border border-soil/15 bg-mist px-4 py-3 text-sm text-soil outline-none transition-colors placeholder:text-soil/35 focus:border-sagani focus:ring-2 focus:ring-sagani/20";

export default function WaterPage() {
  const [hectares, setHectares] = useState(String(WATER_FARM_SCENARIO.hectares));
  const [capacity, setCapacity] = useState(String(WATER_FARM_SCENARIO.reservoirCapacityLiters));
  const [exporting, setExporting] = useState(false);

  const hectaresNum = Number(hectares);
  const capacityNum = Number(capacity);
  const valid = hectaresNum > 0 && capacityNum > 0;

  const report: WaterReport | null = valid
    ? estimateWaterReport({
        cropId: WATER_FARM_SCENARIO.cropId,
        hectares: hectaresNum,
        droughtDays: WATER_FARM_SCENARIO.droughtDays,
        reservoirCapacityLiters: capacityNum,
      })
    : null;

  const exportPdf = async () => {
    if (!report) return;
    setExporting(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { default: WaterReportPdf } = await import("@/components/water/WaterReportPdf");
      const blob = await pdf(
        <WaterReportPdf report={report} farmName={WATER_FARM_SCENARIO.farmName} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sagani-water-report-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export PDF", error);
    } finally {
      setExporting(false);
    }
  };

  const fixedRows = [
    { label: "Crop", value: crop.label, icon: LeafIcon },
    {
      label: "Water requirement",
      value: `${formatLiters(crop.waterRequirementLitersPerHectarePerDay)} L/ha/day`,
      icon: GaugeIcon,
    },
    {
      label: "Drought duration",
      value: `${WATER_FARM_SCENARIO.droughtDays} days`,
      icon: ClockIcon,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-soil/10 bg-white/95 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-xl font-semibold text-soil">Sagani</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-sagani transition-colors hover:text-soil">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="w-full px-5 py-12 sm:px-8 sm:py-16">
        <Reveal className="w-full sm:w-3/4 lg:w-1/2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sagani">Water management</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-soil sm:text-4xl">
            Is your water enough for the dry spell?
          </h1>
          <p className="mt-3 leading-relaxed text-soil/60">
            Update your farm area and reservoir capacity&#8212;the report recalculates instantly
            against the {WATER_FARM_SCENARIO.droughtDays}-day drought forecast.
          </p>
        </Reveal>

        <div className="mt-10 grid w-full gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-soil/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-soil/50">
                Farm details
              </h2>

              <div className="mt-5 space-y-5">
                <label htmlFor="hectares" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-soil">Farm area</span>
                  <div className="relative">
                    <PinIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sagani" />
                    <input
                      id="hectares"
                      type="number"
                      min="0"
                      step="any"
                      value={hectares}
                      onChange={(event) => setHectares(event.target.value)}
                      placeholder="e.g. 1.5"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                  <span className="mt-1.5 block text-xs text-soil/50">
                    Total planted area in hectares (ha).
                  </span>
                </label>

                <label htmlFor="capacity" className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-soil">
                    Reservoir capacity
                  </span>
                  <div className="relative">
                    <DropletIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-water" />
                    <input
                      id="capacity"
                      type="number"
                      min="0"
                      step="any"
                      value={capacity}
                      onChange={(event) => setCapacity(event.target.value)}
                      placeholder="e.g. 1000000"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                  <span className="mt-1.5 block text-xs text-soil/50">
                    Total usable water in the reservoir, in liters (L).
                  </span>
                </label>

                <ul className="space-y-4 border-t border-earth pt-5">
                  {fixedRows.map((row) => (
                    <li key={row.label} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3 text-sm text-soil/60">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mist text-sagani">
                          <row.icon className="h-4 w-4" />
                        </span>
                        {row.label}
                      </span>
                      <span className="text-sm font-semibold text-soil">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl bg-soil p-6 text-white shadow-xl shadow-soil/20 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Water report</p>
                  <h3 className="mt-3 font-display text-xl font-semibold">Drought sufficiency report</h3>
                </div>
                <button
                  type="button"
                  onClick={exportPdf}
                  disabled={!report || exporting}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs font-bold text-soil transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <DownloadIcon className="h-4 w-4" />
                  {exporting ? "Exporting…" : "Export as PDF"}
                </button>
              </div>

              {!report ? (
                <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-8 text-center">
                  <WalletIcon className="h-10 w-10 text-white/30" />
                  <p className="mt-4 text-sm text-white/50">
                    Enter a valid farm area and reservoir capacity to see whether your reservoir can
                    cover the drought.
                  </p>
                </div>
              ) : (
                <div className="mt-6 flex flex-1 flex-col gap-5">
                  <div
                    className={`rounded-2xl p-5 ${report.sufficient ? "bg-safe/20" : "bg-critical/25"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-lg font-semibold">
                        {report.sufficient ? "Reservoir is sufficient" : "Reservoir is not sufficient"}
                      </p>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          report.sufficient ? "bg-safe text-white" : "bg-critical text-white"
                        }`}
                      >
                        <CheckPillIcon className="h-5 w-5" />
                      </span>
                    </div>
                    {report.sufficient ? (
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        Your reservoir can cover the {report.droughtDays}-day drought with{" "}
                        <span className="font-semibold text-white">
                          {formatLiters(report.surplusLiters)} L to spare.
                        </span>
                      </p>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        You will need approximately{" "}
                        <span className="font-semibold text-white">
                          {formatLiters(report.additionalNeededLiters)} L more
                        </span>{" "}
                        to cover the full {report.droughtDays}-day drought.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-gold">Estimated budget</p>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-2 text-white/60">
                          <DropletIcon className="h-4 w-4" /> Reservoir capacity
                        </dt>
                        <dd className="font-semibold">{formatLiters(report.reservoirCapacityLiters)} L</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-2 text-white/60">
                          <GaugeIcon className="h-4 w-4" /> Daily water need
                        </dt>
                        <dd className="font-semibold">{formatLiters(report.dailyNeedLiters)} L/day</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-2 text-white/60">
                          <WalletIcon className="h-4 w-4" /> Total for {report.droughtDays} days
                        </dt>
                        <dd className="font-semibold">{formatLiters(report.totalNeedLiters)} L</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-gold">Coverage</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      At the current daily need, your reservoir covers approximately{" "}
                      <span className="font-semibold text-white">
                        {report.coverageDays.toFixed(1)} days
                      </span>{" "}
                      of {report.droughtDays} drought days.
                    </p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                      <div
                        className={`h-full rounded-full ${
                          report.coverageDays >= report.droughtDays ? "bg-safe" : "bg-critical"
                        }`}
                        style={{
                          width: `${Math.min(100, (report.coverageDays / report.droughtDays) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed text-white/45">
                    Estimate based on typical crop water requirements and reservoir capacity. AI
                    assessment&#8212;requires field validation.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}