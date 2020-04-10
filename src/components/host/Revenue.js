import React from 'react';
import { Line } from 'react-chartjs-2';

export default () => {
  const monthsData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Income based on month this year',
        data: [12, 19, 3, 5, 2, 3, 4, 5, 1, 2, 3, 4],
        backgroundColor: ['rgba(33, 186, 69, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  const yearsData = {
    labels: [2018, 2019, 2020],
    datasets: [
      {
        label: 'Income based on year',
        data: [12, 9, 33],
        backgroundColor: ['rgba(33, 186, 69, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-center">Revenue</h1>
      <div className="revenue-chart">
        <h3>Income based on Month This Year</h3>
        <Line data={monthsData} options={{ maintainAspectRatio: true }} />
      </div>
      <div className="revenue-chart">
        <h3>Income based on Year</h3>
        <Line data={yearsData} options={{ maintainAspectRatio: true }} />
      </div>
    </div>
  );
};
