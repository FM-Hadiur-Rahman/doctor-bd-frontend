export function formatBDT(amount?: number) {
  return `৳${amount || 0}`;
}

export function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
