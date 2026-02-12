// Color scheme for different subjects
// Each subject gets a consistent color based on its name

type ColorScheme = {
  bg: string;      // background class
  text: string;    // text color class
  border: string;  // border color class
};

const COLOR_SCHEMES: ColorScheme[] = [
  { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-300 dark:border-blue-700" },
  { bg: "bg-purple-100 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-300 dark:border-purple-700" },
  { bg: "bg-pink-100 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-300 dark:border-pink-700" },
  { bg: "bg-green-100 dark:bg-green-950", text: "text-green-700 dark:text-green-300", border: "border-green-300 dark:border-green-700" },
  { bg: "bg-orange-100 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-300 dark:border-orange-700" },
  { bg: "bg-teal-100 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-300 dark:border-teal-700" },
  { bg: "bg-red-100 dark:bg-red-950", text: "text-red-700 dark:text-red-300", border: "border-red-300 dark:border-red-700" },
  { bg: "bg-amber-100 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300", border: "border-amber-300 dark:border-amber-700" },
];

function hashSubject(subject: string): number {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) {
    const char = subject.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getSubjectColor(subject: string): ColorScheme {
  const index = hashSubject(subject) % COLOR_SCHEMES.length;
  return COLOR_SCHEMES[index];
}
