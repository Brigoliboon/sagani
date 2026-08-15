"use client";

import { Reveal } from "./Reveal";
import { LogoMark } from "./icons";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <LogoMark className="mx-auto h-9 w-9 drop-shadow-sm" />
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-sagani">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-soil sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-soil/60 sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}