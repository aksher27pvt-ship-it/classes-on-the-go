// Specific color assignments for each subject

type ColorScheme = {
  bg: string;
  text: string;
  border: string;
};

const SUBJECT_COLORS: Record<string, ColorScheme> = {
  "KAN": { bg: "bg-orange-100 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-300 dark:border-orange-700" },
  "ENG": { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-300 dark:border-blue-700" },
  "SE": { bg: "bg-purple-100 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-300 dark:border-purple-700" },
  "ST": { bg: "bg-pink-100 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-300 dark:border-pink-700" },
  "WEB": { bg: "bg-teal-100 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-300 dark:border-teal-700" },
  "Python": { bg: "bg-green-100 dark:bg-green-950", text: "text-green-700 dark:text-green-300", border: "border-green-300 dark:border-green-700" },
  "LUNCH": { bg: "bg-amber-100 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300", border: "border-amber-300 dark:border-amber-700" },
  "LIBRARY": { bg: "bg-indigo-100 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-300 dark:border-indigo-700" },
  "SPORTS": { bg: "bg-red-100 dark:bg-red-950", text: "text-red-700 dark:text-red-300", border: "border-red-300 dark:border-red-700" },
  "MINIPROJECT": { bg: "bg-cyan-100 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-300 dark:border-cyan-700" },
  "SEMINAR": { bg: "bg-cyan-100 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-300 dark:border-cyan-700" },
  "MENTORING": { bg: "bg-violet-100 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300", border: "border-violet-300 dark:border-violet-700" },
};

const DEFAULT_COLOR: ColorScheme = {
  bg: "bg-slate-100 dark:bg-slate-900", text: "text-slate-700 dark:text-slate-300", border: "border-slate-300 dark:border-slate-700",
};

export function getSubjectColor(subject: string): ColorScheme {
  // Try exact match first, then match by keyword in the subject string
  for (const [key, color] of Object.entries(SUBJECT_COLORS)) {
    if (subject.toUpperCase().includes(key.toUpperCase())) {
      return color;
    }
  }
  return DEFAULT_COLOR;
}
