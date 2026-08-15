"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "../landingpage/icons";

const navigationItems = [
  { label: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  { label: "Weather", icon: CloudIcon },
  { label: "Crop Insights", icon: SproutIcon, href: "/dashboard/crop-insights" },
  { label: "Water Control", icon: DropletIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-dvh w-[17rem] shrink-0 flex-col border-r border-soil/10 bg-white px-4 py-5 shadow-[8px_0_30px_rgba(23,37,30,0.05)]">
      <div className="flex items-center gap-3 px-2">
        <LogoMark className="h-10 w-10 shrink-0" />
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-soil">
            Sagani
          </p>
          <p className="text-xs text-soil/45">Farm dashboard</p>
        </div>
      </div>

      <div className="mt-9 flex items-center gap-3 rounded-2xl border border-earth bg-mist/70 p-3">
        <div
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-earth text-sm font-semibold text-sagani"
        >
          F
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-soil">Farmer name</p>
          <p className="truncate text-xs text-soil/45">Farm location</p>
        </div>
      </div>

      <nav aria-label="Dashboard navigation" className="mt-7 space-y-2">
        {navigationItems.map(({ label, icon: Icon, href }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href ?? "__placeholder__");
          const className = `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
            active
              ? "bg-sagani text-white shadow-lg shadow-sagani/20"
              : "text-soil/65 hover:bg-mist hover:text-sagani"
          }`;

          if (href) {
            return (
              <Link key={label} href={href} aria-current={active ? "page" : undefined} className={className}>
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          }

          return (
            <button key={label} type="button" aria-disabled="true" className={className}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-sagani px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sagani/25 transition-colors hover:bg-soil"
        >
          <DocumentIcon className="h-5 w-5" />
          <span>Generate Report</span>
        </button>

        <div className="h-11 rounded-xl border border-dashed border-soil/15 bg-mist/60" />
      </div>
    </aside>
  );
}

type IconProps = { className?: string };

function DashboardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 18h10a4 4 0 0 0 .7-7.94A5.5 5.5 0 0 0 7.2 8.6 4.5 4.5 0 0 0 7 18Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SproutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21v-9m0 3c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Zm0-3c0-4 2.3-6 6.5-6 0 4-2.3 6-6.5 6Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 14a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3v5h4M10 12h5M10 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
