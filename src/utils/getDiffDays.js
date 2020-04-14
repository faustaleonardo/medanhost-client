export default (startDate, endDate) => {
  return (
    Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000) + 1
  );
};
