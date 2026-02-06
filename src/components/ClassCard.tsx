import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { ClassEntry, formatTime } from "@/lib/schedule";

interface ClassCardProps {
  entry: ClassEntry;
  index: number;
}

export function ClassCard({ entry, index }: ClassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="flex items-stretch gap-4 rounded-xl border bg-card p-4 shadow-sm"
    >
      {/* Time pill */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 px-3 py-2 min-w-[80px]">
        <span className="text-xs font-medium text-primary">{formatTime(entry.startTime)}</span>
        <span className="my-0.5 text-[10px] text-muted-foreground">to</span>
        <span className="text-xs font-medium text-primary">{formatTime(entry.endTime)}</span>
      </div>

      <div className="flex flex-col justify-center gap-1">
        <h3 className="font-display text-lg font-semibold leading-tight">{entry.subject}</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(entry.startTime)} – {formatTime(entry.endTime)}
          </span>
          {entry.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {entry.location}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
