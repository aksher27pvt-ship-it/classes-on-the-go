export interface ClassEntry {
  id: string;
  subject: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  location?: string;
}

export interface DaySchedule {
  day: string;
  classes: ClassEntry[];
}

export type WeekSchedule = DaySchedule[];

const STORAGE_KEY = "myclassschedule_data";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getDays() {
  return DAYS;
}

export function getEmptyWeek(): WeekSchedule {
  return DAYS.map((day) => ({ day, classes: [] }));
}

export function loadSchedule(): WeekSchedule {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as WeekSchedule;
      // Ensure all days exist
      return DAYS.map((day) => {
        const found = parsed.find((d) => d.day === day);
        return found ?? { day, classes: [] };
      });
    }
  } catch {
    // ignore
  }
  return getEmptyWeek();
}

export function saveSchedule(schedule: WeekSchedule) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
}

export function getTomorrowDay(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const jsDay = tomorrow.getDay(); // 0=Sun
  if (jsDay === 0) return "Monday"; // Sunday → show Monday
  return DAYS[jsDay - 1];
}

export function getTodayDay(): string {
  const jsDay = new Date().getDay();
  if (jsDay === 0) return "Sunday";
  return DAYS[jsDay - 1];
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
