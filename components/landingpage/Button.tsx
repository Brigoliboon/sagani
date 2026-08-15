"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outlineLight" | "outlineDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sagani";

const variants: Record<Variant, string> = {
  primary: "bg-sagani px-7 py-3.5 text-white shadow-lg shadow-sagani/25 hover:bg-soil",
  outlineLight:
    "border border-white/60 bg-white/5 px-7 py-3.5 text-white backdrop-blur-sm hover:border-white hover:bg-white/15",
  outlineDark: "border border-soil/15 bg-white px-7 py-3.5 text-soil hover:border-sagani hover:text-sagani",
};

type ButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}