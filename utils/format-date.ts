export const formatDate = (dateString: string) => {
  const now: Date = new Date();
  const date: Date = new Date(dateString);
  const timeDifference: number = now.getTime() - date.getTime();

  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);
  const months: number = Math.floor(weeks / 4.35); // Average days in a month
  const years: number = Math.floor(months / 12);

  if (years >= 1) {
    return `${years}yr ago`;
  } else if (months >= 1) {
    return `${months}mo ago`;
  } else if (weeks >= 1) {
    return `${weeks}wk ago`;
  } else if (days >= 1) {
    return `${days}d ago`;
  } else if (hours >= 1) {
    return `${hours}h ago`;
  } else if (minutes >= 1) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
};
