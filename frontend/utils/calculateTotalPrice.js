export const calculateTotalPrice = (hourlyPrice, startDate, endDate, startTime, endTime) => {
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  let totalHours;
  if (endTime >= startTime) {
    totalHours = (endTime - startTime) + (diffInDays - 1) * 24;
  } else {
    totalHours = ((24 - startTime) + endTime) + (diffInDays - 2) * 24;
  }

  console.log(diffInDays);
  console.log(totalHours);
  console.log(hourlyPrice);

  const totalPrice = totalHours * hourlyPrice;

  return totalPrice;
}
