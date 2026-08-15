"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/landingpage/icons";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Weather", href: "/weather" },
  { label: "Crop Insights", href: "/dashboard/crop-insights" },
  { label: "Water Control", href: "/water" },
];

export default function TopNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-soil/10 bg-white/95 backdrop-blur-md">
      <nav className="flex h-16 w-full items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-xl font-semibold tracking-tight text-soil">Sagani</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-sagani text-white shadow-sm"
                  : "text-soil/65 hover:bg-mist hover:text-sagani"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/"
            className="hidden text-sm font-medium text-soil/50 transition-colors hover:text-sagani lg:block"
          >
            ← Home
          </Link>
        </div>
      </nav>

      <div className="flex gap-1 overflow-x-auto border-t border-earth/70 px-5 py-2 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-sagani text-white"
                : "text-soil/65 hover:bg-mist hover:text-sagani"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}