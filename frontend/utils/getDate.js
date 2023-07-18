export const getDate = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours === 23 ? new Date(date.setDate(date.getDate() + 1)) : date;
}