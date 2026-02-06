import { WeekSchedule, generateId, saveSchedule, loadSchedule } from "./schedule";

function parseTime(t: string): string {
  // Convert "9:00" or "1:00" to 24h "HH:mm"
  let [h, m] = t.split(":").map(Number);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function parseTimePM(t: string, isPM: boolean): string {
  let [h, m] = t.split(":").map(Number);
  if (isPM && h < 12) h += 12;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function parseSlot(slot: string): { start: string; end: string } {
  const [startRaw, endRaw] = slot.split("-");
  let [sh] = startRaw.split(":").map(Number);
  let [eh] = endRaw.split(":").map(Number);

  // Heuristic: hours 1-8 are PM (13-20), 9-12 are AM unless context says otherwise
  const startIsPM = sh >= 1 && sh <= 8;
  const endIsPM = eh >= 1 && eh <= 8;

  return {
    start: parseTimePM(startRaw, startIsPM),
    end: parseTimePM(endRaw, endIsPM),
  };
}

const timetable: Record<string, Record<string, string>> = {
  Monday: {
    "9:00-10:00": "-",
    "10:00-11:00": "KAN (ACB)",
    "11:00-12:00": "ENG (VS)",
    "12:00-1:00": "LUNCH",
    "2:00-5:00": "WEB LAB",
  },
  Tuesday: {
    "9:00-10:00": "SE (MNM)",
    "10:00-11:00": "ST (SN)",
    "11:00-12:00": "WEB (MSM)",
    "12:00-1:00": "Python (AND)",
    "1:00-2:00": "LUNCH",
    "2:00-3:00": "KAN (ACB)",
    "3:00-4:00": "LIBRARY",
    "4:00-5:00": "SPORTS",
  },
  Wednesday: {
    "9:00-10:00": "ENG (VS)",
    "10:00-11:00": "SE (MNM)",
    "11:00-12:00": "KAN (ACB)",
    "12:00-1:00": "WEB (MSM)",
    "1:00-2:00": "LUNCH",
    "2:00-3:00": "Python (AND)",
    "3:00-5:00": "MINIPROJECT / SEMINAR",
  },
  Thursday: {
    "9:00-10:00": "SE (MNM)",
    "10:00-11:00": "WEB (MSM)",
    "11:00-12:00": "ST (SN)",
    "12:00-1:00": "Python (AND)",
    "1:00-2:00": "LUNCH",
    "2:00-3:00": "ENG (VS)",
    "3:00-5:00": "MENTORING",
  },
  Friday: {
    "9:00-5:00": "Python LAB",
    "1:00-2:00": "LUNCH",
  },
  Saturday: {
    "9:00-10:00": "KAN (ACB)",
    "10:00-11:00": "ENG (VS)",
    "11:00-12:00": "Python (AND)",
    "12:00-1:00": "WEB (MSM)",
  },
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function seedIfEmpty() {
  const existing = loadSchedule();
  const hasData = existing.some((d) => d.classes.length > 0);
  if (hasData) return;

  const week: WeekSchedule = DAYS.map((day) => {
    const slots = timetable[day] ?? {};
    const classes = Object.entries(slots)
      .filter(([, subject]) => subject.trim() !== "-")
      .map(([slot, subject]) => {
        const { start, end } = parseSlot(slot);
        return {
          id: generateId(),
          subject: subject.trim(),
          startTime: start,
          endTime: end,
        };
      });
    return { day, classes };
  });

  saveSchedule(week);
}
