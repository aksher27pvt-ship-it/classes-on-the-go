import { motion } from "framer-motion";
import { CalendarDays, Sun } from "lucide-react";
import { WeekSchedule, getTomorrowDay } from "@/lib/schedule";
import { ClassCard } from "./ClassCard";

interface TomorrowViewProps {
  schedule: WeekSchedule;
}

export function TomorrowView({ schedule }: TomorrowViewProps) {
  const tomorrowDay = getTomorrowDay();
  const daySchedule = schedule.find((d) => d.day === tomorrowDay);
  const classes = daySchedule?.classes ?? [];
  const sorted = [...classes].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <CalendarDays className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Tomorrow's Classes</h2>
          <p className="text-sm text-muted-foreground">{tomorrowDay}</p>
        </div>
      </motion.div>

      {sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-16 text-center"
        >
          <Sun className="mb-3 h-12 w-12 text-primary/40" />
          <p className="font-display text-lg font-semibold text-muted-foreground">No classes tomorrow!</p>
          <p className="mt-1 text-sm text-muted-foreground">Enjoy your free day 🎉</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {sorted.map((entry, i) => (
            <ClassCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
