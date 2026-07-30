/**
 * Formats date strings to dd-mm-yyyy format for Asgard Admin UI
 * e.g., "2026-02-11" -> "11-02-2026"
 */
export function formatDateDDMMYYYY(dateStr?: string | null): string {
  if (!dateStr) return "Not set";

  // Handles YYYY-MM-DD strings directly without timezone offsets
  const ymdMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr);
  if (ymdMatch) {
    const [, year, month, day] = ymdMatch;
    return `${day}-${month}-${year}`;
  }

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}
