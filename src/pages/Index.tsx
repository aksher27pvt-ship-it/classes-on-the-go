import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, Settings, LayoutGrid } from "lucide-react";
import { loadSchedule, saveSchedule, WeekSchedule } from "@/lib/schedule";
import { seedIfEmpty } from "@/lib/seed";
import { TomorrowView } from "@/components/TomorrowView";
import { ScheduleSetup } from "@/components/ScheduleSetup";
import { WeekOverview } from "@/components/WeekOverview";
import { InstallBanner } from "@/components/InstallBanner";

type Tab = "tomorrow" | "week" | "setup";

const tabs: { id: Tab; label: string; icon: typeof CalendarDays }[] = [
  { id: "tomorrow", label: "Today", icon: CalendarDays },
  { id: "week", label: "Week", icon: LayoutGrid },
  { id: "setup", label: "Setup", icon: Settings },
];

export default function Index() {
  const [schedule, setSchedule] = useState<WeekSchedule>(() => {
    seedIfEmpty();
    return loadSchedule();
  });
  const [activeTab, setActiveTab] = useState<Tab>("tomorrow");

  const handleSave = useCallback((updated: WeekSchedule) => {
    saveSchedule(updated);
    setSchedule(updated);
    setActiveTab("tomorrow");
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight">MyClassSchedule</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-3 sm:px-4 py-4 sm:py-6 pb-2">
        {activeTab === "tomorrow" && <TomorrowView schedule={schedule} />}
        {activeTab === "week" && <WeekOverview schedule={schedule} />}
        {activeTab === "setup" && <ScheduleSetup schedule={schedule} onSave={handleSave} />}
      </main>

      <InstallBanner />

      {/* Bottom nav */}
      <nav className="sticky bottom-0 border-t bg-card/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-px left-4 right-4 h-0.5 rounded-full bg-primary"
                  />
                )}
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
