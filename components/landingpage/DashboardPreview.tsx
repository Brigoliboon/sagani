"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SunIcon, DropletIcon, GaugeIcon, LeafIcon } from "./icons";

const stats = [
  { label: "Today's Conditions", value: "29°C", sub: "Partly Cloudy", icon: SunIcon, chip: "bg-rain text-white" },
  { label: "Rain Probability", value: "72%", sub: "within 24 hours", icon: DropletIcon, chip: "bg-water text-white" },
  { label: "Water Availability", value: "78%", sub: "reservoir level", icon: GaugeIcon, chip: "bg-field text-white" },
  { label: "Crop Health", value: "91%", sub: "corn · vegetative", icon: LeafIcon, chip: "bg-sagani text-white" },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="scroll-mt-20 bg-earth/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Product dashboard"
          title="A clearer picture than the weather report"
          subtitle="Sagani combines conditions, risk, and a recommended action in a single view."
        />

        <Reveal delay={0.1} className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-soil/10 bg-white shadow-2xl shadow-soil/10">
            <div className="flex items-center justify-between border-b border-earth bg-mist/60 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-critical/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-safe" />
                </div>
                <span className="text-sm font-semibold text-soil">Sagani Dashboard</span>
                <span className="hidden text-xs text-soil/45 sm:inline">Bukidnon · Corn farm</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-safe/10 px-3 py-1 text-[11px] font-semibold text-safe">
                <span className="h-1.5 w-1.5 rounded-full bg-safe" />
                Live
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-earth bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-soil/50">
                        {stat.label}
                      </span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.chip}`}
                      >
                        <stat.icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-3 font-display text-3xl font-semibold text-soil">{stat.value}</p>
                    <p className="mt-1 text-xs text-soil/50">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
                <div className="rounded-2xl border border-earth bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-soil/50">
                      Climate Risk
                    </span>
                    <span className="rounded-full bg-watch/15 px-3 py-1 text-xs font-bold text-warning">
                      Moderate
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-earth">
                    <div className="h-full w-3/5 rounded-full bg-gold" />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-soil/55">
                    Rain expected; heat and water stress remain watch signals for the coming days.
                  </p>
                </div>

                <div className="flex flex-col justify-between rounded-2xl bg-sagani p-5 text-white">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <LeafIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                        AI recommendation
                      </p>
                      <p className="mt-2 text-base font-medium leading-relaxed">
                        Rain is expected within the next 24 hours. Delay irrigation and conserve
                        available water.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-white/60">
                    AI assessment based on current conditions and forecast. Requires field validation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}