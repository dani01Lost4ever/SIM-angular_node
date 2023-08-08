export default function checkIfExpired(
  date: Date,
  completed: boolean
): boolean {
  if (completed != true) {
    const now = new Date();
    return date < now;
  }
  return false;
}
