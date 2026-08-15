"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TrendIcon, PinIcon, CompassIcon } from "./icons";

const principles = [
  {
    title: "Predictive",
    description: "Know the risk before it becomes a loss.",
    icon: TrendIcon,
  },
  {
    title: "Farm-specific",
    description: "Turn broad climate data into farm-level insights.",
    icon: PinIcon,
  },
  {
    title: "Actionable",
    description: "Turn predictions into decisions.",
    icon: CompassIcon,
  },
];

export default function WhySagani() {
  return (
    <section id="why-sagani" className="scroll-mt-20 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Why Sagani" title="Three principles behind every insight" />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.1}>
              <div className="flex flex-col items-center rounded-3xl border border-earth bg-white p-8 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sagani text-white shadow-lg shadow-sagani/25">
                  <principle.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-soil">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soil/60">{principle.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-20 max-w-3xl text-center">
          <p className="font-display text-2xl font-medium leading-snug text-soil sm:text-3xl">
            Data tells you what is happening.{" "}
            <span className="italic text-sagani">Sagani</span> tells you what to do next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}