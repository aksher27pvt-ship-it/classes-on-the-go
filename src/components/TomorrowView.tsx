import { motion } from "framer-motion";
import { CalendarDays, Sun, ArrowRight } from "lucide-react";
import { WeekSchedule, getTodayDay, getTomorrowDay, formatTime } from "@/lib/schedule";
import { ClassCard } from "./ClassCard";

interface TomorrowViewProps {
  schedule: WeekSchedule;
}

export function TomorrowView({ schedule }: TomorrowViewProps) {
  const todayDay = getTodayDay();
  const tomorrowDay = getTomorrowDay();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = schedule.find((d) => d.day === todayDay);
  const tomorrowSchedule = schedule.find((d) => d.day === tomorrowDay);

  const todayClasses = [...(todaySchedule?.classes ?? [])].sort((a, b) => a.startTime.localeCompare(b.startTime));
  const tomorrowClasses = [...(tomorrowSchedule?.classes ?? [])].sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Split today's classes into done / upcoming
  const upcomingToday = todayClasses.filter((c) => {
    const [h, m] = c.endTime.split(":").map(Number);
    return h * 60 + m > currentMinutes;
  });

  const isSunday = todayDay === "Sunday";
  const showToday = !isSunday && todayClasses.length > 0;

  return (
    <div className="space-y-8">
      {/* Today */}
      {showToday && (
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Today's Classes</h2>
              <p className="text-sm text-muted-foreground">{todayDay}</p>
            </div>
          </motion.div>

          {upcomingToday.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-dashed bg-card/50 py-8 text-center">
              <p className="text-sm text-muted-foreground">All done for today! 🎉</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {todayClasses.map((entry, i) => {
                const [h, m] = entry.endTime.split(":").map(Number);
                const passed = h * 60 + m <= currentMinutes;
                return (
                  <div key={entry.id} className={passed ? "opacity-40" : ""}>
                    <ClassCard entry={entry} index={i} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tomorrow */}
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <ArrowRight className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">{showToday ? "Tomorrow" : "Tomorrow's Classes"}</h2>
            <p className="text-sm text-muted-foreground">{tomorrowDay}</p>
          </div>
        </motion.div>

        {tomorrowClasses.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-12 text-center">
            <Sun className="mb-3 h-10 w-10 text-primary/40" />
            <p className="font-display font-semibold text-muted-foreground">No classes tomorrow!</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {tomorrowClasses.map((entry, i) => (
              <ClassCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
