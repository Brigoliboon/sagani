import TopNavbar from "@/components/app/TopNavbar";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-dvh flex-col bg-mist">
      <TopNavbar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}