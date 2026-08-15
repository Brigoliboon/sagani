"use client";

import { Reveal } from "./Reveal";
import { CloudIcon, DropletIcon, ClockIcon } from "./icons";

const problems = [
  {
    title: "Uncertain Weather",
    description: "Broad forecasts do not always tell farmers what action to take.",
    icon: CloudIcon,
  },
  {
    title: "Limited Water",
    description: "Water needs to be managed before shortages become emergencies.",
    icon: DropletIcon,
  },
  {
    title: "Reactive Decisions",
    description:
      "By the time visible crop damage appears, the opportunity to prevent it may already be gone.",
    icon: ClockIcon,
  },
];

export default function ProblemBanner() {
  return (
    <section id="problem" className="relative overflow-hidden">
      <div className="relative">
        <img
          src="/images/problem.jpg"
          alt="Wide farmland under an overcast sky"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-soil/85" />

        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">The problem</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Farmers get weather. They need answers for their field.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Climate information is everywhere&#8212;but knowing what it means for your crop, your
              water, and your next decision is harder.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white p-6 shadow-xl shadow-soil/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-sagani">
                    <problem.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-soil">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soil/65">{problem.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mx-auto max-w-4xl px-5 pb-20 pt-16 sm:px-8">
        <p className="text-center font-display text-2xl font-medium leading-snug text-soil sm:text-3xl">
          Sagani turns climate information into{" "}
          <span className="text-sagani">farm-level action.</span>
        </p>
      </Reveal>
    </section>
  );
}