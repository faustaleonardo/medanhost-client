export default (date) => {
  const d = date.split('-');
  return `${d[1]}-${d[0]}-${d[2]}`;
};
