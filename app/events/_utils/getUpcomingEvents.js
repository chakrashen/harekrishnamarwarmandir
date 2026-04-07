const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseEventDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getUpcomingEvents(events) {
  const today = startOfDay(new Date());
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() + 30);

  return events
    .map((event) => ({ ...event, parsedDate: parseEventDate(event.date) }))
    .filter((event) => event.parsedDate >= today && event.parsedDate <= cutoff)
    .sort((a, b) => a.parsedDate - b.parsedDate)
    .map(({ parsedDate, ...event }) => event);
}

export function getDaysLeft(dateString) {
  const today = startOfDay(new Date());
  const eventDate = startOfDay(parseEventDate(dateString));
  return Math.max(0, Math.ceil((eventDate - today) / MS_PER_DAY));
}
