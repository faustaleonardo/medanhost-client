import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

import axiosInstance from 'utils/axiosInstance';

export default () => {
  const { auth } = useContext(AuthContext);

  const [monthStats, setMonthStats] = useState([]);
  const [yearStatsLabel, setYearStatsLabel] = useState([]);
  const [yearStats, setYearStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // month
      let response = await axiosInstance.get('/api/v1/bookings/incomes/month');
      let result = response.data;

      const thisYear = new Date().getFullYear();
      let data = [...new Array(12)].map((el, index) => {
        const month = index + 1;
        const match = result.find(
          (each) =>
            each.month_number * 1 === month && each.year * 1 === thisYear
        );

        if (match) return match.total;
        else return 0;
      });
      setMonthStats(data);

      // year
      response = await axiosInstance.get('/api/v1/bookings/incomes/year');
      result = response.data;

      const years = result.map((el) => el.year);
      setYearStatsLabel(years);

      const total = result.map((el) => el.total);
      setYearStats(total);
    };
    fetchData();
  }, []);

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
        data: monthStats,
        backgroundColor: ['rgba(33, 186, 69, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  const yearsData = {
    labels: yearStatsLabel,
    datasets: [
      {
        label: 'Income based on year',
        data: yearStats,
        backgroundColor: ['rgba(33, 186, 69, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  if (auth === false) return <Redirect to="/" />;
  if (!monthStats || !yearStats) return null;

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
