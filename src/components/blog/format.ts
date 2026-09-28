/**
 * Date formatting for blog surfaces. Fixed to en-GB with an explicit UTC time
 * zone so the server render and the client hydration always agree.
 */
const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2026-01-20" -> "20 Jan 2026" */
export function formatPostDate(isoDate: string): string {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`));
}

/** "2026-01-20" -> "2026-01-20T00:00:00.000Z" for schema and metadata. */
export function toIsoTimestamp(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toISOString();
}
