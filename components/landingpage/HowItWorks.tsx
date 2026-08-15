"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { RadarIcon, TrendIcon, BookIcon, CheckPillIcon } from "./icons";

const steps = [
  {
    number: "01",
    title: "Monitor",
    description: "Sagani gathers weather, water, and crop information.",
    icon: RadarIcon,
  },
  {
    number: "02",
    title: "Predict",
    description: "AI identifies upcoming climate and water risks.",
    icon: TrendIcon,
  },
  {
    number: "03",
    title: "Understand",
    description: "Sagani explains what the risk means for the crop.",
    icon: BookIcon,
  },
  {
    number: "04",
    title: "Act",
    description: "Farmers receive a practical recommendation.",
    icon: CheckPillIcon,
  },
];

const pipeline = ["Data", "AI", "Prediction", "Action"];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How Sagani works"
          title="From data to decision in four steps"
          subtitle="Weather, water, and crop information flows through Sagani in one clear path."
        />

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {pipeline.map((stage, i) => (
            <span key={stage} className="flex items-center gap-3 sm:gap-4">
              <span className="rounded-full border border-soil/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-soil shadow-sm">
                {stage}
              </span>
              {i < pipeline.length - 1 ? (
                <span className="text-gold" aria-hidden="true">
                  →
                </span>
              ) : null}
            </span>
          ))}
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-earth bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-soil/15">{step.number}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-sagani transition-colors group-hover:bg-sagani group-hover:text-white">
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-soil">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soil/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}