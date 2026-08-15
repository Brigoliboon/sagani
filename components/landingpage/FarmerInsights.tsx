"use client";

import { Reveal } from "./Reveal";

export default function FarmerInsights() {
  return (
    <section id="farmer-insights" className="relative overflow-hidden">
      <img
        src="/images/farmer.jpg"
        alt="A farmer tending crops in a field"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-soil/85" />

      <div className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Farmer insights</p>
        </Reveal>
        <Reveal delay={0.05} className="mt-4 max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Advice farmers can actually read.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <div className="rounded-3xl border border-white/15 bg-white p-7 shadow-2xl shadow-soil/40 sm:p-10">
            <p className="inline-flex rounded-full bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sagani">
              Insight from Sagani
            </p>
            <blockquote className="mt-5">
              <p className="text-2xl font-medium leading-snug text-soil sm:text-[1.75rem]">
                🌧️ May malakas na ulan sa susunod na 24 oras.
              </p>
              <p className="mt-4 text-base leading-relaxed text-soil/75 sm:text-lg">
                Inirerekomenda ni Sagani na ipagpaliban muna ang pagdidilig upang makatipid sa tubig.
              </p>
            </blockquote>
            <div className="mt-6 border-t border-earth pt-5">
              <p className="text-sm leading-relaxed text-soil/55">
                Heavy rainfall is expected within the next 24 hours. Sagani recommends delaying
                irrigation to conserve water.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-5 max-w-3xl">
          <p className="text-sm leading-relaxed text-white/60">
            Sagani translates technical analysis into simple, farm-level guidance&#8212;in the
            language farmers already use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}