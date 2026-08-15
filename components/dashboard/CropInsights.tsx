"use client";

import { useState } from "react";
import {
  cropTimelines,
  type CropInsight,
  type CropTimeline,
  type MonthRange,
} from "@/lib/crop-insights";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const emptyTimeline: CropTimeline = {
  planting: [],
  fertilization: [],
  harvest: [],
};

type CropInsightsProps = {
  crops: CropInsight[];
};

export default function CropInsights({ crops }: CropInsightsProps) {
  const [selectedCropId, setSelectedCropId] = useState(crops[0]?.cropId ?? "");
  const selectedCrop = crops.find((crop) => crop.cropId === selectedCropId) ?? crops[0];

  if (!selectedCrop) {
    return (
      <div className="grid h-full place-items-center p-8 text-sm text-soil/55">
        No crop information is available.
      </div>
    );
  }

  const timeline = cropTimelines[selectedCrop.cropId] ?? emptyTimeline;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-mist">
      <section className="sticky top-0 z-20 shrink-0 border-b border-soil/10 bg-mist/95 px-6 py-5 backdrop-blur-md lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sagani">
              Crop Insights
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-soil">
              {selectedCrop.cropName} growing calendar
            </h1>
            <p className="mt-1 text-sm text-soil/55">
              Select a crop below to update its seasonal timeline and field guidance.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-sagani/15 bg-sagani/10 px-3 py-1.5 text-xs font-semibold text-sagani">
            {selectedCrop.localizationPriority} priority
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-soil/10 bg-white p-4 shadow-sm shadow-soil/5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-soil">Annual activity timeline</h2>
            <div className="flex flex-wrap gap-4 text-[11px] font-medium text-soil/55">
              <TimelineLegend color="bg-field" label="Planting" />
              <TimelineLegend color="bg-[#9a673d]" label="Fertilization" />
              <TimelineLegend color="bg-critical" label="Harvest" />
            </div>
          </div>

          <div className="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-2">
            <div />
            <div className="grid grid-cols-12 text-center text-[10px] font-medium text-soil/40">
              {months.map((month) => <span key={month}>{month}</span>)}
            </div>
            <TimelineRow label="Planting" color="bg-field" ranges={timeline.planting} />
            <TimelineRow label="Fertilizing" color="bg-[#9a673d]" ranges={timeline.fertilization} />
            <TimelineRow label="Harvesting" color="bg-critical" ranges={timeline.harvest} />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <InfoCard title="Planting period" accent="border-t-field" icon={<SproutIcon />} text={selectedCrop.plantingSummary} />
          <InfoCard title="Fertilization" accent="border-t-[#9a673d]" icon={<NutrientsIcon />} text={selectedCrop.fertilizationSummary} />
          <InfoCard title="Harvest period" accent="border-t-critical" icon={<HarvestIcon />} text={selectedCrop.harvestSummary} />
          <InfoCard title="Watering guide" accent="border-t-rain" icon={<DropletIcon />} text={selectedCrop.wateringSummary} />
          <InfoCard title="Market price" accent="border-t-gold" icon={<PriceIcon />} text={selectedCrop.marketPriceSummary} />
        </div>
      </section>

      <section aria-labelledby="crop-list-heading" className="min-h-0 flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 id="crop-list-heading" className="font-display text-2xl font-semibold text-soil">
              Available crops
            </h2>
            <p className="mt-1 text-sm text-soil/50">Information loaded from the supplied crop insights dataset.</p>
          </div>
          <p className="text-xs font-medium text-soil/40">{crops.length} crops</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {crops.map((crop) => {
            const selected = crop.cropId === selectedCrop.cropId;

            return (
              <button
                key={crop.cropId}
                type="button"
                onClick={() => setSelectedCropId(crop.cropId)}
                aria-pressed={selected}
                className={`group rounded-2xl border bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-soil/10 ${
                  selected ? "border-sagani ring-2 ring-sagani/10" : "border-soil/10 hover:border-sagani/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? "bg-sagani text-white" : "bg-sagani/10 text-sagani"}`}>
                      <SproutIcon />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-soil">{crop.cropName}</h3>
                      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-soil/40">{crop.cropId}</p>
                    </div>
                  </div>
                  {selected ? (
                    <span className="rounded-full bg-sagani px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Selected
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 space-y-3 border-t border-soil/8 pt-4 text-xs leading-5 text-soil/60">
                  <CardSummary color="bg-field" label="Plant" text={crop.plantingSummary} />
                  <CardSummary color="bg-critical" label="Harvest" text={crop.harvestSummary} />
                  <CardSummary color="bg-rain" label="Water" text={crop.wateringSummary} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function TimelineLegend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function TimelineRow({ label, color, ranges }: { label: string; color: string; ranges: MonthRange[] }) {
  return (
    <>
      <span className="self-center text-xs font-semibold text-soil/60">{label}</span>
      <div className="grid h-3 grid-cols-12 gap-px overflow-hidden rounded-full bg-earth p-px">
        {months.map((month, index) => {
          const monthNumber = index + 1;
          const active = ranges.some((range) => monthNumber >= range.start && monthNumber <= range.end);
          return <span key={month} className={`transition-colors duration-300 ${active ? color : "bg-white"}`} />;
        })}
      </div>
    </>
  );
}

function InfoCard({
  title,
  accent,
  icon,
  text,
}: {
  title: string;
  accent: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <article className={`rounded-xl border border-soil/10 border-t-2 ${accent} bg-white p-3.5 shadow-sm shadow-soil/5`}>
      <div className="flex items-center gap-2 text-sagani">
        {icon}
        <h3 className="text-xs font-semibold text-soil">{title}</h3>
      </div>
      <p className="mt-2 text-[11px] leading-[1.45] text-soil/55">{text}</p>
    </article>
  );
}

function CardSummary({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div className="grid grid-cols-[4px_4rem_1fr] gap-2">
      <span className={`mt-1 h-3 rounded-full ${color}`} />
      <span className="font-semibold text-soil/70">{label}</span>
      <span>{text}</span>
    </div>
  );
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 21v-9m0 3c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Zm0-3c0-4 2.3-6 6.5-6 0 4-2.3 6-6.5 6Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NutrientsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M7 3h10v4l2 3v10H5V10l2-3V3Zm0 4h10M9 13h6M12 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HarvestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M6 20c5-2 8-7 9-16m-7 9c-2-1-3-3-3-5 3 0 5 1 6 3m2-2c1-2 3-3 6-3 0 3-2 5-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.5 8.5h-3a2 2 0 0 0 0 4h1a2 2 0 0 1 0 4h-3M12 6.5v2m0 8v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
