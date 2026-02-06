import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WeekSchedule, ClassEntry, generateId } from "@/lib/schedule";
import { toast } from "sonner";

interface ScheduleSetupProps {
  schedule: WeekSchedule;
  onSave: (schedule: WeekSchedule) => void;
}

export function ScheduleSetup({ schedule, onSave }: ScheduleSetupProps) {
  const [draft, setDraft] = useState<WeekSchedule>(JSON.parse(JSON.stringify(schedule)));
  const [openDay, setOpenDay] = useState<string | null>(null);

  function toggleDay(day: string) {
    setOpenDay((prev) => (prev === day ? null : day));
  }

  function addClass(dayIndex: number) {
    const updated = [...draft];
    updated[dayIndex] = {
      ...updated[dayIndex],
      classes: [
        ...updated[dayIndex].classes,
        { id: generateId(), subject: "", startTime: "09:00", endTime: "10:00", location: "" },
      ],
    };
    setDraft(updated);
  }

  function updateClass(dayIndex: number, classIndex: number, field: keyof ClassEntry, value: string) {
    const updated = [...draft];
    const classes = [...updated[dayIndex].classes];
    classes[classIndex] = { ...classes[classIndex], [field]: value };
    updated[dayIndex] = { ...updated[dayIndex], classes };
    setDraft(updated);
  }

  function removeClass(dayIndex: number, classIndex: number) {
    const updated = [...draft];
    const classes = updated[dayIndex].classes.filter((_, i) => i !== classIndex);
    updated[dayIndex] = { ...updated[dayIndex], classes };
    setDraft(updated);
  }

  function handleSave() {
    const cleaned = draft.map((day) => ({
      ...day,
      classes: day.classes.filter((c) => c.subject.trim() !== ""),
    }));
    onSave(cleaned);
    toast.success("Schedule saved!");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl sm:text-2xl font-bold">Setup Schedule</h2>
        <Button onClick={handleSave} size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="space-y-2">
        {draft.map((day, dayIndex) => (
          <div key={day.day} className="rounded-xl border bg-card overflow-hidden">
            <button
              onClick={() => toggleDay(day.day)}
              className="flex w-full items-center justify-between px-3 sm:px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-display font-semibold text-sm sm:text-base">{day.day}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {day.classes.length} class{day.classes.length !== 1 ? "es" : ""}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    openDay === day.day ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence>
              {openDay === day.day && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t px-3 sm:px-4 py-4">
                    {day.classes.map((cls, classIndex) => (
                      <motion.div
                        key={cls.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-lg bg-secondary/50 p-3 space-y-2"
                      >
                        {/* Subject + Delete row */}
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">Subject</label>
                            <Input
                              value={cls.subject}
                              onChange={(e) => updateClass(dayIndex, classIndex, "subject", e.target.value)}
                              placeholder="e.g. Math 101"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeClass(dayIndex, classIndex)}
                            className="text-destructive hover:text-destructive shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Time + Location row */}
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">Start</label>
                            <Input
                              type="time"
                              value={cls.startTime}
                              onChange={(e) => updateClass(dayIndex, classIndex, "startTime", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">End</label>
                            <Input
                              type="time"
                              value={cls.endTime}
                              onChange={(e) => updateClass(dayIndex, classIndex, "endTime", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">Location</label>
                            <Input
                              value={cls.location ?? ""}
                              onChange={(e) => updateClass(dayIndex, classIndex, "location", e.target.value)}
                              placeholder="Room"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <Button variant="outline" size="sm" className="gap-1.5 w-full" onClick={() => addClass(dayIndex)}>
                      <Plus className="h-3.5 w-3.5" />
                      Add Class
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
