import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/weather", label: "Current Weather" },
  { href: "/crop-insights", label: "Crop Insights" },
  { href: "/water-control", label: "Water Control" },
  { href: "/dashboard", label: "Dashboard" },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#1f6b45" />
      <path d="M22 7c-5 0-9 3.4-9 8.5V22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 17c0-3 2-5.5 5-7" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 12c0 4 0 7-4 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AppHeader({ activePath }: { activePath: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-soil/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Sagani home">
          <LogoMark />
          <span className="font-display text-xl font-semibold tracking-tight text-soil">Sagani</span>
        </Link>

        <div className="hidden items-center gap-2 text-xs text-soil/55 sm:flex">
          <span className="h-2 w-2 rounded-full bg-safe" />
          Demo farm
        </div>
      </div>

      <nav
        aria-label="Primary navigation"
        className="border-t border-earth/80 px-5 sm:px-8 lg:border-t-0 lg:absolute lg:inset-x-0 lg:top-0 lg:pointer-events-none"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-2 [scrollbar-width:none] lg:h-14 lg:items-center lg:justify-center lg:py-0 [&::-webkit-scrollbar]:hidden">
          {navigation.map((item) => {
            const active = item.href === activePath;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`pointer-events-auto shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sagani text-white"
                    : "text-soil/60 hover:bg-mist hover:text-sagani"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
