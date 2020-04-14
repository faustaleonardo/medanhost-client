import moment from 'moment';

export default (date, days) => {
  const d = new Date(date);
  const nextDate = new Date(d.setDate(d.getDate() + days));

  return moment(nextDate).format('YYYY-MM-DD');
};
