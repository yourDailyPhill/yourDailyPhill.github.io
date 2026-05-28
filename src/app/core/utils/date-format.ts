export function formatMonthYear(iso: string | null): string {
  if (!iso) {
    return 'Present';
  }
  const [year, month] = iso.split('-').map(Number);
  const date = new Date(year, (month ?? 1) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatDateRange(start: string, end: string | null): string {
  const endLabel = end ? formatMonthYear(end) : 'Present';
  return `${formatMonthYear(start)} – ${endLabel}`;
}

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
