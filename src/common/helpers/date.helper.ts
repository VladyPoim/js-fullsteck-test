export function getWeekKey(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + ((firstDayOfYear.getDay() + 6) % 7)) / 7);
  return `${date.getFullYear()}-W${weekNumber}`;
}
