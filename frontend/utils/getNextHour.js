export const getNextHour = () => {
  const nextHour = new Date().getHours() + 1;
  return nextHour === 24 ? 0 : nextHour;
}