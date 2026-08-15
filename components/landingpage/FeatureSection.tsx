"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CheckIcon } from "./icons";

const features = [
  {
    id: "risk",
    image: "/images/feature-rain.jpg",
    alt: "Rain clouds gathering over crop fields",
    tag: "Early Risk Forecasts",
    title: "Know the risk before it reaches your field.",
    points: ["Rainfall probability", "Drought risk", "Heat risk", "Water shortage", "Planting window"],
  },
  {
    id: "crop",
    image: "/images/feature-crop.jpg",
    alt: "Close-up of a growing corn crop",
    tag: "Crop Insights",
    title: "Know what your crop needs, when it needs it.",
    points: ["Crop condition", "Crop stage", "Climate risk", "Upcoming stress", "AI recommendation"],
  },
  {
    id: "water",
    image: "/images/feature-water.jpg",
    alt: "Irrigation water flowing across farmland",
    tag: "Water Management",
    title: "Use every drop where it matters.",
    points: ["Reservoir level", "Daily allocation", "Recommended usage", "Irrigation zones", "Potential savings"],
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Core features"
          title="Insights your farm can act on"
          subtitle="Three ways Sagani turns complex conditions into clear, farm-level decisions."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-earth bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="h-52 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{feature.tag}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-soil">
                    {feature.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-soil/70">
                        <CheckIcon className="h-4 w-4 shrink-0 text-sagani" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}