import { motion } from "framer-motion";
import { WeekSchedule, formatTime, getTodayDay } from "@/lib/schedule";
import { LayoutGrid } from "lucide-react";

interface WeekOverviewProps {
  schedule: WeekSchedule;
}

export function WeekOverview({ schedule }: WeekOverviewProps) {
  const today = getTodayDay();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
          <LayoutGrid className="h-5 w-5 text-accent" />
        </div>
        <h2 className="font-display text-2xl font-bold">Week Overview</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {schedule.map((day, i) => {
          const isToday = day.day === today;
          const sorted = [...day.classes].sort((a, b) => a.startTime.localeCompare(b.startTime));
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border p-4 ${
                isToday ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20" : "bg-card"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="font-display font-semibold">{day.day}</span>
                {isToday && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Today
                  </span>
                )}
              </div>
              {sorted.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No classes</p>
              ) : (
                <ul className="space-y-1.5">
                  {sorted.map((cls) => (
                    <li key={cls.id} className="text-sm">
                      <span className="font-medium">{cls.subject}</span>
                      <span className="ml-1.5 text-muted-foreground">
                        {formatTime(cls.startTime)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
