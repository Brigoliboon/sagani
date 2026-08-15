"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "./Button";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.img
        src="/hero-banner.jpg"
        alt="Farm field with rice terraces under soft light"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 1.2, ease: "easeOut" }, scale: { duration: 14, ease: "easeOut" } }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-soil/85 via-soil/60 to-soil/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-soil/30" />

      <div className="relative w-full px-5 pb-28 pt-36 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-sm"
          >
            AI-powered climate decision support
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Know what&apos;s coming. Protect what you grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Sagani turns weather, water, and crop data into timely insights&#8212;helping farmers make better
            decisions before climate risks affect their harvest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#cta">Get Started</Button>
            <Button href="#how-it-works" variant="outlineLight">
              See How It Works
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 font-display text-lg italic text-gold"
          >
            With Sagani, makakasiguro ka sa iyong ani.
          </motion.p>
        </div>
      </div>
    </section>
  );
}