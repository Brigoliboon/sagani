"use client";

import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { ArrowRightIcon } from "./icons";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden">
      <img
        src="/final-cta.jpg"
        alt="Harvest-ready field in warm afternoon light"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-soil/85 via-soil/80 to-soil/85" />

      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Protect your next harvest.
          </h2>
          <p className="mt-5 text-lg text-white/80">Start making smarter decisions with Sagani.</p>
          <div className="mt-9 flex justify-center">
            <Button
              href="/water"
              className="px-8 py-4 text-base"
            >
              Get Started
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-10 font-display text-xl italic text-gold sm:text-2xl">
            With Sagani, makakasiguro ka sa iyong ani.
          </p>
        </Reveal>
      </div>
    </section>
  );
}