import { LogoMark } from "./icons";

const productLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#why-sagani", label: "Why Sagani" },
];

const companyLinks = [
  { href: "#cta", label: "Get started" },
  { href: "#farmer-insights", label: "Farmer insights" },
  { href: "#problem", label: "The problem" },
  { href: "#top", label: "Back to top" },
];

export default function Footer() {
  return (
    <footer className="bg-soil text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-xl font-semibold">Sagani</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Sagani turns weather, water, and crop data into timely insights&#8212;helping farmers
              make better decisions before climate risks affect their harvest.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Product</p>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Learn more</p>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Sagani. All rights reserved.
          </p>
          <p className="max-w-md text-xs text-white/45">
            An AI-powered climate decision-support system. AI assessments require field validation.
          </p>
        </div>
      </div>
    </footer>
  );
}